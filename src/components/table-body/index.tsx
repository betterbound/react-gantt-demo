import React, { useCallback, useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Context from '../../context'
import ObserverTableRows from '../table-body-rows'
import './index.less'

const TableBorders = () => {
  const { store, prefixCls } = useContext(Context)
  const { columns } = store
  const columnsWidth = store.getColumnsWidth
  const barList = store.getBarList
  if (barList.length === 0) return null

  const prefixClsTableBody = `${prefixCls}-table-body`
  return (
    <div role='none' className={`${prefixClsTableBody}-border_row`}>
      {columns.map((column, index) => (
        <div
          key={column.name}
          className={`${prefixClsTableBody}-cell`}
          style={{
            width: columnsWidth[index],
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            textAlign: column.align ? column.align : 'left',
            ...column.style,
          }}
        />
      ))}
    </div>
  )
}
const ObserverTableBorders = observer(TableBorders)

const TableBody: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const [barList, setBarList] = useState(store.getBarList)
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.persist()
      store.handleMouseMove(event)
    },
    [store]
  )
  const handleMouseLeave = useCallback(() => {
    store.handleMouseLeave()
  }, [store])
  const prefixClsTableBody = `${prefixCls}-table-body`

  useEffect(() => {
    setBarList(store.getBarList)
  }, [store.getBarList])

  return (
    <div
      className={prefixClsTableBody}
      style={{
        width: store.tableWidth,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ObserverTableBorders />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
        <ObserverTableRows barList={barList}/>
      </div>
    </div>
  )
}
export default observer(TableBody)
