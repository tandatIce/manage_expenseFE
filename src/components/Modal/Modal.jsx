import React from 'react';
import cx from 'classnames';
import { IoMdClose } from 'react-icons/io';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '../Button';

const Modal = ({
    title,
    isOpen,
    onClose = () => {},
    onConfirm = () => {},
    confirmText = 'Áp dụng',
    children,
    className,
    btnConfirmClassName,
    btnConfirmDisable = false,
}) => {
    if (!isOpen) return <></>;

    return (
        <div
            className={cx(
                'inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 px-4',
                'fixed left-0 top-0 h-screen w-screen',
            )}
        >
            <div
                className={cx(
                    'min-w-[300px] max-w-full translate-y-[-5%] rounded-lg bg-white p-4 shadow-lg',
                    'flex flex-col justify-between',
                    { [className]: className },
                )}
            >
                <h2
                    className={cx(
                        'mb-2 pb-2 text-xl font-semibold uppercase',
                        'border-color-border border-b border-solid',
                        'flex justify-between',
                    )}
                >
                    <div> {title}</div>
                    {/* Đóng */}
                    <Tippy content="Đóng">
                        <div
                            className={cx(
                                'cursor-pointer rounded-full bg-[#f2f4f5] p-[4px] opacity-90',
                                'text-[#ccc]',
                                'hover:text-color-white hover:bg-primary',
                            )}
                            onClick={onClose}
                        >
                            <IoMdClose size={24} />
                        </div>
                    </Tippy>
                </h2>
                <div className={cx('flex-1')}>{children}</div>

                <div className="mt-4 flex justify-end gap-4">
                    <Button className="" onClick={onClose} type="button" bgColor="red">
                        Hủy
                    </Button>
                    <Button
                        // className="rounded bg-primary px-4 py-2 text-white"
                        onClick={() => {
                            onConfirm();
                            onClose(); // Đóng modal sau khi xác nhận
                        }}
                        type="button"
                        className={cx({ [btnConfirmClassName]: btnConfirmClassName })}
                        disabled={btnConfirmDisable}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
