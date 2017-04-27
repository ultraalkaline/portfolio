$(window).on('load', function() {
    $("#menu-bar").fadeIn(200);
    $("#defaultCanvas0").attr('title', 'generate a new maze.');
    $("#defaultCanvas0").prependTo('#title-container');

    var title = "jovan polus.";
    var description = 'web, android and uselessness "dev".'
    var i = 0;
    var letter;
    var typingDone = false;

    /*
     *   NOTE: find a better implementation for the typing animation.
     */
    setTimeout(function() {
        var typeAnim1 = typeAnim(title, "#title-header");
    }, 500);

    setTimeout(function() {
        var typeAnim2 = typeAnim(description, "#title-description");
    }, 2000);

    setInterval(function() {
        $("#typing-indicator").toggle();
    }, 500);

    function typeAnim(text, element) {
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
            }, 100);

    }

});
