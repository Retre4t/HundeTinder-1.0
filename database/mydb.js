// database/db.js
import SQLite from 'react-native-sqlite-storage';
import data from './data'; // Import your data.js file

const db = SQLite.openDatabase(
  { name: 'mydb.js', location: 'default' },
  () => {},
  (error) => {
    console.error(`Error opening database: ${error}`);
  }
);

const openDatabaseAndCreateTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS animals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imgURL TEXT, category TEXT)',
      [],
      () => {
        console.log('Table created successfully');
        // Insert data from data.js into the database
        data.forEach((animal) => {
          tx.executeSql(
            'INSERT INTO animals (name, category, imgURL) VALUES (?, ?, ?)',
            [animal.name, animal.imgURL, animal.category],
            () => {
              console.log('Animal inserted successfully');
            },
            (error) => {
              console.error(`Error inserting animal: ${error}`);
            }
          );
        });
      },
      (error) => {
        console.error(`Error creating table: ${error}`);
      }
    );
  });
};

const fetchAnimals = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name, imgURL FROM animals',
        [],
        (tx, results) => {
          const len = results.rows.length;
          const animals = [];

          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            animals.push({ name: row.name, imgURL: row.imgURL });
          }

          resolve(animals);
        },
        (error) => {
          console.error(`Error fetching animals: ${error}`);
          reject(error);
        }
      );
    });
  });
};

export { openDatabaseAndCreateTable, fetchAnimals };
