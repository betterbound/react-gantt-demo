import React from 'react'
import type { Gantt } from '../../types'
import DraggableBlock from './DraggableBlock'
import DraggableBlockItem from './DraggableBlockItem'

interface TableRow {
  bar: Gantt.Bar
  isLastChild: boolean
  isActive?: boolean
}

const ObserverTableRow = ({ bar, isLastChild, isActive = false }: TableRow) => {
  return (
    <DraggableBlock
      id={bar.record.id}
    >
      <DraggableBlockItem bar={bar} isLastChild={isLastChild} isActive={isActive} />
    </DraggableBlock>
  )

}

export default React.memo(ObserverTableRow)