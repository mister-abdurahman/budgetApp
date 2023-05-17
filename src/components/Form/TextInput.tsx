import { Field } from 'formik';

export interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    valueSetter?: () => void
}

function TextInput(props: ITextInputProps) {
    const { label } = props;

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

export default TextInput