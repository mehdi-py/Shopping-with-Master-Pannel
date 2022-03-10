import React, { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartActions"
import { useSelector, useDispatch } from "react-redux"
import CheckoutSteps from "../components/CheckoutSteps"

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState("paypal")

  const { shippingAddress } = useSelector((state) => state.cartShippingAddress)

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      savePaymentMethod({
        paymentMethod,
      })
    )

    history.push("/placeOrder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend"> Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal Or Credit Card"
              id="PayPal"
              name="
            paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
