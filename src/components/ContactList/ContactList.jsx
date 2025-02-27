import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  if (contacts.length === 0) {
    return <p>Список контактів порожній.</p>;
  }

  return (
    <div>
      {contacts.map((contact) => (
        <Contact key={contact.id} contactItem={contact} />
      ))}
    </div>
  );
};

export default ContactList;