import cx from 'classnames';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Input from '@/components/Input';
import LoadingCustom from '@/components/loadingCustom';
import FormWarapper from '../FormWrapper';
import { logInService } from '@/services/AuthService';
import { notifyError, notifySuccess } from '@/utils/notification';
import { routes } from '@/config';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const methods = useForm({});

    const [, setCookies] = useCookies(['token', 'infoUser']);

    const navigate = useNavigate();

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        console.log('data:', data);
        const bodyRequest = {
            username: data?.username,
            password: data?.password,
        };
        setLoading(true);
        const res = await logInService(bodyRequest);
        setLoading(false);
        if (!res) {
            notifyError('Đăng nhập thất bại');
            return;
        }
        const infoUserString = JSON.stringify(res?.user);
        setCookies('token', res.token, { path: '/', expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) });
        setCookies('infoUser', infoUserString, {
            path: '/',
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        });
        notifySuccess('Đăng nhập thành công');
        navigate(routes.HOME);
    };

    const onError = (errors) => {
        console.log('Có lỗi:', errors);
    };
    return (
        <FormWarapper title={'Đăng nhập'}>
            <FormProvider {...methods}>
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit, onError)}>
                    <Input label="Tên người dùng" name="username" />
                    <Input label="Mật Khẩu" name="password" />
                    <div>
                        <button
                            type="submit"
                            className={cx(
                                'flex w-full justify-center rounded-md border border-transparent bg-primary',
                                'px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-500',
                            )}
                        >
                            Đăng nhập
                        </button>
                    </div>
                    <div className={cx('text-color-text mt-8 text-center')}>
                        Bạn chưa có tài khoản?{' '}
                        <Link
                            to={routes.auth.SIGNUP}
                            className={cx('font-medium text-primary', 'hover:text-primary-500')}
                        >
                            Đăng ký{' '}
                        </Link>
                        ngay
                    </div>
                </form>
                {loading && <LoadingCustom />}
            </FormProvider>
        </FormWarapper>
    );
};

export default Login;
