(function () {
    $('#login-form').submit(function () {
        var siteCode = $("#siteCode").val();
        var url = $('#login-form').attr('action');
        $.post($.sg.spellUrl(url, 'siteCode='+siteCode), $('#login-form').serialize(), function (response) {
            if (response.code != 200) {
                alert(response.message);
                return false
            }
            window.location = $.sg.spellUrl('/', 'siteCode='+siteCode);
        });
        return false;
    })
}());