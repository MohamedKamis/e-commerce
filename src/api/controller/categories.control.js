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
}
export default categories;