import React, { useState, useEffect } from 'react';
import { api } from '../../config/axiosinstance';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');  // e.g. GET /api/products
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError('Could not fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map(prod => (
        <div key={prod.id} className="card p-4 shadow">
          <h2 className="text-xl">{prod.name}</h2>
          <p>${prod.price}</p>
          {/* Link to the detail page */}
          <Link to={`/product/${prod.id}`} className="text-blue-500">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
