'use client';

import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Button from '../Button';

const cx = classNames;

function DropDown({ listOptions = [], search = false, name, className, btnClassName, top, placeholder = '' }) {
    const [valueInput, setValueInput] = useState(placeholder);
    const [valueSearch, setValueSearch] = useState('');
    const [listOptionVisible, setListOptionVisible] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const { watch, setValue, register, trigger } = useFormContext();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = async (item) => {
        const code = listOptions.filter((value) => value?.name === item)[0].code;
        setValue(name, String(code));
        setValueInput(item);
        setIsOpen(false);
        setValueSearch('');
        await trigger(name);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false); // Đóng component khi click ra ngoài
            setValueSearch('');
        }
    };

    useEffect(() => {
        const newListOption = listOptions.map((value) => value.name);

        setListOptionVisible(newListOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueSearch]);

    const handleCancel = () => {
        setValueInput(placeholder);

        setValue(name, '');
        setValueSearch('');

        setIsOpen(false);
    };

    const handleChangeWhenWatchNameChange = () => {
        // console.log(name, watch(name));
        const filter = listOptions.filter((value) => String(value?.code) === String(watch(name)));
        let valueVisible = '';
        if (filter.length === 1) {
            valueVisible = filter[0]?.name;
        }
        if (watch(name)) setValueInput(valueVisible);
        else setValueInput(placeholder);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue(name, '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const listOptionName = listOptions.map((value) => value.name);
        setListOptionVisible(listOptionName);
        if (watch(name) !== '') {
            //console.log(name, watch(name), listOptions);
            handleChangeWhenWatchNameChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listOptions]);

    useEffect(() => {
        handleChangeWhenWatchNameChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch(name)]);

    return (
        <>
            <input {...register(name)} className={cx('hidden')} />
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
                        { [btnClassName]: btnClassName },
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
                    <ul className="py-1">
                        <div className={cx('max-h-[300px] overflow-auto')}>
                            {listOptionVisible.map((value, index) => (
                                <li
                                    className="cursor-pointer text-ellipsis text-nowrap px-3 py-2 hover:bg-primary-200"
                                    key={index}
                                    onClick={() => handleChange(value)}
                                >
                                    {value}
                                </li>
                            ))}
                        </div>
                    </ul>
                    {valueInput !== placeholder && (
                        <Button className={cx('float-right my-1 mr-2')} onClick={handleCancel}>
                            Bỏ chọn
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default DropDown;
