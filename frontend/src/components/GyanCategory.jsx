import { useState } from "react";

const GyanCategory = ({ category }) => {
  const classes = `
     capitalize px-2 py-1 w-min rounded-lg flex items-center justify-center
     `;
  return <span className={classes}>{category}</span>;
};
export default GyanCategory;

