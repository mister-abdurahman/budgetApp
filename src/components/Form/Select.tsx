interface ISelectProps extends Partial<React.SelectHTMLAttributes<HTMLSelectElement>> {
    label: string,
    options: any[]
    optionSetter?: (data: any) => string,
    valueSetter?: (data: any) => string,
}

import { Field, useField } from 'formik'
import React from 'react'
import { MdWarning } from 'react-icons/md'

function Select(props: ISelectProps) {
    const { label, options, optionSetter, valueSetter, ...restProps } = props
    const [meta] = useField(restProps.name || "")


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
            {meta.touched && meta.error ? (<label className="label">
                {/* <span className="label-text-alt"></span> */}
                <span className="text-xs leading-3 text-rose-700 flex gap-2 items-center">{meta.error}<MdWarning /></span>
            </label>) : ""}
        </div>
    )
}

export default Select