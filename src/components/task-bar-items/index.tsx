import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import type { Gantt } from '../../types'
import './index.less'

interface TaskBarProps {
  data: Gantt.Bar
  index: number
  barItem: {
    id: string
    icon: JSX.Element
    startDate: string
    endDate: string
  }
}

const TaskBarItems: React.FC<TaskBarProps> = ({ data, index, barItem }) => {
  const { store, prefixCls } = useContext(Context)
  const { loading } = data

  const prefixClsTaskBar = `${prefixCls}-task-bar`

  const baseTop = store.rowHeight
  const topStep = store.rowHeight

  const valid = barItem.startDate && barItem.endDate
  const startAmp = dayjs(barItem.startDate || 0)
    .startOf('day')
    .valueOf()
  const translateX = valid ? startAmp / store.pxUnitAmp : 0
  const translateY = baseTop + index * topStep

  return (
    <div
      role='none'
      className={prefixClsTaskBar}
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {loading && <div className={`${prefixClsTaskBar}-loading`} />}
      <div
        style={{
          transform: `translateY(50%) translateY(-${baseTop}px)`,
        }}
      >
        {barItem.icon}
      </div>
    </div>
  )
}
export default observer(TaskBarItems)
