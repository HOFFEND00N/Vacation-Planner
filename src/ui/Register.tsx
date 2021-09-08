import React from "react";
import { Password } from "./Password";
import { Email } from "./Email";

export class Register extends React.Component<{}, { email: string; password: string, confirmPassword: string }> {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", confirmPassword: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPassword = this.handleConfirmedPassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(this.state);
  }

  handlePasswordChange(password) {
    this.setState({ password: password });
  }

  handleConfirmedPassword(password){
    this.setState({ confirmPassword: password });
  }

  handleEmailChange(email){
    this.setState({email: email});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Email email={this.state.email} onEmailChange={this.handleEmailChange} />
        <Password password={this.state.password} onPasswordChange={this.handlePasswordChange} />
        Confirm <Password password={this.state.confirmPassword} onPasswordChange={this.handleConfirmedPassword} />
      </form>
    );
  }
}
