import path from 'path'

const frontend = (app) => {

  app.get('/login', async (req, res) => {
    res.sendFile(path.resolve('./')+'/src/front-end/login.html');
})
  app.get('/category', async (req, res) => {
    res.sendFile(path.resolve('./')+'/src/front-end/category.html');
})
  app.get('/category/items', async (req, res) => {
    res.sendFile(path.resolve('./')+'/src/front-end/item.html');
})
  app.get('/dashbord', async (req, res) => {
    res.sendFile(path.resolve('./')+'/src/front-end/dashbord.html');
})


};

export default frontend;
