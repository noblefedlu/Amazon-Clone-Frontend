import React from "react";
import {CategoryInfo} from "./CategoryInfo";
import CategoryCard from "./CategoryCard";
import style from "./Category.module.css";
function Category() {
  return (
    <section className={style.Category_container}>
      {CategoryInfo?.map((singleproduct, i) => {
        return <CategoryCard key={i} data={singleproduct} />;
      })}
    </section>
  );
}

export default Category;
