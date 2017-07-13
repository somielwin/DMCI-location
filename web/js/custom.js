//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.classname').css({minHeight: 0});
  var ClassName = get_biggest($('.classname'));
  $('.classname').css({minHeight: ClassName});
}

$(window).resize(function() {
	resize();
});

$(document).ready(function() {
	resize();

	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	$('.btn-inquire').click(function(e){
		e.preventDefault();
		var offSet = $('.inquire-wrap').offset();
		var offsetTop = offSet.top;
		console.log(offsetTop);

		$('body, html').animate({scrollTop: offsetTop - 5}, 500, 'swing');
	});

	$('.home-slider .flexslider').flexslider({
		animation: "fade",
		controlNav: true,
		directionNav: false,
		slideshow: false,
		animationLoop: true,
		pauseOnHover: true,  
		useCSS: true,
		after: function(slider){

			$('.video-holder video').each(function(){
				$(this)[0].pause();
			}); 

			var currentSlide = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")");
			var videoUrl = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")").attr('data-html-video');
			var videoElem = '<video width="100%" height="100%" autoplay="true" preload="none" loop muted>' +
				'<source src="videos/'+videoUrl+'" type="video/mp4">' +
				//'<source src="videos/'+videoUrl+'.webm" type="video/webm">' +
				'</video>';

			if(typeof videoUrl != 'undefined') {
		
				if(currentSlide.find('.video-holder').children('*').size() > 0) {
					currentSlide.find('.video-holder video')[0].play();
				} else {
					currentSlide.find('.video-holder').html(videoElem);
				}
			}

			if($('html').hasClass('mobile') || $('html').hasClass('tablet') ) {
				$('.video-holder').remove();
			}

			adjustHeight();
		},
		start: function(slider) {
			var currentSlide = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")");
			var videoUrl = slider.find("li:nth-of-type("+(slider.currentSlide+1)+")").attr('data-html-video');
			var videoElem = '<video width="100%" height="100%" autoplay="true" preload="none" loop muted>' +
				'<source src="videos/'+videoUrl+'" type="video/mp4">' +
				//'<source src="videos/'+videoUrl+'.webm" type="video/webm">' +
				'</video>';

			if(typeof videoUrl != 'undefined') {
				currentSlide.find('.video-holder').html(videoElem);
				currentSlide.find('.video-holder video')[0].play();
			}
			adjustHeight();

			if($('html').hasClass('mobile') || $('html').hasClass('tablet') ) {
				$('.video-holder').remove();
			}
		}
	});

	$('.other-prop-content .owl-carousel').owlCarousel({
		loop:true,
		margin:0,
		dots: true,
		nav: true,
		pullDrag: false,
		responsive:{
			0:{
				items:1
			},
			430:{
				items:1
			},
			580:{
				items:2
			},
			767:{
				items:2
			},
			820:{
				items:3
			},
			992:{
				items:3
			},
			1200:{
				items:3
			}
		}
	});


	$('#terms-checkbox').change(function(){

        //$('.fill-up-correctly').removeClass('is-open');

        if( $('#terms-checkbox').is(':checked')) {
            $('.inquire-form form input[type="submit"]').removeAttr('disabled');

        } else {
            $('.inquire-form form input[type="submit"]').attr('disabled', true);
        }

    });


	$('.inquire-form form').submit(function(e){
		e.preventDefault();
		$('.inquire-form .input-wrap:not(.no-error)').addClass('error');
       	isvalidate = false;

		if(!$('#first-name').val() == '') {
        	$('#first-name').closest('.input-wrap').removeClass('error');
        	isvalidate = true;
        } else {
        	isvalidate = false;
        }

		if( IsEmail($('#email-add').val() )) {
        	$('#email-add').closest('.input-wrap').removeClass('error');
        	isvalidate = true;
        } else {
        	isvalidate = false;
        }

		if(!$('#contact-num').val() == '' && $('#contact-num').val().length >= 11) {
        	$('#contact-num').closest('.input-wrap').removeClass('error');
        	isvalidate = true;
        } else {
        	isvalidate = false;
        }

		if($('#first-name').val() != '' && $('#email-add').val() != '' && $('#contact-num').val().length >= 11 && $('#contact-num').val() != '') {
			$('.loading-spinner-wrapper').addClass('active');
			$('.popup-wrap').addClass('active');
			return true;
			
		} else {
			return false;
		}
	});
	
	$('.c-close').click(function(e){
		e.preventDefault();

		$('.popup-wrap').removeClass('active');
		var offSet = $('.other-properties').offset();
		var offsetTop = offSet.top - 15;
		console.log(offsetTop);

		$('body, html').animate({scrollTop: offsetTop }, 500, 'swing');
	});
});

$(window).load(function() {
	resize();
});

$(window).on('scroll load', function(){

    var _cur_top = $(window).scrollTop();

    if(  _cur_top >=  306) {
		$('header').addClass('minimize');
	} else {
		$('header').removeClass('minimize');
	}
	

});

$(window).on("load resize",function(e){
	adjustHeight();
});

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function adjustHeight() {
	var wH = window.innerHeight ? window.innerHeight : $(window).height()
	
	
	var cW = $(".video-holder").width(); //width of container or browser
	var cH = $(".video-holder").height(); //height of container or browser
	var vW = 16; //width of video ratio
	var vH = 9; //height of video ratio
	var cP = cW/cH; //ratio of container or browser
	var vP = vW/vH; //ratio of video

	if ( $("html").hasClass("mobile") || $("html").hasClass("tablet") ) {
		// for mobile or tablets, the controls should be visible
		// so we set the video to the exact size of the container
		$("video").width(cW);
		$("video").height(cH);
		$("video").attr('width', cW);
		$("video").attr('height', cH);
	} else {
		
		if ( vP > cP ) {
			//if video ratio is more than container ratio
			//meaning if video width is more than container width
			vH = cH; //set video height from container height
			vW = cH * vP; //set video width using container height and video ratio
			$("video").css({
				"margin-top": 0,
				"margin-left": (cW-vW)/2
			}); //center the video
		} else {
			//if video ratio is less than container ratio
			//meaning if video height is more than container height
			vW = cW; //set video width from container width
			vH = cW / vP; //set video height from container width and ratio
			$("video").css({
				"margin-top": (cH-vH)/2,
				"margin-left": 0
			}); //center the video
		}
		$("video").width(vW); //set the computed width to video/iframe element
		$("video").height(vH); //set the computed height to the video/iframe element
		$("video").attr('width', cW);
		$("video").attr('height', cH);
		
	}
	
}


// preloader once done
// Pace.on('done', function() {
// 	// totally hide the preloader especially for IE
// 	setTimeout(function() {
// 		$('.pace-inactive').hide();
// 	}, 500);
// });
