
var what_we_do = [
					{
						'image': "images/what-we-do/storytelling.jpg",
						'text': {
							'headline': 'Storytelling',
							'full-text': [
								"Infographics and Factographs",
								"Gifographics and Animations",
								"Web Sites and Interactive Data Visualizations"	
								]
						}
					},{
						'image': "images/what-we-do/tools.jpg",
						'text': {
							'headline': 'Tools for storytelling and data analysis',
							'full-text': [
								"StoryBuilder",
								"Data Analysis (Xtraktr)"
							]
						}
					},{
						'image': "images/what-we-do/training.jpg",
						'text': {
							'headline': 'Education Trainings and Workshops',
							'full-text': [
								"School of Data"
							]
						}
					},{
						'image': "images/what-we-do/campaign.jpg",
						'text': {
							'headline': 'Advocacy Campaigns',
							'full-text': [
								"#behealthy",
								"#rightsnotflowers",
								"#sharetheroad"
							]
						}
					}
				];

var what_we_do_num = 4;
var clicked;

var show_hide_image = function(event){
	var index = event.data.index;	
	var mission = event.data.mission;
	var elem = $('.do').find('.do-box').eq(index);
	if(clicked[index] && mission == 'leave'){
		return;
	}else if ( (clicked[index] && mission != 'enter') || mission == 'leave') {
		load_background_color_and_text(index);
		clicked[index] = false;
	}else {
		var i = 0;
		for(i; i<what_we_do_num; i++){
			if(i == index || clicked[i]) continue;
			clicked[i] = true;
			$('.do').find('.do-box').eq(i).trigger('click');
		}
		elem.css('background-color', 'rgba(255, 255, 255, 0.04)');
		var full_text = '';
		what_we_do[index]['text']['full-text'].forEach(function(text){
			full_text += '<li><a href="#">' + text + '<a></li>';
		});
		elem.find('.headline').html("<ul>" + full_text + "</ul>");
		if( mission == 'click'){
			clicked[index] = true;
		}
	}
}

function load_background_color_and_text(index){
	var elem = $('.do').find('.do-box').eq(index);
	elem.css( "background-color",  'rgba(0,0,0,0.3)');
	elem.find('.headline').html('<p>' + what_we_do[index]['text']['headline'] + '</p>');	
}

function load_what_we_do(){
	var i = 0;
	what_we_do.forEach(function(content) {
		$('.do').append('<div class="do-box"></div>');	
    	var last = $('.do .do-box').last();
  		last.append("<div class='headline'> </div>");
  		last.append("<div class='over'> </div>");
  		//last.css( "background-position",  i * (-190 / what_we_do_num) + 'vh bottom');
  		load_background_color_and_text(i);
    	i++;
    });

}

function what_we_do_events(){
	var elem;
	var i = 0;
	clicked = [];
	for(i; i<=what_we_do_num; i++){
		elem = $('.do').find('.do-box').eq(i);
		elem.click({index: i, mission: 'click'}, show_hide_image);
		if($(window).width() > 1024){
			elem.mouseenter({index: i, mission: 'enter'}, show_hide_image);
			elem.mouseleave({index: i, mission: 'leave'}, show_hide_image);
		}
		clicked.push(false);
	}

	$(window).resize(function() {
		var width = $(window).width();
		var i = 0;		
		for(i; i<=what_we_do_num; i++){
			elem = $('.do').find('.do-box').eq(i);
			if(width > 1024){
				elem.unbind('mouseenter');
				elem.unbind('mouseleave');
				elem.mouseenter({index: i, mission: 'enter'}, show_hide_image);
				elem.mouseleave({index: i, mission: 'leave'}, show_hide_image);
			}
			else{
				elem.unbind('mouseenter');
				elem.unbind('mouseleave');
			}
		}
	});

}

