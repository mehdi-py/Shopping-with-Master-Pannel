import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Form, Col, Row, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserProfile } from "../actions/userActions"
import { userProfileUpdate } from "../actions/userActions"

const ProfileScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error, user } = useSelector(
    (state) => state.userProfile.userProfile
  )
  const { userInfo } = useSelector((state) => state.userLogin.userLogin)

  const { success } = useSelector(
    (state) => state.userProfileUpdate.userProfileUpdate
  )

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user) {
        console.log("user: ", user)
        dispatch(getUserProfile("profile"))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  //   useEffect(() => {
  //     console.log("Track-2")

  //     if (!userInfo) {
  //       console.log("Track-1")

  //       history.push("/login")
  //       console.log("Track0")
  //     } else {
  //       console.log("Track1")
  //       const getData = async () => {
  //         const data = await dispatch(getUserProfile("profile"))
  //         console.log("Data:", data)
  //         return data
  //       }
  //       console.log("Track4")

  //       const result = getData()
  //       console.log("result:", result)

  //       console.log("user:", user)
  //       setName(result.name)
  //     }
  //   }, [history, userInfo, user, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!")
    } else {
      const userObject = {
        _id: user._id,
        name,
        email,
        password,
      }
      console.log("modifiedProfile: ", userObject)
      dispatch(userProfileUpdate(userObject))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Successfully Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
