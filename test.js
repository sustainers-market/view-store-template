const { expect } = require("chai");

const request = require("@sustainers/request");
// const gcpToken = require("@sustainers/gcp-token");
const logger = require("@sustainers/logger");

const url = "https://dashboard.view-store.service.core.staging.sm.network";

process.env.NODE_ENV = "production";

describe("View store", () => {
  it("should return successfully", async () => {
    // const token = await gcpToken({
    //   operation: "dashboard.view-store.service"
    // });

    // logger.info("~", { token });

    const response = await request.post(
      url,
      {
        name: "smelly"
      }
      // {
      //   Authorization: `Bearer ${token}`
      // }
    );

    expect(response.statusCode).to.equal(200);

    //eslint-disable-next-line no-console
    console.log();
    logger.info("~", { body: JSON.parse(response.body) });

    expect(JSON.parse(response.body.name)).to.equal("smelly");
  });
  // it("should return an error if incorrect params", async () => {
  //   const response = await post(url, {});
  //   expect(response.statusCode).to.be.at.least(400);
  // });
});
