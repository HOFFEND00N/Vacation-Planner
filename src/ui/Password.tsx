import React from "react";

export class Password extends React.Component<{password: string, onPasswordChange: (event) => void}, { value: string }> {
  constructor(props) {
    super(props);
    this.state = { value: props.password };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onPasswordChange(event.target.value );
  }

  render() {
    return (
      <label>
        password:
        <input type="password" value={this.props.password} onChange={this.handleChange} />
      </label>
    );
  }
}
