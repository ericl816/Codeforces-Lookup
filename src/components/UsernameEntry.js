import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class UsernameEntry extends Component {
  constructor() {
    super();
    this.state = { cfHandle: '', dmojHandle: '', submittedEmail: '' };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { cfHandle, dmojHandle } = this.state;
    this.props.handleSubmit({
      cfHandle,
      dmojHandle,
    });
  }

  render() {
    const { cfHandle, dmojHandle } = this.state;
    return (
      <Form style={{ paddingBottom: 40 }} onSubmit={this.handleSubmit}>
        <Form.Input
          label="Codeforces Handle"
          placeholder="ex. tourist, Petr, rng_58, fateice"
          name="cfHandle"
          value={cfHandle}
          onChange={this.handleChange}
        />
        {/* <Form.Input
          label="DMOJ Handle"
          placeholder="DMOJ Handle"
          name="dmojHandle"
          value={dmojHandle}
          onChange={this.handleChange}
        /> */}
        <Button type='submit' style={{ marginLeft: 'auto', marginRight: 'auto' }}>Submit</Button>
      </Form>
    )
  }
}