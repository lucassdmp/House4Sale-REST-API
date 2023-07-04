require('dotenv').config();


const db = require('./queries')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cron = require('node-cron');
const axios = require('axios');
const IP = require('ip');

const app = express()
const port = process.env.API_PORT || 3000
app.use(cors({ credentials: true, origin: true }))
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//cron job to run every 60 secs
cron.schedule('*/60 * * * * *', () => {
  db.clearExpiredSessions();
});



app.get(process.env.API_SUFFIX, (request, response) => {
  response.json({ info: "House4Sale Rest API" })
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}` + process.env.API_SUFFIX);
})

//Multi Houses Filter
app.get(process.env.API_SUFFIX + `houses`, db.getHouses)
app.get(process.env.API_SUFFIX + `houses/type/:type`, db.getHousesByType)
app.get(process.env.API_SUFFIX + `houses/address/:address`, db.getHousesByAddress)

//Single House Filter
app.get(process.env.API_SUFFIX + `houses/id/:id`, db.getHouseById)

//DATE API
app.get(process.env.API_SUFFIX + `houses/date/:order`, db.getHousesOrderedByDate)

//PRICE API
app.get(process.env.API_SUFFIX + `houses/price/:order`, db.getHousesOrderedByPrice)
app.get(process.env.API_SUFFIX + `houses/prices/:price`, db.getHousesByPrice)

//GET ON POST API
app.get(process.env.API_SUFFIX + `post/house`, (request, response) => {
  response.json({ unid: "This SECTION IS FOR HOUSE POST, go to /houses for a get request" })
})
app.get(process.env.API_SUFFIX + `post/review`, (request, response) => {
  response.json({ unid: "This SECTION IS FOR REVIEW POST, go to /reviews for a get request" })
})
// get api for admin login from https://api.myip.com
app.get(process.env.API_SUFFIX + `admin/login`, (request, response) => {
  // axios.get('https://api.myip.com')
  //   .then((res) => {
  //     response.json(res.data);
  //   })
  //   .catch((error) => {
  //     response.status(500).json({ error: error });
  //   });
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress 
    response.json({ip: ip});
})

//REVIEW API 
app.get(process.env.API_SUFFIX + `reviews`, db.getReviews)
app.get(process.env.API_SUFFIX + `reviews/house/:houseid`, db.getReviewsByHouseId)
app.get(process.env.API_SUFFIX + `reviews/rating/:rating`, db.getReviewsByRating)
app.get(process.env.API_SUFFIX + `reviews/date/:order`, db.getReviewsOrderedByDate)


//POST API
app.post(process.env.API_SUFFIX + `post/house`, db.postHouse)
app.post(process.env.API_SUFFIX + `admin/login`, db.postLogin)
app.post(process.env.API_SUFFIX + `admin/validate`, db.validateLogin)
app.post(process.env.API_SUFFIX + `edit/house`, db.editHouse)

app.get(process.env.API_SUFFIX + `edit/house`, (request, response) => {
  response.json({ info: "Getting from edit page" })
})
//DELETE API
app.delete(process.env.API_SUFFIX + `delete/house/:id`, db.deleteHouse)