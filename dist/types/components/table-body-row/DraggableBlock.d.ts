import type { ReactNode } from 'react';
import React from 'react';
interface DraggableBlock {
    id: string;
    children: ReactNode;
}
declare const DraggableBlock: ({ id, children }: DraggableBlock) => JSX.Element;
declare const _default: React.MemoExoticComponent<({ id, children }: DraggableBlock) => JSX.Element>;
export default _default;
