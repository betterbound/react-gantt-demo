/* eslint-disable no-underscore-dangle */
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import Context from '../../context'
import TaskBarThumb from '../task-bar-thumb'

const BarThumbList: React.FC = () => {
  const { store } = useContext(Context)
  const barList = store.getBarList
  return (
    <>
      {barList.map(bar => {
        if (store.getTaskBarThumbVisible(bar)) return <TaskBarThumb data={bar} key={bar.key} />
        return null
      })}
    </>
  )
}
export default observer(BarThumbList)
