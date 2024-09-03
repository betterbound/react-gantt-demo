import React from 'react';
import type { Gantt } from '../../types';
interface TableRow {
    bar: Gantt.Bar;
    isActive?: boolean;
}
declare const _default: React.MemoExoticComponent<({ bar, isActive }: TableRow) => JSX.Element>;
export default _default;
