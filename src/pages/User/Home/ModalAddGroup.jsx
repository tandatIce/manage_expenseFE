import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { notifySuccess, notifyError } from '@/utils/notification';
import { addGroupService } from '@/services/GroupService';

const ModalAddGroup = ({ isModalAddGroup, setIsModalAddGroup, handleGetGroupAll, setLoading }) => {
    const methods = useForm({});

    const [cookies] = useCookies(['token']);

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        console.log('data:', data);
        const token = cookies.token;
        const bodyRequest = {
            groupName: data?.groupName,
        };
        setLoading(true);
        const res = await addGroupService(bodyRequest, token);
        setLoading(false);
        if (!res) {
            notifyError('Thêm nhóm thất bại');
            return;
        }
        notifySuccess('Thêm nhóm thành công');
        await handleGetGroupAll();
    };

    const onError = (errors) => {
        console.log('Có lỗi:', errors);
    };

    return (
        <FormProvider {...methods}>
            <Modal
                isOpen={isModalAddGroup}
                onClose={() => setIsModalAddGroup(false)}
                title={'Thêm nhóm'}
                onConfirm={handleSubmit(onSubmit, onError)}
            >
                <Input label="Tên nhóm" name="groupName" />
            </Modal>
        </FormProvider>
    );
};

export default ModalAddGroup;
