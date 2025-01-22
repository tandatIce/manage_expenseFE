import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import ManageMemmber from '../ManageMemmber';
import ManageExpense from '../ManageExpense';
import ManageDebt from '../ManageDebt';
import Report from '../Report';
import LoadingCustom from '@/components/loadingCustom';
import { getGroupDetailService } from '@/services/GroupService';
import { ExpenseProvider } from '@/context/ExpenseContext';

const sections = [
    { id: 1, title: 'Quản lý thành viên' },
    { id: 2, title: 'Quản lý chi tiêu' },
    { id: 3, title: 'Thanh toán nợ' },
    { id: 4, title: 'Báo cáo chi tiêu' },
];

const ManageInGroup = () => {
    const [indexPart, setIndexPart] = useState(2);
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState({
        id: 0,
        name: '',
        created_by: 0,
        created_at: '',
        partipants: [],
    });

    const [cookies] = useCookies(['token']);

    const { id } = useParams();

    const handleGetGroupDetail = async () => {
        const token = cookies.token;
        setLoading(true);
        const res = await getGroupDetailService(token, id);
        setLoading(false);
        setGroup(res);
    };

    useEffect(() => {
        handleGetGroupDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ExpenseProvider>
            <div className={cx('flex flex-wrap gap-2 bg-pink-100 p-4')}>
                {sections.map((value, index) => (
                    <div
                        className={cx(
                            'inline-block cursor-pointer rounded-full px-3 py-2 font-medium',
                            'border border-solid border-primary',
                            indexPart === value.id && 'bg-primary text-white',
                        )}
                        key={index}
                        onClick={() => setIndexPart(value.id)}
                    >
                        {value.title}
                    </div>
                ))}
            </div>
            <h1 className={cx('mt-2 inline-block text-2xl font-medium max-sm:mx-4')}>{group.name}</h1>
            <div className={cx('mt-6 max-sm:px-4')}>
                {indexPart === 1 && <ManageMemmber group={group} handleGetGroupDetail={handleGetGroupDetail} />}
                {indexPart === 2 && <ManageExpense group={group} setIndexPart={setIndexPart} />}
                {indexPart === 3 && <ManageDebt group={group} />}
                {indexPart === 4 && <Report group={group} setIndexPart={setIndexPart} />}
            </div>
            {loading && <LoadingCustom />}
        </ExpenseProvider>
    );
};

export default ManageInGroup;
