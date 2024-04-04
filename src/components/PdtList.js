import React, { Component } from 'react';
import { getProducts } from '../services/PdtService';
import { Card, Button, Row, Col } from 'react-bootstrap';

class PdtList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialProducts: [],
    };
  }

  componentDidMount() {
    const { products } = this.props;
    if (products.length === 0) {
      getProducts().then((response) => {
        this.setState({ initialProducts: response.data.products });
      });
    }
  }

  render() {
    const { products, addToCart } = this.props;
    const { initialProducts } = this.state;

    const displayProducts = products.length > 0 ? products : initialProducts;

    return (
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {displayProducts.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 d-flex flex-column justify-content-between">
              <Card.Img variant="top" src={product.thumbnail} className="card-img-top" />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
              <Button className="text-center" variant="primary" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default PdtList;
