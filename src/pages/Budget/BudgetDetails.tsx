import { useStore } from "../../data/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import TextInput from "../../components/Form/TextInput";
import { IBudget } from "../../data/stores/budgetStore";
import * as Yup from "yup";
import List, { ListRow } from "../../components/List/List";
import { FaCoins, FaMoneyBill } from "react-icons/fa";
import { MdAdd, MdDelete, MdSavings } from "react-icons/md";
import { IIncome } from "../../data/stores/IncomeStore";
import Button from "../../components/Button";
import { IExpense } from "../../data/stores/expenseStore";
import { ISavings } from "../../data/stores/savingsStore";

function BudgetEdit({
  handleModal,
  title,
}: {
  handleModal: (state: boolean) => void;
  title?: string;
  isDetail?: boolean;
}) {
  const {
    budgetStore: {
      budget,
      create_budget,
      incomes,
      income,
      add_income,
      set_income,
      remove_income,
      expenses,
      expense,
      add_expense,
      set_expense,
      remove_expense,
      savings,
      saving,
      add_saving,
      set_saving,
      remove_saving,
      budget_calculation,
      saving_calculation,
      available_fund_calculation,
    },
  } = useStore();

  const navigation = useNavigate();

  const handleIncome = (new_income: IIncome) => {
    if (new_income.amount === 0 || new_income.description === null) return;

    add_income(new_income);
    set_income({ id: 0, description: "", amount: 0, date: "" });
  };

  const handleExpense = (new_expense: IExpense) => {
    if (new_expense.amount === 0 || new_expense.description === null) return;

    add_expense(new_expense);
    set_expense({ id: 0, description: "", amount: 0, date: "" });
  };

  const handleSaving = (new_saving?: ISavings) => {
    if (new_saving?.amount === 0 || new_saving?.description === null) return;

    add_saving(new_saving);
    set_saving({ id: 0, description: "", amount: 0, date: "" });
  };

  const validation = () => {
    const create = {
      description: Yup.string().required("This field is required"),
      date: Yup.date().required("This field is required"),
    };

    const update = {
      description: Yup.string().required("This field is required"),
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
        <Form method="dialog" className="space-y-5 modal-box">
          <div>
            <label
              htmlFor="modal"
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              onClick={() => handleModal(false)}
            >
              ✕
            </label>
            <h1 className="mb-4 text-xl font-bold">
              {title || (budget.id !== 0 ? "Update Budget" : "Create Budget")}
            </h1>
          </div>

          <div>
            <TextInput
              type="text"
              label="Budget Description"
              id="description"
              name="description"
            />
            {budget.id !== 0 && (
              <TextInput
                type="text"
                label="Date"
                id="date"
                name="date"
                disabled
              />
            )}
            {budget.id == 0 && (
              <TextInput type="date" label="Date" id="date" name="date" />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="flex items-center gap-3 mb-2 text-lg font-bold">
                <FaMoneyBill size={20} className="text-neutral" /> Income
              </h1>
              <List>
                {incomes.map((x, index) => (
                  <ListRow key={index} className="font-semibold">
                    <FaMoneyBill size={20} className="text-neutral" />
                    <div className="grow">
                      <h1>{x.description}</h1>
                    </div>
                    <h1>&#8358;{x.amount}</h1>
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => remove_income(index)}
                    />
                  </ListRow>
                ))}
                <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-3">
                  <div className="w-full form-control">
                    <input
                      type="text"
                      value={income.description}
                      onChange={(e) =>
                        set_income({ ...income, description: e.target.value })
                      }
                      className="w-full input input-bordered"
                      placeholder="Income Description"
                    />
                  </div>
                  <div className="w-full form-control">
                    <input
                      type="number"
                      value={income.amount}
                      onChange={(e) =>
                        set_income({
                          ...income,
                          amount: parseInt(e.target.value),
                        })
                      }
                      className="w-full input input-bordered"
                      placeholder="Enter Amount"
                    />
                  </div>
                  <Button
                    type="button"
                    className="self-end h-12"
                    onClick={() => handleIncome(income)}
                    icon={<MdAdd />}
                  >
                    Add
                  </Button>
                </div>
              </List>
            </div>

            <div>
              <h1 className="flex items-center gap-3 mb-2 text-lg font-bold">
                <FaCoins size={20} className="text-neutral" /> Expenses
              </h1>
              <List>
                {expenses.map((x, index) => (
                  <ListRow key={index} className="font-semibold">
                    <FaCoins size={20} className="text-neutral" />
                    <div className="grow">
                      <h1>{x.description}</h1>
                    </div>
                    <h1>&#8358;{x.amount}</h1>
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => remove_expense(index)}
                    />
                  </ListRow>
                ))}
                <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-3">
                  <div className="w-full form-control">
                    <input
                      type="text"
                      value={expense.description}
                      onChange={(e) =>
                        set_expense({ ...expense, description: e.target.value })
                      }
                      className="w-full input input-bordered"
                      placeholder="Expense Description"
                    />
                  </div>
                  <div className="w-full form-control">
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) =>
                        set_expense({
                          ...expense,
                          amount: parseInt(e.target.value),
                        })
                      }
                      className="w-full input input-bordered"
                      placeholder="Enter Amount"
                    />
                  </div>
                  <Button
                    type="button"
                    className="self-end h-12"
                    onClick={() => handleExpense(expense)}
                    icon={<MdAdd />}
                  >
                    Add
                  </Button>
                </div>
              </List>
            </div>

            <div>
              <h1 className="flex items-center gap-3 mb-2 text-lg font-bold">
                <MdSavings size={20} className="text-neutral" /> Savings
              </h1>
              <List>
                {savings.map((x, index) => (
                  <ListRow key={index} className="font-semibold">
                    <MdSavings size={20} className="text-neutral" />
                    <div className="grow">
                      <h1>{x.description}</h1>
                    </div>
                    <h1>&#8358;{x.amount}</h1>
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => remove_saving(index)}
                    />
                  </ListRow>
                ))}
                <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-3">
                  <div className="w-full form-control">
                    <input
                      type="text"
                      value={saving.description}
                      onChange={(e) =>
                        set_saving({ ...saving, description: e.target.value })
                      }
                      className="w-full input input-bordered"
                      placeholder="Saving Description"
                    />
                  </div>
                  <div className="w-full form-control">
                    <input
                      type="number"
                      value={saving.amount}
                      onChange={(e) => {
                        console.log(e.target.value);
                        set_saving({
                          ...saving,
                          amount: parseInt(e.target.value),
                        });
                      }}
                      className="w-full input input-bordered"
                      placeholder="Enter Amount"
                    />
                  </div>
                  <Button
                    type="button"
                    className="self-end h-12"
                    onClick={() => handleSaving(saving)}
                    icon={<MdAdd />}
                  >
                    Add
                  </Button>
                </div>
              </List>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-5">
            <h1 className="text-xl font-bold mt-">
              Available Funds: &#8358;{available_fund_calculation()}
            </h1>
            <h1 className="text-xl font-bold mt-">
              Saving: &#8358;{saving_calculation()}
            </h1>
            <h1 className="text-xl font-bold mt-">
              Budget: &#8358;{budget_calculation()}
            </h1>
          </div>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
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
