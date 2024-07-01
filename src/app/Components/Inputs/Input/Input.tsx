import Image from 'next/image';
import styles from './Input.module.scss';

type InputProps = {
    onChange?: () => void;
    icon: string;
    placholder: string;
    iconShow?: boolean;

}


export default function Input({ onChange, icon, placholder,iconShow }:InputProps) {
    return (
        <div className={styles.container}>
            
            <input placeholder={placholder} onChange={onChange} className={styles.input}/>
            {
                iconShow&&<Image src={icon} width={40} height={40} alt='icon' />
            }
            


        </div>
    )

}