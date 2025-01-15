'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import cx from 'classnames';

const CustomInput = ({ name, placeholder = '', required, label, disabled = false, className, inputClassName }) => {
    const {
        register,
        trigger,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message;

    const handleValidate = () => {
        trigger(name);
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
                    <input
                        autoComplete={name}
                        id={name}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        {...register(name, { onChange: handleValidate })}
                        className={cx(
                            'border-primary-200 block w-full rounded-md border border-solid',
                            'focus:border-primary-500 px-3 py-2 placeholder-gray-400 shadow-sm',
                            'sm:text-sm',
                            error && '!border-red-500',
                            { [inputClassName]: inputClassName },
                        )}
                    />
                </div>
                {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default CustomInput;
