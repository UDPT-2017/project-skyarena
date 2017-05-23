
$(function(){
    $("#addClass").click(function () {
        $('#qnimate').addClass('popup-box-on');
        $("#messagesInsert").scrollTop($("#messagesInsert")[0].scrollHeight);
    });

    $("#removeClass").click(function () {
        $('#qnimate').removeClass('popup-box-on');
    });
});