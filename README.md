# Site de News Sportives

Une application web moderne pour la gestion et la publication d'articles sportifs.

## Fonctionnalités

- Gestion des articles (CRUD)
- Système de commentaires
- Gestion des utilisateurs et des rôles
- Newsletter
- Notifications par email
- Interface responsive

## Installation

1. Cloner le repository
```bash
git clone [URL_DU_REPO]
cd [NOM_DU_DOSSIER]
```

2. Installer les dépendances
```bash
composer install
npm install
```

3. Configurer l'environnement
```bash
cp .env.example .env
php artisan key:generate
```

4. Configurer la base de données dans le fichier .env
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=news_sportives
DB_USERNAME=root
DB_PASSWORD=
```

5. Exécuter les migrations et les seeders
```bash
php artisan migrate:fresh --seed
```

6. Lancer les serveurs
```bash
php artisan serve
npm run dev
```

## Comptes Utilisateurs

L'application dispose de 4 types d'utilisateurs avec des rôles différents :

### 1. Administrateur
- Email : admin@example.com
- Mot de passe : admin123
- Permissions : Accès total à toutes les fonctionnalités

### 2. Webmaster
- Email : webmaster@example.com
- Mot de passe : webmaster123
- Permissions : 
  - Gestion des articles
  - Gestion de la newsletter
  - Modération des commentaires

### 3. Auteur
- Email : author@example.com
- Mot de passe : author123
- Permissions :
  - Création d'articles
  - Modification de ses propres articles
  - Commentaires

### 4. Lecteur
- Email : reader@example.com
- Mot de passe : reader123
- Permissions :
  - Lecture des articles
  - Commentaires
  - Inscription à la newsletter

## Technologies Utilisées

- Backend : Laravel 10
- Frontend : React + TypeScript
- Base de données : MySQL
- CSS : Tailwind CSS
- Autres : 
  - Laravel Sanctum pour l'API
  - Laravel Mail pour les emails
  - Laravel Notifications

## Structure du Projet

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   ├── Models/
│   ├── Notifications/
│   └── Mail/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/
│   │   ├── components/
│   │   └── pages/
│   └── views/
└── routes/
    └── web.php
```

## Tests

Pour exécuter les tests :
```bash
php artisan test
```

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.

# Project Updates and Bug Fixes

This README provides a summary of the changes and enhancements made to the project during our collaborative session.

## Table of Contents
1. [Bug Fixes](#bug-fixes)
    - [Image Loading Issues](#image-loading-issues)
    - [Page Not Found Errors](#page-not-found-errors)
2. [Feature Enhancements & Modifications](#feature-enhancements--modifications)
    - [Category Display Adjustments](#category-display-adjustments)
    - [Header Styling Updates](#header-styling-updates)
    - [Article Display Quantity](#article-display-quantity)

## Bug Fixes

### Image Loading Issues
**Problem:** Images (`stade.jpg`, `portrait.jpg`, `default-article.jpg`) were not loading, resulting in 404 (Not Found) errors, primarily in `SportNewsHome.tsx`.

**Resolution:**
- Initially attempted to fix by using `window.asset()` in `SportNewsHome.tsx` to correctly resolve asset paths.
- Discovered that the image files in `public/images` had different names than expected by the application.
    - Renamed `public/images/un-stade-de-football-vide-avec-une-vue-fantastique-sur-le-ciel.jpg` to `public/images/stade.jpg`.
    - Renamed `public/images/portrait-monochrome-d-un-joueur-de-tennis-professionnel.jpg` to `public/images/portrait.jpg`.
- Created a placeholder `public/images/default-article.jpg` to prevent 404 errors for the default fallback image.
- Resolved a `TypeError: window.asset is not a function` by exposing the Laravel `asset()` helper to the frontend by adding a script to `resources/views/app.blade.php`:
  ```html
  <script>
      window.asset = (path) => `{{ asset('') }}${path}`;
  </script>
  ```
- Reverted the image paths in `SportNewsHome.tsx` to direct paths (`/images/image_name.jpg`) as Vite can directly serve static assets from the `public` directory.

### Page Not Found Errors
**Problem:** Encountered `Uncaught (in promise) Error: Page not found: ./pages/Articles/Index.tsx`.

**Resolution:**
- Identified that the React components were named with `.jsx` extensions (`Index.jsx`, `Show.jsx`) while the application was expecting `.tsx` extensions.
- Renamed the following files:
    - `resources/js/pages/Articles/Index.jsx` to `resources/js/pages/Articles/Index.tsx`.
    - `resources/js/pages/Articles/Show.jsx` to `resources/js/pages/Articles/Show.tsx`.

## Feature Enhancements & Modifications

### Category Display Adjustments
**Description:** Modifications were made to how categories (specifically "Tennis" and "Football") are displayed and sorted.

**Changes:**
- **Category Order in Dropdown:** The sorting logic in `resources/js/components/SportNewsHome.tsx` was adjusted to prioritize "Football" first, then "Tennis", in the category filter dropdown.
- **Category Colors:**
    - Initially, "Football" was set to an orange gradient and "Tennis" to a yellow/orange gradient in the `getCategoryColor` function within `SportNewsHome.tsx`.
    - Later, "Football" was changed to display with a green gradient (`from-green-500 to-green-600`) to differentiate it, while "Tennis" retained its yellow/orange gradient.
- **Removal of Categories from Dropdown:** The "Football" and "Tennis" categories were filtered out and are no longer displayed in the category filter dropdown in `SportNewsHome.tsx`.

### Header Styling Updates
**Description:** The main title and background of the header section were restyled.

**Changes:**
- **Main Title Color:** The color of the main title in the header (`L'actualité`) in `SportNewsHome.tsx` was updated:
    - In light mode: `text-purple-600` (purple).
    - In dark mode: `dark:text-cyan-400` (cyan).
- **Header Background Color:** The background color of the header section in `SportNewsHome.tsx` was updated:
    - In light mode: `bg-purple-100` (lighter purple).
    - In dark mode: `dark:bg-purple-900` (darker purple).

### Article Display Quantity
**Description:** The number of articles displayed on the home page was increased.

**Changes:**
- Modified the `index` method in `app/Http/Controllers/HomeController.php` to increase the pagination limit for articles from `12` to `20`. 