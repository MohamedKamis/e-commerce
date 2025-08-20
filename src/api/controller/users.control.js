

import db from "../database.js"
const users = (app) => {
app.post('/add_user',(req, res) => {

  const { name, user_name, pass, phone_number,email ,account_type} = req.body;
  console.log(`Received data: ${name}, ${user_name}, ${pass}, ${phone_number}, ${email}, ${account_type}`);
  
    const stutes ='Active';
    const customer_id = Math.floor(Date.now()) ;
    const hestory =   new Date().toISOString();
    db.run(
      'INSERT INTO users (user_name , name  , pass,stutes, email , phone_number, account_type , customer_id ,hestory) VALUES (? ,?, ?, ?, ?,?, ?,?,?)',
      [user_name , name  , pass,stutes, email , phone_number, account_type , customer_id , hestory],
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

  db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });

});
app.post('/login', (req, res) => {
  const { user_name, pass } = req.body;
  console.log(`Login attempt with username: ${user_name}`);
  
  db.get('SELECT * FROM users WHERE user_name = ? AND pass = ?', [user_name, pass], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({
      id: row.id,
      user_name: row.user_name,
      customer_id: row.customer_id,
      message: 'Login successful'
    });
  });
}
);}
export default users;