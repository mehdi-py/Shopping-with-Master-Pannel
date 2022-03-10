import React, { useEffect } from "react"
import { Link, useHistory, useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap"
import { addToCart, removeCartItem } from "../actions/cartActions"

const CartScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  console.log(location)
  const queryParams = new URLSearchParams(location.search)
  const qty = Number(queryParams.get("qty")) || 1
  const productId = params.id

  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const removeItemFromCartHandler = (id) => {
    dispatch(removeCartItem(id))
  }
  const checkOutHandler = () => {
    history.push("/login?redirect=shipping")
    // if not logged in will be directed to Login if already Loggedin redirected to shipping//
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty! <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      size="sm"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.productId, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItemFromCartHandler(item.productId)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Container>
                <Row>
                  <Button
                    type="button"
                    className="btn btn-block "
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Check Out
                  </Button>
                </Row>
              </Container>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
