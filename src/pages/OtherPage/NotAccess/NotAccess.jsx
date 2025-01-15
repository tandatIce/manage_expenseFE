import cx from 'classnames';

function NotAccess() {
    return (
        <div className={cx('flex justify-center p-[200px] text-xl', 'wrapper')}>
            <div className={cx('w-full border-l-2 border-l-black bg-amber-100 px-4 py-3 text-amber-600')}>
                not_access
            </div>
        </div>
    );
}

export default NotAccess;
