const { model, Schema } = require('mongoose');

const bookmarkSchema = new Schema({
  name: {type: String, required: true, unique: true},
  link: {type: String, required: true, unique: true}
}, {
  timestamps: true
})
module.exports = model('Bookmark', bookmarkSchema)
