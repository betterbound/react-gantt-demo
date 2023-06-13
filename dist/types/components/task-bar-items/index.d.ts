import React from 'react';
import type { Gantt } from '../../types';
import './index.less';
interface TaskBarProps {
    data: Gantt.Bar;
    index: number;
    barItem: {
        id: string;
        icon: JSX.Element;
        startDate: string;
        endDate: string;
    };
}
declare const _default: React.FunctionComponent<TaskBarProps>;
export default _default;
