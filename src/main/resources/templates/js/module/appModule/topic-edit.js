/**
 * Created by Administrator on 2017/4/18.
 */
$(function () {
    $(document).on("click",".upload",function(){
        $("#coverImg").click();
        return false;
    });
    $("#coverImg").change(function(){
        if($(this).val() == '') return false;
        var $action = $('#add-cover-img').attr('action');
        var options = {
            dataType: 'json',
            url: $action,
            success: function(response)
            {
                if (response.status) {
                    $(".use").attr('src', response.path);
                    $("input[name=img_src]").val(response.path);
                }
                else
                {
                    layer.msg('图片大小需小于2MB');
                }
            },
            error: function(xhr)
            {
                layer.msg('上传失败');
            }
        };
        $("#add-cover-img").ajaxSubmit(options);
    });

    //切换小图标
    $(".icon").click(function(){
        var src = $(this).children().attr('src');
        $(".use").attr('src',src);
        $("input[name=img_src]").val(src);
    });
    //保存
    $("#save").click(function(){

        var id = $("input[name=id]").val();

        var note_id = $("input[name=note_id]").val();

        var role = $("input[name=role]").val();

        var path = $("input[name=img_src]").val();

        var url = getPostUrl(role);

        var title = $("#cname").val();

        $.ajax({
            type:'POST',
            url : url,
            data:{id:id,note_id:note_id,path:path,title:title,type:'TOPIC'},
            success:function(response)
            {
                if(response.code == 200)
                {
                    location.href = getUrl(role,id);
                }
                else
                {
                    layer.msg(response);
                }

            }
        });

    });
    $("#back").click(function(){
        var id = $("input[name=id]").val();

        var role = $("input[name=role]").val();

        window.location.href= getUrl(role,id);
    });

    function getUrl(role,id)
    {
        switch(role)
        {
            case ("visitor"):
                var url = $.sg.spellUrl('/app_home_visitor/'+id, querySiteCode);
                break;
            case ("student"):
                var url = $.sg.spellUrl('/app_home_student/'+id, querySiteCode);
                break;
            case ("teacher"):
                var url = $.sg.spellUrl('/app_home_teacher/'+id, querySiteCode);
                break;
        }
        return url;
    }

    function getPostUrl(role)
    {
        switch(role)
        {
            case ("visitor"):
                var url = $.sg.spellUrl('/app_home_visitor', querySiteCode);
                break;
            case ("student"):
                var url = $.sg.spellUrl('/app_home_student', querySiteCode);
                break;
            case ("teacher"):
                var url = $.sg.spellUrl('/app_home_teacher', querySiteCode);
                break;
        }
        return url;
    }

});
