const lambda = require("@sustainers/lambda");

module.exports = lambda().get(async (req, res) => {
  <TODO>
  res.send([
    {
      title: "Roof",
      requestTitle: req.query.title,
      people: ["Joao"],
      sideButtons: [{ title: "Do that" }, { title: "Do this" }]
    }
  ]);
  </TODO>
});
