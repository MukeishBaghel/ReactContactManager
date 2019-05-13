import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => {
      this.setState({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone
      });
    });
  }

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

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact)
      .then(res => {
        dispatch({ type: 'UPDATE_CONTACT', payload: res.data });
      });
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
              <div className="card-header">Update Contact</div>
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
                  value="Update Contact"
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
