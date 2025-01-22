export const formatNumberWithDots = (num) => {
    if (num === '' || num === null || num === undefined) {
        return '';
    } else {
        const numStr = typeof num === 'number' ? num.toString() : num;

        // Bước 1: Bỏ hết ký tự không phải là chữ
        const cleanedString = numStr.replace(/[^0-9]/g, '');

        // Bước 2: Định dạng chuỗi với dấu phẩy
        const formattedString = cleanedString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return formattedString;
    }
};
