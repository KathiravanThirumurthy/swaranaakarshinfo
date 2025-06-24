/*$(document).ready(function(){

	$('.nav-button').click(function(){
		console.log("Clicked");
		$('.nav-button').toggleClass('change');
	});

	$('.nav-link[href="#home"]').addClass('nav-active');

	$(window).scroll(function(){
		let position=$(this).scrollTop();
		//console.log(position);
		if(position >= 200)
		{
			$('.nav-menu').addClass('custom-navbar');
		}else
		{
			$('.nav-menu').removeClass('custom-navbar');
		}
	})
})
*/
$(document).ready(function(){
    // Toggle navbar button
    $('.navbar-toggler').click(function(){
        console.log("Clicked");
        $('.navbar-toggler').toggleClass('change');
    });

    // Add 'nav-active' class to home link
    $('.nav-link[href="#home"]').addClass('nav-active');

    // Change navbar style on scroll
    $(window).scroll(function(){
        let position = $(this).scrollTop();
        if(position >= 200) {
            $('.navbar').addClass('custom-navbar');
        } else {
            $('.navbar').removeClass('custom-navbar');
        }
    });
});

