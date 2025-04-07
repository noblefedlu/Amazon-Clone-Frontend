import React from "react";
import style from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  if (!data) {
    return <div className={style.category}></div>;
  }

  return (
    <div className={style.Category}>
      <Link to={`/Category/${data.category}`}>
        <span>{data.category}</span>
        {/* {console.log(data.category)} */}
        <img src={data.imageLink} alt="" />
        <p>shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;

/*
import React from "react";
import style from "./Category.module.css";
import { Link } from "react-router-dom";
function CategoryCard({ data }) {
  return (
    <div className={style.category}>
      <Link to={`/category/${data.category}`}>
        <span>{data.title}</span>
        <img src={data.imageLink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;*/
