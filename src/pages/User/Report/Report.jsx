import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import cx from 'classnames';
import { FaEdit, FaFolderOpen } from 'react-icons/fa';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import LoadingCustom from '@/components/loadingCustom';
import { getExpenseService, getOverview } from '@/services/ExpenseService';
import { notifyError } from '@/utils/notification';
import { formatNumberWithDots } from '@/utils/common';
import { useExpenseContext } from '@/context/ExpenseContext';

const Report = ({ group, setIndexPart }) => {
    const [timeValue, setTimeValue] = useState(new Date().toISOString().slice(0, 7));
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalDetailExpense, setIsModalDetailExpense] = useState(false);
    const [overView, setOverView] = useState({});
    const [expenseSelected, setExpenseSelected] = useState({
        group_id: 0,
        amount: 0,
        description: '',
        payer_username: '',
        created_at: '2025-01-09T00:00:00',
        participants: [],
    });

    const [cookies] = useCookies(['token']);

    const { setIsEdit, setExpense } = useExpenseContext();

    const handleGetExpenses = async () => {
        const token = cookies.token;
        const params = {
            GroupId: group.id,
            Month: new Date(timeValue).getMonth() + 1,
            Year: new Date(timeValue).getFullYear(),
        };
        setLoading(true);
        const res = await getExpenseService(params, token);
        setLoading(false);
        if (!res) {
            notifyError('Lấy dữ liệu chi tiêu thất bại, vui lòng liên hệ Đạt đẹp trai đễ fix lỗi');
            return;
        }
        setExpenses(res);
    };

    const handleGetOverView = async () => {
        const month = new Date(timeValue).getMonth();
        const year = new Date(timeValue).getFullYear();
        const token = cookies.token;
        const params = {
            GroupId: group.id,
            StartDate: new Date(year, month, 1),
            EndDate: new Date(year, month + 1, 0),
        };
        setLoading(true);
        const res = await getOverview(params, token);
        setLoading(false);
        if (!res) {
            notifyError('Lấy dữ liệu tổng kết thất bại, vui lòng liên hệ Đạt đẹp trai đễ fix lỗi');
            return;
        }
        setOverView(res);
    };

    useEffect(() => {
        handleGetExpenses();
        handleGetOverView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className={cx('mt-6')}>
                {/* input tìm kiếm */}
                <h1 className={cx('mb-2 text-sm font-medium')}>Tháng</h1>
                <div className={cx('flex gap-2')}>
                    <input
                        className={cx('rounded border border-solid border-primary-300 px-4 py-2')}
                        value={timeValue}
                        onChange={(e) => setTimeValue(e.target.value)}
                        type="month"
                    />
                    <Button
                        onClick={() => {
                            handleGetExpenses();
                            handleGetOverView();
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </div>
                {/* bảng chi tiêu */}
                <div className={cx('mt-2 w-[400px]', 'max-sm:w-full')}>
                    <div
                        className={cx('flex items-center bg-gray-300 px-3 py-2', 'border border-solid border-gray-300')}
                    >
                        <span className={cx('w-[45px] flex-none pr-1')}>Ngày</span>
                        <span className={cx('w-[90px] flex-none pr-1')}>Giá</span>
                        <span className={cx('flex-1 pr-1')}>Mô tả</span>
                        <span className={cx('flex flex-none gap-4')}>Thao tác</span>
                    </div>
                    {expenses.map((value, index) => (
                        <div
                            key={index}
                            className={cx(
                                'flex items-center px-3 py-2',
                                'border border-solid border-gray-300',
                                index % 2 === 0 && 'bg-primary-100',
                            )}
                        >
                            <span className={cx('w-[45px] flex-none pr-1')}>
                                {new Date(value.created_at).getDate()}
                            </span>
                            <span className={cx('w-[90px] flex-none pr-1 font-medium')}>
                                {formatNumberWithDots(value.amount)}đ
                            </span>
                            <span className={cx('flex-1 truncate pr-1')}>{value.description}</span>
                            <span className={cx('flex flex-none gap-4')}>
                                <div
                                    className={cx('text-yellow-500')}
                                    onClick={() => {
                                        setIsEdit(true);
                                        setExpense(value);
                                        setIndexPart(2);
                                    }}
                                >
                                    <FaEdit />
                                </div>
                                <div
                                    className={cx('text-blue-500')}
                                    onClick={() => {
                                        setExpenseSelected(value);
                                        setIsModalDetailExpense(true);
                                    }}
                                >
                                    <FaFolderOpen />
                                </div>
                            </span>
                        </div>
                    ))}

                    <div className={cx('mt-4')}>
                        Tổng cộng:{' '}
                        <span className={cx('text-xl font-medium text-primary')}>
                            {formatNumberWithDots(overView.totalExpenses)}đ
                        </span>
                    </div>
                </div>
            </div>
            {/* modal xem chi tiết chi tiêu */}
            <Modal
                isOpen={isModalDetailExpense}
                onClose={() => setIsModalDetailExpense(false)}
                btnConfirmClassName={'!hidden'}
                title={'Chi tiết chi tiêu'}
            >
                <div className={cx('mb-2')}>
                    <span className={cx('font-medium')}>Ngày: </span>
                    <span>{new Date(expenseSelected?.created_at).toISOString().split('T')[0]}</span>
                </div>
                <div className={cx('mb-2')}>
                    <span className={cx('font-medium')}>Giá: </span>
                    <span className={cx('text-primary')}>{formatNumberWithDots(expenseSelected.amount)}đ</span>
                </div>
                <div className={cx('mb-2')}>
                    <span className={cx('font-medium')}>Mô tả: </span>
                    <span>{expenseSelected.description}</span>
                </div>
                <div className={cx('mb-2')}>
                    <span className={cx('font-medium')}>Người trả: </span>
                    <span>{expenseSelected.payer_username}</span>
                </div>
                <div className={cx('mb-2')}>
                    <span className={cx('font-medium')}>Người tham gia: </span>
                    <span>{expenseSelected.participants.map((value) => value.username).join(', ')}</span>
                </div>
            </Modal>
            {loading && <LoadingCustom />}
        </div>
    );
};

export default Report;
