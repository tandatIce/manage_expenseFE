import cx from 'classnames';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Input from '@/components/Input';
import FormWarapper from '../FormWrapper';
import { signupService } from '@/services/AuthService';
import { notifyError, notifySuccess } from '@/utils/notification';
import { routes } from '@/config';

const Signup = () => {
    const methods = useForm({});
    const navigate = useNavigate();

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        console.log('data:', data);
        const bodyRequest = {
            username: data?.username,
            password: data?.password,
            email: data?.email,
            fullName: data?.fullName,
        };
        const res = await signupService(bodyRequest);
        if (!res) {
            notifyError('Đăng ký thất bại');
            return;
        }
        notifySuccess('Đăng ký thành công');
        navigate(routes.auth.LOGIN);
    };

    const onError = (errors) => {
        console.log('Có lỗi:', errors);
    };
    return (
        <FormWarapper title={'Đăng ký'}>
            <FormProvider {...methods}>
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit, onError)}>
                    <Input label="Họ và tên" name="fullName" />
                    <Input label="Email" name="email" />
                    <Input label="Tên người dùng" name="username" />
                    <Input label="Mật Khẩu" name="password" />
                    <div>
                        <button
                            type="submit"
                            className={cx(
                                'bg-primary flex w-full justify-center rounded-md border border-transparent',
                                'hover:bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm',
                            )}
                        >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </FormProvider>
        </FormWarapper>
    );
};

export default Signup;
