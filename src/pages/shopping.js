import React, { useEffect, useState } from "react";

function Shopping() {
  const [products, setProducts] = useState([]);
  async function getProductsData() {
    const data = await fetch(`https://dummyjson.com/products`)
      .then((res) => res.json())
      .then((data) => data);
    setProducts(data.products);
  }

  // This function will called only once
  useEffect(() => {
    getProductsData();
  }, []);

  const listItems = products.map((product) => (
    <div className="col-sm-4" key={product.id}>
      <div className="card" style={{ width: "400px" }}>
        <img
          className="card-img-top"
          src={product.thumbnail}
          alt="Card image"
          style={{ width: "100%" }}
        />
        <div className="card-body">
          <h4 className="card-title">{product.title}</h4>
          <p className="card-text">{product.description}</p>
          <b className="card-text">Category: {product.category}</b>
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container mt-5">
      <div className="row">{listItems}</div>
    </div>
  );
}

export default Shopping;
