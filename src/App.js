import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PdtList from './components/PdtList';
import SearchProd from './components/SearchProd.js';
import Cart from './components/Cart.js';
import { searchProducts} from './services/PdtService.js';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      redirectToCart: false
    };
  }

  handleSearch = (query) => {
    if (query) {
      searchProducts(query).then((response) => {
        console.log(query)
        this.setState({ products: response.data.products });
      });
    } else {
      this.setState({ products: [] });
    }
  };
  editCartItem = (productId, quantity) => {
    const updatedCart = this.state.cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.setState({ cart: updatedCart });
  };
  deleteCartItem = (productId) => {
    const updatedCart = this.state.cart.filter(item => item.id !== productId);
    this.setState({ cart: updatedCart });
  };
  
  addToCart = (product) => {
    const existingItemIndex = this.state.cart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
     
      const updatedCart = [...this.state.cart];
      updatedCart[existingItemIndex].quantity += 1;
      this.setState({ cart: updatedCart });
    } else {
      
      this.setState(prevState => ({
        cart: [...prevState.cart, { ...product, quantity: 1 }]
      }));
    }
  };
  

  navigateToCart = () => {
    this.setState({ redirectToCart: true });
  };

  render() {
    const { products, cart} = this.state;

    return (
  <Router>
  <Routes>
    <Route path='/' element={
      <Container className='ml-3 mt-5 mb-5'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className='mb-0'>E-Commerce Platform</h1>
            <Link to="/cart" className='btn btn-primary'>
              <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </Link>
          </div>
    
          <div className="mb-4 align-items-center"> 
          <SearchProd onSearch={this.handleSearch} />
          </div>
      
        <PdtList products={products} addToCart={this.addToCart}/>
        
      </Container>
    } />
    <Route path="/cart" element={<Cart cart={cart} editCartItem={this.editCartItem} deleteCartItem={this.deleteCartItem} />} />
  </Routes>
</Router>

    );
    
  }
}
export default App;
