require('dotenv').config();

const db = require('./queries')
const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.API_PORT || 3000
app.use(cors())
app.use(express.json())


// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.get(process.env.API_SUFFIX, (request, response) => {
  response.json({ info: "House4Sale Rest API" })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//Multi Houses Filter
app.get(process.env.API_SUFFIX+`houses`, db.getHouses)
app.get(process.env.API_SUFFIX+`houses/type/:type`, db.getHousesByType)
app.get(process.env.API_SUFFIX+`houses/address/:address`, db.getHousesByAddress)

//Single House Filter
app.get(process.env.API_SUFFIX+`houses/id/:id`, db.getHouseById)

//DATE API
app.get(process.env.API_SUFFIX+`houses/date/:order`, db.getHousesOrderedByDate)

//PRICE API
app.get(process.env.API_SUFFIX+`houses/price/:order`, db.getHousesOrderedByPrice)
app.get(process.env.API_SUFFIX+`houses/prices/:price`, db.getHousesByPrice)

//GET ON POST API
app.get(process.env.API_SUFFIX+`post/house`, (request, response) => {
    response.json({ unid: "This SECTION IS FOR HOUSE POST, go to /houses for a get request" })
})
app.get(process.env.API_SUFFIX+`post/review`, (request, response) => {
    response.json({ unid: "This SECTION IS FOR REVIEW POST, go to /reviews for a get request" })
})

//REVIEW API 
app.get(process.env.API_SUFFIX+`reviews`, db.getReviews)
app.get(process.env.API_SUFFIX+`reviews/house/:houseid`, db.getReviewsByHouseId)
app.get(process.env.API_SUFFIX+`reviews/rating/:rating`, db.getReviewsByRating)
app.get(process.env.API_SUFFIX+`reviews/date/:order`, db.getReviewsOrderedByDate)


//POST API
app.post(process.env.API_SUFFIX+`post/house`, db.postHouse)
app.post(process.env.API_SUFFIX+`post/review`, db.postReview)