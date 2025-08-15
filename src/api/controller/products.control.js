import path from 'path'
import db from "../database.js"
import multer from 'multer';
import fs from 'fs';
const products = (app) => {
    const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './src/front-end/uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.post('/products', upload.single('image'), (req, res) => {
    console.log('started');
    
  const { section_name, name_product, price, description, brand } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  console.log(`Received data: ${section_name}, ${name_product}, ${price}, ${description}, ${brand}, ${image_url}`);
  
  // First verify the section exists
  db.get('SELECT * FROM sections WHERE section_name = ?', [section_name], (err, section) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!section) {
      return res.status(400).json({ error: 'Section does not exist' });
    }
    // Then insert the product
    db.run(
      'INSERT INTO products (section_name, name_product, price, description, brand, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [section_name, name_product, price, description, brand, image_url],
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
});
app.get('/all_products', (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});
}
export default products;