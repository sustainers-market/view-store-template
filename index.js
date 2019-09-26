const viewStore = require("@sustainers/view-store");

//eslint-disable-next-line no-console
console.log("HII: ", process.env.GCP_KMS_SECRET_BUCKET_KEY_LOCATION);

module.exports = viewStore({
  schema: { name: { type: String } },
  indexes: [],
  mixins: []
});
