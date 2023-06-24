function BudgetInsight({
    handleModal,
  }: {
    handleModal: (state: boolean) => void;
  }) {
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