// const viewStore = require("@sustainers/view-store");

const server = require("@sustainers/server");
const db = require("@sustainers/mongodb-database");
const logger = require("@sustainers/logger");
const uuid = require("@sustainers/uuid");
const secret = require("@sustainers/gcp-secret");
const datetime = require("@sustainers/datetime");

module.exports = exportLater({
  schema: { name: { type: String } },
  indexes: [],
  mixins: [],
  version: 1
});

let _viewStore;

const viewStore = async config => {
  logger.info("CHECKPOINT 11");
  if (_viewStore == undefined) {
    logger.info("CHECKPOINT 22");
    _viewStore = db.init({
      name: `${process.env.DOMAIN}.${process.env.ID}`,
      ...config,
      connection: {
        urlProtocol: process.env.MONGODB_URL_PROTOCOL,
        user: process.env.MONGODB_USER,
        password: await secret("mongodb"),
        host: process.env.MONGODB_HOST,
        database: process.env.MONGODB_DATABASE,
        parameters: { authSource: "admin" },
        autoIndex: true,
        onOpen: () => logger.info("Thank you database."),
        onError: err => logger.error("Database has errored.", { err })
      }
    });
  }
  return _viewStore;
};

const exportLater = async (config, { get, post, put } = {}) => {
  logger.info("STARTING");
  const store = await viewStore(config);
  logger.info("CHECKPOINT 1");
  server()
    .get(async (req, res) => {
      const results = await store.find({
        ...(get && get(req.params)),
        ...(req.params.id && { id: req.params.id })
      });
      res.send(results);
    })
    .post(async (req, res) => {
      const id = uuid();
      await viewStore().write({
        ...(post && post(req.body)),
        modified: datetime.fineTimestamp(),
        id
      });
    })
    .put(async (req, res) => {
      const update = {
        ...(put && put(req.body)),
        modified: datetime.fineTimestamp()
      };
      await viewStore().write({ query: { id: req.params.id }, update });
    })
    .delete(async (req, res) => {
      await viewStore().remove({ query: { id: req.params.id } });
    })
    .listen();
  logger.info("CHECKPOINT 2");
};
