// JavaScript Document

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