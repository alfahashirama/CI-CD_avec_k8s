# CI/CD avec Kubernetes

Application web à trois composants (frontend, API, base MySQL), conteneurisée et
déployée sur Kubernetes, avec une chaîne d'intégration et de déploiement continus
sous GitHub Actions.

L'objectif de ce dépôt est la **chaîne de déploiement** plus que l'application
elle-même : montrer un passage complet du commit à la mise en production.

## Architecture

```
frontend (nginx)  ->  backend (Node.js)  ->  MySQL
```

Chaque composant a son image Docker, son déploiement et son service Kubernetes.

## Contenu

| Chemin | Rôle |
|---|---|
| `frontend/` | Interface, servie par nginx en production (`nginx.conf`) |
| `backend/` | API Node.js, sources dans `src/` |
| `k8s/` | Manifestes Kubernetes : déploiements, services, ConfigMap, Secret, volume MySQL |
| `.github/workflows/ci-cd.yml` | Compilation, construction des images et déploiement |
| `docker-compose.yml` | Environnement de développement local |
| `init.sql` | Schéma initial de la base |

## Lancer en local

```bash
docker compose up --build
```

## Déployer sur Kubernetes

```bash
kubectl apply -f k8s/
kubectl get pods -w
```

Le volume persistant (`mysql-pvc.yaml`) conserve les données de la base entre les
redémarrages des pods.

## Configuration

Les variables non sensibles passent par `k8s/configmap.yaml`, les identifiants par
`k8s/secret.yaml`. **Ne versionnez jamais de secret réel** dans ce fichier : utilisez
`kubectl create secret` ou un gestionnaire de secrets.

## Auteur

RAMANATENANIAVO Nasandratra Alfa
