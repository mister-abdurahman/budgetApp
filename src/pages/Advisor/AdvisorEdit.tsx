import { useEffect } from "react"
import { useStore } from "../../data/stores/store"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import Select from "../../components/Form/Select";
import TextInput from "../../components/Form/TextInput";
import { IAdvisor } from "../../data/stores/advisorStore";
import * as Yup from 'yup'


function AdvisorEdit({ handleModal }: { handleModal: (state: boolean) => void }) {
  const {
    collegeStore: { collegeArrays },
    departmentStore: { departmentArrays },
    programStore: { programArrays },
    levelStore: { levelArrays },
    advisorStore: { advisor, create_advisor_user },
  } = useStore()

  const navigation = useNavigate();

  // useEffect(() => {
  //   console.log(id);

  //   id && get_advisor_by_user_id(id);
  // }, [get_advisor_by_user_id, id])

  const validation = () => {
    const create = {
      username: Yup.string().required('first name is required'),
      password: Yup.string().required('first name is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
      firstName: Yup.string().required('first name is required'),
      lastName: Yup.string().required('lastname is required'),
      email: Yup.string().email("use a valid email").required('The email is required'),
      phoneNumber: Yup.string().required('phone number is required'),
      collegeCode: Yup.string().required('college is required'),
      departmentCode: Yup.string().required('department is required'),
      programCode: Yup.string().required('program is required'),
      levelCode: Yup.string().required('level is required'),
    }

    const update = {
      username: Yup.string().required('first name is required'),
      firstName: Yup.string().required('first name is required'),
      lastName: Yup.string().required('lastname is required'),
      email: Yup.string().email("use a valid email").required('The email is required'),
      phoneNumber: Yup.string().required('phone number is required'),
      collegeCode: Yup.string().required('college is required'),
      departmentCode: Yup.string().required('department is required'),
      programCode: Yup.string().required('program is required'),
      levelCode: Yup.string().required('level is required'),
    }

    return advisor.id === 0 ? update : create
  } 

  const validationScheme = Yup.object(validation())

  return (
    <>
      <Formik
        validationSchema={validationScheme}
        enableReinitialize
        initialValues={advisor}
        onSubmit={(
          values: IAdvisor,
          { setSubmitting }: FormikHelpers<IAdvisor>
        ) => {
          create_advisor_user(values).then(() => navigation(0));
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form method="dialog" className="modal-box"
        >
          <label htmlFor="modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleModal(false)}>✕</label>
          <h1 className="text-xl font-bold mb-4">{advisor.id === 0 ? "Update" : "Create"} Advisor</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput type='text' label='First Name' id='firstName' name='firstName' />
            <TextInput type='text' label='Last Name' id='lastName' name='lastName' />
          </div>
          <TextInput type='text' label='Username' id='username' name='username' disabled={advisor.id !== 0} />
          <TextInput type='email' label='Email Addresss' id='email' name='email' disabled={advisor.id !== 0} />
          <TextInput type='text' label='Phone Number' id='phoneNumber' name='phoneNumber' />
          {advisor.id === 0 && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput type='password' label='Password' id='password' name='password' />
            <TextInput type='password' label='Confirm Password' id='confirmPassword' name='confirmPassword' />
          </div>}

          <Select
            id='collegeCode'
            name='collegeCode'
            options={collegeArrays} optionSetter={(data) => data.name}
            valueSetter={(data) => data.code}
            label="College"
          />
          <Select
            id='departmentCode'
            name='departmentCode'
            options={departmentArrays}
            optionSetter={(data) => data.name}
            valueSetter={(data) => data.code}
            label="Department"
          />
          <Select
            id='programCode'
            name='programCode'
            options={programArrays}
            optionSetter={(data) => data.name}
            valueSetter={(data) => data.code}
            label="Program"
          />
          <Select
            id='levelCode'
            name='levelCode'
            options={levelArrays}
            optionSetter={(data) => data.name}
            valueSetter={(data) => data.code}
            label="Level"
          />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className="btn btn-neutral">Save</button>
            <button type="button" className="btn" onClick={() => handleModal(false)}>Close</button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default observer(AdvisorEdit)