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
  app.get('/item-profile', async (req, res) => {
    res.sendFile(path.resolve('./')+'/src/front-end/item-profile.html');
})
  app.get('/checkout', async (req, res) => {
    res.sendFile(path.resolve('./')+'/src/front-end/checkout.html');
})


};

export default frontend;
