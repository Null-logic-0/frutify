import styles from './DiscountCard.module.scss';

type DiscountProps ={
    text:string;



}


export default function DiscountCard({text}:DiscountProps) {
    return(
        <div className={styles.container}>
            <p className={styles.text}>Special Offer for <span className={styles.offer}>{text}</span></p>
            <span className={styles.sale}>SALE</span>

        </div>
    )
    
}