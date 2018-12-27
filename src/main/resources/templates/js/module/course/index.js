(function () {
    $(function(){
        $('#action .status').click(function(){
            var id =$(this).data('id');
            $.ajax({
                type: 'put',
                url:$(this).data('control-url'),
                data:{action:'status',status:$(this).data('status')},
                success:function (json) {

                     if(json.code == 200)
                    {
                        window.location.reload();
                    } else {
                        parent.layer.msg(json.message, {icon: 2});
                    }
                }
            })
        })

        $('#action .recommend').click(function(){
            var id =$(this).data('id');
            $.ajax({
                type: 'put',
                url:$(this).data('control-url'),
                data:{action:'recommend',recommend:$(this).data('recommend')},
                success:function (json) {

                    if(json.code == 200)
                    {
                        window.location.reload();
                    } else {
                        parent.layer.msg(json.message, {icon: 2});
                    }
                }
            })
        })

        $('#action .public').click(function(){
            var id =$(this).data('id');
            $.ajax({
                type: 'put',
                url:$(this).data('control-url'),
                data:{action:'show',show:$(this).data('public')},
                success:function (json) {
                    console.log(json);
                    if(json.code == 200)
                    {
                        window.location.reload();
                    } else {
                        parent.layer.msg(json.message, {icon: 2});
                    }
                }
            })
        })

        $("#rel").click(function () {
            var _this = $(this);
            parent.layer.confirm('取消关联后该课程将不再本地站展示，确定取消关联吗？', {
                btn: ['确认', '取消'], //按钮
                shade: false, //不显示遮罩
                title: "提示"
            }, function () {
                var url = _this.data("url");
                $.ajax({
                    url: url,
                    type: 'put',
                    data: {link_type: 3},
                    success: function(msg){
                        if(msg.code==200){
                            parent.layer.msg(msg.message, {icon: 1});
                            window.location.reload();
                        }else{
                            parent.layer.msg(msg.message, {icon: 2});
                        }

                    }
                })

            }, function () {
            });
        })


        //删除课程
        $('#action .delete').click(function () {
            var id =$(this).data('id');
            parent.layer.confirm('您确定要删除吗？', {
                btn: ['确定','取消'], //按钮
                shade: false //不显示遮罩
            }, function(){
                $.ajax({
                    type: 'delete',
                    url:$(this).data('control-url'),
                    success:function (json) {
                        console.log(json);
                        if(json.code == 200)
                        {
                            parent.layer.msg('删除成功', {icon: 1});
                            window.location.reload();
                        } else {
                            parent.layer.msg('删除失败', {icon: 2});
                        }
                    }
                })
            }, function(){
                //parent.layer.msg('取消成功', {icon: 2});
            })
        })
    })
}());