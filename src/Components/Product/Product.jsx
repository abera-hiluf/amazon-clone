import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [products, setproducts] = useState();
    const [isLoading,setIsLoading]=useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res);
        setproducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
        setIsLoading(false)
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products__container}>
          {products?.map((singleProduct) => {
            return (
              <ProductCard
                renderAdd={true}
                product={singleProduct}
                key={singleProduct.id} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
