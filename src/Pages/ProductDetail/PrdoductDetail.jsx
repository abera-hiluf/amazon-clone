
import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
// import LayoutOut from ".././Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';
// import Loader from "../.././Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading,setIsLoading]=useState(false)
  const [product, setProduct] = useState({});

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res.data)
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, [productId]);

  return (
    <div>
      <h3>Product details</h3>
      {isLoading ? <Loader /> : <ProductCard product={product}
        
        flex={true}
        renderDesc={true}
        renderAdd={true}
      />}
     
    </div>
  );
}

export default ProductDetail;
