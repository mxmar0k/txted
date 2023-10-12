import { openDB } from 'idb';

// here we initialize the database (im adding comments to everything 4 later)
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Database already exists: jate');
        return;
      }
      // and here we create a new object store called 'jate'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Database created: jate');
    },
  });

// here we can add data to the database
export const putDb = async (content) => {
  console.log('Adding data to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ content: content });
  const result = await request;
  console.log('Data added to the database:', result);
};

// here we retrieve all data from the database
export const getDb = async () => {
  console.log('Retrieving all data from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result;
};

// Initialize the database when the script runs
initdb();
