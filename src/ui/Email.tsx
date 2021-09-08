import React from "react";

export class Email extends React.Component<{ email: string; onEmailChange: (event) => void }, { value: string }> {
  constructor(props) {
    super(props);
    this.state = { value: props.email };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onEmailChange(event.target.value);
  }

  render() {
    return (
      <label>
        login:
        <input type="text" value={this.props.email} onChange={this.handleChange} />
      </label>
    );
  }
}
