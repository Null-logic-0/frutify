import styles from './CategoryTitle.module.scss';

type categoryProps = {
    title: string;
}


export default function CategoryTitle({ title }: categoryProps) {
    return (
        <div>
            <div className={styles.heading}>
                <p className={styles.title}>{title}</p>
            </div>
        </div>


    )

}