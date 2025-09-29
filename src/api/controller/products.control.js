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

  const { sections_code, name_product, price, description, brand , products_Status  , sizes ,material} = req.body;
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
      'INSERT INTO products (sections_name,sections_code, name_product, price, description, brand, image_url, products_Status, products_code , sizes ,material) VALUES (? ,?, ?, ?, ?, ?, ?,?,?,?,?)',
      [sections_name,sections_code, name_product, price, description, brand, image_url,products_Status, products_code , sizes ,material],
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
app.get('/getRandomProducts', (req, res) => {
  db.all(`SELECT * FROM products ORDER BY RANDOM() LIMIT 8`, [], (err, rows) => {
      if (err) {
          throw err;
      }
      return res.json(rows);
  });
});
app.post('/product/remove', (req, res) => {
  const { id } = req.body;
  db.run(`DELETE FROM products WHERE id = ?;`, [id], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ id});
  });
});

app.post('/search_product', (req, res) => {

  const searchTerm = req.body.search;
    let sql = `
    SELECT *
    FROM products
    WHERE products.name_product LIKE ? OR products.sections_name LIKE ?
  `;

  const likeTerm = `%${searchTerm}%`;
  console.log('Search term:', likeTerm);
  db.all(sql, [likeTerm, likeTerm], (err, rows) => {

    if (err) {
              console.log('Database error:', err);
              return  res.json(rows);
    }
    // console.log('Search results:', rows);
    res.json(rows);
  });
});

// app.post('/search_product_price', (req, res) => {

//   const {from,to,section} = req.body;
//     let sql = `
//     SELECT *
//     FROM products
//     WHERE products.sections_name LIKE ? AND products.price BETWEEN ? AND ?
//   `;      
//   // const likeTerm = `%${searchTerm}%`;
//   console.log('Search term:', Number(from),Number(to));
//   db.all(sql, [`%${section}%`,Number(from),Number(to)], (err, rows) => {

//     if (err) {
//               console.log('Database error:', err);
//               return  res.json(rows);
//     }
//     // console.log('Search results:', rows);
//     res.json(rows);
//   });
// });
app.post('/search_product_price', (req, res) => {
  const { from, to, section } = req.body;
  const fromNum = Number(from);
  const toNum = Number(to);

  let sql = `
    SELECT *
    FROM products
    WHERE products.sections_name LIKE ?
    ORDER BY RANDOM()
    LIMIT 100
  `;

  db.all(sql, [`%${section}%`], (err, rows) => {
    if (err) {
      console.log('Database error:', err);
      return res.json([]);
    }

    // Filter rows in JS based on first number in price JSON
    const filteredRows = rows.filter(row => {
      try {
        const priceObj = JSON.parse(row.price); // parse JSON string
        const firstKey = Object.keys(priceObj)[0];
        const priceStr = priceObj[firstKey]; // e.g. "556-987-988"
        const firstNumberStr = priceStr.split('-')[0]; // "556"
        const firstNumber = parseInt(firstNumberStr, 10);

        return firstNumber >= fromNum && firstNumber <= toNum;
      } catch (e) {
        // If parsing fails, exclude this row
        return false;
      }
    }).slice(0, 16); // limit to 16 results after filtering

    res.json(filteredRows);
  });
});

}
export default products;