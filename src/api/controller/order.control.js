import db from "../database.js"
import nodemailer from 'nodemailer';
const orders = (app) => {
async function sendEmail(data_order, total_price, payment_method ) {
  try {
    
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587,             
    secure: false,          
    auth: {
      user: 'bitgabrtest@gmail.com', 
      pass: 'ykfwkzmfxuwliepa',     
    },
  });
  // Email options
  let mailOptions = {
    from: '"New order" <bitgabrtest@gmail.com>', // sender address
    to: 'mhmdaljwkr935@gmail.com',                  // list of receivers
    subject: 'New order',                   // Subject line
    text: `
     <h1> لديك اوردار جديد الرجاء متابعت الاوردر! </h1>
    
  
    
    `,
     html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007BFF;">تفاصيل الاوردار</h2>
          <h2 style="color: #007BFF;">data order:${data_order}</h2>
          <h2 style="color: #007BFF;">total price:${total_price} EGP</h2>
          <h2 style="color: #007BFF;">payment method:${payment_method}</h2>
      </div>
    `,
  };
  // Send mail
  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
    
  }
}

app.post('/orders', (req, res) => {
  const { data_order, total_price, payment_method,user_name } = req.body;
  const { street_address, floor, city, region, phone_number } = req.body;
  let user_id=req.body.user_id

  console.log('start----------');
  console.log( data_order, total_price, payment_method,user_name ,street_address, floor, city, region, phone_number,user_id);
  

  const order_code = Math.floor(Math.random() * 1000000);
  db.serialize(() => {
    
    db.run('BEGIN TRANSACTION');
    // Insert into orders
    db.run(
      `INSERT INTO orders (user_name,user_id,phone_number, data_order, payment_method, total_price, order_code) VALUES (?,?,?, ?, ?, ?, ?)`,
      [user_name,user_id==0||!user_id ? 2 : user_id,phone_number, data_order, payment_method, total_price, order_code],
      function (err) {
        if (err) {
          db.run('ROLLBACK');
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
        // Update total_price_all_orders for the user
        // SQLite does not support +=, so do: total_price_all_orders = total_price_all_orders + ?
        db.run(
          `UPDATE users SET total_price_all_orders = COALESCE(total_price_all_orders, 0) + ? WHERE id = ?`,
          [total_price,user_id==0||!user_id ? 2 : user_id],
          function (err) {
            if (err) {
              db.run('ROLLBACK');
              return res.status(500).json({ error: err.message });
            }
            // Insert into address
            db.run(
              `INSERT INTO address (street_address, floor, city, region, phone_number, order_code) VALUES (?, ?, ?, ?, ?, ?)`,
              [street_address, floor, city, region, phone_number, order_code],
              function (err) {
                if (err) {
                  db.run('ROLLBACK');
                  return res.status(500).json({ error: err.message });
                }
                // Commit transaction
                db.run('COMMIT', (err) => {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }
                  // Success response
                  res.status(201).json({ order_code });
                  sendEmail(data_order, total_price, payment_method)
                  return;
                });
              }
            );
          }
        );
      }
    );
  });
});

app.get('/ ', async (req, res) => {

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
    res.json(rows);
});
});
app.post('/show_order', (req, res) => {
  const order_code = req.body.order_code;
  if (!order_code) {
    return res.status(400).json({ error: 'Product code is required' });
  }
  db.all(`SELECT address.*, orders.* 
FROM orders 
JOIN address ON orders.order_code = address.order_code 
WHERE orders.order_code = ?;`, [order_code], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // console.log(row);
    
    res.json(row[0]);
  });
});
app.post('/update_order_status', (req, res) => {
  const order_code = req.body.order_code;
  const order_status = req.body.order_status;
  if (!order_code) {
    return res.status(400).json({ error: 'Product code is required' });
  }
  db.run(`UPDATE orders SET status = ? WHERE order_code = ?`, [order_status, order_code], function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Rows updated: ${this.changes}`);
    res.json({ok: true});
});
})

//حل مشكلة الغاء الطلب

 app.get('/active_orders', async (req, res) => {

  db.all(`SELECT * FROM orders WHERE status IN ('Pending', 'Processing'); `, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      // console.log(rows);
      
      res.json(rows);
  });
});
// app.get('/pending_orders', async (req, res) => {
// const getPendingOrdersCount = async () => {
//   return new Promise((resolve, reject) => {
//     db.get(
//       `SELECT COUNT(*) AS count FROM orders WHERE status = 'pending'`,
//       (err, row) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(row.count);
//         }
//       }
//     );
//   });
// // }});
// }
// console.log(getPendingOrdersCount);
// app.post('/search_orders', async (req, res) => {
//    const searchTerm = req.body.search;
//   const sql = `
//  SELECT * FROM orders
// WHERE order_code LIKE ?;
//   `;
//   const likeTerm = `%${searchTerm}%`;
//   console.log(likeTerm);
  
//   db.all(sql, [likeTerm], (err, rows) => {
//     if (err) {
//       res.json([]);
//       return console.log(err);
      
//     }
//     console.log(rows);
    
//     res.json(rows || []);
//   });
   
// });
// }
app.post('/search_orders', (req, res) => {

  const searchTerm = req.body.search;
    let sql = `
    SELECT orders.*, users.user_name, users.name,users.id,users.phone_number
    FROM orders
    JOIN users ON users.id = orders.user_id
    WHERE users.name LIKE ? OR users.phone_number LIKE ? OR orders.order_code LIKE ?
    ORDER BY orders.created_at DESC
  `;
   let sql2 = `
    SELECT 
            users.phone_number,
            users.name,
            orders.status,
            orders.order_code,
            orders.total_price,
            orders.created_at
        FROM 
            users
        JOIN 
            orders ON users.id = orders.user_id;
  `;


  
  const likeTerm = `%${searchTerm}%`;
  console.log('Search term:', likeTerm);
  db.all(sql, [likeTerm, likeTerm, likeTerm], (err, rows) => {

    if (err) {
              console.log('Database error:', err);
              return  res.json(rows);;
    }
    // console.log('Search results:', rows);
    res.json(rows);
  });
});
}
export default orders;