/*  
	--------------------------------------------------------------
	Custom Javascript - Project: Typeface Minimal Typo Template
	Description: Html / Css / jQuery template
	Author: pezflash - http://www.themeforest.net/user/pezflash
	Version: 1.0
    --------------------------------------------------------------
*/



//////////////////////////////////////////////////////////////////
//DOCUMENT READY
$(document).ready(function() {	


	//////////////////////////////////////////////////////////////////
	//DETECT MOBILES & TABLETS (ANDROID & IOS)
	var android = DetectAndroid();
	var ios = DetectIos();
	if (android == true || ios == true) {

		//HIDE HERE THE ELEMENTS YOU DON'T WANT ON MOBILES & TABLETS
		$('#fullscreen').css('display', 'none');
		$('.vegas-overlay').css('display', 'none');

		//REDIRECT TO MOBILE VERSION IF WINDOW WIDTH IS LESS THAN 500px
		//if ($(window).width() < 500) {
			//document.location.href = "mobile/index.html";
		//}
	
	};



	//////////////////////////////////////////////////////////////////
	//GET COLOR SCHEME FROM CSS
	var getCSS = function (prop, fromClass) {	 
	
	var $temp = $("<div>").css('display', 'none').addClass(fromClass);
		$("body").append($temp);
		try {
			return $temp.css(prop);
		} finally {
			$temp.remove();
		}
	};

	var menuColor = getCSS('color', 'menu-color');
	var menuHoverColor = getCSS('color', 'menu-hover-color');
	var submenuColor = getCSS('color', 'submenu-color');
	var submenuHoverColor = getCSS('color', 'submenu-hover-color');
	var menuActive = getCSS('color', 'menu-active');





	//////////////////////////////////////////////////////////////////
	//MENU & SUBMENU FUNCTIONS


	var current, ulHeight;
	var secondRow = false;
	var thirdRow = false;
	$('#menu a').click(function() {

		/*if ($(this).attr('class') === "letter-link") {
			console.log($(this).attr('class'));
			console.log("inside getAuthors");
	        var id = $(this).attr('id');
	        console.log("hey bitches " + id);
	        $.getJSON($SCRIPT_ROOT + '/get_authors', {
	            letter_id: id
	            }, 
	            function(data){
	                console.log("JSON DATA " + data);
	            });
	        return false;
		}*/
		
		//GET CLICKED PARENT li
		var e = $(this);
		var idx = e.parent('li');

		//REMOVE ALREADY ACTIVE SUBMENU (IF ANY)
		var ul = $(current).find('ul');
		var lis = $(ul).find('li');
		var li, liPrevious;

		
		for (var i=0, iLen=lis.length; i<iLen; i++){
			li = lis[i];
			$(li).css({ display:'none' }).stop(true, true).animate({ opacity: 0 }, 0);
		}

		//GENERATE CURRENT SUBMENU
		current = e.parent('li');
		if ($(idx).children().length == 2) {	//CHECK IF ITEM HAS SECOND LEVEL

			ul = $(idx).find('ul');
			lis = $(ul).find('li');

			for (var i=0, iLen=lis.length; i<iLen; i++){
				li = lis[i];
				liPrevious = lis[i-1];

				if (!secondRow) {					//REMOVE DIVIDER ON FIRST ITEM OF SECOND ROW
					ulHeight = $(ul).height();
					if (ulHeight > 25) {
						$(liPrevious).addClass("#menu new-row a");
						secondRow = true;
					}
				}

				if (!thirdRow) {					//REMOVE DIVIDER ON FIRST ITEM OF THIRD ROW
					ulHeight = $(ul).height();
					if (ulHeight > 45) {
						$(liPrevious).addClass("#menu new-row a");
						thirdRow = true;
					}
				}

				//FADE IN WITH DELAY
				$(li).css({ display:'inline' }).stop(true, true).delay(100*i).animate({ opacity: 1 }, 1000, 'linear');
			}

			return false;


		} else if (e.attr("class") !== "external") {	//CHECK IF IT'S NOT EXTERNAL LINK

			var nextHref = e.attr("href");

			$('#container').stop(true, true).animate({ opacity: 0 }, 300, function() {
				document.location.href = nextHref;
			});

			return false;

		}

	});

	


	//MENU HOVER FADE EFFECT
	$('#menu ul a').css('color', menuColor).hover(
		function () {
			$(this).stop(true, true).animate({color: menuHoverColor}, 600);
		},
		function () {
			if ($(this).attr('class') == 'menu-active' || $(this).attr('class') == 'menu-active disabled') {
				$(this).css('color', menuActive);
			} else {
				$(this).stop(true, true).animate({color: menuColor}, 600);
			}	
		}
	);

	//SUBMENU HOVER FADE EFFECT
	$('#menu .second-level a').unbind('mouseenter mouseleave').css('color', submenuColor).hover(
		function () {
			$(this).stop(true, true).animate({color: submenuHoverColor}, 600);
		},
		function () {
			$(this).stop(true, true).animate({color: submenuColor}, 500);
		}
	);

	//ASSIGN CSS COLOR FOR MENU ACTIVE ITEM
	$("[class*='menu-active']").css('color', menuActive);
	

	//SUBLINKS
	$('.sublink').hover(
		function () {
			$(this).parent().addClass("add-arrow");
			$(this).stop(true, true).animate({left: 7}, 300, "easeOutQuad");
		},
		function () {
			$(this).parent().removeClass("add-arrow");
			$(this).stop(true, true).animate({left: 0}, 300);
		}
	);
	
	//////////////////////////////////////////////////////////////////
	//MAIN CONTAINER FADE
	//THIS MAKES THE PAGES CONTENTS APPEAR SMOOTHLY ON LOAD
	var container = $('#container');
	container.animate({ opacity: 0 }, 0);
	container.stop(true, true).animate({ opacity: 1 }, 400);





	//////////////////////////////////////////////////////////////////
	//TOOLTIP FOR LOGO
	//CHECK IF IT HAS HREF, IF SO, RUN TOOLTIP
	if ($('#header img').parents().length == 5) {
		$('#header img').tipsy({ gravity: 'w', fade: true, offset: 5, fallback: "HOME" });
	}
	



	
	//////////////////////////////////////////////////////////////////
	//SOCIAL NETWORKS TOOLTIP
	$('#social a').each(function() { 
		 $(this).tipsy({ gravity: 's', fade: true, offset: 5 });
	});

	



	//////////////////////////////////////////////////////////////////
	//FULLSCREEN BUTTON
	$('#fullscreen a').tipsy({ gravity: 'e', fade: true, offset: 5 });
	$('#fullscreen').click(function() {
			screenfull.toggle($('#canvas')[0]);
	});
	




	//////////////////////////////////////////////////////////////////
	//COVERT PRETTYPHOTO rel INTO data-rel TO PASS HTML VALIDATORS
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});





	//////////////////////////////////////////////////////////////////
	//LEGAL TEXT MANAGED WITH AJAX
	$("#footer a[rel^='prettyPopin']").prettyPopin({width: 550});
	




	//////////////////////////////////////////////////////
	//CUSTOM FUNCTIONS
	//GENERATE HOVER ICONS
	generateHover = function(e) {
		e.append("<span></span>");
		e.hover(function() {
			$(this).children("span").stop(true, true).fadeIn(600);
		},function(){
			$(this).children("span").stop(true, true).fadeOut(200);
		});
	};




	//////////////////////////////////////////////////////
	//FORM SUBMIT
	$('#formbutton').submit(function(e) {  // this handles the submit event
            window.location = "http://localhost:5000/results";
	});

	
});




