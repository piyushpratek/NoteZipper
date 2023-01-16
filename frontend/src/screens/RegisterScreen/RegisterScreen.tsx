import React, { useState } from 'react';
import MainScreen from '../../components/MainScreen';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pic, setPic] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage('Passwords Do Not Match');
    } else {
    }

    console.log(`email: ${email}`);
  };

  return (
    <div>
      <MainScreen title='REGISTER'>
        <div className='loginContainer'>
          {/* {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>} */}
          {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          {/* {loading && <Loading />} */}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={name}
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='confirmpassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                value={confirmpassword}
                placeholder='Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {/* {picMessage &&(
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )} */}

            <Form.Group controlId='pic' className='mb-3'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                // onChange={(e) => postDetails(e.target.value)}
                type='file'
                id='custom-file'
                // type='image/png'
                // label="Upload Profile Picture"
                // custom
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account ? <Link to='/login'>Login</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  );
};

export default RegisterScreen;
