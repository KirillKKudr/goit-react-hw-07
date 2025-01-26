import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../../redux/contactOps';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <SearchBox />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList onDeleteContact={handleDeleteContact} />
    </div>
  );
}


