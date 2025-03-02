'use client';

import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Button from '../Button';

const cx = classNames;

function CheckBox({ listOptions = [], name, className, top = false, placeholder = '' }) {
    const [valueInput, setValueInput] = useState(placeholder);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const { trigger, register, setValue, watch } = useFormContext();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = async () => {
        await trigger(name);
        setValue(name, watch(name));

        setIsOpen(false);
    };

    const handelSelectAll = () => {
        const allValue = listOptions.map((value) => String(value?.code));
        setValue(name, allValue);
    };
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            handleChange();
            setIsOpen(false); // Đóng component khi click ra ngoài
        }
    };

    const handleCancel = () => {
        setValueInput(placeholder);
        setValue(name, []);
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue(name, []);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //console.log(name, watch(name));
        if (listOptions.length > 0) {
            const seletedValues = watch(name);
            // console.log('seletedValues', seletedValues);
            // console.log('listOptions', listOptions);
            const valueVisibles = listOptions
                .filter((value) => seletedValues?.includes(String(value?.code)))
                .map((value) => value?.name)
                .join(',');
            //console.log('valueVisibles', valueVisibles);
            if (seletedValues === '') setValueInput(placeholder);
            else setValueInput(valueVisibles);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch(name)]);

    return (
        <>
            <div
                className={cx('relative', {
                    [className]: className,
                })}
                ref={ref}
            >
                <button
                    onClick={toggleDropdown}
                    className={cx(
                        'w-full min-w-[180px] appearance-none bg-white px-3 py-2',
                        'flex items-center justify-between',
                        'rounded-md border border-solid border-primary-200 hover:border-primary',
                        valueInput === placeholder && 'text-color-text-secondnary',
                    )}
                    type="button"
                >
                    <span>{valueInput}</span>
                    <MdOutlineArrowDropDown size={20} />
                </button>
                <div
                    className={cx(
                        'absolute left-0 w-full overflow-hidden rounded transition-all duration-300',
                        'z-20 border border-solid border-primary bg-white shadow-lg',
                        top ? 'bottom-8 origin-bottom' : 'origin-top-left',
                        isOpen ? 'scale-y-100' : 'scale-y-0',
                    )}
                >
                    <div className="max-h-[350px] overflow-auto py-1">
                        {listOptions.map((value, index) => (
                            <label
                                className={cx(
                                    'cursor-pointer text-ellipsis text-nowrap px-3 py-2 hover:bg-primary-200',
                                    'flex items-center gap-2',
                                )}
                                key={index}
                                htmlFor={`${name}-${index}`}
                            >
                                <input
                                    type="checkbox"
                                    id={`${name}-${index}`}
                                    {...register(name)}
                                    value={value?.code}
                                    className="accent-primary-400"
                                />
                                <div>{value?.name}</div>
                            </label>
                        ))}
                    </div>
                    {
                        <div className={cx('mb-2 flex justify-between px-1')}>
                            <div className={cx('flex gap-2')}>
                                <Button onClick={handelSelectAll}>Tất cả</Button>
                                <Button onClick={handleChange}>Áp dụng</Button>
                            </div>
                            {valueInput !== placeholder && <Button onClick={handleCancel}>Bỏ chọn</Button>}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default CheckBox;
