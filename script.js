

document.addEventListener("DOMContentLoaded", function() {
    function createRecipeDiv(recipe) {

        const recettesParent = document.getElementById('recettesParent');
        const vignetteRecetteDiv = document.createElement('div');
        vignetteRecetteDiv.classList.add('vignetteRecette');
    
        const imageRecette = document.createElement('div');
        imageRecette.classList.add('imageRecette');
        imageRecette.style.backgroundImage = `url(assets/${recipe.image})`;
    
        const titreRecette = document.createElement('div');
        titreRecette.classList.add('titreRecette');
        const h3 = document.createElement('h3');
        h3.textContent = recipe.name;
        titreRecette.appendChild(h3);
    
        const detailsRecette = document.createElement('div');
        detailsRecette.classList.add('detailsRecette');
    
        const recetteDiv = document.createElement('div');
        const recetteTitle = document.createElement('h4');
        recetteTitle.textContent = "Recette";
        const recetteDescription = document.createElement('p');
        recetteDescription.textContent = recipe.description;
        recetteDiv.appendChild(recetteTitle);
        recetteDiv.appendChild(recetteDescription);
    
        const ingredientDiv = document.createElement('div');
        const ingredientTitle = document.createElement('h4');
        ingredientTitle.textContent = "Ingrédients";
        const ingredientList = document.createElement('p');
        ingredientList.textContent = recipe.ingredients.map(ing => `${ing.ingredient} ${ing.quantity || ''} ${ing.unit || ''}`).join(', ');
        ingredientDiv.appendChild(ingredientTitle);
        ingredientDiv.appendChild(ingredientList);
    
        detailsRecette.appendChild(recetteDiv);
        detailsRecette.appendChild(ingredientDiv);
    
        vignetteRecetteDiv.appendChild(imageRecette);
        vignetteRecetteDiv.appendChild(titreRecette);
        vignetteRecetteDiv.appendChild(detailsRecette);
    
        recettesParent.appendChild(vignetteRecetteDiv);
    
        return recettesParent;
    }
    
    
    // Charger les données et ajouter les divs de recette au conteneur
    fetch('recipes.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Pour voir la structure de vos données
            const recipes = data.recipes;
            const container = document.querySelector('#recipesContainer');
    
            recipes.forEach(recipe => {
                container.appendChild(createRecipeDiv(recipe));
            });
        })
        .catch(error => {
            console.error("Il y a eu un problème avec l'opération fetch: ", error.message);
        });
    
});

