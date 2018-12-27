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

//删除老师
$('.delete').click(function () {
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