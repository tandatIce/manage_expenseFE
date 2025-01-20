import cx from 'classnames';
import React from 'react';

function Button({
    children,
    className,
    medium,
    onClick,
    type = 'button',
    name,
    leftIcon,
    color,
    bgColor,
    disabled = false,
    ...props
}) {
    const LeftIcon = leftIcon;
    return (
        <button
            className={cx(
                '!inline-flex items-center gap-1 rounded-lg px-[11px] py-[5px]',
                'bg-primary hover:bg-primary-400 active:bg-primary-800 text-white',
                'border-primary border border-solid',
                'transition-all duration-300',
                medium && '!rounded-xl !px-[15px] !py-[13px] !text-[16px]',
                {
                    [className]: !!className,
                },
                disabled && 'cursor-not-allowed opacity-60',
                color && 'bg-white hover:!text-white',
                color === 'red' && '!border-red-500 !text-red-500 hover:!bg-red-500 active:!bg-red-800',
                color === 'yellow' && '!border-yellow-500 !text-yellow-500 hover:!bg-yellow-500 active:!bg-yellow-800',
                color === 'green' && '!border-primary !text-primary hover:!bg-primary active:!bg-primary-800',
                bgColor && '!border-transparent',
                bgColor === 'green' && '!bg-primary hover:!bg-primary-400 active:!bg-primary-800',
                bgColor === 'gray' && '!bg-gray-500 hover:!bg-gray-400 active:!bg-gray-800',
                bgColor === 'blue' && '!bg-blue-500 hover:!bg-blue-400 active:!bg-blue-800',
                bgColor === 'orange' && '!bg-orange-500 hover:!bg-orange-400 active:!bg-orange-800',
                bgColor === 'yellow' && '!bg-yellow-500 hover:!bg-yellow-400 active:!bg-yellow-800',
                bgColor === 'red' && '!bg-red-500 hover:!bg-red-400 active:!bg-red-800',
                bgColor === 'purple' && '!bg-purple-500 hover:!bg-purple-400 active:!bg-purple-800',
            )}
            onClick={onClick}
            type={type}
            name={name}
            {...props}
            disabled={disabled}
        >
            {LeftIcon && <LeftIcon />}
            {children}
        </button>
    );
}

export default Button;
