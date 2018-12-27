(function(){
    var ajaxOb;
    var time = {
        elem: "#uptime",
        format: 'YYYY-MM-DD hh:mm', //日期格式
        max: "2099-06-16 23:59",
        istime: true,
        istoday: false,
    };
    if($("#uptime").length>0){
        laydate(time);
    }

    // $("input[name='type']").change(function(){
    //     if(ajaxOb){
    //         ajaxOb.abort();
    //         var $appFile = $("#app-file");
    //         $appFile.replaceWith('<input type="file" class="form-control hide" id="app-file">');
    //         $("#app-btn span").text("");
    //     }
    // });

    $("input[name='type']").click(function(){
        var type = $("input[name='type']:checked").val();
        var $codeDiv = $("#code-div");
        var $app = $("#app");
        if(type==4){
            $codeDiv.removeClass("hide");
            $app.removeClass("hide");
        }else{
            $codeDiv.addClass("hide");
            $app.addClass("hide");
        }
    });

    $("#submit-form").click(function(){
        var $this = $(this);

        // 加锁
        if($this.attr("disabled")){
            return false;
        }
        $this.attr("disabled",true);

        var type = $("input[name='type']:checked").val();
        var version = $("#version").val();
        // 监测版本号
        var reg=/^[0-9]+\.[0-9]+\.[0-9]+$/;
        if(!reg.test(version)){
            // ios
            layer.msg("版本号应为xx.xx.xx格式", {icon: 2});
            $this.attr("disabled",false)
            return false;
        }

        if(type=='4' && !/^[1-9]+[0-9]*$/.test($("#version_code").val()) ){
            // android
            layer.msg("Android请填写正整数格式版本", {icon: 2});
            $this.attr("disabled",false)
            return false;
        }

        if(type=='4' && !$('#url').val()){
            layer.msg("Android下载地址不能为空或上传app", {icon: 2});
            $this.attr("disabled",false)
            return false;
        }

        var time = $("#uptime").val();
        if(!time){
            layer.msg("发布时间不能为空", {icon: 2});
            $this.attr("disabled",false)
            return false;
        }

        var functionVal = $("#function").val();
        if(!functionVal){
            layer.msg("更新内容不能为空", {icon: 2});
            $this.attr("disabled",false)
            return false;
        }
        var $form = $("#app-form");
        var url = $form.attr("action");
        var redirect = $form.data("redirect");
        redirect = redirect + (type=='4' ? '?type=android' : '');

        $.ajax({
            url : url,
            data : $form.serialize(),
            dataType : "json",
            type : $form.attr("method")
        })
        .done(function(result){
            if(result.code == 200){
                layer.msg("操作成功", {icon: 1});
                window.location.href = redirect;
            }else{
                layer.msg(result.message, {icon: 2});
            }
        })
        .fail(function(){
            layer.msg("操作失败", {icon: 2});
        })
        .complete(function(){
            $this.attr("disabled",false)
        })
    });

    $("#app-btn").click(function(){
        $("#app-file").trigger("click");
        return false;
    });

    // $("body").delegate('#app-file', 'change', function(){
    $("#app-file").change(function(){
        if(window.FileReader)
        {
            var reader = new FileReader();
            $this = $(this)[0];
            reader.readAsDataURL($this.files[0]);
            if($this.files[0].size > 80*1024*1024)
            {
                layer.msg("上传app不能大于80M", {icon: 2})
                return false;
            }
            var name = $this.files[0].name;
            var index = name.lastIndexOf(".");
            var ext = name.substr(index+1).toLowerCase();

            if(ext != 'apk'){
                layer.msg("请上传 .apk 文件", {icon: 2})
                return false;
            }

            var now = Date.parse(new Date());
            var $box = $('#app-btn span')
            $box.data('now',now);
            var progress = function(evt) {
                if (evt.lengthComputable) {
                    if($box.data('now') == now){
                        $box.text(Math.round(evt.loaded / evt.total * 100)+'%');
                    }
                }
            }
            var formData = new FormData();
            formData.append("app", $("#app-file")[0].files[0]);
            if(ajaxOb){
                ajaxOb.abort();
            }
            ajaxOb = $.ajax({
                url: $(this).closest("form").attr("action"),
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                timeout: 600000,
                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();
                    xhr.upload.addEventListener('progress', progress, false);
                    return xhr; //一定要返回，不然jQ没有XHR对象用了
                },
                success: function (response) {
                    var type = $("input[name='type']:checked").val();
                    if(type=='4'){
                        if (response.code == 1) {
                            $('#url').val(response.url);
                        } else {
                            $.sg.showError(response.message);
                        }
                    }
                },
                error: function (responseStr,error) {
                    $.sg.showError("上传失败！请检测是否是网络问题或文件过大！");
                }
            })
        }else {
            layer.msg('文件上传：仅支持IE9+以上浏览器', {icon: 2})
        }
    });
}())
