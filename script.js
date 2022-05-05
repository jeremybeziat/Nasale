import express from "express";

const APP = express();
const PORT = process.env.PORT || 3000;

APP.get("/Nasale", async (req, res) => {
  try {
    const nasale_request = await fetch("https://fr.dofus.dofapi.fr/pets");
    const nasale_response = await nasale_request.json();
    console.log(getNasaInfos(nasale_response));
    let infos = getNasaInfos(nasale_response);
    console.log("Franchement tout va super nickel");
    res.status(200).send({
      data: nasale_response,
    });
  } catch (error) {
    console.log("C'est la merde walla...");
    res.status(500).send({ message: "❌ Erreur lors de la requête Dofapi" });
    console.log(error);
  }
});

APP.listen(PORT, () => {
  console.log(`✅ : Server is running on ${PORT}`);
});