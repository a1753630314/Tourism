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

// 添加管理员
$('#add-admin').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '添加管理员',
            area: ['630px', '400px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });
});

// 显示编辑角色
$('.edit-admin').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '编辑管理员',
            area: ['630px', '400px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });
});

// 显示添加角色
$('#add-role').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '添加角色',
            area: ['630px', '400px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });
});

// 显示编辑角色
$('.edit-role').on('click', function () {
    var url = $(this).data('url');
    $.get(url, {}, function (response) {
        layer.open({
            type: 1,
            title: '编辑角色',
            area: ['630px', '400px'],
            shadeClose: true, //点击遮罩关闭
            content: response.html,
        });
    });
});


//删除角色
$('.delete-role').click(function () {
    var self = $(this)
    parent.layer.confirm('您确定要删除吗？', {
        btn: ['确定','取消'], //按钮
        shade: false //不显示遮罩
    }, function(){
        var url = self.data('url');
        $.ajax({
            url: url,
            type: 'delete',
            success: function (response) {
                if (response.code != 200) {
                    parent.layer.msg(response.message, {icon: 2});
                    return false;
                }
                parent.layer.msg('删除成功',{icon: 1})
                window.location.reload();
            },
        });
    }, function(){
    })
})


$("#add-teacher-form").submit(function () {
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

// 添加角色权限
$("#add-permission-form").submit(function () {
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


// 权限选择
$("#rule_permission td [type='checkbox']").on("click",function () {
    var pid = $(this).attr('pid');
    var id =  $(this).attr('id');
    var chk = $(this).is(':checked');
    if(chk){
        $("input[pid='"+id+"']").prop('checked','true');
        if(pid){
            $('#'+pid).prop('checked','checked');
        }
    }
    else{
        $("input[pid='"+id+"']").removeAttr('checked');
        var obj =  $("input[pid='"+pid+"']");
        var has_checked=false;
        $.each(obj,function(){
            if($(this).is(':checked') == true){
                has_checked = true;
            }
        });
        if(has_checked ==  false){
            $("input[id='"+pid+"']").removeAttr('checked');
        }
    }
});

