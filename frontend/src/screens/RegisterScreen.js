import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Form, Col, Row, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"
import FormContainer from "../components/FormContainer"

const RegisterScreen = ({ location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister.userRegister
  )

  const redirect = location.search ? location.search.split("=")[1] : "/"

  console.log(redirect)

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [redirect, history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!")
    } else {
      setMessage("")
      dispatch(register(name, email, password))
    }
  }
  console.log(message)

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {!message && error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter your name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="retype your password here"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="warning">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Alraedy Registered?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
