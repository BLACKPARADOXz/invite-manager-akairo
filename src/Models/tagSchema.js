const { model, Schema } = require("mongoose");

const schema = new Schema({
    guild_id: String,
    name: String,
    any: Array    
})

module.exports = model("SpecialRoles", schema);
