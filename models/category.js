let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CategorySchema = new Schema ({
  name: String
});


let Category = mongoose.model('Category', CategorySchema);

module.exports = Category;