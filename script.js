import express from "express";

const APP = express();
const PORT = process.env.PORT || 3000;

function getNasaPicture(array) {
  let picture = [];
  for (let i = 0; i < array.length; i++) {
    picture.push(array[i].url);
  }
  return picture;
}

APP.get("/Nasale/Picture", async (req, res) => {
  try {
    const nasale_request = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=gWIMl3cNb9eKccaobVNKWnzPwmOX18EiYfz3dXTN&start_date=2022-01-01"
    );
    const nasale_response = await nasale_request.json();
    console.log(getNasaPicture(nasale_response));
    let infos = getNasaPicture(nasale_response);
    console.log("Tout vas bien !");
    res.status(200).send({
      data: nasale_response,
    });
  } catch (error) {
    console.log("C'est la merde walla...");
    res.status(500).send({ message: "❌ Erreur pour la requête de Nasale" });
    console.log(error);
  }
});

APP.listen(PORT, () => {
  console.log(`✅ : Server is running on ${PORT}`);
});