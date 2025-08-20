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

  const { sections_code, name_product, price, description, brand , products_Status } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  
  // First verify the section exists
  db.get('SELECT * FROM sections WHERE sections_code = ?', [sections_code], (err, section) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!section) {
      return res.status(400).json({ error: 'Section does not exist' });
    }
    // Then insert the product
    
    const products_code = Math.floor(Number(Math.random() * 1000000));
    const sections_name = section.section_name;
    db.run(
      'INSERT INTO products (sections_name,sections_code, name_product, price, description, brand, image_url, products_Status, products_code) VALUES (? ,?, ?, ?, ?, ?, ?,?,?)',
      [sections_name,sections_code, name_product, price, description, brand, image_url,products_Status, products_code],
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

app.get('/product', (req, res) => {
  const productCode = req.query.product;
  if (!productCode) {
    return res.status(400).json({ error: 'Product code is required' });
  }
  db.get('SELECT * FROM products WHERE products_code = ?', [productCode], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(row);
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