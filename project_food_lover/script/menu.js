let apiResult = apiMenu.result;
let resultRecipeSearch = document.getElementById('resultRecipeSearch');
let detailsRecipeBodyModal = document.getElementById('detailsRecipeBodyModal');


/* GET API RESULT */
apiResult.forEach(item => {

   let findRecipe = createRecipteItem(item.id, item.recipe_name, item.img, item.rating);
   resultRecipeSearch.append(findRecipe);
})


/* ******************************************************* */
/* ***************** CREATE RECIPE ITEM ****************** */
/* ******************************************************* */
function createRecipteItem(id, recipeName, urlImg, rating){

    let ratingCountMax = 5;

    let findResipeItem = createNewElement('button', 'find-recipe-result-item');
    findResipeItem.id = id;
    findResipeItem.type = 'button';
    findResipeItem.addEventListener('click', event => {
        openRecipeModal(event);
    });

    let img = createNewElement('div', 'find-recipe-result-item-img');
    img.style.backgroundImage = `url('images/recipe-img/${urlImg}')`;
    findResipeItem.append(img);

    let contentDesc = createNewElement('div', 'find-recipe-result-item-desc');
    findResipeItem.append(contentDesc);

    let recipeNameItem = createNewElement('h3', 'find-recipe-result-item-name', recipeName);
    contentDesc.append(recipeNameItem);

    let contentRating = createNewElement('div', 'find-recipe-result-item-rating');
    contentDesc.append(contentRating);

    for(let i = 1; i <= ratingCountMax; i++){

        let iconStart = createNewElement('span', 'icon-star');

        if(i <= rating){

            iconStart.classList.remove('icon-star');
            iconStart.classList.add('icon-star-1');
        }

        contentRating.append(iconStart);

    }


    return findResipeItem;


}

/* ******************************************************* */
/* ****************** OPEN RECIPE MODAL ****************** */
/* ******************************************************* */
function openRecipeModal(event){

    let itemId = event.currentTarget.id;

    let recipeItemResult = apiResult.filter(x => x.id == itemId);

    if(recipeItemResult.length == 1){
        updateRecipeModalContent(recipeItemResult[0]);
    }



    detailsRecipeModal.classList.add('show');
    detailsRecipeModal.classList.remove('hide');
}

/* ******************************************************* */
/* ************ UPDATE RECIPE MODAL CONTENT ************** */
/* ******************************************************* */
function updateRecipeModalContent(item){

    detailsRecipeBodyModal.innerHTML = '';

    let ratingCountMax = 5;
    let recipeName, categoryName, urlImg, cookingTime, rating, desc, menu;

    recipeName = item.recipe_name;
    categoryName = item.category_name;
    urlImg = item.img;
    cookingTime = item.cooking_time;
    rating = item.rating;
    desc = item.desc;
    menu = item.menu;

    let recipeImg = createNewElement('div', 'product-img-modal');
    recipeImg.style.backgroundImage = `url('images/recipe-img/${urlImg}')`;
    detailsRecipeBodyModal.append(recipeImg);

    let recipeDetails = createNewElement('div', 'product-details-modal');
    detailsRecipeBodyModal.append(recipeDetails);

    let recipeDetailsContent = createNewElement('div', 'product-details-modal-content');
    recipeDetails.append(recipeDetailsContent);

    let title = createNewElement('h2', '', recipeName);
    recipeDetailsContent.append(title);

    let recipeDetailsMenu = createNewElement('div', 'product-details-modal-content-flex');
    recipeDetailsContent.append(recipeDetailsMenu);

    let recipeList = createNewElement('ul', 'recipe-lists');
    recipeDetailsMenu.append(recipeList);
    
    menu.forEach(menuItem => {
        
        let li = createNewElement('li', '', menuItem.component_name + ' - ' + menuItem.component_count);
        recipeList.append(li);
    })

    let recipeDetailsTime = createNewElement('div');
    recipeDetailsMenu.append(recipeDetailsTime);

    let contentRating = createNewElement('div', 'find-recipe-result-item-rating');
    recipeDetailsTime.append(contentRating);

    for(let i = 1; i <= ratingCountMax; i++){

        let iconStart = createNewElement('span', 'icon-star');

        if(i <= rating){

            iconStart.classList.remove('icon-star');
            iconStart.classList.add('icon-star-1');
        }

        contentRating.append(iconStart);

    }

    let timeDiv = createNewElement('span', 'cooking-time');
    recipeDetailsTime.append(timeDiv);

    let timeIcon = createNewElement('span', 'icon-timer-1 me-2');
    timeDiv.append(timeIcon);

    let time = createNewElement('span', '', `${cookingTime} mins`);
    timeDiv.append(time);


    let recipeDesc = createNewElement('div', 'product-desc-modal');
    detailsRecipeBodyModal.append(recipeDesc);

    let p = createNewElement('p', 'mb-0', desc);
    recipeDesc.append(p);


}