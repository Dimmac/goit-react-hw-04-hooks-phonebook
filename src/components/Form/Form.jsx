import { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormPhoneBook, LabelPhoneBook, InputPhoneBook, ButtonPhoneBook } from './Form.styled';
import PropTypes from 'prop-types'

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    name: '',
    number: '',
  };
  handleNameChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const id = nanoid();
    this.props.onSubmit({ id, ...this.state });
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    const { name, number } = this.state;
    return (
      <FormPhoneBook onSubmit={this.handleSubmit}>
        <LabelPhoneBook>
          Name
          <InputPhoneBook
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            autoComplete="off"
            value={name}
            onChange={this.handleNameChange}/>
        </LabelPhoneBook>
        <LabelPhoneBook>
          Number
          <InputPhoneBook
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            autoComplete="off"
            value={number}
            onChange={this.handleNameChange}/>
        </LabelPhoneBook>
        <ButtonPhoneBook type="submit">Add contact</ButtonPhoneBook>
      </FormPhoneBook>
    );
  }
}