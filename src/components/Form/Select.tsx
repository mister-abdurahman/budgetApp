interface ISelectProps extends Partial<React.SelectHTMLAttributes<HTMLSelectElement>> {
    label: string,
    options: any[]
    optionSetter?: (data: any) => string,
    valueSetter?: (data: any) => string,
}

import { Field } from 'formik'
import React from 'react'

function Select(props: ISelectProps) {
    const { label, options, optionSetter, valueSetter, ...restProps } = props
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
                {/* <span className="label-text-alt"></span> */}
            </label>
            <Field as={'select'} {...restProps} className={`select capitalize w-full select-bordered ${props.className}`} >
                <option defaultValue={0}>select {label.toLowerCase()}</option>
                {options.map((option, index) => {
                    return <option key={index} value={valueSetter ? valueSetter(option) : option.id}>{optionSetter && optionSetter(option)}</option>
                })}
            </Field>
            {/* <label className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt"></span>
            </label> */}
        </div>
    )
}

export default Select