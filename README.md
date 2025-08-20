# e-commerce
git commit -m "2"
git status
git add . 
git bush
git fetch origin
placeholder="https://placehold.co/600x400"
https://www.blackbox.ai/screenshot/YcaL2kPzQPjwE5QcH69Xc

git remote add origin https://github.com/MohamedKamis/e-commerce.git
git branch -M main
git push -u origin main

echo "# e-commerce" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/MohamedKamis/e-commerce.git
git push -u origin main


https://www.blackbox.ai/screenshot/ce-2LSEdYru51_FRuyS_b
https://www.blackbox.ai/chat/3vTfAvD

make dashbord for projact e-comers for controler prodect add updata delete 
make dashbord for projact e-comers for controler Customers add updata block,(Total purchase value and whether there are active orders or not, customer information (id , name and any data  projact need))

///////////////// 1-install packages /////////////////////
--------------------------------------------------------------
(
npm i
yarn i
)

git config --global user.email "mhmdaljwkr935@gmail.com"

--------------------------------------------------------------

open the psql shell on your machine and apply its default configurations
create your user with superuser privileges and create the two databases for development and testing purposes
------------------------------------------------------
CREATE USER postgres WITH PASSWORD '12345' SUPERUSER;
CREATE DATABASE store OWNER store ENCODING UTF8;
------------------------------------------------------
CREATE File  (.env)
--------------------
add this data in File (
        PORT=2000
        NODE_ENV=dev

        Postgres_host=127.0.0.1
        Postgres_user=postgres
        Postgres_password=12345
        Postgres_database=store

        BCRYPT_PASSWORD=your-secret-password 
        SALT_ROUNDS=10
        TOKEN_SECRET=your-secret-token
)

///////////////// 3- run migrate  ////////////////////////////
--------------------------------------------------------------
(
npm run mu || yarn mu /*for db-migrate up*/
npm run md || yarn mu /*for db-migrate done*/
)
///////////////// 4- run projact  ////////////////////////////
--------------------------------------------------------------

npm run dev || yarn dev

///////////// 5- CRUD user product order order_product  ////////////////
----------------------------------
http://localhost:2000/product
        (post)
will return the new added product
Body: {
    name: 'new product',
    price: 250,
}
-----------------------------------
|
----------------------------------
http://localhost:2000/product
        (get)
you well get all prodect
-----------------------------------
|
-----------------------------------
http://localhost:2000/product/id
        (get)
you well get a prodect (id)
 ____________________________________________________________
|                                                            |
| you can changing (prodect) =>{user , order , order-product}|
|____________________________________________________________|

///////////// 6- log in  ////////////////
http://localhost:2000/user/login

Body: {
    firstname: 'firstname user',
    password: 'pass user',
}

<<<<<<<<<<<<<<------Have fun---------->>>>>>>>>>>>>>>
الصفحه الرايسيه 
  فرع
   قسم


# e-commerce
