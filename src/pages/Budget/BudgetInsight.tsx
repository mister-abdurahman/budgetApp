import { useEffect, useState } from "react";
import { AppInsight } from "../../data/services/openAI";
import { useStore } from "../../data/stores/store";

function BudgetInsight({
    handleModal,
    data
}: {
    handleModal: (state: boolean) => void;
    data: any;
}) {
    const {
        budgetStore: {
            app_insight,
            insight
        },
      } = useStore();

    useEffect(() => {
        app_insight(data)
    }, [app_insight, data])


    return (
        <form method="dialog" className="modal-box">
            <label
                htmlFor="modal"
                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                onClick={() => handleModal(false)}
            >
                ✕
            </label>
            <h1 className="mb-4 text-xl font-bold">
                Budget Insight
            </h1>
            {insight}
            <div className="modal-action">
                <button
                    type="button"
                    className="btn"
                    onClick={() => handleModal(false)}
                >
                    Close
                </button>
            </div>
        </form>
    )
}

export default BudgetInsight