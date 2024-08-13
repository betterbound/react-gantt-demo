import React from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Gantt } from '../../types';
interface DraggableBlockItemProps {
    bar: Gantt.Bar;
    isLastChild: boolean;
    isActive?: boolean;
    listeners?: DraggableSyntheticListeners;
    transform?: {
        x: number;
        y: number;
    };
    transition?: string;
    setActivatorNodeRef?: (element: HTMLElement | null) => void;
}
declare const _default: React.MemoExoticComponent<({ bar, isLastChild, isActive, listeners, transform, transition, setActivatorNodeRef }: DraggableBlockItemProps) => JSX.Element>;
export default _default;
