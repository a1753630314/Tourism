$("#edit-user-form").submit(function () {

    $.post($(this).attr('action'), $(this).serialize(), function (response) {
        if (response.code == 200) {
            layer.closeAll('page');
            layer.msg('操作成功', {icon: 1})
            setTimeout(function () {
                window.location.reload();
            }, 600)
        } else {
            layer.msg(response.message, {icon: 2})
        }
    });

    return false;
});


// 恢复默认头像

$('#reset-avatar').click(function () {
    var avatar = $(this).data('avatar');
    var bigAvatar = $(this).data('big-avatar');
    $('[name=avatar]').val(avatar);
    $('[name=big_avatar]').val(bigAvatar);
    $('#current-avatar').attr('src',avatar);
    $(this).addClass('btn-default').removeClass('btn-primary').unbind('click').text('默认头像').css({cursor:'default'})
});

var byteLen = function (value) {
    var length = value.length;
    for (var i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) > 127) {
            length++;
        }
    }
    return length;
};
//模块标题事件，检测文字长度不能超过16字符
$(document).on('keyup','#introduce',function () {

    if(byteLen($(this).val())>400)
    {
        var num=0;
        for (var i = 0; i < $(this).val().length; i++) {
            if (this.value.charCodeAt(i) > 127) {
                num++;
            }
        }

        this.value = this.value.slice(0,400-num);

        layer.msg('标题不能超过400个字符', {icon: 2});
    }
})


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