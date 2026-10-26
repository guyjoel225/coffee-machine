# Développement piloté par les tests (TDD)

## 1. Technologies utilisées

Le projet repose sur les technologies suivantes :

- **TypeScript** : langage de programmation.
- **Vitest** : framework de tests unitaires.
- **tsx** : exécution directe des fichiers TypeScript, sans compilation préalable.
- **Express** : framework pour développer des applications et des API HTTP avec Node.js.
- **@types/node** : définitions de types TypeScript pour Node.js.
- **@types/express** : définitions de types TypeScript pour Express.
- **esbuild** : outil utilisé notamment par `tsx` pour transformer rapidement le code.

## 2. Initialisation du projet et installation des dépendances

Créer le fichier `package.json` et initialiser le projet :

```bash
npm init -y
```

Installer les dépendances de développement :

```bash
npm install -D typescript tsx vitest @types/node @types/express
```

Installer Express :

```bash
npm install express
```

Ces commandes permettent de séparer les dépendances nécessaires à l'exécution de l'application de celles principalement utilisées pendant le développement.

## 3. Autoriser les scripts d'installation d'esbuild

Certaines versions de npm peuvent bloquer les scripts d'installation de dépendances.

Si npm affiche un avertissement demandant d'approuver `esbuild`, vérifier d'abord la version concernée, puis utiliser la commande d'approbation adaptée à la version de npm installée.

Ne pas exécuter une commande d'approbation sans vérifier sa syntaxe et le paquet concerné. En particulier, `npm install-scripts approve esbuild@0.28.2` n'est pas une syntaxe npm standard.

## 4. Configurer TypeScript

Créer ou compléter le fichier `tsconfig.json`.

Pour un projet Node.js utilisant les modules ES, une configuration minimale peut être la suivante :

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

Cette configuration permet notamment :
- d'activer le mode strict de TypeScript ;
- d'utiliser les modules ES selon les règles de Node.js ;
- de placer les fichiers compilés dans `dist/` ;
- de limiter la compilation aux fichiers de l'application.

Pour un projet utilisant Vitest, il faudra également vérifier la configuration des tests et leur typage.

## 5. Configurer les modules ES

Dans `package.json`, ajouter :

```json
{
  "type": "module"
}
```

Si le fichier contient déjà d'autres propriétés, conserver celles-ci et ajouter simplement `"type": "module"`.

Cette déclaration indique à Node.js que les fichiers `.js` du projet utilisent les modules ES. Elle doit être cohérente avec la configuration TypeScript choisie.

## 6. Configurer Vitest

Créer le fichier `vitest.config.ts` à la racine du projet.

Configuration minimale :

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
```

Cette configuration demande à Vitest de rechercher les tests dans le répertoire `tests/`, avec des noms se terminant par `.test.ts`.

Documentation officielle : https://vitest.dev/config/

## 7. Configurer les scripts npm

Dans la propriété `scripts` de `package.json`, ajouter les commandes suivantes :

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "00": "tsx src/00-commande.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

### Rôle des scripts

- `npm run test` : lance Vitest en mode surveillance. Les tests sont relancés lors des modifications détectées.
- `npm run test:run` : exécute les tests une seule fois, notamment pour l'intégration continue.
- `npm run build` : compile les fichiers TypeScript vers le répertoire `dist/`.
- `npm run dev` : exécute l'application en développement et redémarre le processus lors des modifications.
- `npm run start` : exécute la version compilée de l'application.
- `npm run 00` : exécute directement le fichier `src/00-commande.ts` avec `tsx`.

**Remarque :** le script `start` suppose que le point d'entrée est `src/index.ts` et que la compilation produit `dist/index.js`.

## 8. Lancer les tests

Pour démarrer Vitest en mode surveillance :

```bash
npm run test
```

Pour exécuter tous les tests une seule fois :

```bash
npm run test:run
```

Dans une démarche TDD, il est conseillé d'écrire d'abord le test, de constater son échec, puis d'implémenter le comportement attendu.

## 9. Compiler l'application

Pour compiler le projet :

```bash
npm run build
```

Si la compilation échoue, examiner les messages de TypeScript et corriger les erreurs de typage avant de poursuivre.

Contrairement à la commande `tsc ./src/index.ts`, le script `tsc` utilise le fichier `tsconfig.json` du projet et applique les options de compilation définies.

## 10. Exécuter l'application

### En développement

```bash
npm run dev
```

Cette commande utilise `tsx watch` pour exécuter directement le code TypeScript et redémarrer l'application lorsqu'un fichier est modifié.

### Après compilation

```bash
npm run build
npm run start
```

Node.js exécute alors le code JavaScript généré dans `dist/`.

## 11. Premiers cas de test du Coffee Machine Project

Les tests suivants servent à vérifier la transformation d'une commande en instruction destinée au `DrinkMaker`.

| N° | Cas testé | Instruction attendue |
|---:|---|---|
| 1 | Thé sans sucre | `T::` |
| 2 | Café sans sucre | `C::` |
| 3 | Chocolat sans sucre | `H::` |
| 4 | Thé avec un sucre | `T:1:0` |
| 5 | Café avec deux sucres | `C:2:0` |
| 6 | Envoi d'un message au client | `M:Bonjour` |
| 7 | Jus d'orange sans sucre |O::|

Ces cas de test constituent une première base de travail. Les instructions attendues doivent être vérifiées avec les spécifications de l'exercice.

## Les prix des boissons 

|Boisson|prix en Euro|centime|
|Thé|0,40|40|
|Chocolat|0,50|50|
|Café|0,60|60|
|orange|0,60|60|


## temperature de la boisson

extraHot?:boolean

si extraHot ===  true pour le thé on aura

pour code Th:: avec avec la temperature extraHot

### Conclusion

La configuration de l'environnement constitue la première étape du projet. Une fois TypeScript, Vitest et les scripts npm opérationnels, le développement peut commencer en appliquant systématiquement le cycle :

**RED → GREEN → REFACTOR**

Chaque comportement sera testé séparément avant d'être implémenté, puis le code sera amélioré sans compromettre les tests existants.


