const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req,res) => {
  res.send('<h1>Home Page</h1>');
});

//get html page 
app.get('/contact', (req, res) => {
  //res.sendFile('./public/contact.html');
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});


//Declare static folder
app.use(express.static(path.join(__dirname,"public")))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))