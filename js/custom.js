/***Header Effect**/
var $head = $( '#ha-header' );
			$( '.ha-waypoint' ).each( function(i) {
				var $el = $( this ),
					animClassDown = $el.data( 'animateDown' ),
					animClassUp = $el.data( 'animateUp' );

				$el.waypoint( function( direction ) {
					if( direction === 'down' && animClassDown ) {
						$head.attr('class', 'ha-header ' + animClassDown);
					}
					else if( direction === 'up' && animClassUp ){
						$head.attr('class', 'ha-header ' + animClassUp);
					}
				}, { offset: '100%' } );
			} );



/***isotope***/
$(function(){      
      var $container = $('#filter_container');
      $container.isotope({
        itemSelector : '.element'
      });  
      var $optionSets = $('#filter_header .option-set'),
          $optionLinks = $optionSets.find('a');
      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }        
        return false;
      });      
    });
	
	
	
	
	
	
	
	


$(document).ready(function() {
	
		/*******Nice Scroll******/	  
		$("html").niceScroll();  // The document page (body)
		$(".scroller").getNiceScroll().resize()

  		//<!--flexs lider-->
		 $('.flexslider').flexslider({
		        animation: "fade",
		        start: function(slider){
		          $('body').removeClass('loading');
		        }
			});


		/***Hover Effect with mask**/		
		$('span.mask').hover(
			  function () {
          $(this).siblings('a img').addClass('hovering');
          $(this).parent().siblings(".portfolio-title").children("h4").stop().animate({
              top: -20
            }, 350);
			  }, 
			  function () {
          $(this).siblings('a img').removeClass('hovering');
          $(this).parent().siblings(".portfolio-title").children("h4").stop().animate({
              top: 0
            }, 350);
			  }
	);
	
			
     /****Smooth Scrolling***/  
        $('a[href*=#]:not([href=#])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 500);
              return false;
            }
          }
        });
      
	  
	  
    <!--contact page validator--> 	
	$("#passion_form").validate();	
		  
	
			  
    /*****google map*****/
	  var map;
      map = new GMaps({
        el: '#map',
        lat: -12.043333,
        lng: -77.028333,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl : true,
        streetViewControl : false,
        mapTypeControl: true,
        overviewMapControl: false
      });
	  

	
	
	
	
		  
	  

});

