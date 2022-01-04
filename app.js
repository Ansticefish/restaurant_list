// system setting
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const { process_params } = require('express/lib/router')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// set data sources
app.use(express.static('public'))
const restaurantList = require('./restaurant.json')


// set request and response
app.get('/', (req, res)=>{
  res.render('index', {restaurant: restaurantList.results})
})

app.get('/search', (req, res)=> {
  const keyword = req.query.keyword.toLowerCase().trim()

  const matchedRestaurants = restaurantList.results.filter((restaurant)=> {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) 
  }) 

  res.render('index', { restaurant: matchedRestaurants, keyword: req.query.keyword})
})

app.get('/restaurants/:id', (req, res)=>{
  const showedRestaurant = restaurantList.results.find((restaurant) => restaurant.id === Number(req.params.id))

  res.render('show', { restaurant: showedRestaurant})
})

// listen to server
app.listen(port, ()=>{
  console.log(`Express is listening on http://localhost:${port}`)
})


