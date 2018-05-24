$(document).ready(function() {
	$("textarea").on("keyup", function() {
		//		console.log(this);
		var test = $(this).siblings('span');
		$(this).siblings('span').text(140 - $(this).val().length);
		if ($(this).val().length > 140) {
			$(test).css('color', 'red');
		} else {
			$(test).css('color', 'black');
		}
	});
});

