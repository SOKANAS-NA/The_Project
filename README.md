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



