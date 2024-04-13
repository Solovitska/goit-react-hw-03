import styles from './App.module.css';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';

const defaultContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
    const [contactList, setContactList] = useState(() => {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : defaultContacts;
    
    });

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contactList));
    }, [contactList]);

    const handleSearchInputChange = useCallback(value => {
        setSearchInput(value);
    }, []);

    const handleContactFormSubmit = useCallback(({ name, number }, actions) => {
        const newContact = {
            id: nanoid(),
            name,
            number
        };
        setContactList(prevContactList => [...prevContactList, newContact]);
        actions.resetForm();
    }, []);

    const handleContactDelete = useCallback(idToDelete => {
        setContactList(prevContactList => prevContactList.filter(contact => contact.id !== idToDelete));
    }, []);

    const filteredContactList = useMemo(
        () => contactList.filter(contact => contact.name.toLowerCase().includes(searchInput.toLowerCase())),
        [contactList, searchInput]
    );
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Phonebook</h1>
            <ContactForm handleSubmit={handleContactFormSubmit} />
            <SearchBox searchValue={searchInput} handleChange={handleSearchInputChange} />
            <ContactList contacts={filteredContactList} onDelete={handleContactDelete} />
        </div>
    );
}