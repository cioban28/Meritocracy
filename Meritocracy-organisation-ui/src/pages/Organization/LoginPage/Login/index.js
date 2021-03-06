import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
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
    // document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    this.setState({
      login: true,
    })
  }

  componentWillUnmount() {
    //document.getElementsByTagName('body')[0].style.overflow = ''
  }

  statechange = () => {
    var login = !this.state.login
    this.setState({
      login: login,
    })
  }
  render() {
    return (
      <div>
        <div className="main-login__block main-login__block--extended pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-login__block__promo text-black text-center">
                <h1 className="mb-3 text-black">
                  <strong>WELCOME TO Meritocracy Organization Website</strong>
                </h1>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form">
                  {this.state.login ? <LoginForm /> : <SignupForm />}
                  <a
                    href="javascript: void(0);"
                    className="utils__link--blue utils__link--underlined"
                    onClick={this.statechange}
                    style={{ marginLeft: '30%' }}
                  >
                    Click Here To {this.state.login ? 'Sign Up' : 'Login'}
                  </a>
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
      </div>
    )
  }
}

export default Login
