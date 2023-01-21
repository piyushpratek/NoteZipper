import axios from 'axios';
import { userInfo } from 'os';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import {
  setUserLoginFailed,
  setUserLoginLoading,
  setUserLoginSuccess,
} from '../../redux/userSlice';
import './LoginScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { login } from '../../actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state: RootState) => state.user.login);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [userInfo]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(setUserLoginLoading());

      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });

      dispatch(setUserLoginSuccess(data));

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch(
        setUserLoginFailed(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
  return (
    <div>
      <MainScreen title='LOGIN'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer ? <Link to='/register'>Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </div>
  );
};

export default LoginScreen;
