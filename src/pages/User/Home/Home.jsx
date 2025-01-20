import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import cx from 'classnames';

import Button from '@/components/Button';
import LoadingCustom from '@/components/loadingCustom';
import { getGroupAllService } from '@/services/GroupService';
import GroupCard from './GroupCard';
import ModalAddGroup from './ModalAddGroup';

const Home = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalAddGroup, setIsModalAddGroup] = useState(false);

    const [cookies] = useCookies(['token']);

    const handleGetGroupAll = async () => {
        const token = cookies.token;
        setLoading(true);
        const res = await getGroupAllService(token);
        setLoading(false);
        //console.log('res', res);
        if (!res) {
            console.log('lỗi server');
            return;
        }
        setGroups(res);
    };

    useEffect(() => {
        handleGetGroupAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('mt-6')}>
            <Button onClick={() => setIsModalAddGroup(true)}>Tạo nhóm</Button>
            <ul className={cx('mt-4 flex flex-wrap gap-4')}>
                {groups.map((value, index) => (
                    <GroupCard group={value} key={index} handleGetGroupAll={handleGetGroupAll} />
                ))}
            </ul>
            <ModalAddGroup
                isModalAddGroup={isModalAddGroup}
                setIsModalAddGroup={setIsModalAddGroup}
                handleGetGroupAll={handleGetGroupAll}
                setLoading={setLoading}
            />
            {loading && <LoadingCustom />}
        </div>
    );
};

export default Home;
