import React, { useState, useEffect } from 'react';
import './login.css';
import showIcon from '../../assets/login/show.png';
import eyeIcon from '../../assets/login/eye.png';
import wecan from '../../assets/login/wecan.png';
import gsk from '../../assets/login/gsk.png';
import { login } from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../store/slices/UserSlice';

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [effect, setEffect] = useState(true);
  const [visibility, setVisibility] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const showPassword = () => {
    visibility == 'password' ? setVisibility('text') : setVisibility('password');
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    if (e.target.value.length >= 8) {
      setErrorPassword('Maximum value is 8!');
      e.target.value = e.target.value.slice(0, 8);
    } else {
      setPassword(e.target.value);
      setErrorPassword('');
    }
  };

  const removeErrorMsgs = (e) => {
    let errorType = e.currentTarget.name
    if(errorType == 'email'){
      setErrorEmail('')
    } else {
      setErrorPassword('')
    }
  }

  let error;
  const validateForm = async (e) => {
    error = 0;
    e.preventDefault();
    if (email == '') {
      setErrorEmail('This field is required!');
      error++;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrorEmail('Please enter a valid email!');
      error++;
    } else {
      setErrorEmail('');
    }

    if (password == '') {
      error++;
      setErrorPassword('This field is required!');
    } else {
      setErrorPassword('');
    }

    // if (errorPassword == '' && errorEmail == '') {
    if (error == 0) {
      let loginData = await login({ email, password });
      localStorage.setItem('token', loginData.data.data.token.token);
      let userName = loginData.data.data.user.name;
      let apiRole = loginData.data.data.user.role[0];
      let realRole;
      if (apiRole == 'coach' || apiRole == 'hcp') {
        realRole = 'moderator';
        localStorage.setItem('activeRole', 'moderator');
      } else {
        localStorage.setItem('activeRole', apiRole);
        realRole = apiRole;
      }

      localStorage.setItem('username', userName);
      dispatch(addAuth([userName, realRole]));
      navigate('/home');
    }
  };
  useEffect(() => {
    setEffect(false);
  }, []);

  return (
    <>
      <div className="login">
        <div className="gsk">
          <img className="gsk" src={gsk} alt="gsk" />
        </div>
        <div className="container-fluid">
          <div className="row flex-lg-row flex-md-column justify-content-md-evenly">
            <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-lg-center align-items-md-start">
              <img className="wecan" src={wecan} alt="" />
            </div>
            <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center form-container">
              <form className="col-lg-9 col-md-8">
                <h3 className="mb-5 mt-4">LOGIN</h3>
                <div className="mb-5">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    aria-describedby="emailHelp"
                    onChange={changeEmail}
                    onFocus={removeErrorMsgs}
                  />
                  {errorEmail ? (
                    <label className="text-danger">{errorEmail}</label>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-5 password-field">
                  <input
                    name="password"
                    type={visibility}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={changePassword}
                    onFocus={removeErrorMsgs}
                  />
                  <img
                    className="show"
                    onClick={showPassword}
                    src={visibility == 'password' ? showIcon : eyeIcon}
                    alt="show"
                  />
                  {errorPassword ? (
                    <label className="text-danger">{errorPassword}</label>
                  ) : (
                    ''
                  )}
                </div>
                <div className="d-flex justify-content-center w-100 mb-5">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={validateForm}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="footer d-flex justify-content-center">
            <p>Copyright © 2021-2022 CadecuesLane.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
