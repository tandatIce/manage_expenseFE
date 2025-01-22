import { api } from '@/config';
import { post, get } from '@/utils/httpRequest';

export const getSummaryDebtService = async (groupId, token) => {
    const res = await get(`${api.debt.GET_SUMMARY_DEBT}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { groupId: groupId },
    });
    return res;
};

export const payDebtService = async (bodyRequest, token) => {
    const res = await post(`${api.debt.PAY_DEBT}`, bodyRequest, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

export const getTransactionService = async (params, token) => {
    const res = await get(`${api.debt.GET_TRANSACTION}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: params,
    });
    return res;
};
