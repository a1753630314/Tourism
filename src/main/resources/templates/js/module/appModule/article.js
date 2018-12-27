/**
 * Created by Administrator on 2017/4/20.
 */
$(function () {
//上移
    $(document).on("click",".up",function(){
        var Current = $(this).parents("tr").html();
        var Last = $(this).parents("tr").prev().html();
        $(this).parents("tr").prev().html(Current);
        $(this).parents("tr").html(Last);
    });
    //下移
    $(document).on("click",".down",function(){
        var Current = $(this).parents("tr").html();
        var Last = $(this).parents("tr").next().html();
        $(this).parents("tr").next().html(Current);
        $(this).parents("tr").html(Last);
    });
    //推荐至首页
    $(document).on("click",".recommend",function(){
        var current= $(this).parents("tr").children();
        var currentTitle = current.eq(0).text();
        var currentNickname = current.eq(1).text();
        var role = $("input[name=role]").val();
        var id = $("input[name=id]").val();
        var article_id = $(this).parents("tr").children("input:last-child").val();
        var html= "<tr>"+
                "<td>"+
                    currentTitle+
                "</td>"+
                "<td>"+
                    currentNickname+
                "</td>"+
                "<td>"+
                    "<span class='up'><a href='javascript:;'><i class='fa fa-arrow-up text-navy'></i> 上移</a></span>"+
                    "<span class='down'><a href='javascript:;' class='m-l'><i class='fa fa-arrow-down text-navy'></i> 下移</a></span>"+
                "</td>"+
                "<td>"+
                    "<span class='cancel-recommend'><a href='javascript:;' class='m-l'><i class='fa fa-trash text-navy'></i> 取消推荐</a></span>"+
                "</td>"+
                "<input type='hidden' value='"+article_id+"' name='article_id' class='cour'>"+
            "</tr>";
        $(".recommendArticle").append(html);
        $(this).text('已推荐');
        $(this).addClass("btn-default");
        $(this).removeClass("recommend");
        $(this).attr("disabled","disabled");
        $('#save').click();
    });

    //取消推荐至首页
    $(document).on("click",".cancel-recommend",function(){
        var article_id = $(this).parents("tr").children("input:last-child").val();
        $(".article_"+article_id).prev().children().removeClass("btn-default");
        $(".article_"+article_id).prev().children().addClass("btn-primary");
        $(".article_"+article_id).prev().children().addClass("recommend");
        $(".article_"+article_id).prev().children().removeAttr("disabled","disabled").text("推荐到首页");
        $(this).parents("tr").remove();
        $('#save').click();
    });

    $("#save").click(function(){

        var role = $("input[name=role]").val();

        var id = $("input[name=id]").val();

        var title = $("#cname").val();

        var article_id = '';

        $(".cour").each(function(){

            article_id+= ','+$(this).val();

        });

        $.ajax({

            type:'PUT',

            data:{courseIds:article_id,title:title,type:'INFORMATION'},

            url:getUrl(role,id),

            success:function(response)
            {
                if(response.code == 200)
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
    // function getBackUrl(role)
    // {
    //     switch(role)
    //     {
    //         case ("visitor"):
    //             var url = '/app_home_visitor';
    //             break;
    //         case ("student"):
    //             var url = '/app_home_student';
    //             break;
    //         case ("teacher"):
    //             var url = '/app_home_teacher';
    //             break;
    //     }
    //     return url;
    // }
    // function getUrl(role,id)
    // {
    //     switch(role)
    //     {
    //         case ("visitor"):
    //             var url = '/app_home_visitor/'+id;
    //             break;
    //         case ("student"):
    //             var url = '/app_home_student/'+id;
    //             break;
    //         case ("teacher"):
    //             var url = '/app_home_teacher/'+id;
    //             break;
    //     }
    //     return url;
    // }

    function getBackUrl(role)
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
