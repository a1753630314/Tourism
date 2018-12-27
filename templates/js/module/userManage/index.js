// var strhtml = document.getElementsByClassName('upload-file')[0].outerHTML;
// $('#batch-import').on('click', function () {
//     layer.open({
//         type: 1,
//         title: '批量导入',
//         area: ['600px', '360px'],
//         shadeClose: true, //点击遮罩关闭
//         content: strhtml
//     });
// });


$('#add-user').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '添加用户',
            area: ['530px', '400px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });

});
$('#add-teacher').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '添加老师',
            area: ['530px', '450px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });

});

$('.edit-teacher').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '编辑老师',
            area: ['530px', '450px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });

});

$('.read-user').click(function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '查看用户信息',
            area: ['530px', '550px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });
});

$('.edit-user').click(function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '编辑用户信息',
            area: ['600px', '550px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });
});

$('.locked-user').click(function () {
    var url = $(this).data('url');
    var locked = $(this).data('locked');
    layer.confirm('确认执行此操作？', {
        btn: ['确认','取消'] //按钮
    }, function(){
        $.post(url, {locked:locked}, function (response) {
            if(response.code == 200){
                layer.msg('操作成功');
                setTimeout(function () {
                    window.location.reload();
                }, 600)
            }else{
                layer.msg(response.message);
            }
        });
    }, function(){
        
    });
    
});


$(document).ready(function () {

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $(document).on('ifChecked', '#check_as', function () {
        $('.check_friend').iCheck('check');
    })

    $(document).on('ifUnchecked', '#check_as', function () {
        $('.check_friend').iCheck('uncheck');
    })
});
        