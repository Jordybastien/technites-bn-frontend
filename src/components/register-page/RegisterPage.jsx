/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Form from '../form/form';
import { register } from '../../redux/actions/registerAction';
import image from '../../assets/verify.png';
import SocialLogins from '../login-page/SocialLogins';

export class Register extends Form {
  componentDidMount() {
    const { history, auth } = this.props;
    if (auth) history.push('/dashboard');
  }
  doSubmit = async () => {
    this.props.register(this.state.data);
  };

  schema = {
    firstname: Joi.string()
      .required()
      .min(3)
      .label('First Name'),
    lastname: Joi.string()
      .required()
      .min(3)
      .label('Last Name'),
    username: Joi.string()
      .required()
      .min(3)
      .label('Username'),
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password'),
    confirmPassword: Joi.string()
      .required()
      .min(6)
      .label('Confirm Password')
  };

  render() {
    if (this.props.displayVerifyConfirmation === false)
      return (
        <div className="container">
          <div className="bg-video">
            <video className="bg-video__content" autoPlay muted>
              <source src="video/video.mp4" type="video/mp4" />
              <source src="video/video.webm" type="video/webm" />
              Your browser is not supported!
            </video>
          </div>
          <div className="card-container">
            <div className="card card--register">
              <div className="title">Create an account</div>
              {this.renderInput('firstname', 'First Name')}
              {this.renderInput('lastname', 'Last Name')}
              {this.renderInput('username', 'Username')}
              {this.renderInput('email', 'Email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderInput(
                'confirmPassword',
                'Confirm Password',
                'password'
              )}
              {this.renderButton('Sign up', 'register')}
              <p className="login-alt">
                <span>or</span>
              </p>
              <SocialLogins />
              <p>
                Already Registered
                <a href="/"> Login </a>
              </p>
            </div>
          </div>
        </div>
      );

    return (
      <div data-test="success-view">
        <div className="card-container">
          <form className="card" onSubmit={this.handleSubmit}>
            <div className="title">Verify Email</div>
            <img className="margin" src={image} alt="" />
            <p className="text">
              You are almost ready to start enjoying Barefoot Nomad. Just verify
              your email using the link we sent you! you can close this tab now
              :)
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ register, loginState }) => ({
  users: register,
  displayVerifyConfirmation: register.registerVerify,
  auth: loginState.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
