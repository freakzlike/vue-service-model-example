const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('backend/db.json')
const db = low(adapter)

exports = module.exports = db
