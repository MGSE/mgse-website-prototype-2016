// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function () {
    
    /*
     *  home hero quote random selector
     */
    var numQuotes = $('.mgse.home .hero blockquote').length;
    //console.log(numQuotes);
    var randomQuote = getRandomInt(0, numQuotes);
    //console.log(randomQuote);
    $('.mgse.home .hero blockquote:eq('+randomQuote+')').show();
    

    /*
     *  main_nav
     */
    /* add down arrow to level 1 menu items if it has submenu */
    $('.main_nav > ul > li ul').each(function () {
        if ($(this).children().length > 0) {
            // if level 1 menu has level 2 submenu add drop-down button
            $(this).parent().append('<span class="touch-button"><i class="fa fa-angle-down"></i></span>');
        }
    });
    /* mobile .menu-button click handler */
    $('.menu-button').on('click', function () {
        $('.main_nav > ul').slideToggle();
    });
    /* .touch-button click handler */
    $('.main_nav > ul > li').on('click', '.touch-button', function () {
        $('.main_nav .open').not($(this).parent()).removeClass('open').children('ul').hide();
        $(this).prev('ul').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'fast').parent().toggleClass('open');
    });
    /* close any open drop-down when hover over different level one menu item */
    $('.main_nav > ul > li').on('mouseover', function () {
        $('.main_nav .open').not($(this)).removeClass('open').children('ul').hide();
    });
    
    
    /*
     * tabs
     */
       
    /* tab click handler */
    $('ul.tabs a').on('click', function (event) {
        event.preventDefault();//stop clicking tab from following href
        var tabid = $(this).attr('href');//store tabs href which is hash link to tab pane
        
        $(this).parents('ul.tabs').find('.current').removeClass('current');//remove current class from current tab
        $(this).parents('ul.tabs').next('.panes').children('.current').removeClass('current');//remove current class from current tab pane
        $(this).addClass('current');//add current class to clicked tab
        $(tabid).addClass('current');//add current class to tab pane
    });
    
    
    /*
     * accordions
     */
    /* append extra text for screen readers so user knows its a toggle */
    $('.accordion-label a').append('<span class="visuallyhidden">, show details</span>');
    /* label click handler */
    $('.accordion-label').on('click', function (event) {
        event.preventDefault();
        $(this).next('.accordion-content').slideToggle();
        $(this).toggleClass('open');
    });
    
    
    /*
     * read more
     */
    /* append read more link to collapse content */
    $('.collapse > :last-child').append('<span class="read-more"><a href="#">read more</a></span>');
    /* hide more-details div */
    $('.more-details').hide();
    /* read more link click handler to reveal more-details div */
    $('.collapse .read-more').on('click', function (event) {
        event.preventDefault();
        $(this).hide().parents('.collapse').next('.more-details').slideDown();
    });
    
    /*
     * Course filter
     */
    $('.courses .filter input').change(function(){
        
        $('.course-list a').fadeOut();
        $('.courses .theme').fadeOut();
        
        /* if all filters unselected bring back all courses */
        if($('.courses .filter input:checked').length == 0) {
            $('.courses .theme').fadeIn();
            $('.course-list a').fadeIn();
        }
        
        /* if Grad research filter selected clear other filters and show research courses */
        if($(this).val() == 'research') {
            $('.courses .theme').each(function(){
                if($(this).find('a[data-research="yes"]').length > 0) {
                    $(this).fadeIn();
                    $(this).find('a[data-research="yes"]').fadeIn();
                }
                // clear other filters
                $('.courses .filter input:checked:not([value="research"])').prop('checked', false);
            });
        } else {
            /* if Course level */
            $('.courses .theme').each(function(){
                // clear grad research filters
                $('.courses .filter input[value="research"]').prop('checked', false);
                currentTheme = $(this);
                $('.courses .filter input:checked').each(function(){
                    filter = $(this).val();
                    if(currentTheme.find('a[data-courselevel="'+filter+'"]').length > 0) {
                        //if(currentTheme.is(":hidden")){
                            currentTheme.fadeIn();
                        //}
                        //alert(filter);
                        currentTheme.find('a[data-courselevel="'+filter+'"]').fadeIn();
                    }
                });
            });
        }
        
    });
    $('.courses .filter .clear').click(function(event){
        event.preventDefault();
        $('.courses .filter input:checked').prop('checked', false);
        $('.course-list a').fadeOut().fadeIn();
        $('.courses .theme').fadeOut().fadeIn();
    });

    /*
     * tracks - breadth
     * open and close tracks in mobile view
     */
    $('.track > h2').click(function(){
        if($( window ).width() < 801) {
            $(this).toggleClass('open').siblings().slideToggle();
        }
    });
    
    
    $(window).resize(function(){
        
        /*
         * tracks - breadth
         * reset 
         */
	   if ($(window).width() > 800){	
		   $('.track > h2').siblings().css('display','auto');
       } else {
           if($('.track > h2').siblings().css('display') == 'block'){
               $(this).addClass('open');
           }
       }
    })

});

/*
 *  Card slider - used to present cards in slider format
 */

/*===================== VARIABLES =======================*/

/*this is the class which contains all the "sets" of cards/
var cardSliderClass = ".card-slider";

/*class used for the larger card slider container*/
var cardSliderClass = ".card-slider";

/*class used for the smaller "set" of cards*/
var cardSetClass = ".col-4max-cards";

/*class used for the left nav*/
var navLeft = ".prev";

/*class used for the right nav*/
var navRight = ".next";

/*how many cards to scroll by (serves as a "minimum" that doesn't change)*/
var cardSetSize = 4;

/*This set amount let's us know what offset to test against to see if a card is in position 1 or not*/
var containerOffsetX;

/*to keep track of toal number of cards (serves as a "maximum" that doesn't change) set on document load*/
var numOfSets;

/*numeral position of next card*/
var nextSetNum;

/*currentSet is the "position 1" card OBJECT. We must use relative sets to shift other cards for consistency*/
var currentSet;

/*numeral position of card in 1st place*/
var currentSetNum = 0;

/*scroll length amount*/
var shiftValue;

/*since we need to know what slider we are dealing with - we store the object we are managing in here*/
var container;


/*================= FUNCTIONS ===================*/

function calculateCards(containerId)
{
	/*As we have many sliders on the same page -
	We will need to dynamically calculate what we are dealing with every time*/
	
	/*get container we are dealing with*/
	var container = "#"+containerId;
	
	/*set the container's 1st position spot based off the container itself*/
	containerOffsetX = Math.floor($(container).parent(".content-wrapper").offset().left);
	 
	/*add up cards*/
	numOfSets = $(container+" "+cardSetClass).length;
	
	/*end of transition - removed disabled */
	$(container).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
		/*gatekeeper class can only be removed once this container has finished moving*/
		$(container).removeClass("disabled");
	});
	
}

function nextCards(containerId)
{
	/*get container we are dealing with*/
	var container = "#"+containerId;
	var nextCardSet;
	/*keep track of what we're up to by the ".current" nav class. Get nav here*/
	var nav = $(navRight).prev(".pager");
	/*get "current" set*/
	var current = $(nav).find(".current");
	/*do calculations and store current in vars*/
	currentSetNum = (parseInt($(current).index())+1);
	currentSet = $(container+" "+cardSetClass+":nth-child("+currentSetNum+")");
	
	if(currentSetNum < numOfSets)
	{
		/*not at the maximum yet*/
		nextSetNum = currentSetNum + 1;
		/*adjust which nav item is "current"*/
		$(nav).find(".current").removeClass("current");
		currentSetNum += 1;
		$(nav).find("li:nth-child("+currentSetNum+")").addClass("current");
		
		nextCardSet = $(container+" "+cardSetClass+":nth-child("+nextSetNum+")");
		/*calculate shift value*/
		shiftValue = (containerOffsetX) - (nextCardSet.offset().left);
		$(container+" "+navRight).css("opacity",1);
	} else if(nextSetNum >= numOfSets) 
	{
		/*at maximum, don't move a thing*/
		nextSetNum = numOfSets;
		nextCardSet = $(container+" "+cardSetClass+":last-child");
		shiftValue = 0;
		$(container+" "+navRight).css("opacity",0.4);
	}
	
	/*make the shift*/
	shiftCards(containerId);
}

function prevCards(containerId)
{	
	/*get container we are dealing with*/
	var container = "#"+containerId;
	var nextCardSet;
	/*determine set number by which nav dot is ".current" - here we get the nav*/
	var nav = $(navLeft).next(".pager");
	/*get ".current" nav*/
	var current = $(nav).find(".current");
	/*we now know our active nav based on ".current" index"*/
	currentSetNum = (parseInt($(current).index())+1);
	/*set currentSet based off our known "current" value*/
	currentSet = $(container+" "+cardSetClass+":nth-child("+currentSetNum+")");
	
	
	/*not the first item*/
	if(currentSetNum > 1)
	{
		/*set "next" to the previous set*/
		nextSetNum = currentSetNum - 1;
		/*switch ".current" on our nav items to previous*/
		$(nav).find(".current").removeClass("current");
		currentSetNum -= 1;
		$(nav).find("li:nth-child("+currentSetNum+")").addClass("current");
		/* get the previous card set*/
		nextCardSet = $(container+" "+cardSetClass+":nth-child("+nextSetNum+")");
		/*calculate how much we are shifting by*/
		shiftValue = (containerOffsetX) - (nextCardSet.offset().left);
		$(container).siblings(".slider-controls").children(".prev").css("opacity",1);
	} else if(currentSetNum <= 1) 
	{
		/*no move to be made as we're on the first - ensure values are reset to minimum*/
		nextSetNum = 1;
		nextCardSet = $(container+" "+cardSetClass+":first-child");
		shiftValue = 0;
	}
	
	/*make the shift*/
	shiftCards(containerId);
}

function shiftCards(containerId)
{
	/*get the container we are moving*/
	var container = "#"+containerId;
	/*get margin of container*/
	var margin = parseInt($(container).css("margin-left"));

	/*MOVE*/
	if(shiftValue === 0){
		/*no movement - release disabled*/
		$(container).removeClass("disabled");
	} else {
		margin += shiftValue;
		/*shift detected - initiate transition*/
		$(container).css("margin-left",margin);
		$(container).addClass("disabled");
	}
	
	/*end of transition - removed disabled */
	$(container).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
		/*gatekeeper class can only be removed once this container has finished moving*/
		$(container).removeClass("disabled");
		
	});
	
	/*set transparency of navigation buttons */
	if (currentSetNum === 1) {
		$(container).siblings(".slider-controls").children(".prev").css("opacity",0.3);
	} else if(currentSetNum === numOfSets){
		$(container).siblings(".slider-controls").children(".next").css("opacity",0.3);
	} else {
		$(container).siblings(".slider-controls").children(".prev").css("opacity",1);
		$(container).siblings(".slider-controls").children(".next").css("opacity",1);
	}
}

function resizeAdjust()
{
	/*since we have a static margin value, we will need to recalculate on screen resize*/
	$(cardSliderClass).each(function() {
		/*only ever applied to sliders, find the nav and what number is currently active*/
		var container = "#"+($(this).attr("id"));
		var nav = $(container).siblings(".slider-controls").find(".pager");
		var current = $(nav).find(".current");
		/*if nav - do the resize, don't bother with "card" areas with no nav*/
		if (nav.length){
			/*get spot of "current"*/
			currentSetNum = (parseInt($(current).index())+1);
			currentSet = $(container+" "+cardSetClass+":nth-child("+currentSetNum+")");
			/*get offset of container*/
			containerOffsetX = Math.floor($(container).parent(".content-wrapper").offset().left);
			/*set shift value*/
			shiftValue = (containerOffsetX) - (currentSet.offset().left);
			/*make the shift*/
			shiftCards($(this).attr("id"));
		}
		
	});
							
}

function setSizes(cardSliderClass)
{
	/*This function adds up all card sets, sets width of containers to be the width of all inner cards*/
	/*Bit tough as we need to set pixel width, then convert that back to a percentage for responsiveness*/
	
	/*larger card container*/
	var container;

	/*for each slider on screen*/
	$(cardSliderClass).each(function() {
		
		/*set the card container*/
		container = "#"+$(this).prop("id");
		
		/*set total number of card sets*/
		numOfSets = $(container+" "+cardSetClass).length;
		
		/*set width of larger container*/
		$(container).css("width",numOfSets+"00%");
		
		/*set transparency of navigation*/
		$(container).siblings(".slider-controls").children(".prev").css("opacity",0.3);
		if (numOfSets <= 1) {
			$(container).siblings(".slider-controls").children(".next").css("opacity",0.3);
		}
		
		/*as the container has a transition on load from 0% to 100%, ensure widths aren't set early
		we do this by adding "disabled" and removing it once widths are set*/
		$(container).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
			/*gatekeeper class can only be removed once this container has finished moving*/
			$(container).removeClass("disabled");
			
			/*set width of each "set"*/
			var setWidths = (100/numOfSets);
			$(container+" "+cardSetClass).css("width",setWidths+"%");

		});
	});
	
}


function navCall(button)
{
	/*set which slider we are using by it's ID */
	container = $(button).parent().prev(cardSliderClass).prop("id");	
	
	/*set some variables based on the unique container ID interacted with*/
	calculateCards(container);
	
	if($("#"+container).hasClass("disabled"))
	{
		/*is gatekeeper class there? Box is still transitioning - do nothing*/
	} else {
		
		if (numOfSets > 1)
		{
			/*left or right clicked*/
			if($(button).hasClass("prev"))
			{
				prevCards(container);
			} else {
				nextCards(container);
			}

		}
	}
	
}

function insertSets(cardSliderClass)
{
	/*function to read number of cards and insert appropriate number of cardSetClass divs*/
	
	$(cardSliderClass).each(function() {
		/*get the slider we are dealing with*/
		var container = "#"+$(this).prop("id");
		/*get number of cards*/
		var numOfCards = $(container+" .card").length;
		/*chop of the period (.) for targetting purposes*/
		var classString = cardSetClass.substring(1);
		
		if(numOfCards > 0)
		{
			/*function only ever runs on document ready. Can set current to 1 */
			currentSet = 1;
			
			/*for each specified set, wrap in div of the cardSetClass*/
			for(var i = 0; i < numOfCards; i+=cardSetSize) {
				  $(container+" .card").slice(i, i+cardSetSize).wrapAll("<div class='"+classString+"'>");
				
			}
			/*count how many we created*/
			numOfSets = $(container+" "+cardSetClass).length;
			
			/*create the navigation "dots"*/
            for(var j = 0; j < numOfSets; j+=1) {
				$(".pager").append("<li>"+j+"</li>");
			}
			/*add ".current" to 1st nav item*/
			$(".pager li:nth-child("+currentSet+")").addClass("current");
		}

	});
}

/*==================== CALLS =====================*/

$(document).ready(function() {
	
	/*insert cardSetClass for all sliders*/
	insertSets(cardSliderClass);
	
	/*set width of all sliders based on amount of cards in each one. Works for short and long form*/
	setSizes(cardSliderClass);
	
	/*left click*/
	$(navLeft).click(function(){
		navCall($(this));
	});
	
	/*right click*/
	$(navRight).click(function(){
		navCall($(this));
	});
	
	/*window resize*/
	$(window).resize(function() {
		resizeAdjust();
	});
	
});

/* end Card slider */

/* event filtering */
$('.filter').click(function(){
    var filter = $(this).attr('data-filter');
    var margin = $('#container .event:first-child').css('marginRight');
    $('#container > .event').css('margin-right' , '').css('clear','').fadeIn();
    $('#container > .event').css('margin-right' , '').promise().done(function() {
        if(filter != "all") {
            $('#container > .event:not(.'+filter+')').fadeOut();
            // when fade is complete fix wrap
            $('#container > .event:not(.'+filter+')').promise().done(function() {
                var n = 1;
                $('#container > .event:visible').each(function(index) {
                    $(this).append(index);
                    if(index == 3*n-1) {
                        $(this).css('margin-right' , '0').css('clear','none');
                    } else {
                        $(this).css('margin-right' , margin);
                    }
                });
                n++;
            });
        }
    });
});