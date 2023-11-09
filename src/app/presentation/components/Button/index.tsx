import React from 'react';

type ButtonProps = {
    text: string;
    type: 'primary' | 'secondary' | 'delete' | 'lowOpacityBg' | 'orange' | 'red';
    disabled?: boolean;
    onClick: any;
    padding?: string;
};

const Button = ({text, type, disabled, onClick, padding}: ButtonProps) => {
    const primaryClassName = `border-2 px-4 min-h-[43px] w-full h-full ${padding} rounded-full hover:scale-105 transition ${disabled
        ? 'bg-primary text-white cursor-not-allowed opacity-50'
        : type === 'primary'
            ? 'bg-primary text-white'
            : type === 'secondary'
                ? 'bg-white text-primary border-primary'
                : type === 'delete'
                    ? 'bg-deleteBtnBg text-deleteBtnText border-deleteBtnText'
                    : type === 'lowOpacityBg'
                        ? 'bg-lowOpacityBg text-primary border-none'
                        : type === 'orange' ?
                            'bg-orange text-white border-orange':
                            type === 'red' ? 'bg-red-500 text-white border-red'
                            :''
    }`;


    return (
        <div className='w-full h-full cursor-pointer'>
            <button onClick={onClick} className={primaryClassName} disabled={disabled}>
                {text}
            </button>
        </div>
    );
};


export default Button;
