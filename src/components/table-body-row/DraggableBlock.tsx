import type { ReactNode } from 'react'
import React, { Children, cloneElement, isValidElement } from 'react'
import {
  useSortable,
} from '@dnd-kit/sortable'

interface DraggableBlock {
  id: string
  children: ReactNode
}

const DraggableBlock = ({ id, children }: DraggableBlock) => {
  const { attributes, listeners, isDragging, transform, transition, setNodeRef, setActivatorNodeRef } = useSortable({
    id,
  })
  const child = Children.only(children)
  const newProps = {
    setActivatorNodeRef,
    listeners,
    isDragging,
    transform,
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className='gantt-table-body-row-wrap'
    >
      {isValidElement(child) && cloneElement(child, { ...newProps })}
    </div>
  )
}

export default React.memo(DraggableBlock)