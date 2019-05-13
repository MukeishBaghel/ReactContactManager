import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';

export default class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    // console.log(this.state);
    const { name, email, phone } = this.state;

    // check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      id: uuid(),
      name,
      email,
      phone
    };

    dispatch({ type: 'ADD_CONTACT', payload: newContact });

    // clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
    this.props.history.push('/');
  };
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-2">
              <div className="card-header">Add Contact</div>
              <form
                className="card-body"
                onSubmit={this.onSubmit.bind(this, dispatch)}
              >
                <TextInputGroup
                  lable="Name"
                  name="name"
                  placeholder="Enter Name.."
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextInputGroup
                  lable="Email"
                  name="email"
                  placeholder="Enter Email.."
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextInputGroup
                  lable="Phone"
                  name="phone"
                  placeholder="Enter Phone.."
                  value={phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
