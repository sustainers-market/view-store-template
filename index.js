const viewStore = require("@sustainers/view-store");

/**
 *
 * TODO: write the view store's schema and specify what it should be indexed by.
 * How to write a schema -> https://mongoosejs.com/docs/schematypes.html
 * Types and validators should always be specified,
 * and default values and required flags should be set if intended.
 *
 * How to write indexes -> https://mongoosejs.com/docs/guide.html#indexes
 * Queries to the store that aren't indexed will be rejected.
 * In other words, full collection scans are not allowed.
 *
 */

module.exports = viewStore({
  schema: { name: { type: String }, amount: Number },
  indexes: []
});
