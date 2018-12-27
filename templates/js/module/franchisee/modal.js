$("#img").click(function(){
    $("#pic_file").trigger("click");
});
$('#pic_file').change(function(){
    if(window.FileReader)
    {
        var reader = new FileReader();
        $this = $(this)[0];
        reader.readAsDataURL($this.files[0]);
        if(!/image\/\w+/.test($this.files[0].type)){
            layer.msg("上传文件必须为图片", {icon: 2})
            return false;
        }
        if($this.files[0].size > 4194304)
        {
            layer.msg("上传图片不能大于4M", {icon: 2})
            return false;
        }
        reader.addEventListener('load',function(e)
        {
            $('#img').attr('src', this.result);
        });
    }else {
        layer.msg('文件上传：仅支持IE9+以上浏览器', {icon: 2})
    }
});

$("#submit-form").click(function () {
    var $form = $("#add-franchisee-form");
    var redirect = $form.data('redirect');
    var $btn = $(this);
    if($btn.attr("disabled")){
        return false;
    }
    $btn.attr("disabled",true);
    $form.ajaxSubmit({
        type : $form.attr("method"),
        success: function (response) {
            if (response.code == 200) {
                layer.closeAll('page');
                layer.msg('操作成功', {icon: 1})
                setTimeout(function () {
                    window.location.href = redirect;
                }, 600)
            } else {
                layer.msg(response.message, {icon: 2})
            }
            $btn.attr('disabled',false);
        },
        error: function () {
            layer.msg("操作失败!", {icon: 2})
            $btn.attr('disabled',false);
        }
    });
    return false;
});

$("#submit-sort-form").click(function () {
    var $form = $("#sort-franchisee-form");
    var redirect = $form.data('redirect');
    var $btn = $(this);
    if($btn.attr("disabled")){
        return false;
    }
    $.ajax({
        url : $form.attr('action'),
        type : "put",
        data : $form.serialize(),
        dataType : 'json',
        success : function(response){
            if (response.code == 200) {
                layer.closeAll('page');
                layer.msg('操作成功', {icon: 1})
                setTimeout(function () {
                    window.location.href = redirect;
                }, 600)
            } else {
                layer.msg(response.message, {icon: 2})
            }
            $btn.attr('disabled',false);
        },
        error : function(){
            layer.msg("操作失败!", {icon: 2})
            $btn.attr('disabled',false);
        }
    });
    return false;
});