

import db from "../database.js"
import jwt from 'jsonwebtoken';
const users = (app) => {
app.post('/add_user',(req, res) => {

  const { name, user_name, pass, phone_number,email ,account_type} = req.body;
  console.log(`Received data: ${name}, ${user_name}, ${pass}, ${phone_number}, ${email}, ${account_type}`);
  
    const status ='Active';
    const customer_id = Math.floor(Number(Math.random() * 1000000)) ;
    const history =   new Date().toISOString();
    db.run(
      'INSERT INTO users (user_name , name  , pass,status, email , phone_number, account_type , customer_id ,history) VALUES (? ,?, ?, ?, ?,?, ?,?,?)',
      [user_name , name  , pass,status, email , phone_number, account_type , customer_id , history],
      function(err) {
        if (err) {
            console.log(err);
            
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
          id: this.lastID,
          message: 'Product created successfully'
        });
      }
     
    );

  });
app.get('/all_users', (req, res) => {
  const sql = `
    SELECT 
     users.total_price_all_orders,
      users.name,
      users.user_name,
      users.history,
      users.phone_number,
      users.email,
      users.customer_id,
      users.status,
      users.pass,
     
      CASE 
        WHEN orders.status IN ('pending', 'Processing') THEN 1
        ELSE 0
      END AS order_status
    FROM users
    LEFT JOIN orders ON users.id = orders.user_id 
      AND orders.status IN ('pending', 'Processing')
    GROUP BY users.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Convert order_status from 0/1 to boolean true/false
    const result = rows.map(row => ({
      ...row,
      order_status: row.order_status === 1
    }));
    res.json(result);
  });
})

app.post('/login', (req, res) => {
  const { user_name, pass } = req.body;


  console.log(`Login attempt with username: ${user_name}`);
  
  db.get('SELECT * FROM users WHERE user_name = ? AND pass = ?', [user_name, pass], (err, row) => {
    
      if(user_name == 'admin'){
        const { TOKEN_SECRET } = process.env
        if (!row) {
        return res.json({ login: false });
        }

        const tokin = jwt.sign({ user_id: row.id }, TOKEN_SECRET );
        return res.json({tokin:tokin,login:true});
  }

    if (err) {
       res.status(500).json({ error: err.message });
       return
    }
    if (!row) {
       res.json({ error: 'Invalid username or password' });
       return;
    }
    res.json({
      id: row.id,
      user_name: row.user_name,
      customer_id: row.customer_id,
      message: 'Login successful'
    });
  });
}
);
app.post('/verifyAuthToken', (req, res) => {
         const TOKEN_SECRET = process.env.TOKEN_SECRET;
          if (!TOKEN_SECRET) {
            return res.status(500).json({ error: 'Token secret is not defined' });
          }
          try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
              return res.status(401).json({ error: 'Authorization header missing' });
            }
            const token = authorizationHeader.split(' ')[1];
            if (!token) {
              return res.status(401).json({ error: 'Token missing' });
            }
            const decoded = jwt.verify(token, TOKEN_SECRET);
            // Optionally attach decoded token to request object
            // req.user = decoded;
           res.json({message: 'Token verified successfully',login:true});
            return;
          } catch (error) {
            res.status(401).json({
              error:
                'Access denied, invalid token. Please go to login page and try again',
            });
          }
  });
// Route to block a user (set status back to 'active')
  app.post('/block_user', (req, res) => {
  const userId = req.body.customer_id;
  const sql = `UPDATE users SET status = 'block' WHERE customer_id = ?`;
  db.run(sql, [userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User  not found' });
    }
    res.json({ message: 'User  blocked successfully' });
  });
});
// Route to unblock a user (set status back to 'active')
app.post('/unblock_user', (req, res) => {
  const userId = req.body.customer_id;
  const sql = `UPDATE users SET status = 'active' WHERE customer_id = ?`;
  db.run(sql, [userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User  not found' });
    }
    res.json({ message: 'User  unblocked successfully' });
  });
});

app.post('/updataAdminPassowrd', (req, res) => {
  const pass = req.body.pass;
  console.log(pass);
  
  const sql = `UPDATE users SET pass = ? WHERE user_name = 'admin'`;
  db.run(sql, [pass], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User  not found' });
    }
    res.json({ message: 'User  chang passowrd successfully' });
  });
});

}
export default users;