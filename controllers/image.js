const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "b65e16600b28482bab4ffcd2581ab5eb",
});

const handleAPICall = (db) => (req, res) => {
  app.models
    .predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};


const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("error getting entries"));
};

module.exports = {
    handleImage,
    handleAPICall
}
