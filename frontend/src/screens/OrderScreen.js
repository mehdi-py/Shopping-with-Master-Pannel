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
import { orderDetails } from "../actions/orderActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderDetails(orderId))
  }, [orderId, dispatch])

  //  selectors
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    _id,
  } = order

  //   console.log("order:-->", order)

  console.log("shippingAddress-->", shippingAddress)

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h1>Order ID: {_id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress?.address},{shippingAddress?.city},{" "}
                {shippingAddress?.postalcode}, {shippingAddress?.country}
              </p>
              <p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delievered {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              <ListGroup variant="flush">
                {orderItems?.map((el, index) => (
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
