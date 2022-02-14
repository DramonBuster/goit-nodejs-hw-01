const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    const contactsList = JSON.parse(await fs.readFile(contactsPath));

    return contactsList;
}

async function getContactById(contactId) {
    const contactsList = await listContacts();
    const searchedContact = contactsList.find(contact => contact.id === `${contactId}`);

    if (!searchedContact) {
        return null;
    }

    return searchedContact;
}

async function addContact(name, email, phone) {
    const contactsList = await listContacts();
    const newContact = { name, email, phone, id: nanoid() };
    
    contactsList.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))

    return contactsList;
}

async function removeContact(contactId) {
    const contactsList = await listContacts();
    const indexOfContact = contactsList.findIndex(contact => contact.id === `${contactId}`);

    console.log("Removing contact:");
    console.table(contactsList[indexOfContact]);

    contactsList.splice(indexOfContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
    return contactsList;
}

module.exports = {
    listContacts, 
    getContactById,
    addContact,
    removeContact,
}