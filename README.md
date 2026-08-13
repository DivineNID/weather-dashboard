# 🌦️ Dashboard Météo

Un dashboard météo interactif construit avec React, permettant de consulter la météo actuelle et les prévisions à 5 jours pour n'importe quelle ville, avec géolocalisation automatique et visualisation graphique de l'évolution des températures.

**🔗 Démo en ligne :** [weather-dashboard.vercel.app](https://weather-dashboard.vercel.app) *(remplace par ton URL exacte)*

<!-- Insère ici tes captures d'écran ou ton GIF, par exemple : -->
<!-- ![Aperçu du dashboard météo](./screenshot-light.png) -->
<!-- ![Mode sombre](./screenshot-dark.png) -->

---

## ✨ Fonctionnalités

**Fonctionnalités principales**
- 🔍 Recherche de la météo actuelle par ville
- 📅 Prévisions détaillées sur 5 jours
- 📈 Graphique interactif de l'évolution des températures
- ⚠️ Gestion des erreurs (ville introuvable, problème réseau)

**Fonctionnalités bonus**
- 📍 Géolocalisation automatique au chargement
- 🌡️ Bascule d'unités °C / °F
- 🕐 Historique des dernières villes recherchées
- 🌙 Mode sombre / clair (avec détection de la préférence système)

---

## 🛠️ Stack technique

| Techno | Usage |
|---|---|
| **React** (via Vite) | Framework d'interface |
| **TailwindCSS v4** | Styling et thème clair/sombre |
| **Chart.js** + react-chartjs-2 | Graphique de température |
| **Axios** | Appels à l'API météo |
| **OpenWeatherMap API** | Données météo et prévisions |
| **Vercel** | Hébergement et déploiement |

---

## 🚀 Installation en local

```bash
# Cloner le dépôt
git clone https://github.com/DivineNID/weather-dashboard.git
cd weather-dashboard

# Installer les dépendances
npm install

# Créer un fichier .env à la racine avec :
# VITE_WEATHER_API_KEY=ta_cle_openweathermap

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`.

Tu peux obtenir une clé API gratuite sur [openweathermap.org/api](https://openweathermap.org/api).

---

## 📁 Structure du projet

```
src/
├── components/     # Composants d'interface (carte météo, prévisions, graphique...)
├── hooks/          # Hook personnalisé useWeather (appels API + gestion des états)
├── services/       # Couche d'appel à l'API OpenWeatherMap
├── utils/          # Fonctions utilitaires (filtrage des prévisions, mode sombre, historique)
└── App.jsx         # Composant racine
```

---

## 💭 Retour d'expérience

Un point qui m'a surprise pendant le développement : l'API `/forecast` d'OpenWeatherMap renvoie une entrée toutes les 3 heures, et non une par jour. J'ai dû écrire une fonction de filtrage (`getDailyForecast`) pour ne garder qu'une entrée représentative par jour, avec un filet de sécurité au cas où aucune entrée ne tombe exactement à midi selon le fuseau horaire de la ville recherchée. Cette fonction est partagée entre la liste des prévisions et le graphique, pour éviter que les deux affichages se désynchronisent.

Le déploiement a aussi révélé un piège classique : mes fichiers de composants avaient une casse différente entre mon environnement local (Windows, insensible à la casse) et l'environnement Linux de Vercel (sensible à la casse), ce qui a nécessité d'aligner précisément les noms de fichiers avec les chemins d'import avant que le build ne passe.

---

## 📄 Licence

Projet réalisé à des fins d'apprentissage et de portfolio.
