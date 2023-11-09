import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SignupForm() {
  const [UserFName, setFName] = useState('');
  const [UserLName, setLName] = useState('');
  const [Birthday, setBDay] = useState('');
  const [Age, setAge] = useState('');
  const [UserEmail, setEmail] = useState('');
  const [UserPassword, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
   try {
    axios
    .post('http://localhost:5000/api/users', { UserFName, UserLName, Birthday, Age, UserEmail, UserPassword })
    .then((result) => navigate('/'))
    .catch((err) => console.log(err));
   } catch (err) {
      alert(err)
   }
  };

  return (
    <div className="text-center" style={{width: '100%', maxWidth: 500}}>
      <Card>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="UserFName">
              <Form.Control
                type="text"
                name="UserFName"
                value={UserFName}
                placeholder="First Name"
                onChange={(e) => setFName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="UserLName">
              <Form.Control
                type="text"
                name="UserLName"
                value={UserLName}
                placeholder="Last Name"
                onChange={(e) => setLName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="Birthday">
              <Form.Control
                type="date"
                name="Birthday"
                value={Birthday}
                placeholder="Birthday (yyyy-mm-dd)"
                onChange={(e) => setBDay(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="Age">
              <Form.Control
                type="number"
                name="Age"
                value={Age}
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="UserEmail">
              <Form.Control
                type="text"
                name="UserEmail"
                value={UserEmail}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="UserPassword">
              <Form.Control
                type="password"
                name="UserPassword"
                value={UserPassword}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
            <Button variant="secondary m-2" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignupForm;
