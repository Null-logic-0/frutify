import Image from 'next/image';
import Button from '../Inputs/Button/Button';
import styles from './Products.module.scss';
import { useEffect, useState } from 'react';

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        loadProducts();

        const handleProductUpdate = () => {
            loadProducts(); 
        };

        window.addEventListener('productUpdate', handleProductUpdate);

        return () => {
            window.removeEventListener('productUpdate', handleProductUpdate);
        };
    }, []); 

    const loadProducts = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        setProducts(Array.isArray(storedProducts) ? storedProducts : []);
    };

    const remove = (index: number) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const edit = (index: number, updatedFields: Partial<{ name: string; description: string,price:string }>) => {
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], ...updatedFields };
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const handleNameEdit = (index: number, event: React.FocusEvent<HTMLSpanElement>) => {
        const newName = event.target.innerText.trim();
        if (newName !== products[index].name) {
            edit(index, { name: newName });
        }
    };

    const handleDescriptionEdit = (index: number, event: React.FocusEvent<HTMLSpanElement>) => {
        const newDescription = event.target.innerText.trim();
        if (newDescription !== products[index].description) {
            edit(index, { description: newDescription });
        }
    };

    const handlePriceEdit = (index: number, event: React.FocusEvent<HTMLSpanElement>) => {
        const newPrice = event.target.innerText.trim();
        if (newPrice !== products[index].price) {
            edit(index, { price: newPrice });
        }
    };

    return (
        <>
            {products.map((product, i) => (
                <div className={styles.main} key={i}>
                    <div className={styles.border}>
                        {product.image instanceof File ? (
                            <Image
                                src={URL.createObjectURL(product.image)}
                                width={168}
                                height={169}
                                alt='Product-img'
                            />
                        ) : (
                            <Image
                                src={product.image || '/manzana.png'} // Default image if product.image is not set
                                width={168}
                                height={169}
                                alt='Product-img'
                            />
                        )}
                    </div>
                    <div className={styles.btn}>
                        <Button
                            size='small'
                            icon='/pencil.svg'
                            onClick={() => { }}
                        />
                        <Button
                            size='small'
                            icon='/trash.svg'
                            onClick={() => remove(i)}
                        />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.amount}>
                            <span
                                className={styles.title}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNameEdit(i, e)}
                            >
                                {product.name}
                            </span>
                            <span
                                className={styles.description}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleDescriptionEdit(i, e)}
                            >
                                {product.description}
                            </span>
                        </div>
                        <span className={styles.price}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handlePriceEdit(i, e)}>
                            {product.price}
                            <span className={styles.symbol}>{'$'}</span>
                        </span>
                    </div>
                    <Button size='inline' title='Buy Now' />
                </div>
            ))}
        </>
    );
}
