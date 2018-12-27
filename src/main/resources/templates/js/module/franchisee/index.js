(function(){
    $('#add-franchisee').on('click', function () {
        var url = $(this).data('url');
        $.get(url, {}, function (response) {
            layer.open({
                type: 1,
                title: '添加',
                area: ['730px', '500px'],
                shadeClose: false, //点击遮罩关闭
                content: response,
            });
        });
    });

    $('.sort-franchisee').on('click', function () {
        var url = $(this).data('url');
        $.get(url, {}, function (response) {
            layer.open({
                type: 1,
                title: '排序',
                area: ['530px', '200px'],
                shadeClose: false, //点击遮罩关闭
                content: response,
            });
        });
    });

    $('.read-franchisee').on('click', function () {
        var url = $(this).data('url');
        $.get(url, {}, function (response) {
            layer.open({
                type: 1,
                title: '详情',
                area: ['730px', '500px'],
                shadeClose: false, //点击遮罩关闭
                content: response,
            });
        });
    });

    $('.eidt-franchisee').on('click', function () {
        var url = $(this).data('url');
        $.get(url, {}, function (response) {
            layer.open({
                type: 1,
                title: '编辑',
                area: ['730px', '500px'],
                shadeClose: false, //点击遮罩关闭
                content: response,
            });
        });
    });

    $('.status-franchisee').click(function () {
        var url = $(this).data('url');
        var status = $(this).data('status');
        layer.confirm('确认执行此操作？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            $.ajax({
                url : url,
                type : "put",
                data : {status:status},
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

    $("#franchisee-search").click(function () {
        var $this = $(this);
        var $form = $this.closest("form");
        $form.submit();
    });

    $("#form-status").change(function () {
        var $this = $(this);
        var $form = $this.closest("form");
        $form.submit();
    });
}())