const viewStore = require("@sustainers/view-store");

//eslint-disable-next-line no-console
console.log("HII: ", process.env.GCP_KMS_SECRET_BUCKET_KEY_RING);
//eslint-disable-next-line no-console
console.log("HII2: ", process.env.GCP_KMS_SECRET_BUCKET_KEY_LOCATION);
//eslint-disable-next-line no-console
console.log("HII3: ", process.env.GCP_PROJECT);
//eslint-disable-next-line no-console
console.log("HII4: ", process.env.GCP_SECRET_BUCKET);

module.exports = viewStore({
  schema: { name: { type: String } },
  indexes: [],
  mixins: []
});
