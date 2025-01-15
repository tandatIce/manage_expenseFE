import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_BE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest
        .get(path, options)
        .then((res) => res.data)
        .catch((err) => {
            console.log('err', err?.response?.data);
            return null;
        });
    return response;
};

export const post = async (path, data = {}, options = {}) => {
    const response = await httpRequest
        .post(path, data, options)
        .then((res) => res.data)
        .catch((err) => {
            console.log('err', err?.response?.data);
            return null;
        });
    return response;
};

export const put = async (path, data = {}, options = {}) => {
    const response = await httpRequest
        .put(path, data, options)
        .then((res) => res.data)
        .catch((err) => {
            console.log('err', err.response);
            return null;
        });
    return response;
};

export const deleteHttp = async (path, options = {}) => {
    const response = await httpRequest
        .delete(path, options)
        .then((res) => res.data)
        .catch((err) => {
            console.log('err', err.response);
            return null;
        });
    return response;
};

export default httpRequest;
