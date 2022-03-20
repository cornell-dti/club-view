import React from "react";
import cn from "classnames";
import "./CategoryTag.css";

type Prop = {
  title: string
  large: boolean
}

const CategoryTag = ({title, large}: Prop) =>{

  return (
  <div className={cn('categoryTag', large ? "large" : "small" )} >
    <div className={large ? "largeTitle" : "smallTitle" }>{title}</div>
  </div>
  )
} 

export default CategoryTag;