import Button from '../Inputs/Button/Button';
import Dropdown from '../Inputs/Dropdown/Dropdown';
import Input from '../Inputs/Input/Input';
import styles from './Filters.module.scss';

interface filtersProps {
    title:string;
    products:string;
    sale: string;
    price: string;

}


export default function Filters({title,products,sale,price}:filtersProps){
    const category = [
        { value: 'Fruits', title: 'Fruits' },
        { value: 'Vegies', title: 'Vegies' }
      ];
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <div className={styles.wrapper}>
                <span className={styles.text}>{products}</span>
                <Dropdown values={category}/>
            </div>
            <div className={styles.wrapper}>
                <span className={styles.text}>{price}</span>
                <div className={styles.inputs}>
                    <Input icon={''} placholder={'Min'} />
                    <Input icon={''} placholder={'Max'} />
                </div>
            </div>
            <div className={styles.wrapper}>
                <span className={styles.text}>{sale}</span>
            </div>
            <Button size={'inline'} title='Apply'/>

        </div>
    )
}