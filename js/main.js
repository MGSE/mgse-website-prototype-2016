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
    $('.accordion-label a').on('click', function (event) {
        event.preventDefault();
        $(this).parent().next('.accordion-content').slideToggle();
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
                $('.courses .filter input:checked:not([value="research"])').prop('checked', false);
            });
        } else {
            /* if Course level */
            $('.courses .theme').each(function(){
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