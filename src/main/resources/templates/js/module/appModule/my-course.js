/**
 * Created by Administrator on 2017/4/25.
 */
$(function(){

    //重新 设置内容宽度 取整
    var _width = $(".live-template .list").width();
    var _showCount = parseInt(_width/290);
    var _newWidth = _showCount * 290;
    $(".live-template .list").width(_newWidth);
    var _index = 0;
    $(".button-right").click(function () {
        var len = $(".live-template ul li").length;
        if(len<=_showCount) return;
        if(_showCount+_index>=len) return;
        _index++;
        $(".live-template ul").stop().animate({left: -_index * 290}, 500);
    });
    $(".button-left").click(function () {
        if(_index==0) return;
        _index--;
        $(".live-template ul").stop().animate({left: -_index * 290}, 500);
    });

    $(document).on("click",".style",function(){
        $(".list li div").removeClass("active");
        $(this).addClass("active");
        return false;
    });
    if(!$(".list li div").hasClass("active")){
        $(".list li div").eq(0).addClass("active");
    }

    $("#save").click(function(){

        var max=$("#cname2").val();

        if(max <2){

            layer.msg('数量不能小于2',{'icon':2});

            return false;

        }

        var role = $("input[name=role]").val();

        var id = $("input[name=id]").val();

        var title = $("#cname").val();

        var CurTheme = $(".active").parent().attr('data-sytle'); //获取选中的主题


        $.ajax({

            type:'PUT',

            data:{CurTheme:CurTheme,title:title,max:max,type:'MY_COURSE'},

            url:getUrl(role,id),

            success:function(response)
            {
                if(response.item)
                {
                    layer.msg('保存成功');

                    window.location.reload();
                }
                else
                {
                    layer.msg('保存失败',{'icon':2});
                }
            }

        });
    });


    $("#back").click(function(){
        var role = $("input[name=role]").val();

        window.location.href = getBackUrl(role);

    });

    function getUrl(role,id)
    {
        switch(role)
        {
            case ("visitor"):
                var url = '/app_home_visitor/'+id;
                break;
            case ("student"):
                var url = '/app_home_student/'+id;
                break;
            case ("teacher"):
                var url = '/app_home_teacher/'+id;
                break;
        }
        return url;
    }

    function getBackUrl(role)
    {
        switch(role)
        {
            case ("visitor"):
                var url = '/app_home_visitor';
                break;
            case ("student"):
                var url = '/app_home_student';
                break;
            case ("teacher"):
                var url = '/app_home_teacher';
                break;
        }
        return url;
    }
});