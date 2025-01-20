const api = {
    auth: {
        LOG_IN: '/Auth/login',
        SIGN_UP: '/Auth/register',
    },
    group: {
        GET_GROUP_ALL: '/Group/getAll',
        ADD_GROUP: '/Group/create',
        UPDATE_GROUP: '/Group/update',
        DELETE_GROUP: '/Group/delete',
        ADD_MEMBER_TO_GROUP: '/Group/create',
        REMOVE_MEMBER_FROM_GROUP: '/Group/create',
    },
};

export default api;
