$(document).ready(function(){

	//  var mvp = $('#myViewport');
	// if( $(window).width() > '359' ){
	//   mvp.attr('content','width=750, initial-scale=1, maximum-scale=0.47');
	// }
	// if( $(window).width() > '410' ){
	//   mvp.attr('content','width=750, initial-scale=1, maximum-scale=0.54');
	// }

	$(window).scroll(function() {

	  if($(this).scrollTop() != 0 && $(this).width() > '991') {
			$('.top-box').css("padding-top", "50px");
			$('.top-box').addClass("fixed");
	  } else {
			$('.top-box').css("padding-top", "0px");
			$('.top-box').removeClass("fixed");
	  } 

	});


 	if ($('.menu').length){
		$(".menu").on("click","a", function (event) {
			event.preventDefault();

			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			
			$('body,html').animate({scrollTop: top}, 1000);
		});
	}


	//flipper
	$('.servise__front, .close-flipp').on('click', function(){
		$(this).closest('.flip-container').toggleClass('goFlip');
	})

	$('.price-card-arrow, .price-card__button a').on('click', function(){
		$(this).closest('.flip-container').toggleClass('goFlip');
	})

	//open prev flipper
	$('.pills').on('click', function(){
		console.log(1);
		$(this).closest('.flip-container').prev('.price-card__item').addClass('goFlip');
	})


	if ($('.fancybox').length){
	  $(".fancybox").fancybox({
	    prevEffect    : 'none',
	    nextEffect    : 'none',
	    // closeBtn    : false,
	    padding: 0,
	    helpers   : {
	      title : { type : 'inside' },
	      buttons : {},
	      overlay: {
          locked: false
        }
	    }
	  });
	}
	
	if ($('#project').length){
	  $('#project').bxSlider({
	    auto: false,
	    pagerCustom: '#bx-pager',
	    autoHover: true,
	    // slideWidth: 480,
	    // minSlides: 2,
	    // maxSlides: 2,
	    // moveSlides: 1,
	    //	adaptiveHeight: true,
	    prevSelector  : ".project_control",
	    nextSelector : ".project_control",
	    useCSS: false
	  });
	}

	if ($('.work-box').length) {

		function tab(tab, cont){
			var itemTab = $(tab);
			var itemCont = $(cont);

			itemTab.click(function(){
				var self = $(this);
				var coutn = itemTab.index($(this));

				fakeImage(itemCont.eq(coutn));
				
				itemTab.removeClass('active');
				$(this).addClass('active');

				itemCont.removeClass('active');
				itemCont.eq(coutn).addClass('active');

			});
		}

		tab('.work__tab-item','.work__cont-item');


		function fakeImage(parent){
			var fakeImages = parent.find('.fake-img');

			fakeImages.replaceWith(function(){
				return '<img src="'+ $(this).context.getAttribute('data-src') +'">';
			});

		}
	}



	if ($('.faq-box').length) {

		function tab(tab, cont){
			var itemTab = $(tab);
			var itemCont = $(cont);

			itemTab.click(function(){
				var self = $(this);

				itemTab.not(self).next().slideUp();

				self.next().slideToggle(function(){
					self.toggleClass('active');
					itemTab.not(self).removeClass('active');
				});

			});
		}

		tab('.fag-accordion__item-head','.fag-accordion__item-text');
	}



	//animation scroll
	// if($('.scroll').length){
	// 	$(".scroll").each(function () {
	// 	  var  block = $(this);
	// 	  $( window ).scroll(function() {

	// 	   var top = block.offset().top;
	// 	   var bottom = block.height()+top;
	// 	   top = top - $(window).height();
	// 	   var scroll_top = $(this).scrollTop();

	// 	   if( ( scroll_top > top ) && ( scroll_top < bottom ) ) {
	// 	     if( !block.hasClass( 'animated' )) {
	// 	      block.addClass( 'animated' );
	// 	     }
	// 	   } else {
	// 	     block.removeClass( 'animated' );
	// 	   }
	// 	  });
	// 	});
	// }


	var workClickCount = 0;
	$('#work').on('click', function() {
		workClickCount++;
		if(workClickCount > 15) {
			yaCounter38644345.reachGoal('CLICK_TO_PORTFOLIO')
		}
	});


	ymaps.ready(init);

	function init(){     
	  var myMap = new ymaps.Map ("map", {
	    center: ['55.801593', '37.643278'],
	    zoom: 15,
	    controls: ['smallMapDefaultSet']
	  });

	  myMap.behaviors.disable('scrollZoom');

    var myPlacemark  = new ymaps.Placemark(['55.801593', '37.637278'], {}, {
      // iconLayout: 'default#image',
      // iconImageHref: 'images/mapicon.png',
      // iconImageSize: [197, 115],
      // iconImageOffset: [-100, -115]
    });
    
    myMap.geoObjects.add(myPlacemark );

	}


	if ($('.ajaxform').length){
		$(".ajaxform").submit(function(){ // пeрeхвaтывaeм всe при сoбытии oтпрaвки
		var form = $(this); // зaпишeм фoрму, чтoбы пoтoм нe былo прoблeм с this
		var error = false; // прeдвaритeльнo oшибoк нeт

		form.find('.input').each( function(){ // прoбeжим пo кaждoму пoлю в фoрмe
			if ($(this).val() == '') { // eсли нaхoдим пустoe
				//alert('Зaпoлнитe пoлe "'+$(this).attr('placeholder')+'"!'); // гoвoрим зaпoлняй!
				$(this).addClass('error');
				error = true; // oшибкa
			}
		});
		if (!error) { // eсли oшибки нeт
			var data = $(form).serialize(); // пoдгoтaвливaeм дaнныe
			// console.log(data);
			$.ajax({ // инициaлизируeм ajax зaпрoс
				type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
				url: 'feedback.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
				dataType: 'json', // oтвeт ждeм в json фoрмaтe
				data: data, // дaнныe для oтпрaвки
				beforeSend: function(data) { // сoбытиe дo oтпрaвки
				form.find('button').attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
				},
				success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
					if (data['error']) { // eсли oбрaбoтчик вeрнул oшибку
					//alert(data['error']); // пoкaжeм eё тeкст
					} else { // eсли всe прoшлo oк
						form.css("display", "none");
						form.replaceWith('<div class="form-box__title"> \
								Спасибо,<br>Ваша зявка приянта! \
								<div>Мы свяжемся с Вами в ближайшее время</div> \
							</div>');
						// alert('Письмo oтврaвлeнo! Чeкaйтe пoчту! =)'); // пишeм чтo всe oк
					}
				},
				error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
					//alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
					//alert(thrownError); // и тeкст oшибки
				},
				complete: function(data) { // сoбытиe пoслe любoгo исхoдa
					form.find('button').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
				}
			});
		}
		return false; // вырубaeм стaндaртную oтпрaвку фoрмы
		});
	}

	
});

