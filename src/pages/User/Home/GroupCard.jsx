import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

import ModalEditGroup from './ModalEditGroup';
import Modal from '@/components/Modal';
import LoadingCustom from '@/components/loadingCustom';
import { notifySuccess, notifyError } from '@/utils/notification';
import { deleteGroupService } from '@/services/GroupService';

const GroupCard = ({ group, handleGetGroupAll }) => {
    const [isModalEditGroup, setIsModalEditGroup] = useState(false);
    const [isModalDeleteGroup, setIsModalDeleteGroup] = useState(false);
    const [loading, setLoading] = useState(false);

    const [cookies] = useCookies(['token']);

    const handleDeleteGroup = async () => {
        const token = cookies.token;

        setLoading(true);
        const res = await deleteGroupService(group.id, token);
        setLoading(false);
        if (!res) {
            notifyError('Xóa nhóm thất bại');
            return;
        }
        notifySuccess('Xóa nhóm thành công');
        await handleGetGroupAll();
    };

    return (
        <li className={cx('w-[300px] max-sm:w-full')}>
            <div className={cx('rounded-lg bg-primary-200 p-4')}>
                <div className={cx('mb-4 flex items-center justify-between')}>
                    <Link className={cx('p-1 font-semibold')}>{group.name}</Link>
                    <div className={cx('flex items-center justify-between gap-4')}>
                        <div className={cx('cursor-pointer text-red-500')} onClick={() => setIsModalDeleteGroup(true)}>
                            <FaTrash />
                        </div>
                        <div className={cx('cursor-pointer text-yellow-500')} onClick={() => setIsModalEditGroup(true)}>
                            <FaEdit />
                        </div>
                    </div>
                </div>

                <div className={cx('flex gap-2')}>
                    {group.partipants.map((value, index) => (
                        <span key={index} className={cx('rounded bg-blue-200 px-2 py-1')}>
                            {value.username}
                        </span>
                    ))}
                </div>
            </div>
            <ModalEditGroup
                isModal={isModalEditGroup}
                setIsModal={setIsModalEditGroup}
                handleGetGroupAll={handleGetGroupAll}
                groupData={group}
            />
            <Modal
                isOpen={isModalDeleteGroup}
                onClose={() => setIsModalDeleteGroup(false)}
                onConfirm={handleDeleteGroup}
                title={'Xóa nhóm'}
            >
                <div className={cx('font-medium')}>Bạn chắc chắn muốn xóa nhóm này</div>
            </Modal>

            {loading && <LoadingCustom />}
        </li>
    );
};

export default GroupCard;
