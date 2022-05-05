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

function getNasaTitle(array) {
  let title = [];
  for (let i = 0; i < array.length; i++) {
    title.push(array[i].title);
  }
  return title;
}

function affichage(array, title) {
  let result = ""
  for (let i = 0; i < array.length; i++) {
    result += `<figure style="display:flex; flex-direction:column; justify-content:center; width:50%; margin-left:25%" >
    <img src='${array[i]}' alt="titre">
    <figcaption style= "text-align:center; margin-top:15px; margin-bottom:30px">${title[i]}<figcaption></figure>`;
  }
  return result;
}

APP.get("/Nasale/January", async (req, res) => {
  try {
    const nasale_request = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=gWIMl3cNb9eKccaobVNKWnzPwmOX18EiYfz3dXTN&start_date=2022-01-01&end_date=2022-01-31"
    );
    const nasale_response = await nasale_request.json();
    let infos = getNasaPicture(nasale_response);
    let intox = getNasaTitle(nasale_response)
    console.log(infos, intox);
    let result = affichage(infos, intox);
    res.status(200).send(
    result
    );
  } catch (error) {
    console.log("C'est la merde walla...");
    res.status(500).send({ message: "❌ Erreur pour la requête de Nasale" });
    console.log(error);
  }
});

APP.get("/Nasale/February", async (req, res) => {
  try {
    const nasale_request = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=gWIMl3cNb9eKccaobVNKWnzPwmOX18EiYfz3dXTN&start_date=2022-02-02&end_date=2022-02-28"
    );
    const nasale_response = await nasale_request.json();
    let infos = getNasaPicture(nasale_response);
    let intox = getNasaTitle(nasale_response)
    console.log(infos, intox);
    let result = affichage(infos, intox);
    res.status(200).send(
    result
    );
  } catch (error) {
    console.log("C'est la merde walla...");
    res.status(500).send({ message: "❌ Erreur pour la requête de Nasale" });
    console.log(error);
  }
});

APP.listen(PORT, () => {
  console.log(`✅ : Server is running on ${PORT}`);
});