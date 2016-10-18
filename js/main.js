$(document).ready(function () {

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
	 
	 /*Get the class of the sorting list's parent container*/
	 
	 var filterName = $(".filter").parent().prop("className");
	 
	 function fadeOutItems(filterName, showItems) {
		
		$('.'+filterName+'-list li').fadeOut("fast", function (){
			$('.'+filterName+' .category').fadeOut("fast", function() {
				showItems(filterName);
			});
		});
	 }
	 
	 function fadeInItems(filterName) {
		 $('.'+filterName+' .category').fadeIn("fast",function(){
			 $('.'+filterName+'-list li').fadeIn();
		 });
	 }
	 
	 function showItems(filterName) {
		 	
			/* if all filters unselected bring back all items */
			if($('.'+filterName+' .filter input:checked').length === 0) {
				fadeInItems(filterName);    
			}
			
			/* if radio button checkbox selected, clear filters, only show radio items*/
			if($(this).hasClass("radio")) {
				$('.'+filterName+' .category').each(function(){
					if($(this).find('a[data-research="yes"]').length > 0) {
						$(this).fadeIn();
						$(this).find('a[data-research="yes"]').fadeIn();
					}
					// clear other filters
					$('.'+filterName+' .filter input:checked:not([value="research"])').prop('checked', false);
				});
			} else {
				/* otherwise show filter selected items */
				$('.'+filterName+' .category').each(function(){
					/* clear radio checkbox*/
					$('.'+filterName+' .filter input[class="radio"]').prop('checked', false);
					
					/*go through category by category*/
					var currentCategory = $(this);
					
					/*within each category, go through and find tagged items*/
					$('.'+filterName+' .filter input:checked').each(function(){
						
						var activeFilter = $(this).val();
						console.log(activeFilter);
						if(currentCategory.find('[data-filter~="'+activeFilter+'"]').length > 0) {
							currentCategory.fadeIn("fast", function() {
								currentCategory.find('[data-filter~="'+activeFilter+'"]').fadeIn();
							});
							
						}
					});
				});
			}
		}
		
	 $('.'+filterName+' .filter input').change(function(){
        fadeOutItems(filterName, showItems);
    });
	
	/*Clear filter*/
    $('.'+filterName+' .filter .clear').click(function(event){
        event.preventDefault();
        $('.'+filterName+' .filter input:checked').prop('checked', false);
        fadeOutItems(filterName, showItems);
		
    });
<<<<<<< HEAD
	
	/*------NEWS SORTER ----------------------*/
	
	
	
	
	var categories = []; //Array of classes for each list item
	var currentItem = "all"; //Current category
	
	//Add list item classes to array
	$('.filter-menu li').each(function(){
  		categories.push($(this).attr('class'));
	});
	
	//If user clicks list item, get the list item's class.
	//If 'all' selected, reveal all .news-wrap items, otherwise 
	//For each ".news-wrap", if it has matching class as selected slideDown, otherwise slideUp
	function sortItems(currentItem) {
		if(currentItem == "all") {
			
			$(".news-wrap").each(function() {
			    $(this).slideDown("medium");
			});
		} else {
			$(".news-wrap").each(function() {
				if($(this).hasClass(currentItem))
				{
					$(this).slideDown("medium"); //Show
				} else {
					$(this).slideUp("medium"); //Hide
				}
			});
		}
	}
	
	//Call for menu sorter
	$(".filter-menu li").click(function() {
		/*switch "selected" li */
		$(".selected-item").removeClass("selected-item");
		$(this).addClass("selected-item");
		currentItem = $(this).attr("role");
		console.log(currentItem);
		sortItems(currentItem);
	});
	
	//Do initial call for document.ready
	sortItems(currentItem);
});
=======

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

>>>>>>> origin/master
