import { useStore } from "../../data/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import Select from "../../components/Form/Select";
import TextInput from "../../components/Form/TextInput";
import { IBudget } from "../../data/stores/budgetStore";
import * as Yup from "yup";
import { Expenses } from "../Expenses/Expenses";
import { useEffect } from "react";

function ExpenseEdit({
  handleModal,
  title,
  isDetail,
}: {
  handleModal: (state: boolean) => void;
  title?: string;
  isDetail?: boolean;
}) {
  const {
    expenseStore: { expense, create_expense },
    budgetStore: { load_budgets, budgetArrays },
  } = useStore();

  // useEffect(() => {
  //   load_budgets();
  // }, [load_budgets]);

  const navigation = useNavigate();

  const validation = () => {
    const create = {
      description: Yup.string().required("This field is required"),
      amount: Yup.number().required("This field is required"),
      date: Yup.date().required("This field is required"),
      budgetId: Yup.string().required("This field is required"),
    };

    const update = {
      description: Yup.string().required("This field is required"),
      amount: Yup.number().required("This field is required"),
      date: Yup.date().required("This field is required"),
      budgetId: Yup.string().required("This field is required"),
    };

    return expense.id === 0 ? update : create;
  };

  const validationScheme = Yup.object(validation());

  return (
    <>
      <Formik
        validationSchema={validationScheme}
        enableReinitialize
        initialValues={expense}
        onSubmit={(
          values: IBudget,
          { setSubmitting }: FormikHelpers<IBudget>
        ) => {
          console.log(values);
          create_expense(values).then(() => navigation(0));
          setSubmitting(false);
        }}
      >
        <Form method="dialog" className="modal-box">
          <label
            htmlFor="modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => handleModal(false)}
          >
            ✕
          </label>
          <h1 className="text-xl font-bold mb-4">
            {title || (expense.id !== 0 ? "Update Income" : "Create Income")}
          </h1>
          <TextInput
            type="text"
            label="Description"
            id="description"
            name="description"
            disabled={expense.id !== 0}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              type="number"
              label="Amount"
              id="amount"
              name="amount"
              disabled={expense.id !== 0}
            />
            <Select
              id="budgetId"
              name="budgetId"
              options={budgetArrays}
              optionSetter={(data) => data.description}
              valueSetter={(data) => data.id}
              label="Budget"
              disabled={expense.id !== 0}
            />
            {expense.id == 0 && (
              <TextInput type="date" label="Date" id="date" name="date" />
            )}
            {expense.id !== 0 && (
              <TextInput
                type="text"
                label="Date"
                id="date"
                name="date"
                disabled
              />
            )}
          </div>

          <div className="modal-action">
            {expense.id == 0 && (
              <button type="submit" className="btn btn-neutral">
                Save
              </button>
            )}
            <button
              type="button"
              className="btn"
              onClick={() => handleModal(false)}
            >
              Close
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default observer(ExpenseEdit);
