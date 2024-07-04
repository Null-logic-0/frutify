'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Dropdown from "./Components/Inputs/Dropdown/Dropdown";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import Products from "./Components/Products/Products";
import { useState } from "react";
import Button from "./Components/Inputs/Button/Button";
import CategoryTitle from "./Components/CategoryTitle/CategoryTitle";
import DiscountCard from "./Components/DiscountCard/DiscountCard";
import Filters from "./Components/Filters/Filters";

export default function Home() {
  const priceOptions = [
    { value: 'Price high to low', title: 'Price high to low' },
    { value: 'Price low to high', title: 'Price low to high' }
  ];

  const [showForm, setShowForm] = useState(false);
  const [showProducts, setShowProducts] = useState(true);

  const handleAddProductClick = () => {
    setShowForm(true);
    setShowProducts(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setShowProducts(true);
  };

  const handleShopClick = () => {
    setShowProducts(!showProducts);
  };

  return (
    <>
      <header className={styles.header}>
        <Header onAddProductClick={handleAddProductClick} icon={"/Frutify.svg"} onShopClick={handleShopClick} />
      </header>



      <main className={styles.main}>
        {showForm && (
          <div className={styles.form}>
            <Form onFormSubmit={handleFormSubmit} heading={"Add new fruit"} />
          </div>
        )}
        {!showForm && (
          <>
            <div className={styles.category}>
              <CategoryTitle title={"Fruits"} />
              <Dropdown values={priceOptions} />
            </div>

            {showProducts && (
              <div className={styles.filters}>
                <Filters title={"Filter"} products={"Category"} sale={"Sale"} price={"Price"} />
                <div className={styles.products}>
                  <DiscountCard text="Gori's Apple" />
                  <Products />
                </div>
              </div>
            )}
          </>
        )}


      </main>
    </>
  );
}
