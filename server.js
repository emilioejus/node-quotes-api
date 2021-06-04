const express = require("express");
const app = express();
let fs = require('fs');
const { report } = require("process");
app.use(express.json());

const quotes = require("./quotes.json");

// fynctions fs
let fsAll =  async (ruta, body, cb) => {
  let fss = await fs.writeFile(ruta, body, error => {
      error ? 
      cb('not successful'. error) :
      cb('successful')
  })

}

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});
app.get("/quotes/:id", function(req, res){
  let id = parseInt(req.params.id);
  console.log( id)
  if(isNaN(id) || id < 0) {
    res.status(400).send('Error it must be a zero or a number greater than zero ')
  } else {
    let quotesFind = quotes.find(jsn => jsn.id === id)
    if(!quotesFind) {
      res.status(404).send(`Error ${id} It was not found!!`)
    }
    res.status(200).json(quotesFind);
  }
  
});

app.post("/quotes", (req, res)=> {
  let quote = req.body;
  quote.id = Math.max(...quotes.map((q) => q.id)) + 1;
  quotes.push(quote);
  fs.writeFile('quotes.json', JSON.stringify(quotes, null, 2), console.log)
  // let dataString = quotes.map(jsn => JSON.stringify(jsn, null, 2));
  // addQuote('quotes.json', `[${dataString}]`, console.log)
  res.status(201).json(quote);
})

app.put("/quotes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let body = req.body;
  let quotesFind = quotes.find(jsn => jsn.id === id);
  quotesFind.author = body.author;
  quotesFind.quote = body.quote;
  fsAll('quotes.json', JSON.stringify(quotes, null, 2), console.log)
  res.status(200).json(quotesFind)
  
})

app.delete("/quotes/:id", (req, res)=> {
  let id = parseInt(req.params.id);
  let quotesFind = quotes.find(jsn => jsn.id === id);
  let quoteDelete = quote => {
   return quote.id != id 
  }
  let dale = quotes.filter(quoteDelete)
  fsAll('quotes.json', JSON.stringify(dale, null, 2), console.log)
  res.status(200).json(quotesFind)

})

server = app.listen(3000, () => {
  console.log(`Listening on port ${server.address().port} http://localhost:${server.address().port}`)
});
