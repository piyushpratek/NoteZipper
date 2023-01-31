import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { RootState } from '../../redux/store';
import './profileScreen.css';
import { UserInfo } from 'os';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pic, setPic] = useState<string | undefined>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picMessage, setPicMessage] = useState<null | undefined | string>();

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState) => state.user.login);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state: RootState) => state.user.update);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'notezipper');
      data.append('cloud_name', 'piyushproj');
      fetch('https://api.cloudinary.com/v1_1/piyushproj/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please Select an Image');
    }
  };

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }) as any);
  };

  return (
    <MainScreen title='EDIT PROFILE'>
      <div>
        <Row className='profileContainer'>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant='success'>
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{' '}
              {picMessage && (
                <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
              )}
              <div>
                <Form.Group controlId='pic'>
                  <Form.Label>Change Profile Picture</Form.Label>

                  <input
                    className='form-control'
                    type='file'
                    id='custom-file'
                    // label='Upload Profile Picture'
                    // type='image/png'
                    // custom
                    onChange={(e: { target: { files: any[] } }) =>
                      postDetails(e.target.files[0])
                    }
                  ></input>
                </Form.Group>
              </div>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={pic} alt={name} className='profilePic' />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
