// database.js
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('./src/api/db/all_data.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_categorie TEXT NOT NULL,
        description TEXT,
        image_url TEXT
    )`);
     db.run(`CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categories_id bigint REFERENCES categories(id),
        section_type TEXT NOT NULL,
        section_name TEXT,
        section_position number NOT NULL
    )`);

     db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section_name bigint REFERENCES sections(section_name),
        name_product TEXT NOT NULL,
        price TEXT NOT NULL,
        Description TEXT,
        Brand TEXT NOT NULL,
        image_url TEXT
    )`);
    //       db.run(`CREATE TABLE IF NOT EXISTS users (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT NOT NULL,
    //     user_name TEXT NOT NULL,
    //     pass TEXT NOT NULL,
    //     phone_number TEXT NOT NULL,
    //     stutes TEXT NOT NULL
    // )`);
});

export default db;
