$(function() {
	$('.side-menu').on('click', 'a', function  (e) {
		e.preventDefault();
		var scrollTopPosition = $(e.currentTarget.hash).offset().top;
		window.scrollTo(0,scrollTopPosition - 70);
	});
});