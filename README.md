<p align="center">
 <img width="256" height="256" src="public/logo.png">
</p>

# Bienvenue sur le répertoire de Stud'in Laval

Ce site web est développé avec **React**, plus précisément avec le framework **Next.JS**.<br/>
Il utilise également **TypeScript** pour le code ainsi que **TailwindCSS** pour la sylisation.

## Modifications simples :
* Ajout d'un lieux :
  * Allez dans /app/locations.json
  * Ajouter un nouvel élément dans la liste principale, vous pouvez vous aidez de ceux éxistant pour voir les champs possibles.
* Ajout d'un événement :
  * Allez dans /app/events.json
  * Comme pour les lieux, ajouter un élément.

## Développement
Vous pouvez développer le site en temps réel en exécutant la commande ```npm run dev```, ceci lancera un serveur web locale sur l'address http://localhost:3000 (si disponible) et vous pourrez éditer les fichiers du site et voir les changements en temps réel.

## Exportation du site
Actuellement lors d'un ```next build``` une exportation statique du site sera automatiquement créer, ceci permet de mettre le site sur un serveur web classique et non derrière NodeJS.
Si aucun changement problèmatique à été fait, une simple exécution de la commande ```next build``` dans la racine devrait suiffire à exporter le site.
