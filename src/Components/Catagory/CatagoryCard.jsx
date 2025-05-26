
import React from "react";
import classes from "./category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  console.log(data);
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`}>
        <span>{data.title}</span>
        <img src={data.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;