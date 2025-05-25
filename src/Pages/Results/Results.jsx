import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";



import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
    const [isLoading,setIsLoading]=useState(false)
  
  const { CategoryName } = useParams();
  useEffect(() => {
    setIsLoading(true)
   
    axios
      .get(`${productUrl}/products/category/${CategoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, []);

  return (
    <section>
      <h1 style={{ padding: "30px" }}>Results</h1>
      <p style={{ padding: "30px" }}>Category / {CategoryName}</p>
      <hr />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.products__container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product}
              renderDesc={false}
              renderAdd={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Results;
