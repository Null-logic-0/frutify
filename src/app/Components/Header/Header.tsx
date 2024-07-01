import Image from 'next/image';
import Button from '../Inputs/Button/Button';
import Input from '../Inputs/Input/Input';
import styles from './Header.module.scss';

type HeaderProps = {
    onAddProductClick?: () => void;
    icon: string;
};

export default function Header({ onAddProductClick,icon }: HeaderProps) {
    return (
        <div className={styles.main}>
            <Image src={icon} alt='icon' width={168} height={58} />
            <div className={styles.container}>
                <Button size={"default"} title={"+ New Products"} onClick={onAddProductClick} />
                <Button size={'inline'} title={'Shop'} />
                <Input icon={"./search.svg"} placholder={"Search"} iconShow/>
            </div>
        </div>
    );
}
