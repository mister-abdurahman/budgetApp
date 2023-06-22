import { useStore } from "../../data/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import Select from "../../components/Form/Select";
import TextInput from "../../components/Form/TextInput";
import { IBudget } from "../../data/stores/budgetStore";
import * as Yup from "yup";
import { Expenses } from "../Expenses/Expenses";

function BudgetEdit({
  handleModal,
  title,
  isDetail,
}: {
  handleModal: (state: boolean) => void;
  title?: string;
  isDetail?: boolean;
}) {
  const {
    budgetStore: { budget, create_budget },
  } = useStore();

  const navigation = useNavigate();

  const validation = () => {
    const create = {
      description: Yup.string().required("This field is required"),
      amount: Yup.number().required("This field is required"),
      date: Yup.date().required("This field is required"),
    };

    const update = {
      description: Yup.string().required("This field is required"),
      amount: Yup.number().required("This field is required"),
      date: Yup.date().required("This field is required"),
    };

    return budget.id === 0 ? update : create;
  };

  const validationScheme = Yup.object(validation());

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
          console.log(values);
          create_budget(values).then(() => navigation(0));
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
            {title || (budget.id !== 0 ? "Update Budget" : "Create Budget")}
          </h1>
          <TextInput
            type="text"
            label="Description"
            id="description"
            name="description"
            disabled={budget.id !== 0}
          />
          {budget.id === 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput
                type="number"
                label="Amount"
                id="amount"
                name="amount"
              />
              <TextInput type="date" label="Date" id="date" name="date" />
            </div>
          )}
          <div className="modal-action">
            <button type="submit" className="btn btn-neutral">
              Save
            </button>
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

export default observer(BudgetEdit);
