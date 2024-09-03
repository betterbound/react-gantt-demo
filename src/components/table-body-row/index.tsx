import React from 'react'
import type { Gantt } from '../../types'
import DraggableBlock from './DraggableBlock'
import DraggableBlockItem from './DraggableBlockItem'

interface TableRow {
  bar: Gantt.Bar
  isActive?: boolean
}

const ObserverTableRow = ({ bar, isActive = false }: TableRow) => {
  return (
    <DraggableBlock
      id={bar.record.id}
    >
      <DraggableBlockItem bar={bar} isActive={isActive} />
    </DraggableBlock>
  )

}

export default React.memo(ObserverTableRow)