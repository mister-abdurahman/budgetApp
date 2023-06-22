import { useStore } from "../../data/stores/store"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import TextInput from "../../components/Form/TextInput";
import * as Yup from 'yup'
import { IUser } from "../../data/stores/userStore";


function UserEdit({ handleModal, title }: { handleModal: (state: boolean) => void; title?: string }) {
  const {
    userStore: { user, create_admin_user },
  } = useStore()

  const navigation = useNavigate();

  const validation = () => {
    const create = {
      userName: Yup.string().required('first name is required'),
      password: Yup.string().required('first name is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
      firstName: Yup.string().required('first name is required'),
      lastName: Yup.string().required('lastname is required'),
      email: Yup.string().email("use a valid email").required('The email is required'),
      phoneNumber: Yup.string().required('phone number is required'),
    }

    const update = {
      username: Yup.string().required('first name is required'),
      firstName: Yup.string().required('first name is required'),
      lastName: Yup.string().required('lastname is required'),
      email: Yup.string().email("use a valid email").required('The email is required'),
      phoneNumber: Yup.string().required('phone number is required'),
    }

    return user?.id !== "" ? update : create
  }

  const validationScheme = Yup.object(validation())

  return (
    <>
      <Formik
        validationSchema={validationScheme}
        enableReinitialize
        initialValues={user}
        onSubmit={(
          values: IUser,
          { setSubmitting }: FormikHelpers<IUser>
        ) => {
          create_admin_user(values).then(() => navigation(0));
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form method="dialog" className="modal-box"
        >
          <label htmlFor="modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleModal(false)}>✕</label>
          {<h1 className="text-xl font-bold mb-4">{title || (user?.id !== "" ? "Update User" : "Create User")}</h1>}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput type='text' label='First Name' id='firstName' name='firstName' disabled />
            <TextInput type='text' label='Last Name' id='lastName' name='lastName' disabled />
          </div>
          <TextInput type='text' label='User Name' id='userName' name='userName' disabled />
          <TextInput type='email' label='Email Addresss' id='email' name='email' disabled />
          <TextInput type='text' label='Phone Number' id='phoneNumber' name='phoneNumber' disabled />
          {user?.id === "" && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput type='password' label='Password' id='password' name='password' disabled />
            <TextInput type='password' label='Confirm Password' id='confirmPassword' name='confirmPassword' disabled />
          </div>}


          {/* <div className="modal-action">
            <button type="submit" className="btn btn-neutral">Save</button>
            <button type="button" className="btn" onClick={() => handleModal(false)}>Close</button>
          </div> */}
        </Form>
      </Formik>
    </>
  )
}

export default observer(UserEdit)