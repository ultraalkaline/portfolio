$(window).on('load', function() {
    $("#menu-bar").fadeIn(200);
    $("#mazeCanvas").attr('title', 'generate a new maze.');
    $("#mazeCanvas").prependTo('#title-container');
    $("#mazeCanvas").mouseenter();

    var title = "jovan polus.";
    var description = 'software developer, computer enthusiast and a human.'
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

    function rotateAnim(degrees, element) {
        // cache the element for performance reasons.
        var $elem = $(element);
        $elem.css('transition', 'transform 200ms ease');
        $elem.css('transform', 'rotate(' + degrees + 'deg)');
    }

});
