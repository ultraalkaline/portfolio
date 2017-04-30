$(window).on('load', function() {

    var $slides = $('.slide');
    var $slideAnchors = $('.menu-item').parent().not('.inner');

    $("#mazeCanvas").attr('title', 'generate a new maze.');
    $("#mazeCanvas").prependTo('#home-container');
    $("#mazeCanvas").mouseenter();

    $(".menu-item").click(function() {
        var slideID = $(this).attr('id');
        var slideName = slideID.substr(0, slideID.length - 7);
        showSlide(slideName);
    });

    var title = 'jovan polus.';
    var description = 'software developer, computer enthusiast and a human.';
    var i = 0;
    var letter;
    var typingDone = false;

    /*
     *   NOTE: find a better implementation for the typing animation.
     */

    setTimeout(function() {
        var typeAnim1 = typeAnim(title, "#title-header", 100);
    }, 500);

    setTimeout(function() {
        var typeAnim2 = typeAnim(description, "#title-description", 75);
    }, 2000);

    setInterval(function() {
        if ($("#typing-indicator").css('opacity') == '0') {
            $("#typing-indicator").css('opacity', '1');
        } else {
            $("#typing-indicator").css('opacity', '0');
        }
    }, 500);


    function typeAnim(text, element, delay) {
        $("#typing-indicator").prependTo(element);
            var interval = setInterval(function() {
                letter = text.charAt(i);
                if (i != text.length) {
                    $("#typing-indicator").before(letter);
                    i++;
                    typingDone = false;
                } else {
                    clearInterval(interval);
                    i = 0;
                    typingDone = true;
                }
            }, delay);
    }

    function showSlide(slideName) {
        // cache the elements for performance reasons.
        var $slide = $('#' + slideName + '-container');
        var $slideItem = $('#' + slideName + '-anchor').parent().not('.inner');

        if (!$slide.hasClass('slide-active')) {
            $slides.removeClass('slide-active');
            $slideAnchors.removeClass('active');

            $slide.addClass('slide-active');
            $slideItem.addClass('active');
        }
    }

});
