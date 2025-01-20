import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import LoadingCustom from '@/components/loadingCustom';
import { notifySuccess, notifyError } from '@/utils/notification';
import { updateGroupService } from '@/services/GroupService';

const ModalEditGroup = ({ isModal, setIsModal, handleGetGroupAll, groupData }) => {
    const [loading, setLoading] = useState(false);
    const methods = useForm({});

    const [cookies] = useCookies(['token']);

    const { handleSubmit, setValue } = methods;

    const onSubmit = async (data) => {
        console.log('data:', data);
        const token = cookies.token;
        const bodyRequest = {
            groupName: data?.groupName,
        };
        setLoading(true);
        const res = await updateGroupService(groupData.id, bodyRequest, token);
        setLoading(false);
        if (!res) {
            notifyError('cập nhật nhóm thất bại');
            return;
        }
        notifySuccess('cập nhật nhóm thành công');
        await handleGetGroupAll();
    };

    const onError = (errors) => {
        console.log('Có lỗi:', errors);
    };

    useEffect(() => {
        setValue('groupName', groupData.name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FormProvider {...methods}>
            <Modal
                isOpen={isModal}
                onClose={() => setIsModal(false)}
                title={'chỉnh sửa nhóm'}
                onConfirm={handleSubmit(onSubmit, onError)}
            >
                <Input label="Tên nhóm" name="groupName" />
            </Modal>
            {loading && <LoadingCustom />}
        </FormProvider>
    );
};

export default ModalEditGroup;
