import MUIModal from '@mui/material/Modal';

interface IModal {
    children?: JSX.Element[] | JSX.Element,
    page: JSX.Element
    isOpen: boolean
}
function Modal({ children, page, isOpen }: IModal) {

    return (
        <>
            {/* The button to open modal */}
            {children}
            <MUIModal
                open={isOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='grid place-items-center z-30'
            >
                {page}
            </MUIModal>
        </>
    )
}

export default Modal