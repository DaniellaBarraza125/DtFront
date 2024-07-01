import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Products.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/products', {
          headers: {
              Authorization: token,
          },
      });
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
      <h1 className='ticket_h1'>Selecciona el tipo de entrada</h1>
      <p className='ticket_p'>Elige el tipo de entrada que mejor se adapte a tus necesidades y prepárate para descubrir las últimas novedades:</p>
      <form isRequired mt={4}>
                        <div className='container_work'>
                        <select className='select_plan' name='pais'
                            //value={formValues.pais}
                            //</div>onChange={handleChange}
                            >
                            <option value=""></option>    
                            <option value="Administración pública">Administración pública</option>
                            <option value="Empresas privadas">Empresas privadas</option>
                        </select>
                        </div>
                    </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            {product.prices.map(price => (
              <div key={price.id}>
                <p>Precio: {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}</p>
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
