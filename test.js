const { expect } = require("chai");

const request = require("@sustainers/request");
const logger = require("@sustainers/logger");

const url = "http://staged:3000";

process.env.NODE_ENV = "staging";

describe("View store", () => {
  it("should return successfully", async () => {
    logger.info("~", { url });

    const response0 = await request.post(url, {
      name: "smelly"
    });

    expect(response0.statusCode).to.equal(200);

    expect(JSON.parse(response0.body).name).to.equal("smelly");

    const response1 = await request.put(url, {
      name: "jelly"
    });

    expect(response1.statusCode).to.equal(200);

    logger.info("res1: ", { response1 });
    logger.info("res1 body: ", { body: JSON.parse(response1.body) });

    expect(JSON.parse(response1.body).name).to.equal("jelly");

    const id = JSON.parse(response1.body).id;

    const response2 = await request.get(`${url}/${id}`);

    logger.info("res2: ", { response2 });
    logger.info("res2 body: ", { body: JSON.parse(response2.body) });

    expect(response2.statusCode).to.equal(200);

    expect(JSON.parse(response2.body).name).to.equal("jelly");

    const response3 = await request.get(`${url}`);

    logger.info("res3: ", { response3 });
    logger.info("res3 body: ", { body: JSON.parse(response3.body) });

    expect(response3.statusCode).to.equal(200);

    expect(JSON.parse(response3.body)[0].name).to.equal("jelly");

    const response4 = await request.delete(`${url}/${id}`);

    logger.info("res4: ", { response4 });
    logger.info("res4 body: ", { body: JSON.parse(response4.body) });

    expect(response4.statusCode).to.equal(200);

    const response5 = await request.get(`${url}/${id}`);

    logger.info("res5: ", { response5 });
    logger.info("res5 body: ", { body: JSON.parse(response5.body) });

    expect(response5.statusCode).to.equal(200);
  });
  // it("should return an error if incorrect params", async () => {
  //   const response = await request.post(url, {});
  //   expect(response.statusCode).to.be.at.least(400);
  // });
});
