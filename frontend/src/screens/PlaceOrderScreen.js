import React, { useEffect } from "react"
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import CheckoutSteps from "../components/CheckoutSteps"
import { createOrder } from "../actions/orderActions"
import { useHistory } from "react-router-dom"
import Message from "../components/Message"

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  //  2 digits decimal converetr

  const decimal = (number) => {
    return Math.round((number * 100) / 100).toFixed(2)
  }

  //  selectors

  const cartItems = useSelector((state) => state.cart.cartItems)

  const shippingAddress = useSelector(
    (state) => state.cartShippingAddress.shippingAddress
  )
  const { paymentMethod } = useSelector(
    (state) => state.cartPaymentMethod.paymentMethod
  )

  //calculations
  const itemsPrice = decimal(
    cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  )

  const taxPrice = decimal(itemsPrice * 0.15)

  const shippingPrice = itemsPrice > 100 ? 0 : 20

  const totalPrice =
    Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)

  const { success, error, order } = useSelector((state) => state.orderCreate)

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalcode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              <ListGroup variant="flush">
                {cartItems.map((el, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={el.image}
                          alt={el.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col>
                        <Link to={`/product/${el.productId}`}>{el.name}</Link>
                      </Col>
                      <Col md={6}>
                        {el.quantity} x {el.price} = ${el.quantity * el.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error & <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Container>
                  <Row>
                    <Button
                      type="button"
                      className="btn-block"
                      disabled={cartItems === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </Row>
                </Container>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
