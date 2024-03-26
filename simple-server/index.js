const http = require('http');
const fs = require('fs');

// creating server
const server = http.createServer((request,response) => {
//response.end('Server is running!');

// Routing

const pathName = request.url;
if (pathName === '/')
{
    response.end('Home')
}
else if(pathName === '/product')
{
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end('<h1>Product page</h1>')
}
else if(pathName === '/about-us') 
{
  fs.readFile('./public/about-us.html', 'utf-8', (err, data) => {
 
    if(err)
    {
      response.writeHead(500, {'Content-Type' : 'text/html'})
      response.end('Error');
      console.log(err.message);
    }
    else{
      
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
    }
 
})
}

else if (pathName === '/styles.css') {
  fs.readFile('./public/styles.css', (err, data) => {
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.end(data);
  })

}
else
{
  response.writeHead(404);
  response.end('Page not found');
}


});

// server stratrs to listen if it gets any requests
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening reqest on port 8000')

    // ctrl + c stop listening
});

 