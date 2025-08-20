import path from 'path'
import db from "../database.js"
import multer from 'multer';
import fs from 'fs';
const orders = (app) => {

app.post('/orders', async (req, res) => {
  // const total_price= await total_price();
  
  const { user_id,data_order ,total_price} = req.body;
  const { street_address, floor, city, region,phone_number} = req.body;
  const order_code=Math.floor(Number(Math.random() * 1000000));
  db.run(`INSERT INTO orders (user_id, data_order, total_price, order_code) VALUES (?, ?, ?, ? )`, [user_id,data_order,total_price,order_code], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
   db.run(`INSERT INTO address (street_address, floor, city, region,phone_number,order_code) VALUES (?, ?, ?, ?,?,? )`, [street_address, floor, city, region,phone_number,order_code], function(err) {
            
   }  )
      if (err) {
      res.status(201).json({ order_code:order_code });
  };
});
});
 app.get('/all_orders_show', async (req, res) => {

  db.all(`SELECT * FROM orders`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });

});
 app.get('/all_address', async (req, res) => {

  db.all(`SELECT * FROM address`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});

app.get('/all_orders', (req, res) => {
//   const { order_code } = req.body;
// db.run(`SELECT * FROM orders WHERE order_code = ?;`, [order_code], function(err) {
//   db.run(`DELETE FROM categories WHERE id = ?;`, [id], function(err) {
//       if (err) {
//           return res.status(500).json({ error: err.message });
//       }
//       res.json({ id});
//   });
// });
db.all(`SELECT 
            users.phone_number,
            users.name,
            orders.status,
            orders.order_code,
            orders.data_order,
            orders.total_price,
            orders.created_at,
            address.*
        FROM 
            users
        JOIN 
            orders ON users.id = orders.user_id
        JOIN 
            address ON orders.order_code = address.order_code;`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows); // Output the result
    res.json(rows);
});
});
}
export default orders;