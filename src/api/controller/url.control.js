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
//   app.get('/user/:id', verifyAuthToken, show_user);
//   app.post('/user', create_user);
//   app.post('/user/log', authenticate);
//   app.get('/user/order/:user_id', verifyAuthToken, view_userOrder);

};
export default frontend;
