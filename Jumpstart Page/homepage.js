
var highlight_content = [{
						"text": "Runing on the Kururu Beach ",
						"image": "http://www.nortconsulting.net/img_external/gallery/laptop-table-2.jpg",
						"url": "#"
						},{ 
						"text": "Norwegian wood and some pretty cool view",
						"image": "http://www.spartadigital.co.uk/wp-content/uploads/2015/04/Social-Media-Marketing-Campaigns-Marketing.jpg",
						"url": "#"
						},{ 
						"text": "Some text I don't know what",
						"image": "http://previews.123rf.com/images/antikwar/antikwar1601/antikwar160100027/49879976-Vector-graphics-flat-city-illustration-eps-10-Stock-Vector-malaysia-asia-skyline.jpg",
						"url": "#"
						},{ 
						"text": "Should I stay or Should I go???",
						"image": "http://www.bookicious.com/img/bk.jpg",	
						"url": "#"
						}];

var we_content = [{	"text": "Reach people with engaging storytelling about complex issues",
					"image": "images/megaphone-black.png",
					'background': "images/megaphone-black.png",
					'main-word': 1
					},{ 
					"text": "Inform people about fact-based research",
					"image": "images/research-black.png",
					'background': "images/research-black.png",
					'main-word': 1
					},{ 
					"text": "Teach people to use data, technology, and design",
					"image": "images/teach-black.png",
					'background': "images/teach-black.png",
					'main-word': 1
					},{ 
					"text": "Create and use open source platforms and tools",
					"image": "images/tools-black.png",
					'background': "images/tools-black.png",
					'main-word': 1
					},{ 
					"text": "Share our open-source work in the spirit of transparency",
					"image": "images/share-black.png",
					'background': "images/share-black.png",
					'main-word': 1
					},{ 
					"text": "Partner with national and international organizations",
					"image": "images/partner-black.png",
					'background': "images/partner-black.png",
					'main-word': 1
					}];



var cur_hl = 0;
var auto_slideshow;
var do_displayed = false;

function append_content_to_highlights(){
	highlight_content.forEach(function(content) {
    	$('.slideshow').append('<li></li>');
    	var last = $( ".slideshow li" ).last();
    	last.css( "background", 'url('+ content['image'] + ') center 40% fixed');
    	last.append('<div class="highlight-text"><a href="' + content['url'] +'">' + content['text'] + '</a></div>' );
	});
};

function show_first_highlight(){
	$( ".slideshow li:nth-child(" + 1 + ")" ).show();
//	highlight_button(2, true);
};

// function highlight_button(b_num, first){
// 	if(typeof first === "undefined"){
// 		$( ".slideshow-buttons").children().css("background-color", "rgba(255,255,255,0.8)");
// 		// $( ".slideshow-buttons").children().css("color", "rgba(0,0,0,0.8)");
// 	}
// 	$( ".slideshow-buttons button:nth-child(" + b_num  + ")" ).css("background-color", "rgba(220,210,210,0.81)");
// 	// $( ".slideshow-buttons button:nth-child(" + b_num  + ")" ).css("color", "white");
//}

var change_highlight = function(direction, hl_num){
	var curr_slide, next_slide;
	var manual_change = false;

	if(typeof direction === "undefined"){
		direction = 1;		
	}	
	else{
		clearInterval(auto_slideshow);		
		manual_change = !manual_change;
	}

	curr_slide = cur_hl % highlight_content.length + 1;
	if(typeof hl_num === "undefined"){
		next_slide = (cur_hl + 1 * direction) % highlight_content.length + 1;
		if(next_slide == 0){
			next_slide = highlight_content.length;
			cur_hl = highlight_content.length-1;
		}
		else
			cur_hl += 1 * direction;
	}
	else{
		next_slide = hl_num;
		cur_hl = hl_num - 1;
	}

	$(".slideshow").children().hide();
	$(".slideshow").children().stop(true, true); 
	$( ".slideshow li:nth-child(" + next_slide + ")" ).fadeIn(1000);
	//highlight_button(next_slide + 1);
	if(manual_change){		
		auto_slideshow = window.setInterval(change_highlight, 6000);
	}
};



function add_slideshow_buttons(){
	var i;
	$('.slideshow-buttons').append("<button class='prev-highlight'> < </button>");
	for(i=1; i<=highlight_content.length; i++){
		$('.slideshow-buttons').append("<button onclick='change_highlight(null,"+i+")'></button>");
	}
	$('.slideshow-buttons').append("<button class='next-highlight'> > </button>");
};


function navbar_scroll(){
	var scrollTop = $( window ).height() / 100 * 10;
    $(window).scroll(function () {		
		if($(window).scrollTop() >= scrollTop){
			$('.nav-container').css( "height", '10vh');
			$('.nav-dropdown').css( "top", '10vh');
			$('.nav-dropdown').css( "height", '90vh');
			$('#jumpstart-logo-big').fadeOut(0, function(){
				$('#jumpstart-logo-small').show(0);
			});
			
		}
		else{
			$('.nav-container').css( "height", '15vh');			
			$('.nav-dropdown').css( "top", '15vh');
			$('.nav-dropdown').css( "height", '85vh');
			$('#jumpstart-logo-small').fadeOut(0, function(){
				$('#jumpstart-logo-big').show(0);
			});
		}
	});

	$( ".nav-dropdown" ).change(function() {
		if( $(window).scrollTop() >= scrollTop){
			$('.nav-dropdown').css( "top", '10vh');
			$('.nav-dropdown').css( "height", '90vh');
		}  		
	});

}

function split_we_text(content){
	var index = content['main-word'];
	var text = content['text'];
	var final_text = "";
	var i = 0;
	var space_counter = 1;
	var c = '';
	var finished = false;
	for(i; i<text.length; i++){
		c = text.charAt(i);
		if(c == ' '){
			space_counter++;
			if(space_counter == index + 1){
				final_text += "</span>";
			}
		}
		if( (space_counter == index) && !finished ){
			final_text += "<span>";
			finished = true;
		}
		final_text += c;
	}
	return final_text;
}

function load_who_are_we(){
	we_content.forEach(function(content) {
		$('.we').append('<div class=\'we-each\'></div>');
    	var last = $('.we .we-each').last();
    	last.append('<img src="' + content['image'] + '">');
    	last.append('<p>' + split_we_text(content) + '</p>');
	});
}

$( document ).ready(function() {
    $( ".show-menu" ).click(function( event ){
		$('.navbar').toggleClass('nav-dropdown');
		var nav_top = $('.nav-container').height() * 100 / $(window).height();
		var nav_height = ($(window).height() - $('.nav-container').height()) * 100 / $(window).height();
		$('.nav-dropdown').css( "top", "" + nav_top + "vh");
		$('.nav-dropdown').css( "height", "" + nav_height + "vh");
	});

	$( window ).resize(function() {		
		if($( window ).width() >= 680){
			$('.navbar').removeClass('nav-dropdown');
			$('.navbar').removeAttr("style");
		}
	});

    navbar_scroll();
    append_content_to_highlights();
    add_slideshow_buttons();
    show_first_highlight();

    load_who_are_we();

     $( ".next-highlight" ).click(function( event ){
		change_highlight(1);
	});

    $( ".prev-highlight").click(function( event ){
		change_highlight(-1);
	});
    auto_slideshow  = window.setInterval(change_highlight, 3500);
    load_what_we_do();
    what_we_do_events();
});


