import React from 'react';
import { Typography } from '@material-ui/core';

const TooltipTemplate = (pointInfo: any) => {
    return (
        <div>
            <Typography color='textSecondary' align='center'>
                {pointInfo.argument.toLocaleDateString()}
            </Typography>
            <Typography color='textSecondary' align='center'>
                {pointInfo.value.toLocaleString()}
            </Typography>
        </div>
    )
}

export default TooltipTemplate