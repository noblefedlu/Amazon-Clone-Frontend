/*
import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LayOut from '../../Components/LayOut/LayOut';
import { ProductURL } from '../../API/endPoint';

function ProductDetails() {
    const {ProductId} = useParams();
    const [product, setProduct] = useState({});
    const [isloading, setisLoading] = useState(true);
    useEffect(() => {
        setisLoading(true)
      axios.get(`${ProductURL}/Products/${ProductId}`)
      .then(res => {
        setProduct(res.data);
        setisLoading(false)
      })
      .catch(err => {
        console.log(err);
      });
    }, []);

return (
  <LayOut>
    {isloading?(<Loader/>):(<productCard data={product}
    flex={true} renderDes={true}/>)}
    
         

  </LayOut>
);
}

export default ProductDetails*/

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endpoint";
import LayOut from "../../Components/LayOut/LayOut";
import ProdcutCard from "../../components/Products/ProductCard";
import Loade from "../../components/Loade/Loade";
import { DataContext } from "../../Components/DataProvider/DataProvider";
// import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const [state, dispatch] = useContext(DataContext);
  console.log(state);

  const { ProducId } = useParams();
  console.log(ProducId);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    //https://fakestoreapi.com/products/7
    axios
      .get(`${productUrl}/products/${ProducId}`)
      .then((res) => {
        // console.log(res)
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <LayOut>
      {isLoading ? (
        <Loade />
      ) : (
        <ProdcutCard
          data={product}
          flex={true}
          renderDesc={true}
          renderADD={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
