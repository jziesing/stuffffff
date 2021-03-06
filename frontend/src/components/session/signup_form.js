import React from 'react';
import { withRouter } from 'react-router-dom';
import '../modal/modal.css';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }
    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history)
      .then( () => (this.props.login(user)))
      .then(() => (this.props.closeModal()))
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    
    const { formType, closeModal, otherForm } = this.props;

    const message = formType === 'Sign Up' ? 'Already have an account?' : 'No account?';
    const button_text = formType === 'Sign Up' ? 'Sign up' : 'Sign in';
    const intro = formType === 'Sign Up'
      // ? 'Create an account to begin making trades with real stock data!'
      // : 'Sign in to see your portfolio.'
    const login_intro = formType === 'Sign Up' ? 'Join NiteTrader!' : 'Welcome Back!'
    
    return (

      <div className="modal-child">
        <div onClick={closeModal} className="close-x">
          &times;
        </div>
        <div className="modal-content">
          <div className="modal-title">{login_intro}</div>
          <div className="modal-intro">{intro}</div>
          <div className="modal-quote">The World is Yours.</div>
          <br />
          <ul>{this.renderErrors()}</ul>
          <br />
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <div className="session-info">
              <label htmlFor="email">Email</label>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                // placeholder="Email"
                className="modal-input"
              />
            </div>
            <br />
            <div className="session-info">
              <label htmlFor="username">Username</label>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                // placeholder="Username"
                className="modal-input"
              />
            </div>
            <br />
            <div className="session-info">
              <label htmlFor="password">Password</label>
              <input type="password"
                value={this.state.password}
                onChange={this.update("password")}
                // placeholder="Password"
                className="modal-input"
              />
            </div>
            <br />
            <div className="session-info">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                // placeholder="Confirm Password"
                className="modal-input"
              />
            </div>
            <br />
            <input type="submit" className="modal-submit" value={button_text} />
          </form>
          <div className="modal-bottom">
            {message}
            <div className="modal-switch">{otherForm}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);