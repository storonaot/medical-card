const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, './view'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.render('frontpage')
})

app.use(express.static(path.join(__dirname, './public')))

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
