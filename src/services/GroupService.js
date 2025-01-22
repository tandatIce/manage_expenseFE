import { api } from '@/config';
import { post, put, get, deleteHttp } from '@/utils/httpRequest';

export const getGroupAllService = async (token) => {
    const res = await get(`${api.group.GET_GROUP_ALL}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const getGroupDetailService = async (token, id) => {
    const res = await get(`${api.group.GET_GROUP_DETAIL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const addGroupService = async (bodyRequest, token) => {
    const body = {
        groupName: bodyRequest?.groupName,
    };
    const res = await post(`${api.group.ADD_GROUP}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const updateGroupService = async (id, bodyRequest, token) => {
    const body = {
        groupName: bodyRequest?.groupName,
    };
    const res = await put(`${api.group.UPDATE_GROUP}/${id}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const deleteGroupService = async (id, token) => {
    const res = await deleteHttp(`${api.group.DELETE_GROUP}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const addMemberToGroupService = async (bodyRequest, token) => {
    const body = {
        groupId: bodyRequest?.groupId,
        userId: bodyRequest?.userId,
    };
    const res = await post(`${api.group.ADD_MEMBER_TO_GROUP}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const removeMemberToGroupService = async (data, token) => {
    const res = await deleteHttp(`${api.group.REMOVE_MEMBER_FROM_GROUP}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: data,
    });
    return res;
};
