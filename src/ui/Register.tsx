import React from "react";

export class Register extends React.Component<Record<string, never>, { email: string; password: string; confirmPassword: string }> {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", confirmPassword: "" };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPassword = this.handleConfirmedPassword.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    alert(`email: ${this.state.email}, password: ${this.state.password}, confirmed password: ${this.state.confirmPassword}`);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmedPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          login:
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <label>
          password:
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <label>
          confirm password:
          <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmedPassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
