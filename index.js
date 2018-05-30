const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

/**
 * @class Database
 */
class Database {
	/**
	 * @constructor Everything that happens on instantiation
	 */
	constructor(path = 'root') {
		this._db = {};
		this._ref = path;
		this.push = this.push.bind(this);
		this.remove = this.remove.bind(this);
		this.once = this.once.bind(this);
		this.ref = this.ref.bind(this);
	}

	/**
	 * @param path the reference to the new path
	 * @return {object} the new database ref
	 */
	ref(path) {
		if (typeof path !== 'string') {
			throw new Error('ref path should be a string');
		}
		if(!this._db.hasOwnProperty(path)) {
			this._db = new Database(path);
		}
		return this._db;
	}

	/**
	 * @param {Object} obj the object to push to database collection
	 * @return {String} the new object id
	 */
	push(obj) {
		if (typeof obj !== "object") {
			throw new Error('The push method takes an object as parameter');
		}
		const temp = this._db;
		obj.id = uuid();
		if (typeof temp === "object" && !Array.isArray(temp)) {
			this._db = [obj];
		}
		else {
			this._db.push(obj);
		}
		return obj.id;
	}

	/**
	 * @function remove
	 */
	remove() {
		this._db.length = 0;
	}

	/**
	 * @param {function} fn the callback function after data retrieval
	 * @return {Object} The instance of AppError
	 */
	once(fn) {
		fn(this._db);
	}


	/**
	 * @function writes the javascript to a downloadable JSON file
	 */
	downloadAsJSON() {
		// const db = this.format(this._db);
		const fileName = `database_${Date.now()}.json`;
		const json = JSON.stringify(this._db, null, 2);
		fs.writeFile(fileName, json, 'utf8', function (err) {
			if(err) {
				console.log('Error converting file to downloadable JSON ', err.message);
			}
			console.log('Database file available at:  ', path.resolve(__dirname, fileName));
		});
	}


}

module.exports = Database;
