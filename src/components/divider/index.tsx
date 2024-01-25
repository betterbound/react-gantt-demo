import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import useDragResize from '../../hooks/useDragResize'
import Context from '../../context'
import './index.less'

const Divider: React.FC = () => {
  const { store, tableCollapseAble,tableSize, prefixCls } = useContext(Context)
  const prefixClsDivider = `${prefixCls}-divider`
  const { tableWidth } = store

  // MEMO: 一旦コメントアウトで対応
  // const handleClick = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //     event.stopPropagation()
  //     store.toggleCollapse()
  //   },
  //   [store]
  // )
  const left = tableWidth

  const handleResize = useCallback(
    ({ width }: { width: number }) => {
      store.handleResizeTableWidth(width)
    },
    [store]
  )
  const [handleMouseDown, resizing] = useDragResize(handleResize, {
    initSize: {
      width: tableWidth,
    },
    minWidth: tableSize.minWidth,
    maxWidth: tableSize.maxWidth,
  })
  return (
    <div
      role='none'
      className={classNames(prefixClsDivider, {
        [`${prefixClsDivider}_only`]: !tableCollapseAble,
      })}
      style={{ left: left - 1 }}
      onMouseDown={tableWidth === 0 ? undefined : handleMouseDown}
    >
      {resizing && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999,
            cursor: 'col-resize',
          }}
        />
      )}
      <hr />
      {/* MEMO: 一旦コメントアウトで対応 */}
      {/* {tableCollapseAble && (
        <div
          className={`${prefixClsDivider}-icon-wrapper`}
          role='none'
          onMouseDown={e => e.stopPropagation()}
          onClick={handleClick}
        >
          <i
            className={classNames(`${prefixClsDivider}-arrow`, {
              [`${prefixClsDivider}-reverse`]: left <= 0,
            })}
          />
        </div>
      )} */}
    </div>
  )
}
export default observer(Divider)
