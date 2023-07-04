const { query } = require('express');
const crypto = require('crypto');
const axios = require('axios');

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})

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
    const { housetype, housebanner, houseaddress, houseprice, housedesc, isrent } = request.body

    pool.query(`INSERT INTO housedata (housetype, housebanner, houseaddress, houseprice, housedesc, isrent) VALUES ('${housetype}', '${housebanner}', '${houseaddress}', ${houseprice}, '${housedesc}', ${isrent})`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).send(`House added successfully!`)
    })
}
const deleteHouse = (request, response) => {
    const id = parseInt(request.params.id)
    // console.log("DELITING:" + id);
    pool.query(`DELETE FROM housedata WHERE houseid = ${id}`, (error, results) => {
        if (error) {
            return response.status(500).json({ error: error })
        }
        response.status(200).send(`House deleted with ID: ${id}`)
    })
}

const postLogin = (request, response) => {
    const { username, password, user_ip } = request.body
    // put password in md5 hash
    // console.log(username + " " + password + " " + user_ip)

    pool.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (userQueryError, userQueryResults) => {
        if (userQueryError) {
            return response.status(500).json({ userQueryError: userQueryError })
        }

        if (userQueryResults.rows.length == 0) {
            return response.status(200).json({ userQueryInvalidUserError: "Invalid username or password" })
        }

        pool.query(`SELECT * FROM user_session WHERE user_id = ${userQueryResults.rows[0].id} AND user_ip = '${user_ip}'`, (sessionQueryError, sessionQueryResults) => {
            if (sessionQueryError) {
                return response.status(500).json({ sessionQueryError: sessionQueryError })
            } else if (sessionQueryResults.rows.length > 0) {
                response.status(200).json([{ randomKey: sessionQueryResults.rows[0].session_key }])
            } else {
                const randomKey = crypto.randomBytes(32).toString('hex');
                const timestamp = Math.floor(new Date().getTime() / 1000);

                pool.query(`INSERT INTO public.user_session(
                    session_key, date_of_creation, session_timeout, user_id, user_ip)
                    VALUES ('${randomKey}', ${timestamp}, 3600, ${userQueryResults.rows[0].id}, '${user_ip}')`, (sessionInsertionError, sessionInsertionResults) => {
                    if (sessionInsertionError) {
                        return response.status(500).json({ sessionInsertionError: sessionInsertionError })
                    }
                    response.status(200).json([{ randomKey: randomKey }])
                });
            }
        })
    })
}

const clearExpiredSessions = () => {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    pool.query(`DELETE FROM user_session WHERE date_of_creation + session_timeout < ${timestamp}`, (error, results) => {
        if (error) {
            console.log(error)
        } else {
            const now = new Date().toISOString();
            console.log(`Cleared expired sessions - ${now}`)
        }
    })
}

const validateLogin = (request, response) => {
    // console.log("Validating Login..")
    const { randomKey, user_ip } = request.body;

    pool.query(`SELECT * FROM user_session WHERE session_key = '${randomKey}' AND user_ip = '${user_ip}'`, (validateLoginError, results) => {
        if (validateLoginError) {
            return response.status(500).json({ validateLoginError: validateLoginError })
        } else if (results.rows.length == 0) {
            return response.status(200).json({ validateLogin: false })
        } else {
            return response.status(200).json({ validateLogin: true })
        }
    });
}

const editHouse = (request, response) => {
    const { housebanner, houseaddress, houseprice, housedesc, houseid } = request.body
    const preparedString = `UPDATE housedata SET housebanner = '${housebanner}', houseaddress = '${houseaddress}', houseprice = ${houseprice}, housedesc = '${housedesc}' WHERE houseid = ${houseid}`
    pool.query(preparedString, (error, results) => {
        if(error){
            return response.status(201).send(`Error!`)
        }else{
            return response.status(200).send(`House edited successfully!`)
        }
    });
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
    postLogin,
    clearExpiredSessions,
    validateLogin,
    deleteHouse,
    editHouse,
}