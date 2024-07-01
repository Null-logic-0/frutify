import styles from './Dropdown.module.scss';

type Option = {
    value: string;
    title: string;
}

interface Props {
    onChange?: (item:any)=> void;
    values: Option[];
}

export default function Dropdown(props: Props) {
    return (
        <>
            <select className={styles.dropdown}>
                {
                    props.values?.map((item,i)=> <option  key={i} value={item.value} className={styles.option}>{item.title}</option>)
                }

            </select>
        </>

    )

}