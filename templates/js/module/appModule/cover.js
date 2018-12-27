/**
 * Created by Administrator on 2017/4/17.
 */
$(function () {
    $(document).on("click", ".upload", function () {
        $("#coverImg").click();
        return false;
    });
    $("#coverImg").change(function () {
        if ($(this).val() == '') return false;
        var $action = $('#add-cover-img').attr('action');
        var options = {
            dataType: 'json',
            url: $action,
            success: function (response) {
                if (response.status)
                {
                    $(".live-cover-pre-img").attr('src', response.path);
                    $("input[name=imgSrc]").val(response.path);
                }
                else
                {
                    layer.msg('图片大小需小于2MB');
                }
            },
            error: function (xhr)
            {
                layer.msg('上传失败');
            }
        };
        $("#add-cover-img").ajaxSubmit(options);
    });

    $("#save").click(function () {

        var id = $("input[name=id]").val();

        var course_id = $("input[name=course_id]").val();

        var role = $("input[name=role]").val();

        var path = $("input[name=imgSrc]").val();
        var url = getPostUrl(role);
        var module_id = $(this).data('module');
        var status = $("input:radio:checked").val();

        var type = $(this).data('course') ? "COURSE" : 'LIVE';
        $.ajax({
            type:'POST',
            data:{id:id,course_id:course_id,path:path,recomm_status:status,type:type},

            url:url,

            success:function(response)
            {
                location.href = getUrl(role,module_id);
                // console.log(response);

            }
        });
    });
        $("#back").click(function () {

            var id = $("input[name=id]").val();

            var role = $("input[name=role]").val();

            window.location.href= getUrl(role,id);
        });

    function getPostUrl(role)
    {
        var $url = $("#get-url");
        switch(role)
        {
            case ("visitor"):
                var url = $url.data('post-visitor');
                break;
            case ("student"):
                var url = $url.data('post-student');
                break;
            case ("teacher"):
                var url = $url.data('post-teacher');
                break;
        }
        return url;
    }

    function getUrl(role,id)
    {
        var $url = $("#get-url");
        switch(role)
        {
            case ("visitor"):
                var url = $url.data("url-visitor").replace(/-id-/, id);
                break;
            case ("student"):
                var url = $url.data("url-student").replace(/-id-/, id);;
                break;
            case ("teacher"):
                var url = $url.data("url-teacher").replace(/-id-/, id);
                break;
        }
        return url;
    }
});
