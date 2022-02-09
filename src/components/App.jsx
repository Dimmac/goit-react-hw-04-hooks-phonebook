import { Component } from 'react';
import { nanoid } from 'nanoid';
import {ContactForm} from './Form/Form';
import {Filter} from './Filter/Filter';
import {ContactList} from './ContactList/ContactList';
import { Container } from './App.global.styled';
import { TitlePhoneBook, TitleContacts, Section } from './App.styled';

const LocalStorageKey = 'contactsKey';

export default class App extends Component {

  state = {
    contacts: [],
    filter: '',
  };

  generateId = nanoid();

  componentDidMount() {
    const contacts = localStorage.getItem(LocalStorageKey);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevcontacts = prevState.contacts;
    const nextcontacts = this.state.contacts;

    if (nextcontacts !== prevcontacts) {
      localStorage.setItem(LocalStorageKey, JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    const { name } = data;
    const normalizedNameContact = name.toLowerCase();

    const newContact = { id: nanoid(), ...data };

    this.findContactName(normalizedNameContact)
      ? alert(`${name} is already in contacts.`)
      : this.setState(previousState => {
          return { contacts: [...previousState.contacts, newContact] };
        });
  };
  findContactName = nameData => {
    const { contacts } = this.state;
    return contacts.find(({ name }) => name.toLowerCase() === nameData);
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };
  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  getFilterContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };
  render() {

    const { filter } = this.state;
    const visibleContact = this.getFilterContact();
    return (
      <Container>
        <Section>
          <TitlePhoneBook>Phonebook</TitlePhoneBook>
          <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
        </Section>
        <Section>
          <TitleContacts>Contacts</TitleContacts>
          <Filter value={filter} onChange={this.changeFilter}></Filter>
          <ContactList
            visibleContact={visibleContact}
            onDeleteContact={this.deleteContact}
          ></ContactList>
        </Section>
      </Container>
    );
  }
}