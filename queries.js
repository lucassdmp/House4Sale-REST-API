const { query } = require('express');

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})

// CREATE TABLE housedata (
//     houseid SERIAL PRIMARY KEY SERIAL NOT NULL,
//     housetype VARCHAR(255) NOT NULL,
//     housebanner VARCHAR(255),
//     houseaddress VARCHAR(255) NOT NULL,
//     houseprice DECIMAL(10, 2) NOT NULL,
//     housedesc TEXT NOT NULL,
//     isRent boolean NOT NULL,
//     housedate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );

function prepareQuery(query, params) {
    let queryString = query;
    if (params != null && params != "") {
        queryString = query + " WHERE houseaddress ILIKE '%" + params + "%'";
    }
    return queryString;
}


function addFilterOrderBy(query, filter) {
    if (filter != null && filter != "") {
        let filterQuery = filter.split('-');
        query += ` ORDER BY house${filterQuery[0]} ${filterQuery[1]}`;
    }
    return query;
}


const getHouses = (request, response) => {
    let queryString = "SELECT * FROM housedata";
    const location = request.query.location;
    
    queryString = prepareQuery(queryString, location);

    const filter = request.query.filter;
    queryString = addFilterOrderBy(queryString, filter);
    console.log(queryString);
    pool.query(queryString, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getHousesOrderedByPrice = (request, response) => {
    const order = request.params.order

    pool.query(`SELECT * FROM housedata ORDER BY Houseprice ${order}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })

}

const getHousesOrderedByDate = (request, response) => {
    const order = request.params.order

    pool.query(`SELECT * FROM housedata ORDER BY Housedate ${order}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getHouseById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`SELECT * FROM housedata where houseid = ${id}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getHousesByType = (request, response) => {
    const type = request.params.type
    // console.log(type)
    if (type.localeCompare("house") == false && type.localeCompare("apartment") == false) {
        return response.status(500).json({ error: "Invalid house type" })
    }

    pool.query(`SELECT * FROM housedata where housetype = '${type}'`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getHousesByPrice = (request, response) => {
    const price = request.params.price
    if (price < 0) {
        let unsignedprice = price * -1
        pool.query(`SELECT * FROM housedata where houseprice <= ${unsignedprice}`, (error, results) => {
            if (error) {
                return response.status(500).json({ error: error })
            }
            response.status(200).json(results.rows)
        })
    } else {
        pool.query(`SELECT * FROM housedata where houseprice >= ${price}`, (error, results) => {
            if (error) {
                return response.status(500).json({ error: error })
            }
            response.status(200).json(results.rows)
        })
    }
}

const getHousesByAddress = (request, response) => {
    const address = request.params.address
    pool.query(`SELECT * FROM housedata where houseaddress like %'${address}'%`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

//REVIEW API
const getReviews = (request, response) => {
    pool.query('SELECT * FROM review', (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getReviewsByHouseId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`SELECT * FROM review where houseid = ${id}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getReviewsByRating = (request, response) => {
    const rating = parseInt(request.params.rating)
    let signal = rating < 0 ? "<=" : ">="
    let unsignedrating = rating < 0 ? rating * -1 : rating

    pool.query(`SELECT * FROM review where rating ${signal} ${unsignedrating}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}

const getReviewsOrderedByDate = (request, response) => {
    const order = request.params.order
    pool.query(`SELECT * FROM review ORDER BY reviewdate ${order}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).json(results.rows)
    })
}


// POST API

const postHouse = (request, response) => {
    const { housetype, housebanner, houseaddress, houseprice, housedesc, isRent } = request.body
    let isRentBool = isRent == "true" ? true : false
    pool.query(`INSERT INTO housedata (housetype, housebanner, houseaddress, houseprice, housedesc, isRent) VALUES ('${housetype}', '${housebanner}', '${houseaddress}', ${houseprice}, '${housedesc}', ${isRentBool})`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(201).send(`House added with ID: ${results.insertId}`)
    })
}

const postReview = (request, response) => {
    const { houseid, rating, comment, fullname, email } = request.body
    pool.query(`INSERT INTO review (idreview, houseid, rating, comment, fullname, email) VALUES (${idreview}, ${houseid}, ${rating}, '${comment}', '${fullname}', '${email}')`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(201).send(`Review added with ID: ${results.insertId}`)
    })
}


module.exports = {
    getHouses,
    getHouseById,
    getHousesByType,
    getHousesByPrice,
    getHousesByAddress,
    getHousesOrderedByPrice,
    getHousesOrderedByDate,
    getReviews,
    getReviewsByHouseId,
    getReviewsByRating,
    getReviewsOrderedByDate,
    postHouse,
    postReview
}