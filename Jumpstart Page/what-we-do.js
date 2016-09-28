
var what_we_do = [
					{
						'image': "images/what-we-do/storytelling.jpg",
						'text': {
							'headline': 'Storytelling',
							'full-text': [
								"Infographics and Factographs (Stalin, Don’t Limit Her Possibilities, Maternal Mortality)",
								"Gifographics and Animations (gender-based abortions, be healthy, road safety)",
								"Web Sites and Interactive Data Visualizations (Speaking Stones, Lari Explorer, gender wage gap)"							]
						}
					},{
						'image': "images/what-we-do/tools.jpg",
						'text': {
							'headline': 'Tools for storytelling and data analysis',
							'full-text': [
								"StoryBuilder",
								"Data Analysis (Xtraktr)",
								"Bla Bla Main Bla"
							]
						}
					},{
						'image': "images/what-we-do/training.jpg",
						'text': {
							'headline': 'Education Trainings and Workshops (School of Data)',
							'full-text': [
								"StoryBuilder",
								"Data Analysis (Xtraktr)",
								"Bla Bla Main Bla"
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
var do_displayed;

var show_hide_image = function(event){
	var index = event.data.index;	
	var mission = event.data.mission;
	var elem = $('.do').find('.do-box').eq(index);
	if(do_displayed[index] || mission == 'leave') {
		load_background_color_and_text(index);
		if(mission == 'click'){
			elem.find('.over').mouseenter({index: index, mission: 'enter'}, show_hide_image);
			elem.find('.over').mouseleave({index: index, mission: 'leave'}, show_hide_image);
		}
		do_displayed[index] = false;
	}else {
		elem.css('background-image', 'url(' + what_we_do[index]['image'] + ')');
		elem.find('.headline').html("");
		if( mission == 'click'){
			elem.find('.over').unbind( "mouseenter" );
			elem.find('.over').unbind( "mouseleave" );
			do_displayed[index] = true;
		}
	}
}

function load_background_color_and_text(index){
	var elem = $('.do').find('.do-box').eq(index);
	elem.css('background-image', 'none');
	elem.css( "background-color",  'red');
	elem.find('.headline').html('<p>' + what_we_do[index]['text']['headline'] + '</p>');	
}

function load_what_we_do(){
	var i = 0;
	what_we_do.forEach(function(content) {
		$('.do').append('<div class="do-box"></div>');	
    	var last = $('.do .do-box').last();
  		last.append("<div class='headline'> </div>");
  		last.append("<div class='over'> </div>");
  		load_background_color_and_text(i);
    	i++;
    });

}

function what_we_do_events(){
	var elem;
	var i = 0;
	do_displayed = [];
	for(i; i<=what_we_do_num; i++){
		elem = $('.do').find('.do-box').eq(i).find('.over');
		elem.click({index: i, mission: 'click'}, show_hide_image);
		elem.mouseenter({index: i, mission: 'enter'}, show_hide_image);
		elem.mouseleave({index: i, mission: 'leave'}, show_hide_image);
		do_displayed.push(false);
	}
}
