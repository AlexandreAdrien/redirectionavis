const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;

// Route pour capturer le clic
app.get('/track-click', async (req, res) => {
  const key = req.query.key;

  if (key) {
    console.log(`Clic enregistré pour le client : ${key}`);

    // Appel au webhook Make.com
    const webhookUrl = 'https://hook.eu2.make.com/v2869u6yurp2krbx826tqvoe9s1bndau';
    try {
      await axios.post(webhookUrl, { key });
      console.log('Webhook Make.com déclenché avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook :", error);
    }
  } else {
    console.log("Aucune clé client n'a été fournie.");
  }

  // Redirection vers la page d'avis Google
  const avisGoogleUrl = 'https://search.google.com/local/writereview?placeid=ChIJCchYFSWSB0gRx5RohZg6nns';
  return res.redirect(avisGoogleUrl);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
