(function () {
    $("#switch-site").change(function () {
        var $selected = $("#switch-site").find("option:selected");
        window.location = $selected.data("url");
    });
}());