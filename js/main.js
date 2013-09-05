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
        };

    $('.main-menu').on('click', 'a', goTo);

});


