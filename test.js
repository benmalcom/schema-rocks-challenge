// import database class here
const Database  = require('./index');
// initialize database class
const db = new Database();

// create a database ref
const ref = db.ref('users').ref('profiles');

// add objects to ref
ref.push({name: 'Harry Kane', gender: 'M'});
ref.push({name: 'John Doe'});
ref.push({name: 'Ben', occupation: 'Developer', hobby: 'Dancing'});


// try the once function with console.log callback
ref.once(console.log);

// Download the current ref as json file
db.downloadAsJSON();

// Download whole database as json file
db.downloadAsJSON();

// remove all data under current reference [users]
ref.remove();

// remove all data under the database
db.remove();

