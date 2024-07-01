import style from './Button.module.scss';
import Image from 'next/image';

type BtnProps = {
    onClick?: () => void;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    size: 'inline' | 'default' | 'full' | 'small';
    className?: string;
    title?: string;
    icon?: string;
};

export default function Button({ onClick, title, size, className, type, icon }: BtnProps) {
    const classNames = [style.container, className];

    if (size === 'inline') {
        classNames.push(style.inline);
    } else if (size === 'default') {
        classNames.push(style.default);
    } else if (size === 'full') {
        classNames.push(style.full);
    } else {
        classNames.push(style.small);
    }

    return (
        <button className={classNames.join(' ').trim()} onClick={onClick} type={type}>
            {icon && <Image src={icon} width={24} height={24} alt='icon' />}
            {title}
        </button>
    );
}
