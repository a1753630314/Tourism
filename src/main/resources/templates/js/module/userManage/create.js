$("#add-user-form").submit(function () {
    var redirect = $(this).data('redirect');
    $.post($(this).attr('action'), $(this).serialize(), function (response) {

        if (response.code == 200) {
            layer.closeAll('page');
            layer.msg('操作成功', {icon: 1})
            setTimeout(function () {
                window.location.href = redirect;
            }, 600)
        } else {
            layer.msg(response.message, {icon: 2})
        }
    });

    return false;
});

$("#edit-user-form").submit(function () {
    var redirect = $(this).data('redirect');
    $.post($(this).attr('action'), $(this).serialize(), function (response) {

        if (response.code == 200) {
            layer.closeAll('page');
            layer.msg('操作成功', {icon: 1})
            setTimeout(function () {
                window.location.href = redirect;
            }, 600)
        } else {
            layer.msg(response.message, {icon: 2})
        }
    });

    return false;
});

$("#add-teacher-form").submit(function () {
    var $this = $(this);
    if($this.hasClass("disabled"));

    var $form = $("#add-user-form");
    if($form.hasClass('disable')){
        return false;
    }

    var job = $("#job").val();
    if(!job){
        layer.msg("请填写职称", {icon: 2});
        return false;
    }

    var sort = $("#sort").val();
    if(!sort || sort<=0 || parseInt(sort, 10) != sort){
        layer.msg("序号错误", {icon: 2});
        return false;
    }
    console.log($form.serialize())
    $this.addClass("disabled");
    $.ajax({
        url : $this.attr("action"),
        data : $this.serialize(),
        dataType : "JSON",
        type : $this.attr("method")
    }).done(function (response) {
        if (response.code == 200) {
            layer.closeAll('page');
            layer.msg('操作成功', {icon: 1})
            setTimeout(function () {
                window.location.reload();
            }, 600)
        } else {
            layer.msg(response.message, {icon: 2});
        }
    }).fail(function () {
        layer.msg("操作失败", {icon: 2});
    }).always(function () {
        $this.removeClass("disabled");
    });
    return false;
});

// 添加角色
$("#add-role-form").submit(function () {
    var redirect = $(this).data('redirect');
    $.post($(this).attr('action'), $(this).serialize(), function (response) {

        if (response.code == 200) {
            layer.closeAll('page');
            layer.msg('操作成功', {icon: 1})
            setTimeout(function () {
                window.location.href = redirect;
            }, 600)
        } else {
            layer.msg(response.message, {icon: 2})
        }
    });

    return false;
});

// 编辑角色
$("#edit-role-form").submit(function () {
    var redirect = $(this).data('redirect');
    $.post($(this).attr('action'), $(this).serialize(), function (response) {

        if (response.code == 200) {
            layer.closeAll('page');
            layer.msg('操作成功', {icon: 1})
            setTimeout(function () {
                window.location.href = redirect;
            }, 600)
        } else {
            layer.msg(response.message, {icon: 2})
        }
    });

    return false;
});

$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
});

$(document).on('ifChecked','#check_as',function(){
    $('.check_friend').iCheck('check');
})

$(document).on('ifUnchecked','#check_as',function(){
    $('.check_friend').iCheck('uncheck');
})

$('#data_1 .input-group.date').datepicker({
    todayBtn: "linked",
    keyboardNavigation: false,
    forceParse: false,
    calendarWeeks: true,
    autoclose: true
});