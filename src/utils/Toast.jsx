import { toast } from "react-toastify";

export const showToastSuccess = (message) => {
    toast.success(
        <div>
            {message.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>,
        {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }
    );
};


export const showToastWarning = (message) => {
    toast.warning(
        <div>
            {message.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>,
        {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "white",
        }
    );
};


export const showToastError = (message) => {
    toast.error(
        <div>
            {message.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>,
        {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "white",
        }
    );
};