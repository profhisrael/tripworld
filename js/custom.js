// JavaScript Document

jQuery(document).ready(function(){
	jQuery('.mobNavClick').click(function(){
		jQuery('body').toggleClass('open');
	});
	
	jQuery('.navClose, .overlay').click(function(){
		jQuery('body').removeClass('open');
	});
});


