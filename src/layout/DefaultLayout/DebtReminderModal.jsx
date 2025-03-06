import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Modal from '@/components/Modal';
import LoadingCustom from '@/components/loadingCustom';
import { getMyDebtService } from '@/services/DebtService';

function generateDebtMessage(debtAmount) {
    const messages = [
        `Chào bạn! Tiền tôi không bay đi đâu, nhưng tôi thì có thể bay đến bạn để đòi ${debtAmount}k! 💸✈️`,
        `Món ăn yêu thích của tôi là tiền của bạn, đặc biệt là ${debtAmount}k! 🍔💰`,
        `Tôi không cần siêu anh hùng, chỉ cần bạn trả nợ ${debtAmount}k thôi! 🦸‍♂️💵`,
        `Tiền nợ không phải cái tội, nhưng không trả ${debtAmount}k thì là cái tội đấy! 😜💳`,
        `Ví của tôi đang khóc vì thiếu ${debtAmount}k! 😭👜`,
        `Tôi không phải là người đòi nợ, tôi chỉ đang giúp bạn cải thiện tài chính với ${debtAmount}k! 😂💸`,
        `Nếu bạn không trả ${debtAmount}k, tôi sẽ phải tổ chức một buổi tiệc cho ví của mình! 🎉💔`,
        `Tiền nợ của bạn giống như món ăn thừa; càng để lâu, càng không ngon - ${debtAmount}k đấy! 🍕💵`,
        `Bây giờ là lúc bạn nên trở thành siêu nhân, cứu tôi khỏi nỗi khổ thiếu ${debtAmount}k! 🦸‍♀️💰`,
        `Tôi có thể làm một bài thơ về nợ ${debtAmount}k của bạn không? 📜💸`,
        `Dù tôi đã thay đổi số điện thoại, nhưng tình cảm với nợ ${debtAmount}k của bạn vẫn không thay đổi! 📞❤️`,
        `Bạn có thể cho tôi biết thời gian nào là thời gian tốt nhất để trả ${debtAmount}k không? ⏰💵`,
        `Nếu tiền nợ biết nói, chắc nó sẽ kêu cứu ${debtAmount}k! 😅💳`,
        `Chúng ta có thể làm một hợp đồng tình bạn: bạn trả ${debtAmount}k, tôi không đòi nữa! 🤝💸`,
        `Nợ của bạn giống như một cái bóng; nó sẽ theo bạn mọi lúc, đặc biệt là ${debtAmount}k! 🌒💰`,
        `Nếu tiền nợ là một bộ phim, chắc chắn nó sẽ là 'Nỗi Khổ của Tôi' với ${debtAmount}k! 🎬💵`,
        `Mỗi lần nhìn thấy ví của tôi, tôi lại nhớ ${debtAmount}k mà bạn nợ! 👜😄`,
        `Tôi đang viết một cuốn sách về nợ, nhân vật chính là bạn với ${debtAmount}k! 📚💸`,
        `Nếu tiền nợ là một bài hát, chắc chắn nó sẽ vang mãi trong đầu tôi với ${debtAmount}k! 🎶💰`,
        `Nếu bạn trả ${debtAmount}k, tôi hứa sẽ không gọi bạn là 'người bạn không tốt' nữa! 🤭💵`,
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

const DebtReminderModal = () => {
    const [isModal, setIsModal] = useState(false);
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState(false);
    const [debtAmount, setDebtAmount] = useState(0);

    const handleGetMyDebtService = async () => {
        const token = cookies.token;
        setLoading(true);
        const res = await getMyDebtService(token);
        setLoading(false);
        if (!res) {
            return;
        }

        if (res?.debt > 0) {
            setDebtAmount(res?.debt);
            setIsModal(true);
        }
    };

    useEffect(() => {
        handleGetMyDebtService();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {' '}
            <Modal title={'Trả nợ nha'} isOpen={isModal} onClose={() => setIsModal(false)}>
                {generateDebtMessage(debtAmount)}
            </Modal>
            {loading && <LoadingCustom />}
        </>
    );
};

export default DebtReminderModal;
