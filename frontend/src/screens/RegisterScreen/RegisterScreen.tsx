import React, { useState } from 'react';
import MainScreen from '../../components/MainScreen';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pic, setPic] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [picMessage, setPicMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage('Passwords Do Not Match');
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        setLoading(true);

        const { data } = await axios.post(
          'api/users',
          { name, pic, email, password },
          config
        );
        console.log(data);

        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error: any) {
        setError(error.response.data.message);
      }
    }

    console.log(`email: ${email}`);
  };
  const postDetails = (pics: any) => {
    if (!pics) {
      return setPicMessage('Please Select an Image');
    }
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'notezipper');
      data.append('cloud_name', 'dd22mrihi');
      fetch('https://api.cloudinary.com/v1_1/dd22mrihi/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res: any) => res.json())
        .then((data) => {
          console.log(data);

          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please Select an Image');
    }
  };

  return (
    <div>
      <MainScreen title='REGISTER'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          {loading && <Loading />}
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
            {picMessage && (
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}

            <Form.Group controlId='pic' className='mb-3'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                onChange={(e: any) => postDetails(e.target.files[0])}
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
