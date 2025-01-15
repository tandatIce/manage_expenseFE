import cx from 'classnames';

function FormWarapper({ children, title }) {
    return (
        <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden">
            <div
                className={cx(
                    'animate-blob bg-primary-200 absolute left-2 top-20 h-[500px] w-[500px] rounded-full',
                    'opacity-70 mix-blend-multiply blur-[150px] filter',
                )}
            ></div>
            <div
                className={cx(
                    'animate-blob animation-delay-2000 absolute right-32 top-20 h-[500px] w-[500px] rounded-full',
                    'bg-primary-200 opacity-70 mix-blend-multiply blur-[150px] filter',
                )}
            ></div>
            <div
                className={cx(
                    'animate-blob animation-delay-4000 absolute bottom-10 left-32 hidden h-[500px] w-[500px] rounded-full',
                    'bg-primary-200 opacity-70 mix-blend-multiply blur-[150px] filter xl:block',
                )}
            ></div>
            <div
                className={cx(
                    'animate-blob animation-delay-4000 absolute bottom-10 right-52 h-[500px] w-[500px] rounded-full',
                    'bg-primary-200 opacity-70 mix-blend-multiply blur-[150px] filter',
                )}
            ></div>
            <div
                className={cx(
                    'relative flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8',
                    'max-sm:w-full',
                )}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                </div>
                <div className={cx('mt-8 overflow-hidden bg-white/60 sm:mx-auto sm:flex sm:rounded-lg sm:shadow')}>
                    <div className="sm:w-[380px] sm:max-w-md">
                        <div className="h-full px-4 py-8 sm:px-10">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormWarapper;
