import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import cx from 'classnames';
import { FaTrash, FaPlus } from 'react-icons/fa';

import Button from '@/components/Button';

import LoadingCustom from '@/components/loadingCustom';
import Modal from '@/components/Modal';
import { searchUserService } from '@/services/AuthService';
import { addMemberToGroupService, removeMemberToGroupService } from '@/services/GroupService';
import { notifyError, notifySuccess } from '@/utils/notification';

const ManageMemmber = ({ group, handleGetGroupDetail }) => {
    const [valueSearch, setValueSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalRemoveMember, setIsModalRemoveMember] = useState(false);
    const [memberSelected, setMemberSelected] = useState(undefined);

    const [cookies] = useCookies(['token', 'infoUser']);

    const handleSearch = async () => {
        const token = cookies.token;
        setLoading(true);
        const res = await searchUserService(token, valueSearch);
        if (res?.length === 0) notifyError('Không tìm thấy người dùng nào');
        setLoading(false);
        setSearchResult(res);
    };

    const handleAddMemmberToGroup = async (memberId) => {
        const token = cookies.token;
        const bodyRequest = {
            groupId: group.id,
            userId: memberId,
        };
        setLoading(true);
        const res = await addMemberToGroupService(bodyRequest, token);
        setLoading(false);
        if (!res) {
            notifyError('Thêm thành viên thất bại');
            return;
        }
        notifySuccess('Thêm thành viên thành công');
        await handleGetGroupDetail();
    };

    const handleRemoveMemmberFromGroup = async () => {
        const token = cookies.token;

        setLoading(true);
        const data = {
            groupId: group.id,
            userId: memberSelected.id,
        };
        const res = await removeMemberToGroupService(data, token);
        setLoading(false);
        if (!res) {
            notifyError('Xóa thành viên thất bại');
            return;
        }
        notifySuccess('Xóa thành viên thành công');
        await handleGetGroupDetail();
    };
    return (
        <div>
            {/* danh sách thành viên */}
            <div className={cx('flex flex-wrap gap-2')}>
                {group.partipants.map((value, index) => (
                    <div
                        key={index}
                        className={cx('flex items-center gap-4 rounded bg-blue-200 px-2 py-1')}
                        onClick={() => {
                            setMemberSelected(value);
                            setIsModalRemoveMember(true);
                        }}
                    >
                        <span>{value.username}</span>
                        <span className={cx('text-red-500', group?.created_by !== cookies.infoUser.id && 'hidden')}>
                            <FaTrash />
                        </span>
                    </div>
                ))}
            </div>
            {/* thêm thành viên */}
            <div className={cx('mt-6')}>
                <h1 className={cx('mb-2 text-xl font-medium')}>Thêm thành viên</h1>
                <div className={cx('flex gap-2')}>
                    <input
                        className={cx('rounded border border-solid border-primary-300 px-4 py-2', 'max-sm:w-[200px]')}
                        value={valueSearch}
                        onChange={(e) => setValueSearch(e.target.value)}
                    />
                    <Button onClick={handleSearch} className={cx('flex-none')}>
                        Tìm kiếm
                    </Button>
                </div>

                <div className={cx('mt-2')}>
                    {searchResult.map((value, index) => (
                        <div
                            key={index}
                            className={cx(
                                'mb-1 flex w-[200px] items-center justify-between gap-4 rounded bg-blue-300 px-2 py-1',
                            )}
                            onClick={() => handleAddMemmberToGroup(value.id)}
                        >
                            <span> {value.username}</span>
                            <FaPlus />
                        </div>
                    ))}
                </div>
            </div>
            {/* modal xóa thành viên khỏi nhóm */}
            <Modal
                isOpen={isModalRemoveMember}
                onClose={() => setIsModalRemoveMember(false)}
                onConfirm={handleRemoveMemmberFromGroup}
                title={'Xóa thành viên khỏi nhóm'}
            >
                <div className={cx('font-medium')}>
                    Bạn chắc chắn muốn xóa thành viên {memberSelected?.username} này khỏi nhóm này
                </div>
            </Modal>
            {loading && <LoadingCustom />}
        </div>
    );
};

export default ManageMemmber;
