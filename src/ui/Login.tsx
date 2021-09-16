import React from "react";

export class Login extends React.Component<Record<string, never>, { email: string; password: string }> {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    //TODO: send request to a server for user authentication
    alert("Credentials: " + this.state.email + this.state.password);
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
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
