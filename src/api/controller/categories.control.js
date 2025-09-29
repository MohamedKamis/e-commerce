import db from "../database.js"

const categories = (app) => {
// Add a new category
app.post('/categories', (req, res) => {
  const { name_categorie, description, image_url } = req.body;
  // console.log(`Received data: ${name_categorie}, ${description}, ${image_url}`);
  
//  const username="electron";const description="zzzzzzzzzzz";const imageUrl="sjgjgjhh.jpg";
  db.run(`INSERT INTO categories (name_categorie, description, image_url , categories_code) VALUES (?, ?, ? , ?)`, [name_categorie, description, image_url, Math.floor(Math.random() * 1000000)], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name_categorie, description, image_url });
  });
});
// Update a category
app.post('/categories/remove', (req, res) => {
  const { id } = req.body;
db.run(`DELETE FROM sections WHERE categories_id = ?;`, [id], function(err) {
  db.run(`DELETE FROM categories WHERE id = ?;`, [id], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ id});
  });
});
});
app.get('/all', (req, res) => {
  db.all(`SELECT * FROM categories`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});


app.post('/sections', (req, res) => {
  const { section_type, section_position,section_name,image_url } = req.body;
  db.get("SELECT id FROM categories WHERE name_categorie = ?", [section_type], (err, row) => {
    const id=row.id
    const sections_code =Math.floor( Math.random() * 1000000);
    console.log(sections_code);
    
    db.run(`INSERT INTO sections (categories_id, section_type, section_name, section_position,sections_code, image_url) VALUES (?, ?, ?, ?, ?, ?)`, [ id,section_type, section_name,section_position,sections_code,image_url], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, section_type, section_name, section_position ,sections_code: sections_code , image_url });
  });
  });
});
app.get('/all_sections', (req, res) => {
  db.all(`SELECT * FROM sections`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});

// app.post('/search_product_price_category', (req, res) => {

//   const {from,to,section} = req.body;
//     let sql = `
//     SELECT *
//     FROM products
//     WHERE  products.price[0] BETWEEN ? AND ?
//     ORDER BY RANDOM() LIMIT 16
//   `;      
//   // const likeTerm = `%${searchTerm}%`;
//   console.log('Search term:', Number(from),Number(to));
//   db.all(sql, [Number(from),Number(to)], (err, rows) => {

//     if (err) {
//               console.log('Database error:', err);
//               return  res.json(rows);
//     }
//     // console.log('Search results:', rows);
//     res.json(rows);
//   });
// });
app.post('/search_product_price_category', (req, res) => {
  const { from, to, section } = req.body;
  const fromNum = Number(from);
  const toNum = Number(to);

  let sql = `
    SELECT *
    FROM products
    ORDER BY RANDOM()
    LIMIT 100
  `;

  db.all(sql, [], (err, rows) => {
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
export default categories;