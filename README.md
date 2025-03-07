# Clone de Twitter - Projet React

Ce projet est une application web développée en React, reproduisant les fonctionnalités essentielles de Twitter. Il permet aux utilisateurs de publier des tweets, suivre d'autres utilisateurs, aimer des publications et recevoir des notifications.

## Fonctionnalités principales

- **Authentification** : Inscription et connexion avec une base de données locale (`json-server-auth`), validation des champs et gestion des erreurs.
- **Fil d'actualité** : Affichage des tweets par ordre chronologique, par popularité et affichage des tweets des utilisateurs suivis.
- **Gestion du profil** : Affichage des tweets d'un utilisateur sur sa page de profil, suivi/désabonnement des utilisateurs.
- **CRUD sur les tweets** : Création, lecture, mise à jour et suppression de tweets en temps réel.
- **Follow/Followers** : Possibilité de suivre un utilisateur et de voir la liste de ses abonnés.
- **Notifications** : Système de notifications pour les nouveaux abonnés et les likes sur les tweets.
- **Retweets et commentaires** (Bonus) : Fonctionnalité de retweet, possibilité de commenter les tweets et de liker les commentaires. Non fait

## Technologies utilisées

- **Framework** : [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Bibliothèques** :
  - [React Toastify](https://fkhadra.github.io/react-toastify/) (notifications)
  - [MUI](https://mui.com/) (composants UI)
  - [React Icons](https://react-icons.github.io/react-icons/) (icônes)
  - [React Router DOM](https://reactrouter.com/) (gestion des routes)
  - [React Redux](https://react-redux.js.org/) (gestion d'état)
  - [Tailwind CSS](https://tailwindcss.com/) (stylisation)
  - [json-server](https://github.com/typicode/json-server) & [json-server-auth](https://www.npmjs.com/package/json-server-auth) (base de données et authentification)

## Installation et démarrage

1. **Installation des dépendances** :
```sh
    npm install
```
2. **Lancement du serveur JSON** :
```sh
  ~/clone_twitter_react/db$ npm start
```
3. **Démarrage du projet React** :
```sh
  npm run dev
```

