import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import type { Gantt } from '../../types'
import './index.less'

interface TaskBarProps {
  data: Gantt.Bar
  barItem: {
    id: string
    icon: JSX.Element
    startDate: string
    endDate: string
  }
}

const TaskBarItems: React.FC<TaskBarProps> = ({ data, barItem }) => {
  const { store, prefixCls } = useContext(Context)
  const { loading, translateY } = data

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
      }}
    >
      {loading && <div className={`${prefixClsTaskBar}-loading`} />}
      {barItem.icon}
    </div>
  )
}
export default observer(TaskBarItems)
