import { Field } from 'formik';
import React from 'react';
import { BiAt } from 'react-icons/bi';

export interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    valueSetter?: () => void
    type?: string;
    icon?: JSX.Element;
}

function TextInput(props: ITextInputProps) {
    const { label, type } = props;

    switch (type) {
        case "HyperUI":
            return <HUITextInput {...props} />
        case "TextIconInput":
            return <TextIconInput {...props} />
        default:
            return (
                <div className="w-full form-control">
                    <label className="label">
                        <span className="label-text">{label}</span>
                        {/* <span className="label-text-alt"></span> */}
                    </label>
                    <Field {...props} className="w-full input input-bordered" />
                    {/* <label className="label">
                        <span className="label-text-alt"></span>
                        <span className="label-text-alt"></span>
                    </label> */}
                </div>
            )
    }
}

export const HUITextInput = (props: ITextInputProps) => {
    const { label, icon, placeholder } = props;

    return (
        <div className="relative">
            <label htmlFor="UserEmail" className="sr-only"> {label} </label>

            <input
                {...props}
                type="email"
                id="UserEmail"
                placeholder={placeholder}
                className="w-full border-gray-200 rounded-md shadow-sm pe-10 sm:text-sm"
            />

            <span
                className="absolute inset-y-0 grid w-10 text-gray-500 pointer-events-none end-0 place-content-center"
            >
                <div className="w-4 h-4">
                    {icon && React.cloneElement(icon, { className: "h-4 w-4" })}
                </div>
            </span>
        </div>
    )
}

export const TextIconInput = (props: ITextInputProps) => {
    const { label, icon, placeholder } = props;

    return (
        <div>
            <label htmlFor="username" className="sr-only">{label}</label>

            <div className="relative">
                <input
                    type="username"
                    className="w-full p-2 text-sm border-gray-200 rounded-sm shadow-sm pe-12"
                    placeholder={placeholder}
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                    {icon && icon}
                </span>
            </div>
        </div>
    )
}


export default TextInput