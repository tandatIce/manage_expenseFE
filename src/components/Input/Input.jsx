'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import cx from 'classnames';

import CheckBox from './CheckBox';
import DropDown from './DropDown';
import { formatNumberWithDots } from '@/utils/common';

const CustomInput = ({
    name,
    placeholder = '',
    typeCustom,
    required,
    label,
    disabled = false,
    className,
    inputClassName,
    listOptions = [],
    type = '',
    top = false,
}) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const error = errors[name]?.message;

    const handleValidate = () => {
        if (typeCustom === 'number') {
            const newValue = formatNumberWithDots(watch(name));
            setValue(name, newValue);
        }
    };

    return (
        <div className={cx({ [className]: className })}>
            <div className={cx('flex gap-2')}>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            </div>

            <div className="mt-1">
                <div className={cx('relative')}>
                    {typeCustom !== 'DropDown' && typeCustom !== 'CheckBox' && typeCustom !== 'textarea' && (
                        <input
                            autoComplete={name}
                            id={name}
                            type={type || 'text'}
                            placeholder={placeholder}
                            required={required}
                            disabled={disabled}
                            {...register(name, { onChange: handleValidate })}
                            className={cx(
                                'block w-full rounded-md border border-solid border-primary-200',
                                'px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500',
                                'sm:text-sm',
                                error && '!border-red-500',
                                { [inputClassName]: inputClassName },
                            )}
                        />
                    )}

                    {typeCustom === 'DropDown' && (
                        <DropDown listOptions={listOptions} name={name} placeholder={placeholder} />
                    )}

                    {typeCustom === 'CheckBox' && (
                        <CheckBox listOptions={listOptions} name={name} placeholder={placeholder} top={top} />
                    )}
                </div>
                {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default CustomInput;
