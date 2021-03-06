(function($) {
	// determine colors, which will be different depending on the theme (light/dark)
	var pageColor = $('body').css('background-color');
	var bgColor = $('.column').css('background-color');
	var headingColor = $('.app-header').css('color');
	var headingBgColor = $('.app-header').css('background-color'); 
	// add styles
	$('<style type="text/css"></style>')
	.html('\
.app-columns{\
	-webkit-column-width: 300px;\
	-webkit-column-gap: 10px;\
	-moz-column-width: 300px;\
	-moz-column-gap: 10px;\
	background: ' + pageColor + ';\
}\
.column, .column-holder, .column-panel, .column-scroller, .js-chirp-container {\
	display: inline;\
	position: inherit;\
	margin-right: 0;\
}\
.column-header, .column-title-back { color: ' + headingColor + '; background-color: ' + headingBgColor + '; }\
.column-content { position: static; }\
.js-column-header { display: none; }\
.has-filters .column-message { display: none; }\
.stream-item {\
	background-color: ' + bgColor + ';\
	-webkit-column-break-inside: avoid;\
	-moz-column-break-inside: avoid;\
}\
.was-column-1 {	border-left: 3px solid red; }\
.was-column-2 { border-left: 3px solid blue; }\
.was-column-3 { border-left: 3px solid green; }\
.was-column-4 { border-left: 3px solid orange; }\
.was-column-5 { border-left: 3px solid purple; }\
.was-column-6 { border-left: 3px solid yellow; }\
.was-column-7 { border-left: 3px solid darkslateblue; }\
.column-detail { display: none; }\
.is-shifted-1 .column-detail {\
	display: block;\
	position: fixed;\
	top: 10%; left: 10%; width: 80%; height: 80%;\
	z-index: 1;\
	box-shadow: 0 0 10px #999;\
	background-color: ' + bgColor + ';\
	overflow: auto;\
}\
.is-shifted-1 .column-detail .column-scroller {\
	display: block;\
	position: relative;\
	top: 0;\
}\
.js-chirp-container .column-scroller, .js-chirp-container .column-scroller .stream-item { overflow: visible; }\
')
	.appendTo("head");
	// apply wizardry
	var columns = $('.column');
	var firstColumnStream = $($(columns[0]).find('.js-chirp-container')[0]);
	for (i = 1; i < columns.length; i++) {
		var c = $(columns[i]);
		var t = c.clone();
		t.find('.column-header').remove();
		t.find('.stream-item').remove();
		c.data('template', t);
		// move items to first column
		$(columns[i]).find('article.stream-item').each(function() {
			var item = $(this).addClass('was-column-' + i).hide().clone();
			var newT = t.clone();
			item.appendTo(newT.find('.js-chirp-container')).show();
			firstColumnStream.append(newT);
		});
	}
	for (i = 1; i < columns.length; i++) {
		window.setInterval(function(i) {
			// move items to first column
			// we hide and then show to ensure smooth transition
			$(columns[i]).find('.js-chirp-container .stream-item:visible').each(function() {
				var item = $(this).addClass('stream-item-in-transit was-column-' + i).hide().clone();
				var newT = $(columns[i]).data('template').clone();
				item.appendTo(newT.find('.js-chirp-container'));
				firstColumnStream.prepend(newT);
			});
			firstColumnStream.find('.stream-item-in-transit').fadeIn().removeClass('stream-item-in-transit');
		}, 2000, i);
	}
})($);
