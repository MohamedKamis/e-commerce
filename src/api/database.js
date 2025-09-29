// database.js
import sqlite3 from 'sqlite3';
const sqlite=new sqlite3.verbose();
const db = new sqlite.Database('./src/api/db/all_data.db');

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
        price REAL NOT NULL,
        description TEXT,
        brand TEXT NOT NULL,
        image_url TEXT NOT NULL,
        products_Status TEXT NOT NULL,
        sizes TEXT,
        material TEXT ,
        products_code TEXT NOT NULL
    )`);
          db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL UNIQUE,
        name TEXT ,
        pass TEXT ,
        status TEXT ,
        email TEXT ,
        phone_number TEXT ,
        account_type TEXT NOT NULL,
        customer_id TEXT NOT NULL,
        history TEXT NOT NULL,
        total_price_all_orders REAL DEFAULT 0

    )`);
         db.run(`CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                user_name TEXT NOT NULL,
                phone_number TEXT ,
                data_order TEXT NOT NULL,
                total_price DECIMAL(10, 2) NOT NULL,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                order_code TEXT NOT NULL,
                payment_method TEXT 

    )`);
       db.run(`CREATE TABLE IF NOT EXISTS address (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                country TEXT DEFAULT 'مصر',
                Street_address TEXT NOT NULL,
                floor TEXT ,
                city TEXT NOT NULL,
                region TEXT NOT NULL,
                phone_number,
                order_code bigint REFERENCES orders(order_code)
    )`);
         db.run(`CREATE TABLE IF NOT EXISTS imgs_colors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                status TEXT DEFAULT 'active',
                color_name TEXT NOT NULL,
                imgs_url TEXT NOT NULL,
                prodect_code bigint REFERENCES products(products_code),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )`);
 db.run(`INSERT OR IGNORE INTO users (user_name, name, pass, status, email, phone_number, account_type, customer_id, history, total_price_all_orders) 
            VALUES ('admin', 'Administrator', 'admin123', 'active', 'bitgabrtest@gmail.com', '0000000000', 'admin', 'ADMIN001', '[]', 0)`);
    
    // Insert default Anonymous client user (account_type: 'anonymous' for guest-like access; can be used as template for clients)
    // This allows anonymous/guest access in the app; real clients can be inserted dynamically with 'client' type
    // Note: For access control, your app logic should check account_type (e.g., only 'admin' or 'client' can access certain features; deny others)
    db.run(`INSERT  OR IGNORE INTO users (user_name, name, pass, status, email, phone_number, account_type, customer_id, history, total_price_all_orders) 
            VALUES ('anonymous', 'Anonymous Client', '', 'active', 'anonymous@example.com', '0000000000', 'anonymous', 'ANON001', '[]', 0)`);
      
});

export default db;
