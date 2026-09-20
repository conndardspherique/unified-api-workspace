# Unified API workspace

Backend TypeScript conçu pour expérimenter une architecture d'API unifiée permettant d'interagir avec plusieurs fournisseurs de messagerie à travers une interface commune.

Le projet met l'accent sur la séparation des responsabilités, l'abstraction des providers, la persistance PostgreSQL, la containerisation Docker et les tests unitaires.

> Projet personnel / expérimental — les providers de messagerie sont actuellement simulés.

---

## À propos

L'objectif de ce projet est de concevoir une API backend capable d'exposer une interface commune à plusieurs services externes.

L'architecture permet notamment de :

- gérer plusieurs comptes provenant de différents providers ;
- récupérer des messages ;
- envoyer des messages ;
- ajouter de nouveaux providers sans modifier la logique métier principale ;
- persister les comptes dans PostgreSQL ;
- exécuter l'ensemble de l'application avec Docker ;
- tester indépendamment la logique métier.

Le projet est volontairement construit autour d'une architecture modulaire afin de faciliter l'évolution vers de véritables intégrations avec des APIs tierces.

---

## Architecture
(Schéma d'architecture crée sur Draw.io puis convertie en ASCII via script Obsidian)
```text
                         HTTP / REST
                              │
                              ▼
                     ┌─────────────────┐
                     │   Controllers   │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │     Services    │
                     │  Business Logic │
                     └────────┬────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
           ┌─────────────────┐   ┌─────────────────┐
           │   Repositories   │   │    Providers    │
           └────────┬────────┘   └────────┬────────┘
                    │                     │
                    ▼               ┌─────┴─────┐
             ┌────────────┐         │           │
             │ PostgreSQL │      Gmail       Outlook
             └────────────┘
```

--- 

## Tests

- Tests unitaires avec Vitest
- Tests des providers
- Tests de la logique métier
- Mock du repository pour isoler les tests du service

---

## API
Health check de l'API

```text
    GET /health
```

Réponse 

```text
{
    "status": "ok",
    "service": "unified-api-workspace"
}
```

---

## Comptes 

Liste des comptes 
```text
GET /accounts
```
Exemple 
```text
[
  {
    "id": "acc_gmail_001",
    "provider": "gmail",
    "identifier": "demo@gmail.com",
    "displayName": "Demo Gmail"
  }
]
```

---

## Récupérer un compte

```text
GET /accounts/:id
```

Exemple 

```text
GET /accounts/acc_gmail_001
```

---

## Créer un compte 

```text
POST /accounts
```

Body 

```text
{
    "id": "acc_gmail_001",
    "provider": "gmail",
    "identifier": "demo@gmail.com",
    "displayName": "Demo Gmail",
}
```

Réponse: 

```text
{
  "id": "acc_gmail_001",
  "provider": "gmail",
  "identifier": "demo@gmail.com",
  "displayName": "Demo Gmail"
}
```

---

### Récupérer les messages 

```text
GET /accounts/:id/messages
```

Example 
```text
GET /accounts/acc_gmail_001/messages
```

Réponse
```text
[
  {
    "id": "msg_001",
    "accountId": "acc_gmail_001",
    "provider": "gmail",
    "sender": "contact@example.com",
    "recipient": "demo@gmail.com",
    "subject": "Hello from Gmail",
    "body": "This is a mock Gmail message.",
    "timestamp": "2026-01-01T12:00:00.000Z",
    "read": false
  }
]
```

---

## Envoyer un message 

```text
POST /accounts/:id/messages
```

Body
```text
{
  "recipient": "contact@example.com",
  "subject": "Test API",
  "body": "Hello from Unified API Playground"
}
```

Réponse
```text
{
  "id": "msg_123456",
  "accountId": "acc_gmail_001",
  "provider": "gmail",
  "sender": "demo@gmail.com",
  "recipient": "contact@example.com",
  "subject": "Test API",
  "body": "Hello from Unified API Playground",
  "timestamp": "2026-01-01T12:00:00.000Z",
  "read": true
}
```

--- 
 
## Installation 

# Prérequis 
- Node.js 22+
-Docker
-Docker Compose
-Git 

Cloner le projet 

```text
git clone https://github.com/conndardspherique/unified-api-workspace.git
cd unified-api-workspace
```

Installer les dépendances 

```text
npm install
```

---

## Configuration 

Créer un fichier .env

Example 
```text
 PORT = 3000
 DATABASE_URL=postgresql://unified_api:unified_api_dev@127.0.0.1:5433/unified_api
```

--- 

## Lancer avec Docker 

Construire et démarrer les services
```text
dpcker compose up --build -d
```

Vérifier les conteneurs
```text
docker compose up
```

Les services disponibles sont
```text
API 
http://localhost:3000

PostgreSQL
localhost:5433
```
Le schéma PostgreSQL est automatiquement initialisé lors de la création du volume.

--- 

Pour lancer les test il suffit de taper la commande 

```text
npm test
```

---

## Auteur 

Jeremy Jardet 

Développeur Backend Junior

## Contact

- Github https://github.com/conndardspherique
-Portfolio https://dot-workspace.com