const { expect } = require("chai");

const request = require("@sustainers/request");
const logger = require("@sustainers/logger");

const url = "staged:50051";

process.env.NODE_ENV = "staging";

describe("View store", () => {
  it("should return successfully", async () => {
    logger.info("~", { url });

    const response = await request.post(url, {
      name: "smelly"
    });

    // expect(response.statusCode).to.equal(200);

    //eslint-disable-next-line no-console
    logger.info("~", { response });
    logger.info("~", { body: JSON.parse(response.body) });

    expect(JSON.parse(response.body.name)).to.equal("smelly");
  });
  // it("should return an error if incorrect params", async () => {
  //   const response = await post(url, {});
  //   expect(response.statusCode).to.be.at.least(400);
  // });
});
