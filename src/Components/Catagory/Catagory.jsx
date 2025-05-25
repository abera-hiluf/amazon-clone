import React from "react";
import { categoryInfo } from "./CatagoryFullInfo";
import CatagoryCard from "./CatagoryCard";
import classes from "./category.module.css"
// console.log(categoryInfo);

function Catagory() {
  return (
    <div className={classes.category__container}>
      {categoryInfo.map((infos,id) => {
        return <CatagoryCard data={infos}
        key={infos.id}
        />;
      })}
    </div>
  );
}

export default Catagory;
