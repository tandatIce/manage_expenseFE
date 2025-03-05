import React, { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import cx from 'classnames';

import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingCustom from '@/components/loadingCustom';
import { addExpenseService, updateExpenseService, deleteExpenseService } from '@/services/ExpenseService';
import { notifyError, notifySuccess } from '@/utils/notification';
import { useExpenseContext } from '@/context/ExpenseContext';
import { formatNumberWithDots } from '@/utils/common';

const ManageExpense = ({ group, setIndexPart }) => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const methods = useForm();

    const { handleSubmit, setValue, reset } = methods;

    const [cookies] = useCookies(['token']);

    const { setIsEdit, expense, isEdit } = useExpenseContext();

    const listUserConvert = useMemo(() => {
        return group.partipants.map((value) => ({ name: value.username, code: value.id }));
    }, [group]);

    const onSubmit = async (data) => {
        // console.log('data:', data);

        const token = cookies.token;
        const bodyRequest = {
            id: expense.id ?? 0,
            groupId: group.id,
            amount: data.amount.replaceAll('.', ''),
            description: data.desc,
            payerId: Number(data.payer),
            participants: data.participants.map((value) => Number(value)),
            date: data.date,
        };

        setLoading(true);
        const res = isEditing
            ? await updateExpenseService(bodyRequest, token)
            : await addExpenseService(bodyRequest, token);
        setLoading(false);
        const messeage = isEditing ? 'Cập nhật' : 'Thêm';
        setIsEditing(false);
        if (!res) {
            notifyError(messeage + ' chi tiêu thất bại');
            return;
        }
        notifySuccess(messeage + ' chi tiêu thành công');
        reset({
            amount: '',
            desc: '',
            payer: '',
            participants: [],
            date: new Date().toISOString().split('T')[0],
        });
    };

    const onError = (errors) => {
        console.log('Có lỗi:', errors);
    };

    const handleDeleteExpense = async () => {
        const token = cookies.token;
        setLoading(true);
        const res = await deleteExpenseService(expense.id ?? 0, token);
        setLoading(false);
        setIsEditing(false);
        if (!res) {
            notifyError('Xóa chi tiêu thất bại');
            return;
        }
        notifySuccess('Xóa chi tiêu thành công');
        setIndexPart(4);
    };

    useEffect(() => {
        if (isEdit) {
            setIsEdit(false);
            setIsEditing(true);
            setValue('date', expense.created_at.split('T')[0]);
            setValue('amount', formatNumberWithDots(expense.amount));
            setValue('desc', expense.description);
            setValue('payer', expense.payer_id);
            setValue(
                'participants',
                expense.participants.map((value) => String(value.id)),
            );
        } else {
            setValue('date', new Date().toISOString().split('T')[0]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {/* thêm chi tiêu */}
            <div className={cx('mt-6')}>
                <h1 className={cx('mb-2 text-xl font-medium')}>Thêm chi tiêu</h1>
                <div className={cx('mt-2 flex w-[400px] flex-col gap-2', 'max-sm:w-full')}>
                    <FormProvider {...methods}>
                        <Input label="Số tiền" name="amount" typeCustom="number" />
                        <Input label="Mô tả" name="desc" />
                        <Input label="Ngày" name="date" type="date" />
                        <Input label="Người trả" name="payer" typeCustom="DropDown" listOptions={listUserConvert} top />
                        <Input
                            label="Người tham gia"
                            name="participants"
                            typeCustom="CheckBox"
                            listOptions={listUserConvert}
                            top
                        />
                        <div className={cx('flex justify-end gap-4')}>
                            {isEditing && (
                                <Button onClick={handleDeleteExpense} bgColor={'red'}>
                                    Xóa
                                </Button>
                            )}
                            <Button onClick={handleSubmit(onSubmit, onError)}>Hoàn thành</Button>
                        </div>
                    </FormProvider>
                </div>
            </div>

            {loading && <LoadingCustom />}
        </div>
    );
};

export default ManageExpense;
