let searchRecipeInput = document.getElementById('searchRecipeInput');
let foundProductsTags = document.getElementById('foundProductsTags');


/* ******************************************************* */
/* ***************** SEARCH RECIPE INPUT ***************** */
/* ******************************************************* */
searchRecipeInput.addEventListener('keypress', function(event) {
    
    if (event.key === 'Enter') {
      event.preventDefault();

     let tag = createComponentTag(searchRecipeInput.value);
     foundProductsTags.append(tag);

     searchRecipeInput.value = '';
    }
  });


/* ******************************************************* */
/* **************** CREATE COMPONENT TAG ***************** */
/* ******************************************************* */
function createComponentTag(value){
    let tag = createNewElement('button', 'found-product-tag');
    tag.type = 'button';

    let valueName = createNewElement('span', '', value);
    tag.append(valueName);

    let icon = createNewElement('span', 'icon-tick-circle tag-notif-icon');
    tag.append(icon);

    icon.addEventListener('click', (e) => {
      searchRecipeSelect.removeOption(e.currentTarget.previousSibling.innerHTML);
      
      e.currentTarget.closest('.found-product-tag').remove();
      searchRecipeSelect.refreshOptions();

    })

    return tag;
}


/* ******************************************************* */
/* ************** TOM SELECT SEARCH RECIPE *************** */
/* ******************************************************* */
let componentNameOptions = [...new Set(apiResult.flatMap(item => item.menu.map(comp => comp.component_name)))].map(name => ({
    value: name, 
    text: name
}));


let searchRecipeSelect = new TomSelect('#searchRecipeInput', {
    maxItems: 10,
	  options: componentNameOptions
});

searchRecipeSelect.on('item_remove', function(value) {
  searchRecipeSelect.refreshOptions(value);

  let newOptions = [
    {value: value, text: value}];
  searchRecipeSelect.addOption(newOptions);
});


let selectedProductsContainer = document.getElementById('foundProductsTags');

searchRecipeSelect.on('item_add', function(value, item) {

  let tag = createComponentTag(value);
  selectedProductsContainer.appendChild(tag);
});


/* ******************************************************* */
/* ********* EVENT ON TAB CLICK SELECTED PRODUCT ********* */
/* ******************************************************* */

/* searchRecipeSelect.control.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) { 
    event.preventDefault();
    if (searchRecipeSelect.isOpen) {

      
      let activeItem = searchRecipeSelect.dropdown.querySelector('.active');
      let nextItem = activeItem.nextElementSibling; 
      if (nextItem) { 
        searchRecipeSelect.setActiveItem(nextItem); 
        searchRecipeSelect.control.focus();
      }
    } else { 
      searchRecipeSelect.open(); 
    }
  }
});

searchRecipeSelect.on('close', function() {
  searchRecipeSelect.control.focus();
});
 */



/* ******************************************************* */
/* ************** TOM SELECT CATEGORY RECIPES ************ */
/* ******************************************************* */
let categoryRecipesOptions = [...new Set(apiResult.flatMap(item => item.category_name))].map(name => ({
  value: name, 
  text: name
}));


let categoryRecipesSelect = new TomSelect('#categoryRecipes', {
  options: categoryRecipesOptions
});