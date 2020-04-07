import React from 'react'
import { Button } from 'antd'
import './style.scss'

class Login extends React.Component {
  state = {}
  constructor(props) {
    super(props)
    this.state = {
      login: true,
    }
  }
  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    this.setState({
      login: true,
    })
  }

  login() {
    window.location.href =
      'http://localhost:3000/#/login?redirect_uri=' +
      window.location.protocol +
      '//' +
      window.location.host
  }

  signup() {
    window.location.href =
      'http://ui.keycloak.dev.galaxias.io/#/login?redirect_uri=' +
      window.location.protocol +
      '//' +
      window.location.host +
      '&action=signup'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  statechange = () => {
    var login = !this.state.login
    this.setState({
      login: login,
    })
  }
  render() {
    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__header">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-login__header__logo">
                <a href="javascript: void(0);">
                  <img src="resources/images/login/logo.png" alt="Clean UI Admin Template" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main-login__block main-login__block--extended pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-login__block__promo text-black text-center">
                <h1 className="mb-3 text-black">
                  <strong>WELCOME TO Meritocracy Admin Panel</strong>
                </h1>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form" style={{ minHeight: 300 }}>
                  <div className="row" style={{ marginTop: 100, marginLeft: 30 }}>
                    <Button type="primary" onClick={this.login}>
                      Login With Meritocracy System
                    </Button>
                  </div>
                  <div className="row" style={{ marginTop: 30, marginLeft: 30 }}>
                    <Button type="primary" onClick={this.signup}>
                      Sign Up With Meritocracy System
                    </Button>
                  </div>
                </div>
                <div className="main-login__block__sidebar">
                  <h4 className="main-login__block__sidebar__title text-white">
                    <strong>Agile Dev Meetup</strong>
                    <br />
                    <span>August 2018</span>
                  </h4>
                  <div className="main-login__block__sidebar__item">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                  <div className="main-login__block__sidebar__item">
                    Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </div>
                  <div className="main-login__block__sidebar__place">
                    <i className="icmn-location mr-3" />
                    New York, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-login__footer text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li className="active list-inline-item">
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Confidential Information</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Support</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Login
