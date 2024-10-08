/* eslint-disable no-underscore-dangle */
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import GroupBar from '../group-bar'
import InvalidTaskBar from '../invalid-task-bar'
import TaskBar from '../task-bar'
import TaskBarItems from '../task-bar-items'
import { flattenDeep } from '../../utils'
import { TOP_PADDING } from '../../constants'

const BarList: React.FC = () => {
  const { store, allowAddBar } = useContext(Context)
  const barList = store.getBarList
  const { rowHeight } = store

  const flattenBarList = flattenDeep(barList)

  // TODO 去除高度读取
  const height = 8
  const baseTop = TOP_PADDING + rowHeight / 2 - height / 2
  const topStep = rowHeight

  return (
    <div data-bar='BarList'>
      {flattenBarList.map((bar, index) => {
        const translateY = baseTop + index * topStep
        const commonProps = { data: bar, translateY }

        if (bar._group) return <GroupBar key={bar.key} data={bar} />

        if (bar.record.barItems){
          return (
            bar.record.barItems.map(barItem => (
              <div key={barItem.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <TaskBar {...commonProps} />
                <TaskBarItems data={bar} barItem={barItem} translateY={translateY} />
              </div>
            ))
          )
        }

        return bar.invalidDateRange && allowAddBar ? <InvalidTaskBar key={bar.key} {...commonProps} /> : <TaskBar key={bar.key} {...commonProps}/>
      })}
    </div>
  )
}
export default observer(BarList)
