/* MODAL */
let detailsRecipeModal = document.getElementById('detailsRecipeModal');

let btnCloseModal = document.getElementById('btnCloseModal');

btnCloseModal.onclick = function() {
  detailsRecipeModal.classList.remove('show');
  detailsRecipeModal.classList.add('hide');

}

window.onclick = function(event) {
  if (event.target == detailsRecipeModal) {
    detailsRecipeModal.classList.remove('show');
    detailsRecipeModal.classList.add('hide');

  }
}


/* IMAGES BACKROUND SRC */
let listImages = document.getElementsByClassName('js-image-src');

if(listImages){
	for (let i = 0; i < listImages.length; i++) {
		let src = listImages[i].getAttribute('data-image-src');
		listImages[i].style.backgroundImage="url('" + src + "')";
	}
}

/* CREAT NEW ELEMENT */
function createNewElement(tag, className='', text=''){
  let el = document.createElement(tag);
  el.className = className;
  el.innerHTML = text;
  return el;
}


$(document).ready(function(){
    $('.js-scroll-btn').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $(window).scroll(function(){
       var backBtn = $('.js-scroll-btn');   
      if ($(window).scrollTop()> 300){ 
        backBtn.show(400);
      }else{
        backBtn.hide(400);
      }
       
      });

    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
        dotsClass: 'dots-style',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });

});

