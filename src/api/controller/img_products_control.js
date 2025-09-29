import path from 'path'
import db from "../database.js"
import multer from 'multer';
import fs from 'fs';
const imgs_colors = (app) => {

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

app.post('/imgs_colors_add', upload.single('image'), (req, res) => {

  const { color_name, prodect_code} = req.body;

  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(image_url,prodect_code,color_name);
    
    db.run(
      'INSERT INTO imgs_colors ( color_name, prodect_code, imgs_url) VALUES (? ,?,? )',
      [ color_name, prodect_code,image_url],
      function(err) {
        if (err) {
            console.log(err);
            
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
          id: this.lastID,
          message: 'Color Product created successfully'
        });
      }
     
    );

})

app.get('/imgs_colors', (req, res) => {
  db.all('SELECT * FROM imgs_colors', (err, rows) => {
    res.json(rows);
  });
});
app.post('/imgs_color', (req, res) => {
  // console.log('starts.......');
  
    const { prodect_code } = req.body;
    // console.log(prodect_code);
    
  db.all(`SELECT * FROM imgs_colors WHERE prodect_code = ?;`, [prodect_code],  (err, row) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(row)
      
});
})

app.post('/imgs_colors/remove', (req, res) => {
  const { id } = req.body;
  db.run(`DELETE FROM imgs_colors WHERE id = ?;`, [id], function(err) {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ id});
  });
});

}

export default imgs_colors;