import React from 'react';
import type { Gantt } from '../../types';
interface TableRow {
    bar: Gantt.Bar;
    isLastChild: boolean;
    isActive?: boolean;
}
declare const _default: React.MemoExoticComponent<({ bar, isLastChild, isActive }: TableRow) => JSX.Element>;
export default _default;
