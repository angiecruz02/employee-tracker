const fs = require('fs');
const connection = require('./connection');

const query = fs.readFileSync('query.sql', 'utf8');

connection.query(query, (error, results) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
});