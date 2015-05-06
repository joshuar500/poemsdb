/*  
	--------------------------------------------------------------
	Custom Javascript - Project: Typeface Minimal Typo Template
	Description: Html / Css / jQuery template
	Author: pezflash - http://www.themeforest.net/user/pezflash
	Version: 1.0
    --------------------------------------------------------------
*/



//////////////////////////////////////////////////////////////////
//VEGAS PLUGIN (FULLSCREEN GALLERY) CONFIGURATION
$(document).ready(function() {


	//////////////////////////////////////////////////////////////////
	//STORING ELEMENTS - VARS
	var slideshow = $('#slideshow');
	var tl = $('#fullscreen-gallery .thumbs ul li');
	var ta = $('#fullscreen-gallery .thumbs ul li a');
	var ti = $('#fullscreen-gallery .thumbs ul li img');
	var prev = $('#fullscreen-gallery .navi .prev');
	var next = $('#fullscreen-gallery .navi .next');



	//////////////////////////////////////////////////////////////////
	//INITIAL VARS
	var slideshowRunning, idx, currentThumb;
	var backgroundList = [];
	
	//CUSTOM CONFIGURATION (SETUP: true/false or Numeral)
	var autoSlideOnInit = true;
	var preloadBackgrounds = false;
	var slideshowDelay = 5000;
	
	//GENERATE BACKGROUND LIST
    ta.each(function() { 
		backgroundList.push({ 
			src: $(this).attr('href'),
			valign: $(this).data('valign'),
			align: $(this).data('align'),
			fade: 2000
		});
	});

    //PLAY-PAUSE BUTTON
    slideshow.click(function() { 
		
		//PLAY SLIDESHOW
	  	if (slideshowRunning == false) { 
			slideshowRunning = true;
					
			slideshow.attr('src', 'images/galleries/fullscreen/pause_bt.png');
			slideshow.attr('title', 'Pause slideshow');
					
			$.vegas('slideshow', {
				step: idx+1
			})
					
		//PAUSE SLIDESHOW
		} else { 
			slideshowRunning = false;

			slideshow.attr('src', 'images/galleries/fullscreen/play_bt.png');
			slideshow.attr('title', 'Play slideshow');
					
			$.vegas('pause');
		}
         return false;
	});

    //THUMBNAILS BUTTONS
    ta.click(function() { 
	
		slideshowRunning = false;

		slideshow.attr('src', 'images/galleries/fullscreen/play_bt.png');
		slideshow.attr('title', 'Play slideshow');

		idx = $(this).parent('li').index();
		$.vegas('pause')(backgroundList[idx]);
		 
		return false;
	});

    //PREV & NEXT BUTTONS
	prev.click(function() {
		//$.vegas('previous');
		idx--;
		$.vegas('jump',	idx);
		
	});

	next.click(function() {
		//$.vegas('next');
		idx++;
		$.vegas('jump',	idx);
		
	});
	
	//PRELOAD
	if (preloadBackgrounds == true) $.vegas('preload', backgroundList);
		
	//AUTOSLIDESHOW ON INIT
	if (autoSlideOnInit == true) {
		slideshowRunning = true;
		slideshow.attr('src', 'images/galleries/fullscreen/pause_bt.png');
		slideshow.attr('title', 'Pause slideshow');

		//DEFINE SLIDESHOW PROPERTIES
		$.vegas('slideshow', { 
			delay: slideshowDelay,
			backgrounds: backgroundList,
			walk:function(step) {
				idx = step;
			}
		})
		('overlay', { opacity: 0.5 });

	} else {

		slideshowRunning = false;

		//DEFINE SLIDESHOW PROPERTIES AND PAUSE IT
		$.vegas('slideshow', {
			delay: slideshowDelay,
			backgrounds: backgroundList,
			walk:function(step) {
				idx = step;
			}
		})
		('overlay', { opacity: 0.5 })
		('pause');
	}



	//BORDER ON ACTIVE THUMB - MOUSEOVER / MOUSEOUT
	$('body').bind('vegasload', function(e, bg) { 
	    var src = $(bg).attr('src').replace('background', 'thumbnail');
	    ti.css('border', '1px solid #3b3b3b');
		currentThumb = $('img[src="' + src + '"]');
		currentThumb.css('border', '1px solid #a3a3a3');	
	});

	ti.mouseover(function() {
		$(this).css('border', '1px solid #a3a3a3');
	});

	ti.mouseout(function() {
		$(this).css('border', '1px solid #3b3b3b');
		currentThumb.css('border', '1px solid #a3a3a3');
	});


});




