import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../../src/Api/endPoint";
import ProdcutCard from "../../components/Products/ProductCard";
import style from "./Result.module.css";
import Loade from "../../components/Loade/Loade";
function Results() {
  const { CategoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(CategoryName);
  useEffect(() => {
    setIsLoading(true);
    // https://fakestoreapi.com/products/category/jewelery
    axios
      .get(`${productUrl}/products/category/${CategoryName}`)
      .then((res) => {
        // console.log(res)
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <LayOut>
      <div>
        <h1 style={{ padding: "10px" }}>Results</h1>
        <p style={{ padding: "10px" }}>Category/{CategoryName}</p>
        <hr />
        {isLoading ? (
          <Loade />
        ) : (
          <div className={style.products_container}>
            {results?.map((singleProduct) => {
              return (
                <ProdcutCard
                  key={singleProduct.id}
                  data={singleProduct}
                  renderADD={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default Results;
