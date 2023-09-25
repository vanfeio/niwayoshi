var ua = navigator.userAgent;
var meta = document.createElement('meta');
meta.setAttribute("name", "viewport");
if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
	meta.setAttribute("content", "width=device-width,initial-scale=1");
} else {
	meta.setAttribute("content", "width=1200");
}
document.querySelector("head").prepend(meta);


// include
window.onload = function () {

	includeHtml("header", "/include/header.html", function () {
		// ハンバーガーメニュー
		const ham = document.querySelector('#js-hamburger');
		const nav = document.querySelector('#js-nav');
		ham.addEventListener('click', function () {
			ham.classList.toggle('active');
			nav.classList.toggle('active');
		});
		const url = new URL(window.location.href);
		var html_name = url.pathname;
		//console.log("url : " + url);
		//console.log("url : " + url);
		html_name = html_name.indexOf(".html") > 0 ? html_name : html_name + "index.html";
		nav.querySelectorAll("a").forEach((el) => {
			//console.log("html_name : " + html_name + ", el.href : " + el.href);
			if (el.href.indexOf(html_name) <= 0) return;
			el.addEventListener('click', function () {
				//el.preventDefault();
				ham.classList.toggle('active');
				nav.classList.toggle('active');
			});
		});

		// ハンバーガーメニュー(tab)
		const tabham = document.querySelector('#tab-hamburger');
		const tabnav = document.querySelector('#tab-nav');
		if (tabham != null && tabnav != null) {
			tabham.addEventListener('click', function () {
				tabham.classList.toggle('active');
				tabnav.classList.toggle('active');
			});
		}

		// TOP-FAQ
		const menu = document.querySelectorAll(".faq-toggle");
		function toggle() {
			const content = this.nextElementSibling;
			this.classList.toggle("is-active");
			content.classList.toggle("is-open");
		}
		for (let i = 0; i < menu.length; i++) {
			menu[i].addEventListener("click", toggle);
		}
	});
	includeHtml("footer", "/include/footer.html");

	includeHtml("consulation", "/include/consulation.html");


	includeHtml("manager_header", "/include/manager-header.html", function () {
		[].slice.call(document.querySelectorAll('.megamenu_btn')).forEach(function (el) {
			el.addEventListener('click', onClickMegaMenu, false);
		});
	});

	// モーダルボタン
	document.querySelectorAll(".delete").forEach(function (el, index) {
		el.setAttribute("target", index);
		el.addEventListener('click', onClickDelete, false);
	});


	//ライセンス購入数のスピンボタン
	function getParents(el, parentSelector) {
		if (parentSelector === undefined) {
			return false;
		}

		var p = el.parentNode;
		while (!p.classList.contains(parentSelector)) {
			var o = p;
			p = o.parentNode;
		}
		return p;
	}

	document.addEventListener('click', function (e) {
		e = e || window.event;
		var target = e.target || e.srcElement,
			text = target.textContent || target.innerText;

		var val = 0;

		if (target.classList.contains('js-qty_up')) {
			val = 1;
		} else if (target.classList.contains('js-qty_down')) {
			val = -1;
		} else {
			return false;
		}
		var parent = getParents(target, 'js-qty');
		var input = parent.querySelectorAll('.js-qty_target');
		for (let i = 0; i < input.length; i++) {
			if (input[i].classList.contains('js-qty_target')) {
				var num = parseInt(input[i].value);
				num = isNaN(num) ? 1 : num;
				input[i].value = num + val < 1 ? 1 : num + val;
			}
		}

	}, false);


	//グラフ用Classを追加
	const myFunc = function () {

		//Classを追加する要素を取得
		const target = document.getElementsByClassName('table_container');
		//Classを追加する位置を指定（ビューポート内）
		const position = Math.floor(window.innerHeight * .75); //左記はビューポート内の上から75%の位置を指定

		//要素の数だけループする
		for (let i = 0; i < target.length; i++) {

			//要素の上部座標を取得する（小数点切り捨て）
			let offsetTop = Math.floor(target[i].getBoundingClientRect().top);

			//要素の上部座標がpositionの位置を通過したら
			if (offsetTop < position) {
				//要素にClassを追加する
				target[i].classList.add('is-animate');
			}
		}
	}
	//スクロールイベントリスナーに登録
	window.addEventListener('scroll', myFunc, false);

};

function includeHtml(id, path, func = null) {
	if (document.getElementById(id) == null) return;
	fetch(path, {
		method: "GET",
	}).then(response => response.text())
		.then(text => {
			document.getElementById(id).innerHTML = text;
			if (func != null) {
				func();
			}
		});
}

// TOP-youtube
class ToggleModal {
	constructor(target) {
		this.target = target;
		this.videoId = target.dataset.url.slice(-11);
		this.loadIframePlayerAPI();
		this.open();
		this.close();
	}
	/**
	* @method loadIframePlayerAPI
	* @description IFrame Player APIを読み込む
	*/
	loadIframePlayerAPI() {
		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	/**
	* @method onYouTubeIframeAPIReady
	* @description YouTube動画を動的に埋め込む
	*/
	onYouTubeIframeAPIReady() {
		let ytPlayer = new YT.Player('player', {
			videoId: this.videoId,
			playerVars: {
				'autoplay': 1,
				'controls': 1
			}
		});
	}

	/**
	* @method remakePlayerElement
	* @description YouTube動画を埋め込む要素を再作成
	*/
	remakePlayerElement() {
		const modal = document.querySelector('#modal-video');
		modal.removeChild(modal.firstElementChild);
		let tag = document.createElement('div');
		tag.id = 'player';
		modal.appendChild(tag);
	}

	/**
	* @method open
	* @description モーダルウィンドウを開く
	*/
	open() {
		this.target.addEventListener('click', event => {
			this.onYouTubeIframeAPIReady();
			document.querySelector('#modal-video').classList.add('open');
			document.querySelector('#modal-video').classList.remove('close');
		});
	}

	/**
	* @method close
	* @description モーダルウィンドウを閉じる
	*/
	close() {
		document.querySelector('.js-modal-video-close').addEventListener('click', event => {
			document.querySelector('#modal-video').classList.add('close');
			document.querySelector('#modal-video').classList.remove('open');
			this.remakePlayerElement();
		});
	}
}

document.addEventListener('DOMContentLoaded', event => {
	document.querySelectorAll('.js-modal-video-open').forEach(element => {
		new ToggleModal(element);
	});
});


/**
 * MegaMenu処理
 * 
 */
function onClickMegaMenu(e) {
	e.preventDefault();
	var el = this.nextElementSibling;
	el.classList.contains('show') ? hideMegaMenu(el) : showMegaMenu(el);
}

function showMegaMenu(el) {
	[].slice.call(document.querySelectorAll('.megamenu')).forEach(function (el) {
		hideMegaMenu(el);
	});
	el.classList.add('show');
}

function hideMegaMenu(el) {
	el.classList.remove('show');
}

/**
 * モーダル処理
 */
function onClickDelete(e) {
	var el = e.target;
	var target = el.getAttribute("target");
	openModal(e, target);
	modal.querySelectorAll("button").forEach(function (el) {
		el.addEventListener("click", closeModal, false);
	});
}

function openModal(e, target) {
	e.preventDefault();
	var modal = document.querySelector("#modal");
	modal.classList.add('show');
	modal.setAttribute("target", target);
}

function closeModal(e) {
	e.preventDefault();
	if (e.target.classList.contains("yes")) {
		var t = document.querySelector("#modal").getAttribute("target");
		console.log("delete : " + t);
	}
	document.querySelector("#modal").classList.remove('show');
}

