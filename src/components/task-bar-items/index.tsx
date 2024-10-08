import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import type { Gantt } from '../../types'
import './index.less'

interface TaskBarProps {
  data: Gantt.Bar
  translateY: number
  barItem: {
    id: string
    icon: JSX.Element
    startDate: string
    endDate: string
  }
}

const TaskBarItems: React.FC<TaskBarProps> = ({ data, barItem, translateY }) => {
  const { store, prefixCls } = useContext(Context)
  const { loading } = data

  const prefixClsTaskBar = `${prefixCls}-task-bar`

  const valid = barItem.startDate && barItem.endDate
  const startAmp = dayjs(barItem.startDate || 0)
    .startOf('day')
    .valueOf()
  const translateX = valid ? startAmp / store.pxUnitAmp : 0

  return (
    <div
      role='none'
      className={prefixClsTaskBar}
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
        zIndex: 1 // zIndexを指定することでバーの上に成果物を表示する
      }}
    >
      {loading && <div className={`${prefixClsTaskBar}-loading`} />}
      {barItem.icon}
    </div>
  )
}
export default observer(TaskBarItems)
