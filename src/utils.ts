import dayjs from 'dayjs'
import type { Gantt } from './types'

interface ConvertBar {
  data: Gantt.Item[]
  pxUnitAmp: number
  rowHeight: number
  disabled: boolean
  depth?: number
  parents?: Gantt.Item[] | undefined
}

export function convertBar({ data, pxUnitAmp, rowHeight, disabled, depth = 0, parents = [] }: ConvertBar) {
  // 最小宽度
  const minStamp = 11 * pxUnitAmp

  const dateTextFormat = (startX: number) => dayjs(startX * pxUnitAmp).format('YYYY-MM-DD')

  const getDateWidth = (start: number, endX: number) => {
    const startDate = dayjs(start * pxUnitAmp)
    const endDate = dayjs(endX * pxUnitAmp)
    return `${startDate.diff(endDate, 'day') + 1}`
  }

  const barList = data.map(item => {
    const valid = item.startDate && item.endDate
    let startAmp = dayjs(item.startDate || 0)
      .startOf('day')
      .valueOf()
    let endAmp = dayjs(item.endDate || 0)
      .endOf('day')
      .valueOf()

    // 訳: 開始日と終了日が同じ場合、デフォルトで1日とする
    if (Math.abs(endAmp - startAmp) < minStamp) {
      startAmp = dayjs(item.startDate || 0)
        .startOf('day')
        .valueOf()
      endAmp = dayjs(item.endDate || 0)
        .endOf('day')
        .add(minStamp, 'millisecond')
        .valueOf()
    }

    const width = valid ? (endAmp - startAmp) / pxUnitAmp : 0
    const translateX = valid ? startAmp / pxUnitAmp : 0

    const record = { ...item.record, disabled }
    const bar: Gantt.Bar = {
      key: item.key,
      task: item,
      record,
      translateX,
      translateY: 0, // MEMO: BarList で設定される
      width,
      label: item.content,
      stepGesture: 'end', // 訳: start（開始）、moving（移動）、end（終了）
      invalidDateRange: !item.endDate || !item.startDate, // 訳: 有効な時間範囲かどうか
      startDate: item.startDate,
      endDate: item.endDate,
      dateTextFormat,
      getDateWidth,
      loading: false,
      children: !item.children
        ? []
        : convertBar({
          data: item.children,
          pxUnitAmp,
          rowHeight,
          disabled,
          depth: item._depth + 1,
          parents: [...(parents || []), item],
        }),
      _group: item.group,
      _collapsed: item.collapsed, // 訳: 折りたたみかどうか
      _depth: depth as number, // 訳: 子ノードの深さを示す
      _index: item._index, // 訳: タスクのインデックス位置
      _parent: parents && parents.length > 0 ? parents[parents.length - 1] : undefined,
      _parents: parents || [],
      _childrenCount: !item.children ? 0 : item.children.length, // 訳: 子タスク
    }
    item._bar = bar
    return bar
  })

  return barList
}

/**
 * 将树形数据向下递归为一维数组
 *
 * @param {any} arr 数据源
 */
export function flattenDeep(array: Gantt.Item[] = [], depth = 0, parent?: Gantt.Item | undefined): Gantt.Item[] {
  let index = 0
  return array.reduce((flat: Gantt.Item[], item) => {
    item._depth = depth
    item._parent = parent
    item._index = index
    index += 1
    return [...flat, item, ...(item.children && !item.collapsed ? flattenDeep(item.children, depth + 1, item) : [])]
  }, [])
}

export function getMaxRange(bar: Gantt.Bar) {
  let minTranslateX = 0
  let maxTranslateX = 0
  const temporary: Gantt.Bar[] = [bar]

  while (temporary.length > 0) {
    const current = temporary.shift()
    if (current) {
      const { translateX = 0, width = 0 } = current
      if (minTranslateX === 0) minTranslateX = translateX || 0

      if (translateX) {
        minTranslateX = Math.min(translateX, minTranslateX)
        maxTranslateX = Math.max(translateX + width, maxTranslateX)
      }
      if (current.task.children && current.task.children.length > 0)
        for (const t of current.task.children) if (t._bar) temporary.push(t._bar)
    }
  }

  return {
    translateX: minTranslateX,
    width: maxTranslateX - minTranslateX,
  }
}
const genKey = (() => {
  let key = 0
  return function () {
    return key++
  }
})()
export function transverseData(data: Gantt.Record[] = [], startDateKey: string, endDateKey: string) {
  const result: Gantt.Item[] = []

  for (const record of data) {
    const item: Gantt.Item = {
      key: genKey(),
      record,
      content: '',
      group: record.group,
      startDate: record[startDateKey] || '',
      endDate: record[endDateKey] || '',
      collapsed: record.collapsed || false,
      children: transverseData(record.children || [], startDateKey, endDateKey),
    }
    result.push(item)
  }
  return result
}
