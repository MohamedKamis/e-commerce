// database.js
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('./src/api/db/all_data.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_categorie TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        categories_code NOT NULL
    )`);
     db.run(`CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categories_id bigint REFERENCES categories(id),
        section_type TEXT NOT NULL,
        section_name TEXT,
        section_position number NOT NULL,
        sections_code TEXT NOT NULL,
        image_url TEXT NOT NULL
    )`);

     db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sections_name TEXT NOT NULL,
        sections_code bigint REFERENCES sections(sections_code),
        name_product TEXT NOT NULL,
        price TEXT NOT NULL,
        description TEXT,
        brand TEXT NOT NULL,
        image_url TEXT NOT NULL,
        products_Status TEXT NOT NULL,
        products_code TEXT NOT NULL
    )`);
          db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        name TEXT NOT NULL,
        pass TEXT NOT NULL,
        stutes TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        account_type TEXT NOT NULL,
        customer_id TEXT NOT NULL,
        hestory TEXT NOT NULL

    )`);
         db.run(`CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                data_order TEXT NOT NULL,
                total_price DECIMAL(10, 2) NOT NULL,
                status TEXT DEFAULT 'PENDING',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                order_code TEXT NOT NULL
    )`);
       db.run(`CREATE TABLE IF NOT EXISTS address (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Country TEXT DEFAULT 'مصر',
                Street_address TEXT NOT NULL,
                floor TEXT ,
                city TEXT NOT NULL,
                region TEXT NOT NULL,
                phone_number,
                order_code bigint REFERENCES orders(order_code)
    )`);
      
});

export default db;
