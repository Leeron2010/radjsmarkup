$(function()
{
    var slider = $('.sidebar').jScrollPane(),
        content = $('.content-wrapper').jScrollPane(
        {
            mouseWheelSpeed : 50
        }
        ),
        contentApi = content.data('jsp');
        goTo = function (e) {
            e.preventDefault();
            contentApi.scrollToElement(e.currentTarget.hash, {stickToTop: true}, true);
        },
        clickLink = function(e) {
            var $el = $(e.currentTarget),
                $next = $el.next(),
                $parent,
                width;
            e.preventDefault();

            if($next.is('.submenu-hider')) {
                width = $next.children().height();
                $next.height(width);

                console.log(width, $next);
            }


        };

    $('.main-menu').on('click', 'a', clickLink);

});


