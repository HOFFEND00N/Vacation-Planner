import React from "react";
import { Email } from "./Email";
import { Password } from "./Password";

export class Login extends React.Component<{}, { email: string; password: string }> {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(email) {
    this.setState({ email: email });
  }

  handlePasswordChange(password) {
    this.setState({ password: password });
  }

  handleSubmit(event) {
    event.preventDefault();
    //TODO: send request to a server for user authentication
    alert("Credentials: " + this.state.email + this.state.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Email email={this.state.email} onEmailChange={this.handleEmailChange} />
        <Password password={this.state.password} onPasswordChange={this.handlePasswordChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
