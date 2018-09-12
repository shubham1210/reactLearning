import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = ({checked, onChange, value,key}) => {
    return (
        <Checkbox type="checkbox"  checked={checked} onChange={onChange} value={value} />
    )
}

export default CustomCheckbox;  