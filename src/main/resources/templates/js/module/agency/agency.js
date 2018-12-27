(function () {
    $(".i-checks").iCheck({checkboxClass: "icheckbox_square-green", radioClass: "iradio_square-green"});

    $("#btn-save").click(function () {
        var $this = $(this);
        if($this.attr("disabled")){
            return false;
        }
        if(!$("#user-id").val()){
            layer.msg("请选择用户", {icon: 2});
            return false;
        }

        var $name = $("#name");
        if(!$name.val() || $name.val().length > 100){
            layer.msg("姓名错误，100字内", {icon: 2});
            return false;
        }

        var sort = $("#sort").val();
        if(!sort || sort<=0 || parseInt(sort, 10) != sort || sort>=10000){
            layer.msg("显示顺序错误,填写大于0小于10000的正整数", {icon: 2});
            return false;
        }
        $this.attr("disabled", "disabled");

        var $form = $("#data-form");
        $.ajax({
            url : $form.attr("action"),
            type : $form.attr("method"),
            dataType : "JSON",
            data : $form.serialize()
        }).done(function (res) {
            if(res.code == 200){
                layer.msg("操作成功", {icon: 1});
                window.location.reload();
            }else{
                layer.msg(res.message, {icon: 2});
            }
        }).fail(function () {
            layer.msg("操作失败", {icon: 2});
        }).always(function () {
            $this.attr("disabled", false);
        });
    });


})()