import db from "../database.js"

const categories = (app) => {
// Add a new category
app.post('/categories', (req, res) => {
  const { name_categorie, description, image_url } = req.body;
  // console.log(`Received data: ${name_categorie}, ${description}, ${image_url}`);
  
//  const username="electron";const description="zzzzzzzzzzz";const imageUrl="sjgjgjhh.jpg";
  db.run(`INSERT INTO categories (name_categorie, description, image_url) VALUES (?, ?, ?)`, [name_categorie, description, image_url], function(err) {
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
  const { section_type, section_position,section_name } = req.body;
  db.get("SELECT id FROM categories WHERE name_categorie = ?", [section_type], (err, row) => {
    const id=row.id
    db.run(`INSERT INTO sections (categories_id, section_type, section_name, section_position) VALUES (?, ?, ?, ?)`, [ id,section_type, section_name,section_position], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, section_type, section_name, section_position });
  });
  })
});
app.get('/all_sections', (req, res) => {
  db.all(`SELECT * FROM sections`, [], (err, rows) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(rows);
  });
});
}
export default categories;