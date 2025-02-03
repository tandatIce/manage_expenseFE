import React, { useEffect, useState, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, FormProvider } from 'react-hook-form';
import cx from 'classnames';

import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingCustom from '@/components/loadingCustom';
import { getSummaryDebtService, payDebtService, getTransactionService } from '@/services/DebtService';
import { notifyError, notifySuccess } from '@/utils/notification';
import { formatNumberWithDots } from '@/utils/common';

const ManageDebt = ({ group }) => {
    const [debtSummary, setDebtSummary] = useState([]);
    const [historyTransaction, setHistoryTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const methods = useForm();

    const { handleSubmit, reset, watch, setValue } = methods;

    const listUserConvert = useMemo(() => {
        return group.partipants.map((value) => ({ name: value.username, code: value.id }));
    }, [group]);

    const handleGetSummaryDebt = async () => {
        setLoading(true);
        const res = await getSummaryDebtService(group.id, token);
        if (!res) {
            notifyError('Lấy dữ liệu tóm tắt nợ thất bại');
            return;
        }
        setLoading(false);
        setDebtSummary(res);
    };

    const handleGetTransactionsHisory = async () => {
        const bodyRequest = {
            GroupId: group.id,
            StartDate: watch('startDate'),
            EndDate: watch('endDate'),
        };
        setLoading(true);
        const res = await getTransactionService(bodyRequest, token);
        setLoading(false);
        if (!res) {
            notifyError('Lấy dữ liệu lịch sử gia dịch thất bại');
            return;
        }
        setHistoryTransaction(res);
    };

    const onSubmit = async (data) => {
        // console.log('data:', data);
        const bodyRequest = {
            transactionId: 0,
            paidBy: data.paidBy,
            paidTo: data.paidTo,
            groupId: group.id,
            amountPaid: data.amount.replaceAll('.', ''),
        };

        setLoading(true);
        const res = await payDebtService(bodyRequest, token);
        setLoading(false);
        if (!res) {
            notifyError('Thanh toán nợ thất bại');
            return;
        }
        notifySuccess('Thanh toán nợ thành công');
        reset({
            amount: '',
            paidBy: '',
            paidTo: '',
        });
        await handleGetSummaryDebt();
    };

    const onSubmit2 = async (data) => {
        handleGetTransactionsHisory();
    };

    const onError = (errors) => {
        console.log('Có lỗi:', errors);
    };
    useEffect(() => {
        handleGetSummaryDebt();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const now = new Date();
        const formattedCurrentDate = now.toISOString().split('T')[0];
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 2).toISOString().split('T')[0];
        setValue('startDate', firstDay);
        setValue('endDate', formattedCurrentDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {/* Tổng kết nợ */}
            <div className={cx('mt-6')}>
                <h1 className={cx('mb-2 text-xl font-medium')}>Tổng kết nợ</h1>
                <div className={cx('mt-2', 'flex flex-wrap gap-x-4 gap-y-2')}>
                    {debtSummary.map((value, index) => (
                        <div key={index} className={cx('flex items-end gap-1')}>
                            <span>
                                {value.userName}
                                {': '}
                            </span>
                            <span
                                className={cx(
                                    'text-xl font-medium',
                                    value.debtAmount > 0 ? 'text-red-500' : 'text-green-500',
                                )}
                            >
                                {value.debtAmount > 0 && '-'}
                                {formatNumberWithDots(value.debtAmount)}đ
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Thanh toán nợ */}
            <div className={cx('mt-6')}>
                <h1 className={cx('mb-2 text-xl font-medium')}>Thanh toán nợ </h1>
                <div className={cx('mt-2 flex w-[400px] flex-col gap-2', 'max-sm:w-full')}>
                    <FormProvider {...methods}>
                        <Input label="Số tiền" name="amount" typeCustom="number" />
                        <Input label="Người trả" name="paidBy" typeCustom="DropDown" listOptions={listUserConvert} />
                        <Input label="Người nhận" name="paidTo" typeCustom="DropDown" listOptions={listUserConvert} />
                        <div className={cx('flex justify-end gap-4')}>
                            <Button onClick={handleSubmit(onSubmit, onError)}>Hoàn thành</Button>
                        </div>
                    </FormProvider>
                </div>
            </div>
            {/* lịch sử giao dịch */}
            <div className={cx('mt-6')}>
                <h1 className={cx('mb-2 text-xl font-medium')}>Lịch sử giao dịch</h1>
                <div className={cx('mt-2 flex w-[400px] flex-wrap gap-4', 'max-sm:w-full')}>
                    <FormProvider {...methods}>
                        <Input label="Từ" name="startDate" type="date" />
                        <Input label="Đến" name="endDate" type="date" />
                        <div className={cx('flex w-full justify-end gap-4')}>
                            <Button onClick={handleSubmit(onSubmit2, onError)}>Tìm kiếm</Button>
                        </div>
                    </FormProvider>
                </div>
                {/* bảng chi tiêu */}
                <div className={cx('mb-10 mt-2 w-[400px]', 'max-sm:w-full')}>
                    <div
                        className={cx('flex items-center bg-gray-300 px-3 py-2', 'border border-solid border-gray-300')}
                    >
                        <span className={cx('w-[45px] flex-none pr-1')}>Ngày</span>
                        <span className={cx('w-[100px] flex-none pr-1')}>Giá</span>
                        <span className={cx('flex-1 pr-1')}>Người trả</span>
                        <span className={cx('flex-1')}>Người nhận</span>
                    </div>
                    {historyTransaction.map((value, index) => (
                        <div
                            key={index}
                            className={cx(
                                'flex items-center px-3 py-2',
                                'border border-solid border-gray-300',
                                index % 2 === 0 && 'bg-primary-100',
                            )}
                        >
                            <span className={cx('w-[45px] flex-none pr-1')}>
                                {new Date(value?.created_at).getDate()}
                            </span>
                            <span className={cx('w-[100px] flex-none pr-1 font-medium')}>
                                {formatNumberWithDots(value?.amount)}đ
                            </span>
                            <span className={cx('flex-1 pr-1')}>{value?.payer_by_username}</span>
                            <span className={cx('flex-1')}>{value?.payer_to_username}</span>
                        </div>
                    ))}
                </div>
            </div>
            {loading && <LoadingCustom />}
        </div>
    );
};

export default ManageDebt;
