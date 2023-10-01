

// L'événement "DOMContentLoaded" garantit que ce code sera exécuté une fois que le document HTML est entièrement chargé.

document.addEventListener("DOMContentLoaded", function () {


  // ---- DÉCLARATIONS DE VARIABLES GLOBALES ----


  let recipes = []; // Stocke toutes les recettes

  let activeTags = []; // Stocke les tags actifs sélectionnés par l'utilisateur

  let filteredRecipes = []; // Stocke les recettes filtrées basées sur la recherche et les tags actifs


  // ---- DÉCLARATIONS DE FONCTIONS ----


  // Fonction pour créer une "div" HTML représentant une recette

  function createRecipeDiv(recipe) {

    // Obtient la div parent dans le DOM où les recettes seront insérées

    const recettesParent = document.getElementById("recettesParent");

    // Crée une nouvelle div pour la recette

    const vignetteRecetteDiv = document.createElement("div");

    // Ajoute une classe pour styliser la div de la recette

    vignetteRecetteDiv.classList.add("vignetteRecette");

    // Crée une div pour l'image de la recette

    const imageRecette = document.createElement("div");

    // Ajoute une classe pour styliser l'image

    imageRecette.classList.add("imageRecette");

    // Définit l'image de fond de la recette en utilisant un chemin d'accès prédéfini et le nom de l'image de la recette

    imageRecette.style.backgroundImage = `url(assets/images/${recipe.image})`;

    // Crée une div pour le titre de la recette

    const titreRecette = document.createElement("div");

    // Ajoute une classe pour styliser le titre

    titreRecette.classList.add("titreRecette");

    // Crée un élément <h3> pour le titre de la recette

    const h3 = document.createElement("h3");

    // Définit le texte du titre avec le nom de la recette

    h3.textContent = recipe.name;

    // Ajoute le titre à la div du titre

    titreRecette.appendChild(h3);

    // Crée une div pour les détails de la recette

    const detailsRecette = document.createElement("div");
    detailsRecette.classList.add("detailsRecette");

    // Crée une div pour la description de la recette

    const recetteDiv = document.createElement("div");

    // Crée et définit un élément <h4> pour le titre "Recette"

    const recetteTitle = document.createElement("h4");
    recetteTitle.textContent = "Recette";

    // Crée un élément <p> pour la description de la recette

    const recetteDescription = document.createElement("p");

    // Ajoute des classes pour styliser la description

    recetteDescription.classList.add("scrollbar", "force-overflow");

    // Attribue un identifiant à la description (pour référence ou stylisation)

    recetteDescription.id = "style-2";

    // Définit le contenu de la description

    recetteDescription.textContent = recipe.description;

    // Ajoute le titre et la description à la div de la recette

    recetteDiv.appendChild(recetteTitle);
    recetteDiv.appendChild(recetteDescription);

    // Crée une div pour les ingrédients

    const ingredientDiv = document.createElement("div");

    // Crée et définit un élément <h4> pour le titre "Ingrédients"

    const ingredientTitle = document.createElement("h4");
    ingredientTitle.textContent = "Ingrédients";
    ingredientDiv.appendChild(ingredientTitle);

    // Crée une div parent pour tous les ingrédients

    const ingredientParentDiv = document.createElement("div");
    ingredientParentDiv.classList.add("ingredient-parent");

    // Parcourt chaque ingrédient de la recette

    recipe.ingredients.forEach((ing) => {

      // Crée une div pour chaque ingrédient

      const ingredientItemDiv = document.createElement("div");
      ingredientItemDiv.classList.add("ingredient-enfant");

      // Crée une div pour le nom de l'ingrédient

      const ingredientNameDiv = document.createElement("div");
      ingredientNameDiv.classList.add("nameIngredient");
      ingredientNameDiv.textContent = ing.ingredient;
      ingredientItemDiv.appendChild(ingredientNameDiv);

      // Crée une div pour la quantité et l'unité de l'ingrédient

      const ingredientQuantityDiv = document.createElement("div");
      ingredientQuantityDiv.classList.add("quantityUnit-style");
      ingredientQuantityDiv.textContent = `${ing.quantity || ""} ${
        ing.unit || ""
      }`.trim();
      ingredientItemDiv.appendChild(ingredientQuantityDiv);

      // Ajoute l'ingrédient à la div parent des ingrédients

      ingredientParentDiv.appendChild(ingredientItemDiv);
    });

    // Ajoute la div parent des ingrédients à la div des ingrédients

    ingredientDiv.appendChild(ingredientParentDiv);


    // Ajoute les détails (description et ingrédients) à la div des détails

    detailsRecette.appendChild(recetteDiv);
    detailsRecette.appendChild(ingredientDiv);

    // Assemble et ajoute tous les éléments à la div principale de la recette

    vignetteRecetteDiv.appendChild(imageRecette);
    vignetteRecetteDiv.appendChild(titreRecette);
    vignetteRecetteDiv.appendChild(detailsRecette);

    // Ajoute la div de la recette au container parent dans le DOM

    recettesParent.appendChild(vignetteRecetteDiv);

    // Renvoie la div complète de la recette (peut être utilisé si d'autres manipulations sont nécessaires ultérieurement)

    return vignetteRecetteDiv;
  }

// Fonction pour filtrer les recettes basées sur une requête de recherche et des tags actifs

function filterRecipes(query) {

    // Convertit la requête de recherche en minuscules pour garantir que la recherche est insensible à la casse

    const lowerCaseQuery = query.toLowerCase();

    // Filtre la liste des recettes pour n'inclure que celles qui correspondent à la requête de recherche et/ou aux tags actifs

    filteredRecipes = recipes.filter((recipe) => {

        // Vérifie si le nom de la recette, les ingrédients, l'appareil ou les ustensiles correspondent à la requête de recherche

        const isInRecipe = lowerCaseQuery
            ? recipe.name.toLowerCase().includes(lowerCaseQuery) // Vérifie si le nom de la recette correspond à la requête 
            || 
              recipe.ingredients.some((ing) =>                       // Vérifie si l'un des ingrédients correspond à la requête
                ing.ingredient.toLowerCase().includes(lowerCaseQuery)
              ) ||
              (recipe.appliance &&                                   // Vérifie si l'appareil de la recette correspond à la requête
                recipe.appliance.toLowerCase().includes(lowerCaseQuery)) 
                ||
              (recipe.ustensils &&                                   // Vérifie si l'un des ustensiles correspond à la requête
                recipe.ustensils.some((ust) =>
                  ust.toLowerCase().includes(lowerCaseQuery)
                ))

            || (recipe.description &&
                 recipe.description.toLowerCase().includes(lowerCaseQuery))
            : true;   // Si aucune requête n'est fournie, considère que toutes les recettes correspondent

        // Vérifie si la recette contient tous les tags actifs sélectionnés

        const hasActiveTags =
            activeTags.length === 0
                ? true
                : activeTags.every(
                    (tag) =>
                        recipe.name.toLowerCase().includes(tag.toLowerCase()) ||         // Vérifie si le nom de la recette contient le tag
                        recipe.ingredients.some((ing) =>                                 // Vérifie si l'un des ingrédients contient le tag
                            ing.ingredient.toLowerCase().includes(tag.toLowerCase())
                        ) ||
                        (recipe.appliance &&                                             // Vérifie si l'appareil de la recette contient le tag
                            recipe.appliance.toLowerCase().includes(tag.toLowerCase())) ||
                        (recipe.ustensils &&                                             // Vérifie si l'un des ustensiles contient le tag
                            recipe.ustensils.some((ust) =>
                                ust.toLowerCase().includes(tag.toLowerCase())
                            ))
                  );

        // Renvoie true si la recette correspond à la fois à la requête de recherche et aux tags actifs, sinon false

        return isInRecipe && hasActiveTags;
    });
    // Sélectionne l'élément du DOM qui servira de conteneur pour afficher les recettes

    const container = document.querySelector("#recettesParent");
    
    // Efface le contenu actuel du conteneur. Cela prépare le conteneur pour afficher de nouvelles recettes filtrées

    container.innerHTML = "";

    // Pour chaque recette dans la liste des recettes filtrées...

    filteredRecipes.forEach((recipe) => {

        // Crée une représentation visuelle de la recette (en utilisant la fonction createRecipeDiv) 

        // et l'ajoute au conteneur

        container.appendChild(createRecipeDiv(recipe));
    });

    // Appelle la fonction getUniqueData pour mettre à jour les listes déroulantes (comme les ingrédients, 
    // appareils, ustensiles) en fonction des recettes actuellement affichées
    
    getUniqueData();

}

  // Fonction pour créer une liste déroulante personnalisée à partir d'un sélecteur et d'une liste de valeurs

  function createCustomDropdown(selector, values) {

    // Sélectionne l'élément du DOM basé sur le sélecteur fourni

    const selectList = document.querySelector(selector);

    // Crée une nouvelle div qui servira de liste déroulante personnalisée

    const customDropdown = document.createElement("div");

    // Ajoute la classe "custom-dropdown" à la div pour stylisation

    customDropdown.classList.add("custom-dropdown");

    // Attribue un identifiant "style-2" à la div de la liste déroulante (probablement pour des besoins de stylisation)

    customDropdown.id = "style-2";

    // Parcourt chaque valeur fournie

    values.forEach((value) => {
        // Crée un élément div pour chaque valeur

        const item = document.createElement("div");

        // Attribution d'une class aux item

        item.classList.add("item-list")

        // Attribue la valeur courante comme contenu de l'élément

        item.textContent = value;

        // Ajoute un gestionnaire d'événement qui se déclenchera lorsque l'élément est cliqué

        item.addEventListener("click", () => {

            // Appelle la fonction addTag pour ajouter une étiquette basée sur la valeur cliquée

            addTag(selector, value);
            

            // Masque la liste déroulante après avoir cliqué sur un élément

            customDropdown.style.display = "none";
        });

        // Ajoute l'élément à la liste déroulante personnalisée

        customDropdown.appendChild(item);
    });

    // Ajoute la liste déroulante personnalisée à l'élément sélectionné initialement

    selectList.appendChild(customDropdown);

    // Sélectionne l'en-tête de la liste déroulante personnalisée (c'est généralement une div cliquable pour afficher/masquer la liste)

    const selectHeader = selectList.querySelector(".select-header");

    // Ajoute un gestionnaire d'événement pour l'en-tête qui se déclenchera lors d'un clic

    selectHeader.addEventListener("click", () => {

        // Basculer la visibilité de la liste déroulante personnalisée à chaque clic

        customDropdown.style.display =
            customDropdown.style.display === "block" ? "none" : "block";
    });
}


  // Fonction pour remplir (ou actualiser) une liste déroulante existante basée sur un sélecteur et une liste de valeurs

function fillList(listSelector, values) {

    // Sélectionne l'élément du DOM basé sur le sélecteur fourni

    const selectList = document.querySelector(listSelector);

    // Recherche une liste déroulante personnalisée existante à l'intérieur de l'élément sélectionné

    const oldDropdown = selectList.querySelector(".custom-dropdown");

    // Si une ancienne liste déroulante est trouvée, la supprime

    if (oldDropdown) {
        oldDropdown.remove();
    }

    // Crée et ajoute une nouvelle liste déroulante basée sur le sélecteur et les nouvelles valeurs

    createCustomDropdown(listSelector, values);
}


 // Fonction pour récupérer et traiter les données uniques (comme les ingrédients, les appareils et les ustensiles) 
// à partir des recettes actuellement filtrées

function getUniqueData() {

    // L'opérateur de décomposition(... new Set) est utilisé pour convertir l'ensemble en un tableau. Il prend chaque élément de l'ensemble et le "décompose" en éléments individuels.
    // flatMap combine ensuite tous ces tableaux d'ingrédients en un seul tableau. Car, dans le Json les chaque ingrédients sont sous forme de tableau.

    // Récupère une liste unique d'ingrédients à partir des recettes filtrées. 
    // La combinaison de flatMap et Set élimine les doublons.

    let ingredientsUnique = [
        ...new Set(
            filteredRecipes.flatMap((recipe) =>
                recipe.ingredients.map((ing) => ing.ingredient)
            )
        ),
    ];

    // Récupère une liste unique d'appareils à partir des recettes filtrées. 
    // L'utilisation de Set élimine les doublons.

    let appliancesUnique = [
        ...new Set(filteredRecipes.map((recipe) => recipe.appliance)),
    ];

    // Récupère une liste unique d'ustensiles à partir des recettes filtrées. 
    // La combinaison de flatMap et Set élimine les doublons.

    let ustensilsUnique = [
        ...new Set(filteredRecipes.flatMap((recipe) => recipe.ustensils)),
    ];

    // Remplit la liste déroulante d'ingrédients avec les ingrédients uniques

    fillList(".select-list:nth-child(1)", ingredientsUnique);

    // Remplit la liste déroulante d'appareils avec les appareils uniques

    fillList(".select-list:nth-child(2)", appliancesUnique);

    // Remplit la liste déroulante d'ustensiles avec les ustensiles uniques

    fillList(".select-list:nth-child(3)", ustensilsUnique);
}




function addTag(type, value) {

    // Convertissez le tableau en Set pour une vérification facile des doublons

    const tagsSet = new Set(activeTags);

    // Vérifiez si la valeur est déjà dans le Set

    if (tagsSet.has(value)) {

        alert("L'élément est déjà ajouté !");

        return; // Si la valeur est déjà présente, ne faites rien

    }

    // Sélectionne la section d'étiquettes où les nouvelles étiquettes seront ajoutées

    const tagSection = document.querySelector(".tag");

    // Crée une nouvelle div qui représentera l'étiquette

    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tagItem");

    // Crée un paragraphe pour afficher la valeur de l'étiquette

    const tagText = document.createElement("p");
    tagText.textContent = value;
    tagDiv.appendChild(tagText);

    // Crée l'élément SVG
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", "14");
    svgElement.setAttribute("height", "13");
    svgElement.setAttribute("viewBox", "0 0 14 13");
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("d", "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5");
    pathElement.setAttribute("stroke", "#1B1B1B");
    pathElement.setAttribute("stroke-width", "2.16667");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(pathElement);
    tagDiv.appendChild(svgElement);

    tagDiv.addEventListener("click", () => {
        tagDiv.remove();
        activeTags = activeTags.filter((tag) => tag !== value);
        filterRecipes(document.querySelector(".input-search").value);
    });

    tagSection.appendChild(tagDiv);
    activeTags.push(value);
    filterRecipes(document.querySelector(".input-search").value);
    resetAllArrows()
}

// Fonction pour réinitialiser toutes les flèches
function resetAllArrows() {
    const allPaths = document.querySelectorAll(".arrow-path");
    allPaths.forEach(path => {
        resetArrowDown(path);
    });
}
// Fonction pour réinitialiser une flèche spécifique
function resetArrowDown(path) {
    path.setAttribute("d", "M1 1L7.5 7L14 1");
}

// ---- INITIALISATIONS & ÉCOUTEURS D'ÉVÉNEMENTS ----


// Sélection de l'élément d'entrée de recherche sur la page

const inputSearch = document.querySelector(".input-search");

// Ajout d'un écouteur d'événements pour détecter tout changement dans l'élément d'entrée de recherche

inputSearch.addEventListener("input", function () {

    // Si la longueur de la chaîne de recherche est >= 3 OU s'il y a des étiquettes actives...

    if (this.value.length >= 3 || activeTags.length > 0) {

        // Appelle la fonction pour filtrer les recettes en fonction de la chaîne de recherche

        filterRecipes(this.value);
    } else {

        // Sinon, réinitialise le filtre pour afficher toutes les recettes

        filterRecipes("");
    }
});

// Sélectionne tous les boutons sur la page avec la classe "options-view-button"

const buttons = document.querySelectorAll(".options-view-button");


// Pour chaque bouton...
buttons.forEach((button) => {
    const path = button.parentElement.querySelector(".arrow-path"); 

    // Bascule l'état de la flèche lors du clic sur le bouton
    button.addEventListener("click", () => {
        if (path.getAttribute("d") === "M1 7L7.5 1L14 7") {
            resetArrowDown(path);
        } else {
            path.setAttribute("d", "M1 7L7.5 1L14 7");
        }
    });
});

// ---- LOGIQUES D'EXÉCUTION ----


// Effectue une requête pour obtenir des données de recette à partir d'un fichier JSON

fetch("assets/js/recipes.json")
    .then((response) => response.json())
    .then((data) => {

        // Transforme les données des recettes pour inclure une liste de balises (tags) pour chaque recette

        recipes = data.recipes.map((recipe) => ({
            ...recipe,
            tags: [
                ...recipe.ingredients.map((ing) => ing.ingredient),
                recipe.appliance,
                ...recipe.ustensils,
            ].map((val) => val.toLowerCase()),  // Convertit toutes les balises en minuscules pour la cohérence

        }));

        // Filtre initialement les recettes pour montrer toutes les recettes

        filterRecipes("");

        // Appelle une fonction pour récupérer des données uniques pour remplir les listes déroulantes

        getUniqueData();
    })
    .catch((error) => {

        // En cas d'erreur lors de la récupération des données, affiche une erreur dans la console

        console.error(
            "Il y a eu un problème avec l'opération fetch: ",
            error.message
        );
    });
});




