import React from 'react';
import { Select } from 'antd';
import './select.css';
const SelectInput = (props) => {
    const { Option } = Select;
    return (
        <div className='sel_parent'>
             {props.suffixicon&&<div className='pos_prefix'>{props.suffixicon}</div>}
            <Select
                // className={`${data.error && "selectbrdred brdnone"} ${props.mode !== "multiple" && "selectAdjustHeight"} selectbox`}
                showSearch
                value={props.value ? props.value : props.placeholder}
                // suffixIcon={<img src={SelectionIcon} className="SelectInput_svg" />}
                placeholder={props.placeholder}
                optionFilterProp="label"
                // filterOption={(input, option) =>
                //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                onChange={(value) => props.changeData && props.changeData(value)}>
                {props.dropdown && props.dropdown.length > 0 ? props.dropdown.map((item, index) => {
                    return (<Option key={index} disabled={item.disable} value={item.name}>{item.name}</Option>)

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