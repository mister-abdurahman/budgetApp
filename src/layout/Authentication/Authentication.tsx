import { observer } from 'mobx-react-lite';
import React, { useState } from "react"
import { Form, Formik, FormikHelpers, useFormik } from 'formik'
import { useStore } from "../../stores/store"
import { ISignIn, IUser } from '../../stores/authStore';
import { HiUserCircle } from 'react-icons/hi';
import { MdPassword } from 'react-icons/md';
import { Logo } from '../Home/Home';
import Select from '../../components/Form/Select';
import TextInput from '../../components/Form/TextInput';

function Authentication({ children }: { children: JSX.Element[] | JSX.Element }) {
    const { authStore } = useStore()
    const { cookie } = authStore

    const [signUp, setSignUp] = useState(false);

    return (
        <>
            {cookie !== null || signUp ? <SignUp handleSetSignUp={setSignUp} /> : <SignIn handleSetSignUp={setSignUp} />}
            {cookie === null || children}
        </>
    )
}

export default Authentication


export const SignIn = observer(({ handleSetSignUp }: { handleSetSignUp: (isSignUp: boolean) => void }) => {
    const { authStore } = useStore()
    const { handleUserSignIn } = authStore

    const [signIn, setSignIn] = useState<ISignIn>({
        username: "",
        password: ""
    })

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(signIn);

        handleUserSignIn(signIn).then(user => {
            console.log("handleUserSignIn");
            if (user) window.location.reload();
        });

        setSignIn({
            username: "",
            password: ""
        })
    }

    return (
        <>
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto">
                    <Logo className='mx-auto' />


                    <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
                        Welcome to the convenant university <span className='font-bold'>school record management system</span>
                    </p>
                    <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
                        <span>username: blessco</span>
                        <br /> 
                        <span>password: password</span>
                    </p>

                    <form
                        onSubmit={handleSignIn}
                        className="p-4 mt-6 mb-0 space-y-4 rounded-lg shadow-lg sm:p-6 lg:p-8"
                    >
                        <p className="text-lg font-medium text-center">Sign in to your account</p>

                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>

                            <div className="relative">
                                <input
                                    onChange={(e) => setSignIn({ ...signIn, username: e.target.value })}
                                    type="username"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                                    placeholder="Enter username"
                                />

                                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                                    <HiUserCircle />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
                                    type="password"
                                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                                    placeholder="Enter password"
                                />

                                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                                    <MdPassword />
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block"
                        >
                            Sign in
                        </button>

                        <p className="text-sm text-center text-gray-500">
                            No account?
                            <a className="underline" onClick={() => handleSetSignUp(true)}
                            >Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
})

export const SignUp = observer(({ handleSetSignUp }: { handleSetSignUp: (isSignUp: boolean) => void }) => {
    const {
        collegeStore: { collegeArrays },
        department: { departmentArrays },
        program: { programArrays },
        // authStore: { handleUserSignUp }
    } = useStore()

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            imageUrl: "",
            registrationNumber: "",
            matriculationNumber: "",
            collegeId: 0,
            college: "",
            departmentId: 0,
            department: "",
            programId: 0,
            program: "",
            username: "",
            password: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto">
                    <Logo className='mx-auto' />


                    <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
                        Welcome to the convenant university <span className='font-bold'>school record management system</span>
                    </p>

                    {/* <form
                        onSubmit={formik.handleSubmit}
                        className="p-4 mt-6 mb-0 space-y-4 rounded-lg shadow-lg sm:p-6 lg:p-8"
                    >

                    </form> */}

                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            imageUrl: "",
                            registrationNumber: "",
                            matriculationNumber: "",
                            collegeId: 0,
                            college: "",
                            departmentId: 0,
                            department: "",
                            programId: 0,
                            program: "",
                            username: "",
                            password: ""
                        }}
                        onSubmit={(
                            values: IUser,
                            { setSubmitting }: FormikHelpers<IUser>
                        ) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 500);
                        }}
                    >
                        <Form className="p-4 mt-6 mb-0 space-y-4 rounded-lg shadow-lg sm:p-6 lg:p-8"
                        >
                            <p className="text-lg font-medium text-center">Sign up to your account</p>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput type='text' label='First Name' id='firstName' name='firstName' />
                                <TextInput type='text' label='Last Name' id='lastName' name='lastName' />
                            </div>
                            <TextInput label='Username' id='username' name='username' />
                            <TextInput label='Registration Number' id='registrationNumber' name='registrationNumber' />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <TextInput type='password' label='Password' id='password' name='password' />
                                <TextInput type='password' label='Confirm Password' id='confirmPassword' name='confirmPassword' />
                            </div>

                            <Select
                                id='collegeId'
                                name='collegeId'
                                options={collegeArrays} optionSetter={(data) => data.name}
                                valueSetter={(data) => data.id}
                                label="College"
                            />
                            <Select
                                id='departmentId'
                                name='departmentId'
                                options={departmentArrays}
                                optionSetter={(data) => data.name}
                                valueSetter={(data) => data.id}
                                label="Department"
                            />
                            <Select
                                id='programId'
                                name='programId'
                                value={formik.values.programId}
                                options={programArrays}
                                optionSetter={(data) => data.name}
                                valueSetter={(data) => data.id}
                                label="Program"
                            />

                            <button
                                type="submit"
                                className="btn btn-block"
                            >
                                Sign up
                            </button>

                            <p className="text-sm text-center text-gray-500">
                                No account?
                                <a className="underline" onClick={() => handleSetSignUp(false)}
                                >Sign in</a>
                            </p>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
})
