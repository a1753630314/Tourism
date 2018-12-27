(function(){
    $(".edit-job").click(function(event) {
        $this = $(this);
        var id = $this.data('id');
        var job = $this.data('job');
        $("#editJob").val(job);
        $("#user-id").val(id);
    });

    $("#submit-job").click(function(event) {
        $this = $(this);

        var job = $("#editJob").val();
        if(!job){
            layer.msg("请填写职称", {icon: 2});
            return false;
        }

        if($this.hasClass('disabled')){
            return false;
        }
        $this.addClass('disabled');

        $.ajax({
            url: $("#edit-job").data("url").replace("-id-", $("#user-id").val()),
            type: 'put',
            data : {
                job : job,
            },
            success: function( response ) {
                if(response.code!=200){
                    layer.msg(response.message, {icon: 2});
                    $this.removeClass('disabled')
                    return false;
                }
                $this.removeClass('disabled');
                window.location.reload();
            },
            error: function() {
                layer.msg("操作失败", {icon: 2});
                $this.removeClass('disabled')
            }
        })
    });

    $(".edit-sort").click(function(event) {
        $this = $(this);
        var id = $this.data('id');
        var sort = $this.data('sort');
        var total = $('#count').data('count');
        $("#sort").val(sort);
        $("#total").val(total);
        $("#id").val(id);
    });

    $("#submit").click(function(event) {
        $this = $(this);

        var sort = $("#sort").val();
        if(!sort || sort<=0 || parseInt(sort, 10) != sort){
            layer.msg("序号错误", {icon: 2});
            return false;
        }
        var total = $("#total").val();

        if($this.hasClass('disabled')){
            return false;
        }
        $this.addClass('disabled');

        $.ajax({
            url: $("#Rank").data("url").replace("-id-", $("#id").val()),
            type: 'put',
            data : {
                sort : sort,
            },
            success: function( response ) {
                if(response.code!=200){
                    layer.msg(response.message, {icon: 2});
                    $this.removeClass('disabled')
                    return false;
                }
                $this.removeClass('disabled');
                window.location.reload();
            },
            error: function() {
                layer.msg("操作失败", {icon: 2});
                $this.removeClass('disabled')
            }
        })
    });

    $("#reset").click(function(event) {
        $("#submit").removeClass('disabled');
    });

    //删除老师
    $('.delTeacher').click(function () {

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
                        //$this.removeClass('disabled')
                        return false;
                    }
                    //$this.removeClass('disabled');
                    parent.layer.msg('删除成功',{icon: 1})
                    window.location.reload();
                },
            });
        }, function(){
            //parent.layer.msg('取消成功', {icon: 2});
        })
    })

}());