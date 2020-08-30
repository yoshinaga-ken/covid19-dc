/**
 * common utility
 * 
 *   @dependencies": {
 *    "jquery": "",
 *    "phpjs.js": "",
 *    "jquery-ui": "^1.12.0"
 *   }
 * 
 */


$.fn.extend({
	btn_clear: function() {
		let btn = $('<span>').button({ icons: { primary: "ui-icon ui-icon-closethick" } });
		btn.addClass("btn_clear_btn");
		btn.on('click', function() {
			let input = $(this).prevAll('input.btn_clear:eq(0)');
			input.val(input.attr('btn_clear_val') || '').trigger('change').trigger('keyup');
			if (!g_isTouch) input.focus();
			input.focus();
		});
		$(this).after(btn);
		//btn.height($(v).height()+16); //for jqui11
		return this;
	},
})

function printf02d(i) {
	return ('0' + String(i)).substr(-2);
}

function location_get_query() {
	let q;
	if (location.search === "") {
		let s = location.pathname.split('/');
		if (s.length === 2) return {};
		q = s[s.length - 1];
	} else {
		q = php_trim(location.search, "?");
	}
	let o = {};
	php_parse_str(q, o);
	return o;
}


$(document).ready( function(){
    
    /**
     * クリアボタン(JQUI)
     * @param [btn_clear_val] 
     */
	$('.btn_clear').btn_clear();
});