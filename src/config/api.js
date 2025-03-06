const api = {
    auth: {
        LOG_IN: '/Auth/login',
        SIGN_UP: '/Auth/register',
        SEARCH: '/Auth/search',
    },
    group: {
        GET_GROUP_ALL: '/Group/getAll',
        GET_GROUP_DETAIL: '/Group/getDetail',
        ADD_GROUP: '/Group/create',
        UPDATE_GROUP: '/Group/update',
        DELETE_GROUP: '/Group/delete',
        ADD_MEMBER_TO_GROUP: '/Group/members',
        REMOVE_MEMBER_FROM_GROUP: '/Group/members',
    },
    expense: {
        ADD_EXPENSE: '/Expense',
        GET_EXPENSE: '/Expense',
        UPDATE_EXPENSE: '/Expense',
        DELETE_EXPENSE: '/Expense',
        GET_OVERVIEW: '/Expense/overview-report',
    },
    debt: {
        PAY_DEBT: '/Debt',
        GET_SUMMARY_DEBT: '/Debt/debt-report',
        GET_TRANSACTION: '/Debt/getTransactions',
        GET_MY_DEBT: '/Debt/myDebt',
    },
};

export default api;
