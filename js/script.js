
$(function () {
	// include
	$("#header").load("/include/header.html");
	$("#footer").load("/include/footer.html");
	$("#consulation").load("/include/consulation.html");

	// TOP　固定header
	var top = document.querySelector("#top");
	if (top) {
		var scroll;
		var objH = $('.mv').outerHeight();
		var objTop = $('.mv').offset().top;
		var objBottom = objTop + objH;
		$(window).on('scroll', function () {
			scroll = $(window).scrollTop();
			if (scroll >= objBottom) {
				$('#header').removeClass('display');
			} else {
				$('#header').addClass('display');
			}
		});

	}

	let fadeInTarget = document.querySelectorAll('.fade-in');
	function fadeInTargetFunction() {
		for (let i = 0; i < fadeInTarget.length; i++) {
			const rect = fadeInTarget[i].getBoundingClientRect().top;
			const scroll = window.screenY || document.documentElement.scrollTop;
			const offset = rect + scroll;
			const windowHeight = window.innerHeight; // 現在のブラウザの高さ
			if (scroll > offset - windowHeight + 150) {
				fadeInTarget[i].classList.add('scroll-in');
			}
		}
	}
	$(window).on('scroll', function () {
		fadeInTargetFunction();
	});
	$(window).on('load', function () {
		fadeInTargetFunction();
	})


});

