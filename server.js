const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;


const url = "mongodb+srv://demo:demo@cluster0.idtjyh6.mongodb.net/?retryWrites=true"//frans
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
       db = client.db(dbName);
        console.log("Connected!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {entries: result})
  })
})
//note to self: removed date to see layout date: req.body.date,
app.post('/entries', (req, res) => {
  db.collection('entries').insertOne({date: req.body.date, entry: req.body.entry}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

/*app.put('/entries', (req, res) => {
  db.collection('entries')
  .findOneAndUpdate({date: req.body.date, entry: req.body.entry}, {
    $set: {
      heart:req.body.heart 
      
    }
  }, {
    /*sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})*/

//note to sef: removed date to see layout 
app.put('/entries', (req, res) => {
  db.collection('entries')
  .findOneAndUpdate({date: req.body.date, entry: req.body.entry}, {
    $set: {
      update: req.body.update
      
      
    }
  }, {
    /*sort: {_id: -1},*/
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


/*app.put('/entries', (req, res) => {
  db.collection('entries')
  .findOneAndUpdate({date: req.body.date, entry: req.body.entry}, {
    $set: {
      update: req.body.update
      
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})*/





//note to self: removed date to see layout 
app.delete('/entries', (req, res) => {
  db.collection('entries').findOneAndDelete({date: req.body.date, entry: req.body.entry}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Entry deleted!')
  })
})
