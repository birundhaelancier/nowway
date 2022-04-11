import React from 'react';
import { Select } from 'antd';
import './select.css';
const SelectInput = (props) => {
    const { Option } = Select;
    return (
        <div className='sel_parent'>
             {props.suffixicon&&<div className='pos_prefix'>{props.suffixicon}</div>}
            <Select
                value={props.value ? props.value : props.placeholder}
                placeholder={props.place}
                optionFilterProp="label"
                onChange={(value) => props.changeData && props.changeData(value)}>
                {props.dropdown && props.dropdown.length > 0 ? props.dropdown.map((item, index) => {
                    return (<Option key={index} disabled={item.disable} value={item.name} className="option">{item.name}</Option>)

                })
                    : null
                }


            </Select>{
                <div className="Errormsg">
                    <div>{props.error && props.errmsg}</div>
                </div>
            }
        </div>
    )
}

export default SelectInput;