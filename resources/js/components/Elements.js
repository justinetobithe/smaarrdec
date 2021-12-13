import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { Modal as M, Button } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const notify = (message, type = "info") => {
    toast(message, {
        autoClose: 3000,
        closeButton: true,
        type: type,
        position: "bottom-right",
        pauseOnHover: false,
        pauseOnFocusLoss: false
    });
};

export const LoadingOverlay = ({ loading }) => {
    if (!loading) return null;
    return (
        <div id="preloader"></div>
    );
};

// export const LoadingOverlay = ({ loading }) => {
//     if (!loading) return null;
//     return (
//         <div className="preloader">
//             <ClipLoader
//                 loading={loading}
//                 size={80}
//                 css={{
//                     borderWidth: 5, 
//                 }}
//                 color="rgba(100, 199, 255, 1)"
//             />
//         </div>
//     );
// };

export const Modal = ({
    children,
    heading,
    footer,
    isShown,
    onHide,
    animation,
    ...rest
}) => {
    return (
        <M
            centered
            show={isShown}
            onHide={onHide}
            backdrop="static"
            keyboard={true}
            animation={true}
            centered
            {...rest}
        >
            <M.Header>
                <M.Title>{heading}</M.Title>
            </M.Header>
            <M.Body>{children}</M.Body>
            {footer ? <M.Footer>{footer}</M.Footer> : null}
        </M>
    )
};