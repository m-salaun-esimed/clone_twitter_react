import React, { Fragment } from 'react'
import { ToastContainer } from "react-toastify";

function ToastContainerUi() {
  return (
    <Fragment>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    </Fragment>
  )
}

export default ToastContainerUi