var partners_num = 11;

function load_partners(){
	var i = 1;
	for(i; i<=partners_num; i++){
		$('#partners').append('<img src="images/partners/' + i + '.svg"> </img>');
	}
}