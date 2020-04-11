const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "6e979390564645838a12b5abe39ad500",
});

const handleAPICall = (db) => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
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
