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
    
});