import areasJson from '../api/areas.json' with  { type: 'json' };
import pricingJson from '../api/pricing.json' with  { type: 'json' };

let delivery_type, print_type, print_size, print_side, selected_areas = [];

/* ******* CREATE NEW ELEMENT ******* */
function createNewElement(tag, className='', text=''){
    let el = document.createElement(tag);
    el.className = className;
    el.innerHTML = text;
    return el;
}
/* ******* CREATE ROW ELEMENT ******* */
function createRowElement(className) {
	let element = createNewElement('div', className);
	return element;
}
/* ******* CREATE INPUT TYPE HIDDEN ******* */
function createInputHidden(name, value){
	let inputEl = document.createElement('input');
	inputEl.value = value;
	inputEl.name = name;
	inputEl.type = 'hidden';

	return inputEl;
}
/* ******* NAVBAR MENU ******* */
let navbarNavMenu = document.getElementById('navbarNavAltMarkup');
let navbarLinks = navbarNavMenu.querySelectorAll('.nav-link');
var navbarNavMenuCollapse = new bootstrap.Collapse(navbarNavMenu, { toggle: false });

navbarLinks.forEach(link => {
	link.addEventListener('click', function () {
		navbarNavMenuCollapse.hide();
	})
});
/* ******* MAIN MENU ******* */
let navbar = document.querySelector('.navbar');

navbarNavMenu.addEventListener('show.bs.collapse', function () {
    navbar.classList.add('active');
});
navbarNavMenu.addEventListener('hidden.bs.collapse', function () {
    navbar.classList.remove('active');
});
/* ******* BUTTONS ANIMATION ******* */
document.querySelectorAll('.btn-animation').forEach((el)=>{
	el.addEventListener('mouseenter', function (event) {
	  	let relX = event.pageX - this.offsetLeft;
	  	let relY = event.pageY - this.offsetTop;
		let span = this.querySelector('.js-element-animation');
		span.style.top = `${relY}px`;
		span.style.left = `${relX}px`;
	})
	el.addEventListener('mouseout', function (event) {
		let relX = event.pageX - this.offsetLeft;
	  	let relY = event.pageY - this.offsetTop;
		let span = this.querySelector('.js-element-animation');
		span.style.top = `${relY}px`;
		span.style.left = `${relX}px`;
	})
});
/* ******* ANIMATION ******* */
let animateClassNext = 'animate-content-next';
let animateClassBack = 'animate-content-back';

function animationQuote(animateClass, element) {
	element.classList.add(animateClass);
	
	setTimeout(function() {
		element.classList.remove(animateClass);
	}, 900);
}
/* ******* GET A QUOTE SECTION ******* */
let getQuoteContent = document.getElementById('getQuoteContent');
let getQuoteForm = document.getElementById('getQuoteForm');
let buttonsQuote = getQuoteForm.querySelectorAll('button');
let quoteStartContent = getQuoteForm.querySelector('.quote-start-content');
let dataDeliveryValue;

buttonsQuote.forEach((btn) => {
	let card = btn.closest('.card-flyer');

	card.addEventListener('click', function(event) {
		quoteStartContent.classList.add('d-none');

		dataDeliveryValue = btn.dataset.delivery;
		let inputEl = createInputHidden('delivery_type', dataDeliveryValue);
		getQuoteForm.append(inputEl);

		createStepCardType(dataDeliveryValue);
		getQuoteContent.scrollIntoView();
	})
})
/* ******* CREATE STEP CARD TYPE ******* */
function createStepCardType(value){
	getQuoteContent.innerHtml = '';

	if(value == 'direct'){
		/* *** CREATE HEADING *** */
		let headingRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
		getQuoteContent.append(headingRowEl);
		let heading = createSectionHeading('Dostawa bezpośrednia', 'Co możemy dla Ciebie wydrukować?');
		headingRowEl.append(heading);

		/* *** CREATE CONTENT *** */
		let contentRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
		getQuoteContent.append(contentRowEl);

		let columnOne = createCard('Wizytówki', 'Ekonomiczne wizytówki, które można wrzucać do skrzynek pocztowych przy drzwiach', 'card-double.svg', 'print_type', 'business_card', false, false, onCardTypeBtnClicked);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Zawieszki na drzwi', 'Gruby karton, który można łatwo zawiesić na klamkach drzwi, zapewniając maksymalną widoczność', 'doorhanger-double.svg', 'print_type', 'doorhanger', true, false, onCardTypeBtnClicked);
		contentRowEl.append(columnTwo);

		let columnThree = createCard('Pocztówki', 'Małe i trwałe karty, które można umieścić w skrzynkach pocztowych lub między drzwiami', 'flyers-double.svg', 'print_type', 'postcard', false, false, onCardTypeBtnClicked);
		contentRowEl.append(columnThree);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);
	}
	if(value == 'mailbox'){
		/* *** CREATE HEADING *** */
		let headingRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
		getQuoteContent.append(headingRowEl);
		let heading = createSectionHeading('Dostawa do skrzynki pocztowej', 'Co możemy dla Ciebie wydrukować?');
		headingRowEl.append(heading);

		/* *** CREATE CONTENT *** */
		let contentRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
		getQuoteContent.append(contentRowEl);

		let columnOne = createCard('Pocztówki', 'Małe i trwałe karty, które można umieścić w skrzynkach pocztowych lub między drzwiami', 'flyers-double.svg', 'print_type', 'postcard', true, false, onCardTypeBtnClicked);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Wizytówki', 'Ekonomiczne wizytówki, które można wrzucać do skrzynek pocztowych przy drzwiach', 'card-double.svg', 'print_type', 'business_card', false, false, onCardTypeBtnClicked);
		contentRowEl.append(columnTwo);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);
	}
}
/* ******* ONCLICKED CARD TYPE BUTTON ******* */
function onCardTypeBtnClicked(event) {
	let dataName = event.currentTarget.dataset.name;
	let dataValue = event.currentTarget.dataset.value;
	let inputElement = createInputHidden(dataName, dataValue);

	getQuoteForm.append(inputElement);

	createStepCardSize(dataValue);

	getQuoteContent.scrollIntoView();
}
/* ******* CREATE STEP CARD SIZE ******* */
function createStepCardSize(dataValue){
	getQuoteContent.innerHTML = '';

	/* ************** CREATE HEADING ************** */
	let headingRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
	getQuoteContent.append(headingRowEl);

	let heading = createSectionHeading('Wybierz rozmiar', "Dzięki różnym dostępnym opcjom możesz idealnie dopasować rozmiar do swoich potrzeb i oczekiwań.");
	headingRowEl.append(heading);

	/* ************** CREATE ROW ************** */
	let contentRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
	getQuoteContent.append(contentRowEl);

	if (dataValue == 'doorhanger') {

		/* ************** CREATE COLUMNS ************** */
		let columnOne = createCard('Większy', '10.5 x 21.6 cm', 'doorhanger-double.svg', 'print_size', 'large', true, true, onCardSizeBtnClicked);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Standard', '7.6 x 21 cm', 'doorhanger-double.svg', 'print_size', 'small', false, true, onCardSizeBtnClicked);
		contentRowEl.append(columnTwo);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);
	}
	if (dataValue == 'business_card') {
		let inputElement = createInputHidden('print_size', 'small');

		getQuoteForm.append(inputElement);
		createStepCardPrinting(dataValue);
		getQuoteContent.scrollIntoView();
	}
	if (dataValue == 'postcard') {

		/* ************** CREATE COLUMNS ************** */
		let columnOne = createCard('Podwójna', '21 × 14.8 cm', 'flyers-double.svg', 'print_size', 'large', true, true, onCardSizeBtnClicked);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Klasyczna', '10.5 × 14.8 cm', 'flyers-double.svg', 'print_size', 'small', false, true, onCardSizeBtnClicked);
		contentRowEl.append(columnTwo);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);
	}
}
/* ******* ONCLICKED CARD TYPE SIZE ******* */
function onCardSizeBtnClicked(event) {

	let dataName = event.currentTarget.dataset.name;
	let dataValue = event.currentTarget.dataset.value;
	let inputElement = createInputHidden(dataName, dataValue);

	getQuoteForm.append(inputElement);
	createStepCardPrinting(dataValue);
	getQuoteContent.scrollIntoView();
}
/* ******* CREATE STEP CARD PRINTING ******* */
function createStepCardPrinting() {
	getQuoteContent.innerHTML = '';	
	
	/* ************** CREATE HEADING ************** */
	let headingRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
	getQuoteContent.append(headingRowEl);

	let heading = createSectionHeading('Lokalizacja drukowania', "W DrukoMarket możesz wybierać między dwoma rozmiarami oraz dwoma opcjami druku: jednostronnym lub dwustronnym.");
	headingRowEl.append(heading);

	/* ************** CREATE ROW ************** */
	let contentRowEl = createRowElement('row justify-content-center align-items-center mb-3 mb-sm-4 mb-md-5');
	getQuoteContent.append(contentRowEl);


	let inputDelivery = getQuoteForm.querySelector('input[name="delivery_type"]');
	let inputCardType = getQuoteForm.querySelector('input[name="print_type"]');

	
	if(inputDelivery.value == 'direct' && inputCardType.value == 'doorhanger'){
		let columnOne = createCard('Dwustronny', 'Nadruk z przodu i z tylu.', 'doorhanger-double.svg', 'print_side', 'double', true, true, createDistributionAreas);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Jednostronny', 'Nadruk tylko na przedniej stronie.', 'doorhanger-single.svg', 'print_side', 'single', false, true, createDistributionAreas);
		contentRowEl.append(columnTwo);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);

	} else if((inputDelivery.value == 'direct' || inputDelivery.value == 'mailbox') && inputCardType.value == 'business_card'){

		let columnOne = createCard('Dwustronny', 'Nadruk z przodu i z tylu.', 'card-double.svg', 'print_side', 'double', true, true, createDistributionAreas);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Jednostronny', 'Nadruk tylko na przedniej stronie.', 'card-single.svg', 'print_side', 'single', false, true, createDistributionAreas);
		contentRowEl.append(columnTwo);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);

	} else if((inputDelivery.value == 'direct' || inputDelivery.value == 'mailbox') &&  inputCardType.value == 'postcard'){
		
		let columnOne = createCard('Dwustronny', 'Nadruk z przodu i z tylu.', 'flyers-double.svg', 'print_side', 'double', true, true, createDistributionAreas);
		contentRowEl.append(columnOne);

		let columnTwo = createCard('Jednostronny', 'Nadruk tylko na przedniej stronie.', 'flyers-single.svg', 'print_side', 'single', false, true, createDistributionAreas);
		contentRowEl.append(columnTwo);

		let columnElBtnBlack = createBtnStepBack();
		getQuoteContent.append(columnElBtnBlack);
	}

	getQuoteContent.scrollIntoView();
}
/* ******* CREATE DISTRIBUTION AREAS ******* */
function createDistributionAreas(event){
	let dataName = event.currentTarget.dataset.name;
	let dataValue = event.currentTarget.dataset.value;
	let inputElement = createInputHidden(dataName, dataValue);

	getQuoteForm.append(inputElement);

	getQuoteContent.innerHTML = '';	
	/* ******* CREATE HEADING ******* */
	let headingRowEl = createRowElement('row justify-content-center align-items-center');
	getQuoteContent.append(headingRowEl);

	let heading = createSectionHeading('Obszary dystrybucji', `Daj nam znać, w jakich obszarach chcesz rozmieścić swoją ${dataName, dataValue}. <div class="mt-3"></div>
	 Kliknij na obszary poniżej, które chcesz uwzględnić w swoim obszarze dystrybucji. Gdy wybierzesz obszary, zostaną one dodane do Twojej listy, a Twoja szacowana cena zostanie zaktualizowana. Aby odznaczyć obszar, po prostu kliknij ten obszar ponownie.`);
	headingRowEl.append(heading);

	/* ******* CREATE ROW MAPS ******* */
	let rowMaps = createNewElement('div', 'row row-full text-white');
	getQuoteContent.append(rowMaps);

	let colMaps = createNewElement('div', 'col-12 mb-5');
	rowMaps.append(colMaps);

	/* ******* CREATE MAPS ******* */
	var mapDelivery = document.createElement('div');
	mapDelivery.id = 'map';
	mapDelivery.style.height = '550px';
	mapDelivery.style.width = '100%';
	colMaps.append(mapDelivery);


	delivery_type = getQuoteForm.querySelector('input[name="delivery_type"]').value;
	print_type = getQuoteForm.querySelector('input[name="print_type"]').value;
	print_size = getQuoteForm.querySelector('input[name="print_size"]').value
	print_side = getQuoteForm.querySelector('input[name="print_side"]').value;


	/* ******* CREATE PRICING CONTENT ******* */
	let pricingRow = createNewElement('div', 'row text-white mt-4 mt-lg-5');
	pricingRow.id = 'pricing';
	getQuoteContent.append(pricingRow);
	setPricing([], 0, 'Aby otrzymać szacunkowy koszt, zaznacz obszary, na które chcesz kierować reklamy.');
	initMap(11, 52.2297, 21.0122);
}
/* ******* CREATE SECTION HEADING ******* */
function createSectionHeading(title, desc) {

	/* ************** CREATE COLUMN ************** */
	let column = createNewElement('div', 'col-12 col-sm-10 text-center mb-4 mb-md-5');

	/* ************** CREATE TITLE ************** */
	let titleEl = createNewElement('h2', 'fw-bold pb-md-3', title);
	column.append(titleEl);

	/* ************** CREATE DESCRIPTION ************** */
	let descriptionEl = createNewElement('p', 'lh-sm my-4 py-2');
	descriptionEl.innerHTML = desc;
	column.append(descriptionEl);

	return column;
}
/* ******* CREATE CARD ******* */
function createCard(title, desc, iconName, dataName, dataValue, active, cardSize, onclickFunc) {
	animationQuote(animateClassNext, getQuoteContent);

	/* ************** CREATE COLUMN ************** */
	let columnEl = createNewElement('div', 'col-12 col-sm-10 col-lg-4 mb-5 mb-lg-0');

	/* ************** CREATE CARD CONTAINER ************** */
	let cardContainer = createNewElement('div', 'card-flyer');
	if(active){
		cardContainer.classList.add('active');
	}
	if(cardSize){
		cardContainer.classList.add('card-medium');
	}
	cardContainer.setAttribute('data-name', dataName);
	cardContainer.setAttribute('data-value', dataValue);
	cardContainer.addEventListener('click', onclickFunc);	
	columnEl.append(cardContainer);

	/* ************** CREATE CARD BODY ************** */
	let cardBody = createNewElement('div', 'card-flyer-body d-flex flex-column align-items-center h-100');
	cardContainer.append(cardBody);
	
	/* ************** CREATE CARD BODY ICON ************** */
	let cardBodyIcon = createNewElement('div', 'card-flyer-body-icon');
	cardBody.append(cardBodyIcon);

	let img = document.createElement('img');
	img.src = `dist/images/icons/${iconName}`;
	cardBodyIcon.append(img);

	/* ************** CREATE CARD BODY TEXT ************** */
	let cardBodyText = createNewElement('div', 'card-flyer-body-text d-flex justify-content-center');
	cardBody.append(cardBodyText);

	let cardBodyTextCont = createNewElement('div', 'mt-auto mb-auto');
	cardBodyText.append(cardBodyTextCont);

	/* ************** CREATE CARD BODY TEXT TITLE ************** */
	let titleEl = createNewElement('h5', 'my-2 fw-semibold text-xl', title);
	cardBodyTextCont.append(titleEl);

	/* ************** CREATE CARD BODY TEXT DESC ************** */
	let descriptionEl = createNewElement('p', 'lh-sm text-md', desc);
	cardBodyTextCont.append(descriptionEl);


	/* ************** CREATE CARD FOOTER ************** */
	let cardFooter = createNewElement('div', 'card-flyer-footer d-flex justify-content-center align-items-center');
	cardContainer.append(cardFooter);

	let button = createNewElement('button', 'btn btn-primary btn-primary-hover', 'Wybierz');
	button.type = 'button';
	cardFooter.append(button);

	return columnEl;
}
/* ******* FUNCTION STEP BACK ******* */
function createBtnStepBack() {

	let col = createNewElement('div', 'col-12 text-center btn-back');

	let button = createNewElement('a', 'btn btn-link btn-link-gray d-inline-flex mb-2 mb-sm-0 align-items-center link-arrow-icon-left', 'Wróć');
	button.setAttribute('href', 'javascript:void(0)');
	col.append(button);

	let icon = createNewElement('i', 'icon-arrow-circle-left me-2 fw-semibold');
	button.append(icon);

	button.addEventListener('click', stepBack);

	return col;

}
function stepBack() {
	animationQuote(animateClassBack, getQuoteContent);
	let inputDelivery = getQuoteForm.querySelector('input[name="delivery_type"]');
	let inputCardType = getQuoteForm.querySelector('input[name="print_type"]');
	let inputCardSize = getQuoteForm.querySelector('input[name="print_size"]');
	let inputCardPrinting = getQuoteForm.querySelector('input[name="print_side"]');

	getQuoteContent.innerText = '';

	if (inputCardPrinting){
		inputCardPrinting.remove(); 
	
		createStepCardPrinting(inputCardPrinting.value);

	} else if (inputCardSize){
		inputCardSize.remove(); 

		if(inputCardType.value === 'business_card') {
			inputCardType.remove(); 
			createStepCardType(inputDelivery.value);
		} else {
			createStepCardSize(inputCardType.value);
		}

	} else if (inputCardType){
		inputCardType.remove(); 

		createStepCardType(inputDelivery.value);

	} else if (inputDelivery){
		inputDelivery.remove(); 
		quoteStartContent.classList.remove('d-none');
		animationQuote(animateClassBack, quoteStartContent);
		getQuoteContent.innerText = '';

	} 
	getQuoteContent.scrollIntoView();

}
/* ******* SET PRICING ******* */
function setPricing(prices, priceSum, priceText) {
	
	let row = document.getElementById('pricing');
	row.innerHTML = '';

	/* ******* CREATE TABLE ******* */
	let colTable = createNewElement('div', 'col-12 col-lg-6 pe-lg-4');
	row.append(colTable);
	
	let table = createNewElement('table', 'table text-white rounded-5 rounded-bottom dark-table');
	table.style.backgroundColor = '#1f1f4a';
	colTable.append(table);

	let thead = document.createElement('thead');
	table.append(thead);

	let tr = document.createElement('tr');
	thead.append(tr);

	let th = createNewElement('th', 'col-7 p-3 p-sm-4', 'Obszar');
	tr.append(th);

	let th2 = createNewElement('th', 'col-5 p-3 p-sm-4 text-center');
	tr.append(th2);


	/* ******* CREATE PRICING ******* */
	let colPricing = createNewElement('div', 'col-12 col-lg-6 ps-lg-4 text-center text-lg-start');
	row.append(colPricing);

	let pricingTitle = createNewElement('h2', 'fw-semibold text-xll my-3 mt-lg-0 mb-lg-4', 'Wycena');
	colPricing.append(pricingTitle);

	let pricingDesc = createNewElement('p', 'lh-sm text-md', priceText);
	colPricing.append(pricingDesc);

	let pricingPrice = createNewElement('h2', 'text-primary fw-bold text-center py-2 border rounded-2 border-dark-primary my-4', priceSum);
	colPricing.append(pricingPrice);

	let pricingButton = createNewElement('button', 'btn btn-purple w-100 d-flex justify-content-center align-items-center lh-base btn-finalize-estimate btn-animation-right', 'Sfinalizuj Moją Wycenę');
	pricingButton.setAttribute('type', 'button');
	pricingButton.setAttribute('data-bs-toggle', 'modal');
	pricingButton.setAttribute('data-bs-target', '#modalFinalizeEstimate');
	colPricing.append(pricingButton);

	
	let pricingButtonIcon = createNewElement('i', 'icon-arrow-right-1 ms-2 btn-animation-arrow-right d-none d-sm-inline-block');
	pricingButton.append(pricingButtonIcon);

	let tbody = document.createElement('tbody');
	
	if (dataDeliveryValue == 'direct'){
		th2.innerText = 'Domy';
	}
	if (dataDeliveryValue == 'mailbox'){
		th2.innerText = 'Skrzynki';
	}

	table.append(tbody);

	createTableQuote(prices, tbody);

	return row;
}
/* ******* CREATE TABLE QUOTE ******* */
function createTableQuote(prices, tbody) {

	tbody.innerHTML = '';

	for(let price in prices) {
		let tr = document.createElement('tr');
		tbody.append(tr);

		let tdPricing = createNewElement('td', 'bg-dark-purple col-8 p-3 p-sm-4', prices[price].name);
		tr.append(tdPricing);

		let tdPrice = createNewElement('td', 'text-center col-4 p-3 p-sm-4', prices[price].quantity);
		tr.append(tdPrice);

		let countTrTable = tbody.querySelectorAll('tr');
		if(countTrTable.length > 0 ){
			tbody.parentElement.classList.remove('rounded-bottom');
		}
	}
	
	return tbody;
}
/* ******* TOM SELECT SETTINGS ******* */
let tomSelectSettings = {
	maxOptions: null,
	render:{
		option: function(data, escape) {
			let text = escape(data.text);
			let img = data.$option.dataset.icon;

			let option = '<div class="d-flex align-items-center py-3 text-start fs-5">';
			if(img){
				option = option + '<img class="mx-2 icon-flyer" src="'+img+'" alt="Icon Flyer">';
			}
			option = option + text;
			option = option + '</div>';
			return option;
		},
		item: function(data, escape) {
			let text = escape(data.text);
			let img = data.$option.dataset.icon;

			let option = '<div class="d-flex align-items-center text-start fs-5">';

			if(img){
				if(img == 'dist/images/dropdown/map-dot.svg'){ /* @todo change this to be full url with / */
					option = option + '<img class="me-2 icon-flyer" src="dist/images/dropdown/map-marker.svg" alt="Icon Flyer">'; /* @todo change this to be full url with / */
				}
				else {
					option = option + '<img class="me-2 icon-flyer" src="'+img+'" alt="Icon Flyer">';
				}
			}
			option = option + text;
			option = option + '</div>';
			return option;
		}
	}
};
/* ******* CREATE SELECT ******* */
function createSelect(options, id) {
	
	options.forEach(el => {
		let option = document.createElement('option');
		option.value = el.value;
		option.dataset.icon = el.icon;
		option.innerText = el.title;

		id.append(option);
	})

	/* ******* ADD MY TOM SELECT ******* */
    new TomSelect(id, tomSelectSettings);

}
/* *******  CREATE CARD WITH MAP ******* */
function createCardWithMap(item, id) {
	
	/****** ADD IMAGE *****/  
	let cardImage = id.querySelector('.js-card-img');
	cardImage.innerHTML = '';
	cardImage.style.backgroundImage = `url(${item.image})`;

	/****** ADD TOTAL HOUSES *****/ 
	let cardTotalHourse = id.querySelector('.js-total-houses');
	cardTotalHourse.innerHTML =''

	let elementHousNum = createNewElement('h3', 'text-black fw-bold', item.houses);
	cardTotalHourse.append(elementHousNum);

	/****** ADD TOTAL COST *****/ 
	let cardTotalCost = id.querySelector('.js-total-cost');
	cardTotalCost.innerHTML =''

	let elementCostNum = createNewElement('h3', 'text-primary fw-bold');

	const sum = pricingJson.result.reduce((sum, res) => sum + calcPrice(item.houses, res.prices), 0);
	const avgPrice = (sum / pricingJson.result.length) || 0;

	elementCostNum.innerText = avgPrice.toFixed(2) + ' zł';
	cardTotalCost.append(elementCostNum);
}	
 /* ******* ADD MY TOM SELECT ******* */
document.querySelectorAll('.tom-select').forEach((el)=>{
    new TomSelect(el, tomSelectSettings)
});
/* ******* SECTION PRINTING & SHARED MARKETING ******* */
let sharedMarketingSelect = document.getElementById('sharedMarketingSelect');
let sharedMarketingCard = document.getElementById('sharedMarketingCard');
let printingSelect = document.getElementById('printingSelect');
let printingTable = document.getElementById('printingTable');

if(sharedMarketingSelect){
	let sharedOptions = areasJson.features.map(x => {
		return {
			value: x.properties.value, 
			icon: x.properties.icon, 
			title: x.properties.title
		}
	});
	createSelect(sharedOptions, sharedMarketingSelect);
	createCardWithMap(areasJson.features[0].properties, sharedMarketingCard);

	/* ******* CHANGE SELECT ******* */
	sharedMarketingSelect.addEventListener('change', function(){

		for(let i in areasJson.features){
			if(this.value == areasJson.features[i].properties.value){
				createCardWithMap(areasJson.features[i].properties, sharedMarketingCard);
			}
		}
	})
}

if(printingSelect){
	let pricingData = pricingJson.result.map(x => {
		return {
			value: x.value, 
			icon: x.icon, 
			title: x.title,
			pricing: x.prices
		}
	});

	createSelect(pricingData, printingSelect);
	createTable(pricingData[0].pricing, printingTable);

	/* ******* CHANGE SELECT ******* */
	printingSelect.addEventListener('change', function(){

		for(let i in pricingData){
			if(this.value == pricingData[i].value){
				createTable(pricingData[i].pricing, printingTable);
			}
		}
	})

}
/* ******* CREATE TABLE ******* */
function createTable(prices, id) {

	let tbody = id.querySelector('tbody');
	tbody.innerHTML = '';

	for (let [key, value] of Object.entries(prices)) {
		let tr = document.createElement('tr');
		tbody.append(tr);

		let tdPricing = document.createElement('td');
		tdPricing.className = 'col-8 bg-light-primary';
		tdPricing.innerText = key;
		tr.append(tdPricing);

		let tdPrice = document.createElement('td');
		tdPrice.className = 'col-4 text-center';
		tdPrice.innerText = value;
		tr.append(tdPrice);
	}
}
/* ******* MAP ******* */
let map;
let lightMapTypeId = 'light';
let darkMapTypeId = 'dark';

function initMap(zoom, lat, lng){
	if (document.getElementById('map') == null)
		return;

	var mapConf = {
		zoom: zoom,
		center: { lat: lat, lng: lng },
		options: {
			/* gestureHandling: 'cooperative' */
			scrollwheel: false,
			// streetView: false,
			streetViewControl: false
			/* noClear: true */
		},
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: [lightMapTypeId, darkMapTypeId, 'satellite']
		}
	};

	map = new google.maps.Map(document.getElementById('map'), mapConf);

	const googlemapsLightMapType = new google.maps.StyledMapType([], { name: 'Light' });
	map.mapTypes.set(lightMapTypeId, googlemapsLightMapType);

	const googlemapsDarkMapType = new google.maps.StyledMapType(mapStylesArray, { name: 'Dark' });
	map.mapTypes.set(darkMapTypeId, googlemapsDarkMapType);
  	map.setMapTypeId(darkMapTypeId);

	configureDirectMap();
}
function configureDirectMap() {
	map.data.addGeoJson(areasJson);
	map.data.setStyle((feature) => {
		let color = "gray";

		if (feature.getProperty("isColorful")) {
			color = feature.getProperty("color");
		}
		return /** @type {!google.maps.Data.StyleOptions} */ {
			fillColor: color,
			strokeColor: color,
			strokeWeight: 2,
		};
	});

	map.data.addListener("click", (event) => {

		let areaId = event.feature.getProperty('code');
		if (event.feature.getProperty('isColorful') === true) {
			event.feature.setProperty('isColorful', false);
			
			let input = document.querySelector(`input[name="delivery_areas[]"][value="${areaId}"]`);
			input.remove();

			selected_areas = selected_areas.filter(i => i.code != areaId);
		}
		else {
			event.feature.setProperty('isColorful', true);
			
			let inputHidden = document.createElement('input');
			inputHidden.type = 'hidden';
			inputHidden.value = areaId;
			inputHidden.name = 'delivery_areas[]';
			getQuoteForm.append(inputHidden);

			selected_areas.push({code: event.feature.getProperty('code'), name: event.feature.getProperty('title'), quantity: event.feature.getProperty('houses')});
		}

		calculatePrices();
		updateDistributionAreasTable(selected_areas);
		
	});
}
/* ******* UPDATE DISTRIBUTION ******* */
function updateDistributionAreasTable(prices){
	let tbody = document.getElementById('tableEstimateResult');
	
	tbody.innerHTML = '';

	for(let price in prices) {
		let tr = document.createElement('tr');
		tbody.append(tr);

		let tdPricing = createNewElement('td', 'col-8 p-3 p-sm-4', prices[price].name);
		tr.append(tdPricing);

		let tdPrice = createNewElement('td', 'border-start text-center col-4 p-3 p-sm-4', prices[price].quantity);
		tr.append(tdPrice);
		
	}
}
function updatePrintSummaryTable() {
let printSummaryTableDeliveryType = document.getElementById('estimateResultDeliveryType');
let printSummaryTablePrintType = document.getElementById('estimateResultPrintType');
let printSummaryTablePrintSize = document.getElementById('estimateResultPrintSize');
let printSummaryTablePrintSide = document.getElementById('estimateResultPrintSide');

	if(delivery_type == 'direct'){
		printSummaryTableDeliveryType.innerText = 'Dostawa bespośrednia';
	} else {
		printSummaryTableDeliveryType.innerText = 'Dostawa do skrzynki';
	}

	if (print_type == 'business_card'){
		printSummaryTablePrintType.innerText = 'Wizytówki';
	} else if (print_type == 'doorhanger'){
		printSummaryTablePrintType.innerText = 'Zawieszki na drzwi';
	} else {
		printSummaryTablePrintType.innerText = 'Pocztówki';
	}

	if (print_size == 'large') {
		printSummaryTablePrintSize.innerText = 'Nadmiarowy';
	} else {
		printSummaryTablePrintSize.innerText = 'Standard';
	}

	if (print_side == 'single'){
		printSummaryTablePrintSide.innerText = 'Jednostronny';
	} else {
		printSummaryTablePrintSide.innerText = 'Dwustronny';
	}
}
/* ******* CALCULATE PRICES ******* */
function calculatePrices() {
	let houses = selected_areas.map(item => item.quantity).reduce((prev, curr) => prev + parseInt(curr), 0);
	let priceSummary = getPriceSummary(delivery_type, print_type, print_size, print_side, houses);
	let pricingRow = setPricing(selected_areas, `${priceSummary.price.toFixed(2)} zł`, priceSummary.text);
	getQuoteContent.append(pricingRow);
}
function calcPrice(houses, prices) {
    const keys = Object.keys(prices).map(Number).sort((a, b) => a - b); // Pobierz wszystkie klucze jako liczby i posortuj rosnąco
    const smallerKeys = keys.filter(key => key < houses); // Znajdź klucze mniejsze od podanej liczby
    const nearestKey = smallerKeys.length > 0 ? Math.max(...smallerKeys) : keys[0]; // Jeśli są jakieś mniejsze klucze, znajdź największy z nich lub pierwszy

    return (prices[nearestKey] / nearestKey) * houses;
};
function getPriceSummary(deliveryType, printType, printSize, printSide, houses) {
	if(houses === 0)
		return { price: 0, text: 'Aby otrzymać szacunkowy koszt, zaznacz obszary, na które chcesz kierować reklamy.'};

	const res = pricingJson.result.find(x => x.print_type == printType && x.print_size == printSize && x.print_side == printSide);
	if (!res)
		return { price: 0, text: 'Spróbuj odświeżyć stronę, aby sprawdzić, czy problem sam się rozwiąże.'};

	let price = calcPrice(houses, res.prices);

	const deliveryTypeText = deliveryType === 'direct' ? 'w ramach dostawy kurierskiej pod same drzwi' : 'w ramach dostawy do skrzyńki pocztowej';
	const printTypeText = printType === 'flyer' ? 'ulotek' : printType === 'doorhanger' ? 'wieszaków na drzwi' : 'wizytówek';
	const printSizeText = printSize === 'large' ? 'dużych' : 'małych';
	const printSideText = printSide === 'single' ? 'jednostronnych' : 'dwustronnych';
	const text = `Szacunkowy koszt zaprojektowania, wydrukowania i dystrybucji ${houses} ${printSideText} ${printSizeText} ${printTypeText} ${deliveryTypeText} wynosi:`;

	return { price: price, text: text};
}
/* ******* MODALS ******* */
let modalEstimateResultContainer = document.getElementById('modalEstimateResult');
let modalEstimateResult = new bootstrap.Modal(modalEstimateResultContainer, {});

let modalFinalizeEstimateContainer = document.getElementById('modalFinalizeEstimate');
let modalFinalizeEstimate = new bootstrap.Modal(modalFinalizeEstimateContainer, {});

modalEstimateResultContainer.addEventListener('show.bs.modal', function (event) {
	updatePrintSummaryTable();
})
modalEstimateResultContainer.addEventListener('hidden.bs.modal', function (event) {
	modalFinalizeEstimate.show();
})

/* ******* DROP ZONE ******* */
/* let jsModalGetDesignDropZone = document.getElementById('jsModalGetDesignDropZone'); */

document.querySelectorAll('.drop-zone-input').forEach((inputElement) => {
	addDropZoneEvents(inputElement);
});
function addDropZoneEvents(inputEl){

	let dropZoneEl = inputEl.closest('.drop-zone');

	dropZoneEl.addEventListener('click', (e) => {
		inputEl.click();
	});

	inputEl.addEventListener('change', (e) => {
		if (inputEl.files.length) {
			updateThumbnail(dropZoneEl, inputEl.files[0]);
		}
	});
	
}
function updateThumbnail(dropZoneEl, file){
	let dropZoneContainer = document.querySelector('.drop-zone-container');
	let fileData = addUploadedFileData(file.name);
	dropZoneContainer.append(fileData);
}
function addUploadedFileData(name){
	let row = createNewElement('div', 'js-upload-file-name-row upload-file-name-row d-flex justify-content-between align-items-center py-4'); 

	let colLeft = createNewElement('div', 'd-flex align-items-center');

	let icon = createNewElement('span', 'icon-gallery-tick text-lg lh-1 me-3');
	colLeft.append(icon);

	let nameFile = createNewElement('span', 'text-xs upload-file-name', name);
	colLeft.append(nameFile);

	row.append(colLeft);
	
	let removeBtn = createNewElement('button', 'btn-outline-primary btn', 'Usuń');
	removeBtn.classList.add('text-xxs');
	removeBtn.onclick = uploadedFileRemove;
	row.append(removeBtn);

	return row;
}
function uploadedFileRemove(event) {
    event.currentTarget.closest('.js-upload-file-name-row').remove();
}

/* ******* FORMS ******* */
let forms = document.getElementsByTagName('form');

Array.from(forms).forEach((form) => {
	form.addEventListener('submit', function(event) {

		event.preventDefault();	
		form.reset();

		Swal.fire({
			icon: 'success',
			title: 'Dziękujemy!',
			text: 'Twój formularz został pomyślnie przesłany. Wkrótce skontaktujemy się z Tobą, aby potwierdzić szczegóły i rozpocząć realizację Twojego zamówienia 😊',
			showConfirmButton: false,
  			timer: 3500
		})
		.then((result) => {
			bootstrap.Modal.getOrCreateInstance(modalFinalizeEstimateContainer).hide();
		})
	});
});

/* ******* AOS ******* */
AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	

	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	offset: 120, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 400, // values from 0 to 3000, with step 50ms
	easing: 'ease', // default easing for AOS animations
	once: true, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


document.querySelectorAll('.js-how-to-order').forEach((btn) => {
	btn.addEventListener('click', function (e) {
		e.preventDefault();
		bootstrap.Collapse.getOrCreateInstance(document.getElementById('collapseOne')).show();
		document.getElementById('how-to-order').scrollIntoView({ behavior: 'smooth' });
	});
});