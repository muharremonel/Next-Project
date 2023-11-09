import React, {ChangeEvent} from 'react';
import Image from 'next/image';
import {Button} from '../index';

type TextAreaProps = {
    value: string;
    onTextAreaChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: 'textarea' | 'time' | 'select' | 'date' | 'password';
    icon?: any;
    iconOnClick?: any;
    svgIcon?: any;
    title?: string;
    placeholder?: string;
    preview?: boolean;
    iconPosition?: 'end' | 'start';
    disabled?: boolean;
    dropdownList?: string[];
    width?: string
    button?: boolean,
    buttonOnClick?: Function
    noBorder?: boolean
    rounded?: string
    name?: string
    minH?: string
    height?: string
    customStyle?: React.CSSProperties;
};

const Input = ({
                   name,
                   value,
                   onTextAreaChange,
                   onInputChange,
                   type,
                   icon,
                   svgIcon: SvgIcon,
                   iconOnClick,
                   title,
                   placeholder,
                   preview,
                   iconPosition = 'end',
                   disabled = false,
                   dropdownList,
                   width = '100%',
                   button,
                   buttonOnClick,
                   noBorder,
                   rounded,
                   minH,
                   height,
               }: TextAreaProps) => {
    const inputClassName = `p-2 min-h-[${minH ? minH : 50}px] text-black rounded-${rounded ? rounded : 'full'} ${preview ? 'border-none' : `${noBorder ? 'border-none' : 'border-2 border-inputBorder'} `
    }`;

    const inputStyle = {
        width,
        height
    }

    const textareaStyle: React.CSSProperties = {
        resize: 'none',
        width
    };

    const containerClassName = 'flex relative h-full w-full gap-4';

    const iconPositionMap = {
        end: 'right-2',
        start: 'left-2',
    };

    const renderInput = () => {
        if (type === 'textarea') {
            return (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onTextAreaChange}
                    style={textareaStyle}
                    className={`${inputClassName} ${preview ? 'input-disabled' : ''}`}
                    disabled={preview || disabled}
                />
            );
        } else if (type === 'time') {
            return (
                <input
                    name={name}
                    type='time'
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                    className={inputClassName}
                    style={inputStyle}
                    disabled={preview || disabled}
                />
            );
        } else if (type === 'password') {
            return (
                <input
                    name={name}
                    type='password'
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                    className={inputClassName}
                    style={inputStyle}
                    disabled={preview || disabled}
                />
            );
        } else if (type === 'date') {
            return (
                <input
                    name={name}
                    type='date'
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                    className={inputClassName}
                    style={inputStyle}
                    disabled={preview || disabled}
                />
            );
        } else if (type === 'select') {
            return (
                <select
                name={name}
                value={value}
                onChange={onInputChange as any}
                className={inputClassName}
                style={inputStyle}
                disabled={preview || disabled}
            >
                {(dropdownList)?.map((item: string, index: number) => {
                    return (
                        <option key={`${item}${index}`} value={item}>
                            {item}
                        </option>
                    )
                })}
            </select>
            );

        } else {
            return (
                <input
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onInputChange}
                    className={`
            ${inputClassName} ${preview ? 'input-disabled' : ''} 
            ${iconPosition === 'start' && 'pl-8'} 
            ${iconPosition === 'end' && 'pr-8'}
            `}
                    style={inputStyle}
                    disabled={preview || disabled}
                />
            );
        }
    };

    return (
        <div>
            {title && <p className='pb-1'>{title}</p>}
            <div className={containerClassName}>
                {renderInput()}
                {button && <div className='h-full flex'>
                    <Button
                        type='secondary'
                        onClick={buttonOnClick}
                        text='Ekle'
                    />
                </div>}
                {icon && (
                    <Image
                        height={50}
                        width={50}
                        src={icon}
                        onClick={iconOnClick}
                        alt=''
                        className={`absolute ${iconPositionMap[iconPosition]} top-1/2 -translate-y-1/2 cursor-pointer z-[1]`}
                    />
                )}
                {SvgIcon && (
                    <SvgIcon
                        onClick={iconOnClick}
                        className={`absolute ${iconPositionMap[iconPosition]} top-1/2 -translate-y-1/2 cursor-pointer z-[1]`}
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
