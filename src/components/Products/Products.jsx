import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyClick = (product) => {
    navigate('/checkoutForm', { state: { product } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(products)) {
    return <p>Error: products is not an array.</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {product.prices.map(price => (
              <div key={price.id}>
                <p>Price: {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}</p>
              </div>
            ))}
            <button onClick={() => handleBuyClick(product)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
