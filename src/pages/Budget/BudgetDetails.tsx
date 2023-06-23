import { useStore } from "../../data/stores/store"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import Select from "../../components/Form/Select";
import TextInput from "../../components/Form/TextInput";
import { IBudget } from "../../data/stores/budgetStore";
import * as Yup from 'yup'
import List, { ListRow } from "../../components/List/List";
import { FaCoins, FaMoneyBill } from "react-icons/fa";
import { MdAdd, MdSavings } from "react-icons/md";
import { useState } from "react";
import { IIncome } from "../../data/stores/IncomeStore";
import { ISavings } from "../../data/stores/SavingsStore";
import { IExpense } from "../../data/stores/ExpenseStore";
import Button from "../../components/Button";


function BudgetEdit({ handleModal, title, isDetail }: { handleModal: (state: boolean) => void, title?: string, isDetail?: boolean }) {
  const {
    budgetStore: { budget, create_budget, incomes, expenses, savings, add_income, income, expense, saving, set_income },
  } = useStore()

  const navigation = useNavigate();

  const handleIncome = (new_income?: IIncome) => {
    if (new_income?.amount === 0 || new_income?.description === null) return;

    add_income(new_income);
    set_income({ id: 0, description: "", amount: 0, date: "", })
    console.log(income);

  }

  const handleExpenses = () => {
    expenses.push(expense);
  }

  // useEffect(() => {
  //   console.log(id);

  //   id && get_budget_by_user_id(id);
  // }, [get_budget_by_user_id, id])

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

    return budget.id === 0 ? update : create
  }

  const validationScheme = Yup.object(validation())

  return (
    <>
      <Formik
        validationSchema={validationScheme}
        enableReinitialize
        initialValues={budget}
        onSubmit={(
          values: IBudget,
          { setSubmitting }: FormikHelpers<IBudget>
        ) => {
          create_budget(values).then(() => navigation(0));
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form method="dialog" className="modal-box"
        >
          <label htmlFor="modal" className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2" onClick={() => handleModal(false)}>✕</label>
          <h1 className="mb-4 text-xl font-bold">{title || (budget.id !== 0 ? "Update Budget" : "Create Budget")}</h1>
          <div className="space-y-4">
            <div>
              <h1 className="flex items-center gap-3 mb-2 text-lg font-bold"><FaMoneyBill size={20} className='text-neutral' /> Income</h1>
              <List >
                <List >
                  {incomes.map((x, index) => (
                    <ListRow key={index} className="font-semibold">
                      <FaCoins size={20} className='text-neutral' />
                      <div className="grow">
                        <h1>{x.description}</h1>
                      </div>
                      <h1>{x.amount}</h1>
                    </ListRow>
                  ))}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="w-full form-control">
                      <input
                        onChange={(e) => { console.log(e.target.value); set_income({ ...income, description: e.target.value }) }}
                        type="text"
                        className="w-full input input-bordered"
                        placeholder="Enter Income"
                      />
                    </div>
                    <div className="w-full form-control">
                      <input
                        type="number"
                        onChange={(e) => { console.log(e.target.value); set_income({ ...income, amount: e.target.value }) }}
                        className="w-full input input-bordered"
                        placeholder="Enter Amount"
                      />
                    </div>


                    <Button type="button" className="self-end h-12" onClick={() => handleIncome(income)} icon={<MdAdd />}>Add</Button>
                  </div>
                </List>
              </List>
            </div>

            <div>
              <h1 className="flex items-center gap-3 mb-2 text-lg font-bold"><FaCoins size={20} className='text-neutral' /> Expenses</h1>
              <List >
                {expenses.map((x, index) => (
                  <ListRow key={index} className="font-semibold">
                    <FaCoins size={20} className='text-neutral' />
                    <div className="grow">
                      <h1>{x.description}</h1>
                    </div>
                    <h1>{x.amount}</h1>
                  </ListRow>
                ))}
                <Formik
                  enableReinitialize
                  initialValues={income}
                  onSubmit={(
                    values: IIncome,
                    { setSubmitting }: FormikHelpers<IIncome>
                  ) => {
                    handleIncome(values);
                    console.log(values);
                    setSubmitting(false);
                  }}
                >
                  <Form method="dialog"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <TextInput type='text' id='description' name='description' />
                      <TextInput type='number' id='amount' name='amount' />
                      <Button type="submit" className="self-end h-12" icon={<MdAdd />}>Add</Button>
                    </div>
                  </Form>
                </Formik>
              </List>
            </div>

            <div>
              <h1 className="flex items-center gap-3 mb-2 text-lg font-bold"><MdSavings size={20} className='text-neutral' /> Savings</h1>
              <List >
                {expenses.map(x => (
                  <ListRow className="font-semibold">
                    <FaCoins size={20} className='text-neutral' />
                    <div className="grow">
                      <h1>{x.description}</h1>
                    </div>
                    <h1>{x.amount}</h1>
                  </ListRow>
                ))}
              </List>
            </div>

            <h1 className="text-3xl font-semibold mt-">Total Expenses: 3000</h1>
          </div>



          <TextInput type='text' label='Username' id='username' name='username' disabled={budget.id !== 0} />
          <TextInput type='email' label='Email Addresss' id='email' name='email' disabled={budget.id !== 0} />
          <TextInput type='text' label='Phone Number' id='phoneNumber' name='phoneNumber' />
          {budget.id === 0 && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput type='password' label='Password' id='password' name='password' />
            <TextInput type='password' label='Confirm Password' id='confirmPassword' name='confirmPassword' />
          </div>}
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

export default observer(BudgetEdit)