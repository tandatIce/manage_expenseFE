import React, { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext({});

export const ExpenseProvider = ({ children }) => {
    const [expense, setExpense] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    return (
        <ExpenseContext.Provider value={{ expense, setExpense, isEdit, setIsEdit }}>{children}</ExpenseContext.Provider>
    );
};

export const useExpenseContext = () => {
    return useContext(ExpenseContext);
};
