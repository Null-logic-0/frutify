import Image from 'next/image';
import Button from '../Inputs/Button/Button';
import Input from '../Inputs/Input/Input';
import styles from './Form.module.scss';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { formState } from '@/app/state';

type FormProps = {
  heading: string;
  onFormSubmit?: () => void;
};

export default function Form(props: FormProps) {
  const [formData, setFormData] = useRecoilState(formState);
  const [showForm, setShowForm] = useState(true); // State to manage form visibility

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    let imageDataUrl = null;
    if (formData.image) {
      imageDataUrl = await toBase64(formData.image);
    }

    const updatedProducts = [...existingProducts, { ...formData, image: imageDataUrl }];

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    console.log('Form data:', formData);

    setFormData({
      name: '',
      price: '',
      sale: '',
      description: '',
      image: null,
    });

    const productUpdateEvent = new Event('productUpdate');
    window.dispatchEvent(productUpdateEvent);

    // Hide the form after submission
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0],
      }));
    }
  };

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDeleteForm = () => {
    setShowForm(false);
  };

  return (
    <>

      {showForm && (
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.heading}>{props.heading}</h1>
            <Button onClick={handleDeleteForm} size={"small"} title="X" />

          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Name
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className={styles.input} />
            </label>
            <div className={styles.container}>
              <label className={styles.label}>
                Price
                <div className={styles.wrapper}>
                  <input type="text" placeholder="0" name="price" value={formData.price} onChange={handleInputChange} className={`${styles.input} ${styles.price}`} />
                  <span className={styles.symbol}>{'$'}</span>
                </div>
              </label>
              <label className={styles.label}>
                Sale
                <div className={styles.wrapper}>
                  <input type="text" placeholder="0" name="sale" value={formData.sale} onChange={handleInputChange} className={`${styles.input} ${styles.sale}`} />
                  <span className={styles.symbol}>{'%'}</span>
                </div>
              </label>
            </div>

            <label className={styles.label}>
              Upload Image
              <input type="file" accept="image/*" onChange={handleImageChange} required className={styles.upload} />
            </label>

            <label className={styles.label}>
              Description
              <textarea name="description" value={formData.description} onChange={handleInputChange} required className={styles.input} />
            </label>

            <Button size="full" title="Add Fruit" className={styles.btn} type="submit" />
          </form>
        </div>

      )}

    </>
  );
}
