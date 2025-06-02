// src/pages/user/ProductPage.js

import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();
  return <h1>Product Details for ID: {id}</h1>;
}

export default ProductPage;
