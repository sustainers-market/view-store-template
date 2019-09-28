const { expect } = require("chai");

const request = require("@sustainers/request");

const url = "http://staged:3000";

process.env.NODE_ENV = "staging";

describe("View store", () => {
  it("should return successfully", async () => {
    const response0 = await request.post(url, {
      name: "smelly"
    });
    expect(response0.statusCode).to.equal(200);
    expect(JSON.parse(response0.body).name).to.equal("smelly");

    const id = JSON.parse(response0.body).id;

    const response1 = await request.put(`${url}/${id}`, {
      name: "jelly"
    });
    expect(response1.statusCode).to.equal(200);
    expect(JSON.parse(response1.body).name).to.equal("jelly");

    const response2 = await request.get(`${url}/${id}`);
    expect(response2.statusCode).to.equal(200);
    expect(JSON.parse(response2.body).name).to.equal("jelly");

    const response3 = await request.get(`${url}`);
    expect(response3.statusCode).to.equal(200);
    expect(JSON.parse(response3.body)[0].name).to.equal("jelly");

    const response4 = await request.delete(`${url}/${id}`);
    expect(response4.statusCode).to.equal(200);
    expect(JSON.parse(response4.body).deletedCount).to.equal(1);

    const response5 = await request.get(`${url}/${id}`);
    expect(response5.statusCode).to.equal(200);
    expect(response5.body).to.equal("");
  });
  // it("should return an error if incorrect params", async () => {
  //   const response = await request.post(url, {});
  //   expect(response.statusCode).to.be.at.least(400);
  // });
});
