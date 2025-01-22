import { api } from '@/config';
import { post, get } from '@/utils/httpRequest';

export const logInService = async (bodyRequest) => {
    const body = {
        username: bodyRequest?.username,
        password: bodyRequest?.password,
    };
    const res = await post(`${api.auth.LOG_IN}`, body);
    return res;
};

export const signupService = async (bodyRequest) => {
    const body = {
        username: bodyRequest?.username,
        password: bodyRequest?.password,
        fullName: bodyRequest?.fullName,
        email: bodyRequest?.email,
    };
    const res = await post(`${api.auth.SIGN_UP}`, body);
    return res;
};

export const searchUserService = async (token, keyword) => {
    const res = await get(`${api.auth.SEARCH}?Keyword=${keyword}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};
