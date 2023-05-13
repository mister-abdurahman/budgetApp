interface IModal{
    children: JSX.Element[] | JSX.Element,
    page: JSX.Element
}
function Modal({ children , page}: IModal) {
    return (
        <>
            {/* The button to open modal */}
            {children}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {page}
                </div>
            </div>
        </>
    )
}

export default Modal