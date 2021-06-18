const connection=require('../database')

connection.query('SELECT * from usuarios', function (error, results, fields) {
    if (error) throw error;
    // connected!
  });