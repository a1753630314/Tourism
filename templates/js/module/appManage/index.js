(function(){

    $('#add-app').on('click', function () {
        var url = $(this).data('url');
        $.get(url, {}, function (response) {
            layer.open({
                type: 1,
                title: '新增版本',
                area: ['750px', '530px'],
                shadeClose: false, //点击遮罩关闭
                content: response,
            });
        });
    });

    $('.eidt-app').on('click', function () {
        var url = $(this).data('url');
        $.get(url, {}, function (response) {
            layer.open({
                type: 1,
                title: '编辑',
                area: ['750px', '530px'],
                shadeClose: false, //点击遮罩关闭
                content: response,
            });
        });
    });

    $('.delete-app').click(function () {
        var url = $(this).data('url');
        layer.confirm('确认执行此操作？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            $.ajax({
                url : url,
                type : "delete",
                dataType : 'json',
                success : function(response){
                    if (response.code == 200) {
                        layer.closeAll('page');
                        layer.msg('操作成功', {icon: 1})
                        setTimeout(function () {
                            window.location.reload();
                        }, 600)
                    } else {
                        layer.msg(response.message, {icon: 2})
                    }
                },
                error : function(){
                    layer.msg("操作失败!", {icon: 2})
                }
            });
        }, function(){

        });
    });

    var active = $("#android-tab").data("active");
    if(active){
        $("#android-tab").trigger("click");
    }
}())
