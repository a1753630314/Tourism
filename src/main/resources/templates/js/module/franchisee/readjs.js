(function () {
    $("#add-validate-btn").click(function () {
        var $this = $(this);
        if($this.attr('disabled')){
            return false;
        }
        var mobile = $("#cname").val();
        if(!mobile){
            layer.msg("请填写手机号", {icon: 2});
            return false;
        }
        $this.attr('disabled','disabled');
        var $form = $("#add-form");
        var $group = $this.closest(".form-group");
        $.ajax({
            url : $form.data("validate"),
            type : 'GET',
            data : $form.serialize(),
            dataType : 'JSON'
        }).done(function (resp) {
            if(resp.code == 200){
                $group.removeClass("has-error");
                $("#add-error").hide();
                console.log(resp);
                layer.msg("验证成功：账号"+resp.item.mobile+"，昵称"+resp.item.profile.nickname, {icon: 1});
                if(resp.item.profile.job){
                    $("#add-job").val(resp.item.profile.job);
                }
            }else{
                $group.addClass("has-error");
                $("#add-error").show();
                $("#add-error span").text(resp.message||"验证失败");
            }
        }).fail(function () {
            layer.msg("验证失败", {icon: 2});
        }).always(function () {
            $this.attr('disabled',false);
        })
    });

    $("#add-btn").click(function () {
        var $this = $(this);
        if($this.attr('disabled')){
            return false;
        }
        var mobile = $("#cname").val();
        if(!mobile){
            layer.msg("请填写手机号", {icon: 2});
            return false;
        }

        var job = $("#add-job").val();
        if(!job){
            layer.msg("请填职务", {icon: 2});
            return false;
        }
        if(job.length > 100){
            layer.msg("职务小于100字", {icon: 2});
            return false;
        }
        $this.attr('disabled','disabled');
        var $form = $("#add-form");
        var $group = $("#mobile-group");
        $.ajax({
            url : $form.attr("action"),
            type : 'POST',
            data : $form.serialize(),
            dataType : 'JSON'
        }).done(function (resp) {
            if(resp.code == 200){
                $group.removeClass("has-error");
                $("#add-error").hide();
                layer.msg("添加成功", {icon: 1});
                window.location.reload();
            }else if($.inArray(resp.code, [2002,2004,2040]) != -1){
                $group.addClass("has-error");
                $("#add-error").show();
                $("#add-error span").text(resp.message||"验证失败");
            }else{
                layer.msg(resp.message, {icon: 2});
            }
        }).fail(function () {
            layer.msg("验证失败", {icon: 2});
        }).always(function () {
            $this.attr('disabled',false);
        });
    });

    $('.update-status').click(function () {
        var url = $(this).data('url');
        var status = $(this).data('status');
        layer.confirm('确认执行此操作？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            $.post(url, {status:status}, function (response) {
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

    $('.delete-user').click(function () {
        var url = $(this).data('url');
        layer.confirm('确认执行此操作？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            $.ajax({
                url : url,
                type : "DELETE",
                dataType : "JSON"
            }).done(function (response) {
                if(response.code == 200){
                    layer.msg('操作成功');
                    setTimeout(function () {
                        window.location.reload();
                    }, 600)
                }else{
                    layer.msg(response.message);
                }
            }).fail(function () {
                layer.msg("删除失败");
            });
        }, function(){

        });
    });

    $("#add-user-modal").click(function () {
        // console.log(111);
        $("#mobile-group").removeClass("has-error");
        $("#add-error").hide();
        $("#cname").val("");
        $("#add-job").val("");
    });

})()