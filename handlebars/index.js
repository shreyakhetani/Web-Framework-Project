const express = require('express');
const exphbs =  require('express-handlebars');

const app = express();

// Dumy database IRL we will get data from mongoDB
const products = 
[
  {
    name: 'Kia',
    price: 25000
  },
  {
    name: 'Volvo',
    price: 30000
  }
]

app.get('/products', (req, res) =>{
  res.render('products',
  {
    title: 'Products',
    products: products
  }
  
  )
})

// Default handlebars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app. get ('/', (req, res ) => {
  //res.render('index');
  res.render('index', 
  {
    title: 'Home',
    companyName: 'Business Ltd'
  }
  )
});
app. get ('/contact', (req, res ) => {
  res.render('contact');
});

//Folder for static files like css, jpg
app.use(express.static('public'));

app.use((req, res, next) => {
  res.status(404).send('Sorry could not find the content');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));