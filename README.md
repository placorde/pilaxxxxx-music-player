# Pilaxxxxx Music Player - Un Portfolio de DJ Moderne et Interactif

![Pilaxxxxx Music Player Screenshot](https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop)
*Un portfolio de DJ élégant conçu pour présenter des mixes avec une interface immersive et des outils de création par IA.*

---

## 🚀 À propos du projet

**Pilaxxxxx Music Player** est une application web single-page conçue pour être le portfolio ultime d'un DJ. Construite avec des technologies web modernes, elle offre une expérience utilisateur fluide, réactive et visuellement captivante. Les visiteurs peuvent explorer des mixes classés par genre, découvrir de nouveaux morceaux via un carrousel interactif et profiter d'une lecture audio ininterrompue grâce à un lecteur persistant.

L'une des caractéristiques les plus uniques est la **Suite Créative IA**, propulsée par l'API Gemini de Google, qui permet aux utilisateurs de générer des histoires et des pochettes d'album inspirées par la musique, ajoutant une dimension interactive et engageante au site.

## ✨ Fonctionnalités clés

-   **Interface 100% Responsive** : Un design impeccable qui s'adapte parfaitement aux ordinateurs de bureau, tablettes et smartphones.
-   **Lecteur Audio Persistant** : Écoutez de la musique sans interruption tout en naviguant sur le site. Le lecteur change de disposition sur mobile pour une ergonomie optimale.
-   **Organisation des Mixes** : Les sections "House" et "Electro" sont présentées côte à côte et sont extensibles pour révéler les listes de lecture.
-   **Carrousel de Genres Interactif** : La section "Favourite Dance Tracks" propose un carrousel de genres avec des flèches de navigation pour une exploration facile.
-   **Suite Créative IA (Google Gemini)** :
    -   **Conteur d'Histoires** : Génère des récits atmosphériques à partir d'un thème musical.
    -   **Générateur de Pochettes** : Crée des pochettes d'album carrées et uniques à partir d'une description textuelle.
-   **Personnalisation Facile** : Le contenu (mixes, images, textes) est centralisé dans des fichiers de données et des composants faciles à modifier.
-   **Gestion des Liens Google Drive** : Un script intégré convertit automatiquement les liens de partage Google Drive en liens de lecture directs.

## 🛠️ Pile technologique

-   **Framework** : [React](https://reactjs.org/)
-   **Langage** : [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool** : [Vite](https://vitejs.dev/)
-   **Styling** : [Tailwind CSS](https://tailwindcss.com/) avec la police [Orbitron](https://fonts.google.com/specimen/Orbitron)
-   **Intelligence Artificielle** : [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
-   **Icônes** : Icônes SVG personnalisées

## ⚙️ Démarrage rapide

Pour faire tourner ce projet en local :

1.  **Clonez le dépôt**
    ```bash
    git clone https://github.com/VOTRE_NOM_UTILISATEUR/pilaxxxxx-music-player.git
    cd pilaxxxxx-music-player
    ```

2.  **Configurez les variables d'environnement**
    Pour que la Suite Créative IA fonctionne, vous devez fournir une clé API de Google Gemini.
    - Créez un fichier nommé `.env.local` à la racine de votre projet.
    - Ajoutez votre clé API à l'intérieur comme ceci :
      ```
      VITE_API_KEY=VOTRE_CLÉ_API_PERSONNELLE_ICI
      ```

3.  **Lancez l'application**
    Ce projet est configuré pour utiliser un serveur de développement local. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé.
    ```bash
    # Si c'est la première fois, installez les dépendances
    npm install
    
    # Lancez le serveur de développement
    npm run dev
    ```
    Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

## 🎨 Personnalisation

Modifier le contenu pour l'adapter à vos besoins est très simple.

### 1. Ajouter ou modifier des mixes

-   **Fichier à modifier** : `data/mixes.ts`
-   **Instructions** :
    1.  Hébergez vos fichiers audio (.mp3 est recommandé) sur un service comme Google Drive, Dropbox ou un service de stockage cloud.
    2.  Si vous utilisez Google Drive, copiez le lien de partage standard (`https://drive.google.com/file/d/...`). La fonction `getGoogleDriveDirectLink` le convertira automatiquement.
    3.  Ajoutez ou modifiez les objets dans les listes `houseMixes`, `electroMixes` ou `favouriteDanceTracks`. Chaque objet doit correspondre à l'interface `Mix`.

    ```typescript
    // Exemple d'un objet Mix
    { 
      id: 1, 
      title: "Mon Nouveau Mix", 
      duration: "1:05:20", 
      genre: "House", 
      audioSrc: getGoogleDriveDirectLink("VOTRE_LIEN_GOOGLE_DRIVE"),
      imageUrl: "LIEN_VERS_VOTRE_POCHETTE.jpg" 
    }
    ```

### 2. Changer les images et les textes

-   **Image d'accueil** : Modifiez l'URL dans `components/Hero.tsx`.
-   **Section "About Me"** : Le texte et les images se trouvent directement dans le composant `AboutMe` défini dans `App.tsx`.
-   **Informations de contact** : Mettez à jour les liens et l'email dans `components/Contact.tsx`.

## 🚀 Déploiement

Ce projet est parfaitement configuré pour être déployé sur des plateformes comme **Vercel** ou **Netlify**.

1.  Poussez votre code sur un dépôt GitHub.
2.  Importez le dépôt sur Vercel/Netlify.
3.  **Configurez la variable d'environnement** : Dans les paramètres de votre projet sur la plateforme d'hébergement, ajoutez une variable d'environnement nommée `VITE_API_KEY` et collez-y votre clé API Google Gemini.
4.  Déployez ! Votre site sera en ligne en quelques minutes.

---
*Fait avec ❤️ pour la musique.*