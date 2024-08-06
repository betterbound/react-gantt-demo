import React, { useContext } from 'react'
import type {
  DraggableSyntheticListeners } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import Context from '../../context'
import type { Gantt } from '../../types'
import ObserverTableRows from '../table-body-rows'
import type GanttStore from '../../store'
import RowToggler from './RowToggler'

interface ExpandIconProps {
  bar: Gantt.Bar
  onExpand?: (record: Gantt.Record, collapsed: boolean) => void
  store: GanttStore
  expandIcon?: (props: { level: number; collapsed: boolean; onClick: (event: React.MouseEvent<HTMLDivElement>) => void }) => React.ReactNode
  prefixCls: string
  tableIndent: number
}
interface DraggableBlockItemProps {
  bar: Gantt.Bar
  isLastChild: boolean
  isActive?: boolean
  listeners?: DraggableSyntheticListeners
  transform?: { x: number; y: number }
  transition?: string
  setActivatorNodeRef?: (element: HTMLElement | null) => void
}

const ExpandIcon = observer(({ bar, onExpand, store, expandIcon, prefixCls, tableIndent }: ExpandIconProps) => {
  const handleClick = (event) => {
    event.stopPropagation()
    if (onExpand) onExpand(bar.task.record, !bar._collapsed)
    store.setRowCollapse(bar.task, !bar._collapsed)
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: tableIndent * bar._depth + 15,
        background: 'white',
        zIndex: 9,
        transform: 'translateX(-52%)',
        padding: 1,
      }}
    >
      {expandIcon ? (
        expandIcon({
          level: bar._depth,
          collapsed: bar._collapsed,
          onClick: handleClick,
        })
      ) : (
        <RowToggler
          prefixCls={prefixCls}
          level={bar._depth}
          collapsed={bar._collapsed}
          onClick={handleClick}
        />
      )}
    </div>
  )
})


const DraggableBlockItem = ({ bar, isLastChild, isActive, listeners, transform, transition, setActivatorNodeRef }: DraggableBlockItemProps) => {
  const { store, onRow, tableIndent, expandIcon, prefixCls, onExpand } = useContext(Context)
  const prefixClsTableBody = `${prefixCls}-table-body`
  const { columns, rowHeight } = store
  const columnsWidth = store.getColumnsWidth

  const style = {
    opacity: isActive ? 0.5 : 1,
    boxShadow: isActive ? '0 4px 8px rgba(0, 0, 0, 0.1)' : undefined,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  }

  if(!bar?.record) return null

  return (
    <div
      ref={setActivatorNodeRef}
      style={style}
    >
      <div
        role='none'
        className={classNames(`${prefixClsTableBody}-row`, bar.record.className)}
        onClick={() => {
          onRow?.onClick(bar.record)
        }}
      >
        <button type='button' {...listeners}
          style={{ 
            cursor: isActive ? 'grabbing' : 'grab',
            pointerEvents: 'auto',
            touchAction: 'none'
          }}> D </button>
        {columns.map((column, index) => (
          <div
            key={column.name}
            className={`${prefixClsTableBody}-cell`}
            style={{
              width: columnsWidth[index],
              height: rowHeight,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              textAlign: column.align ? column.align : 'left',
              paddingLeft: index === 0 && tableIndent * (bar._depth + 1) + 10,
              ...column.style,
            }}
          >
            {index === 0 &&
          // eslint-disable-next-line unicorn/no-new-array
          new Array(bar._depth).fill(0).map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={classNames(`${prefixClsTableBody}-row-indentation`, {
                [`${prefixClsTableBody}-row-indentation-hidden`]: isLastChild && i === bar._depth - 2,
                [`${prefixClsTableBody}-row-indentation-both`]: i === bar._depth - 1,
              })}
              style={{
                top: -(rowHeight / 2) + 1,
                left: tableIndent * i + 15,
                width: tableIndent * 1.5 + 5,
              }}
            />
          ))}
            {index === 0 && bar._childrenCount > 0 && (
              <ExpandIcon
                bar={bar}
                onExpand={onExpand}
                store={store}
                expandIcon={expandIcon}
                prefixCls={prefixCls}
                tableIndent={tableIndent}
              />
            )}
            <span className={`${prefixClsTableBody}-ellipsis`}>
              {column.render ? column.render(bar.record) : bar.record[column.name]}
            </span>
          </div>
        ))}
      </div>
      {/*
        MEMO: ガントチャート側は _collapsed: true の時はデータから削除しているが（デフォルトの仕様）、タイトル側は _collapsed の値で表示・非表示のコントロールしてデータ自体は存在させる。
        Drag & Drop でソートしたデータで上書きする時、_collapsed: true でデータが存在しない状態で上書きすると、childrenのデータがない状態で上書きされてしまうため。
       */}
      {!bar._collapsed && bar.children && bar.children.length > 0 && (
        <ObserverTableRows barList={bar.children}/>
      )}
    </div>
  )
}

export default React.memo(DraggableBlockItem)