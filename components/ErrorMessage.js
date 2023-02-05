import React from 'react'

const ErrorMessage = ({ message }) => {
    return (
        <div>
            <h1 className='text-red-500 text-xs ml-4 mt-1'>{message}</h1>
        </div>
    )
}

export default ErrorMessage