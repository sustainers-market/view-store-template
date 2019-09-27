const viewStore = require("@sustainers/view-store");

/**
 *
 * How to write a schema -> https://mongoosejs.com/docs/schematypes.html
 * Correct types, validators, and default values should be used.
 *
 * How to write indexes -> https://mongoosejs.com/docs/guide.html#indexes
 *
 */

module.exports = viewStore({
  schema: { name: { type: String } },
  indexes: []
});
