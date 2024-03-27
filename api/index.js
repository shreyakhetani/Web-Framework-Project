const express = require('express');

const app = express();

// Now we can get json data from the client
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//IRL we could connect to database

let products = 
[
  {id:1, name: "chair", price: 140},
  {id:2, name: "table", price: 300},
  {id:3, name: "closet", price: 400},
]

//Route to get all the products
// localhost:5000/api/product

app.get('/api/products', (req, res) => {
    res.json(products);
});

// get one product based on id
// localhost:5000/api/products/2
app.get('/api/products/:id', (req, res) => {
  const productId =Number(req.params.id);
  
  const product = products.find(product => product.id === productId);
  if(product)
  {
  res.status(200).json(product)
  }else
  {
  res.status(404).json(
    {
      msg: "Not found"
    }
  )
}
})

// Delete products based on id

app.delete('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
 
  if(product){
    const products = products.filter(product => product.id !== productId);
    res.status(200).json(
      {
      id: productId
    
      });
  }else{
    res.status(404).json(
      {
        msg: "Could not find the product"
      }) 
  }
})

// Create
  app.post('/api/products', (req, res) => {
    // console.log(req.body);
    //res.send(req.body.name);

    const lastId = products[products.length-1].id;
    const newId = lastId + 1;
  
    newProducts = {
      id: newId,
      name: req.body.name,
      price: req.body.price
    }

    products.push(newProducts);
    res.location( 'http://localhost:5000/api/products/' + newId)
    res.status(201).json(newProducts)

  });


  //Upadte the products

  app.patch('/api/products/:id', (req, res) => {

    const idToUpdate = Number(req.params.id);
    const newName = req.body.name;
    const newPrice = req.body.price;

    products.forEach(product => {
      if (product.id === idToUpdate){
        product.name = newName;
        product.price = newPrice;
      }
    });

    const product = products.find(product => product.id === idToUpdate);
    if (product){
     
      res.status(200).json(product)
    }else {
      res.status(404).json({
        msg: "Could not find the product"
      })
    }
    
  })

//Set the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))