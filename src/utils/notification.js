import { notification } from 'antd';

notification.config({ duration: 3 });

export const notifySuccess = (message, desc) => {
    notification.success({
        message: message,
        description: desc,
    });
};

export const notifyError = (message, desc) => {
    notification.error({
        message: message,
        description: desc,
    });
};

export const notifyWarning = (message, desc) => {
    notification.warning({
        message: message,
        description: desc,
    });
};
