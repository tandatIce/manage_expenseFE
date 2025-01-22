import { api } from '@/config';
import { post, put, get, deleteHttp } from '@/utils/httpRequest';

export const getExpenseService = async (params, token) => {
    const res = await get(`${api.expense.GET_EXPENSE}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params,
    });
    return res;
};

export const getOverview = async (params, token) => {
    const res = await get(`${api.expense.GET_OVERVIEW}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params,
    });
    return res;
};

export const addExpenseService = async (bodyRequest, token) => {
    const res = await post(`${api.expense.ADD_EXPENSE}`, bodyRequest, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const updateExpenseService = async (bodyRequest, token) => {
    const res = await put(`${api.expense.UPDATE_EXPENSE}`, bodyRequest, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const deleteExpenseService = async (id, token) => {
    const res = await deleteHttp(`${api.expense.DELETE_EXPENSE}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};
