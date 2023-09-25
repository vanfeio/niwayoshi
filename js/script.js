
$(function(){
	// include
	$("#header").load("/include/header.html");
	$("#footer").load("/include/footer.html");
	$("#consulation").load("/include/consulation.html");

	// TOP　固定header
	var scroll;
	var objH = $('.mv').outerHeight();
	var objTop = $('.mv').offset().top;
	var objBottom = objTop + objH;
	$(window).on('scroll', function(){
	scroll = $(window).scrollTop();
	if(scroll >= objBottom){
			$('#header').removeClass('display');
		}else{
			$('#header').addClass('display');
		}
	});
	
});

