/* eslint-disable no-underscore-dangle */
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import GroupBar from '../group-bar'
import InvalidTaskBar from '../invalid-task-bar'
import TaskBar from '../task-bar'
import TaskBarItems from '../task-bar-items'

const BarList: React.FC = () => {
  const { store, allowAddBar } = useContext(Context)
  const barList = store.getBarList
  const { count, start } = store.getVisibleRows
  return (
    <div data-bar='BarList'>
      {barList.slice(start, start + count).map(bar => {
        if (bar._group) return <GroupBar key={bar.key} data={bar} />

        if (bar.record.barItems){
          return (
            bar.record.barItems.map(barItem => (
              <div key={barItem.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <TaskBar key={bar.key} data={bar} />
                <TaskBarItems data={bar} barItem={barItem} />
              </div>
            ))
          )
        }

        return bar.invalidDateRange && allowAddBar ? <InvalidTaskBar key={bar.key} data={bar} /> : <TaskBar key={bar.key} data={bar} />
      })}
    </div>
  )
}
export default observer(BarList)
