const { Pool } = require('pg');

const credentials = {
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
}

const pool = new Pool(credentials);

const createDatabase = (request, response) => {
    const createDatabaseString = `
    CREATE TABLE IF NOT EXISTS "bugs" (
	    "id" SERIAL,
	    "bug" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

    pool.query(createDatabaseString, [], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Database created`)
    })
}


const createBug = (request, response) => {
    const bug = request.params.bug;
    pool.query('INSERT INTO bugs (bug) VALUES ($1)', [bug], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Bug added: ${bug}`) // TODO: Remove this later
    })
}

const getAllBugs = (request, response) => {
    pool.query('SELECT * FROM bugs', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const clearDatabase = (request, response) => {
    pool.query('DROP TABLE IF EXISTS bugs;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Database cleared`)
    })
}


module.exports = { createBug, getAllBugs, clearDatabase, createDatabase };
