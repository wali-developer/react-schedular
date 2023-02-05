import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toaster = ({ message }) =>
{
    return (
        <div>
            <ToastContainer position="top-center" autoClose={ 10000 } />
        </div>
    );
}

export default Toaster;
