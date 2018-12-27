/**
 * Created by Administrator on 2017/4/17.
 */
$(function () {
    $(document).on("click", "#treeview .glyphicon-minus", function () {
        var $node = $(this).parents(".list-group-item");
        $node.find(".glyphicon").addClass("glyphicon-plus").removeClass("glyphicon-minus");
        node_collapse($node);
    });
    $(document).on("click", "#treeview .glyphicon-plus", function () {
        var $node = $(this).parents(".list-group-item");
        $node.find(".glyphicon").addClass("glyphicon-minus").removeClass("glyphicon-plus");
        node_expand($node);
    });

    $("#btnQuerytree").on("click",function(){
        $(".list-group-item").removeClass("queryVal");
        var key =  $("#treeNodeKey").val();
        if(!key) return;
        var finds = $(".list-group-item:contains('"+key+"')");
        finds.addClass("queryVal");
        console.log(finds.length);
    });
    $("#treeNodeKey").blur(function(){
        if(!$("#treeNodeKey").val())
            $(".list-group-item").removeClass("queryVal");
    });

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
    $(this).keydown( function(e) {
        var key = window.event?e.keyCode:e.which;
        if(key.toString() == "13"){
            return false;
        }
    });
    //推荐至首页
    $(document).on("click",".recommend",function(){
        var current= $(this).parents("tr").children();
        var currentImgSrc = current.eq(0).children().attr('src');
        var currentTitle = current.eq(1).text();
        //var currentTeacher = current.eq(2).text();
        var role = $("input[name=role]").val();
        var id = $("input[name=id]").val();
        var userId = $(this).parents("tr").children("input:last-child").val();
        var html= "<tr>"+
            "<td>"+
            "<img class='topic-icon' src='"+currentImgSrc+"'"+
            "</td>"+
            "<td>"+
            currentTitle+
            "</td>"+
            "<td>"+
            "<span class='up'><a href='javaScript:;'><i class='fa fa-arrow-up text-navy'></i> 上移</a></span>"+
            "<span class='down'><a href='javaScript:;' class='m-l'><i class='fa fa-arrow-down text-navy'></i> 下移</a></span>"+
            "</td>"+
            "<td>"+
            "<span class='cancel-recommend'><a href='javascript:;' class='m-l'><i class='fa fa-trash text-navy'></i> 取消推荐</a></span>"+
            "</td>"+
            "<input type='hidden' name='teacherId' class='cour' value='"+userId+"'>"+
            "</tr>";
        $(".recommendTeacher").append(html);
        $(this).text('已推荐');
        $(this).addClass("btn-default");
        $(this).attr("disabled","disabled");
        $('#save').click();
    });

    $(document).on("click",".style",function(){
        $(".list div").removeClass("active");
        $(this).addClass("active");
        return false;
    });
    //取消推荐至首页
    $(document).on("click",".cancel-recommend",function(){
        var teacherId = $(this).parents("tr").children("input:last-child").val();
        $(".teacher_"+teacherId).prev().children().removeClass("btn-default");
        $(".teacher_"+teacherId).prev().children().addClass("btn-primary");
        $(".teacher_"+teacherId).prev().children().addClass("recommend");
        $(".teacher_"+teacherId).prev().children().removeAttr("disabled","disabled").text("推荐到首页");
        $(this).parents("tr").remove();
        $('#save').click();
    });

    $("#save").click(function(){
        var role = $("input[name=role]").val();

        var id = $("input[name=id]").val();

        var teacherIds = '';

        var CurTheme = $(".active").children().attr('data-sytle'); //获取选中的主题

        $(".cour").each(function(){

            teacherIds+= ','+$(this).val();

        });

        var title = $("#cname").val();

        $.ajax({

            type:'PUT',

            data:{CurTheme:CurTheme,teacherIds:teacherIds,title:title,type:'TEACHER'},

            url:getUrl(role,id),

            success:function(response)
            {
                if(response.item)
                {
                    layer.msg('保存成功');

                    setTimeout("window.location.reload()",200);
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
    //折叠
    function node_collapse($node) {
        var id = $node.attr("node-id");
        var childs = $("#treeview").find("[pid='" + id + "']");
        console.log(childs.length);
        if (childs.length == 0)
            return;

        $.each(childs,function(){
            var cruId = $(this).attr("node-id");
            var findChilds = $("#treeview").find("[pid='" + cruId + "']");
            if(findChilds.length>0){
                node_collapse($(this));
                $(this).find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
            }
            $(this).hide();
        });
    }
    //展开
    function node_expand($node) {
        var id = $node.attr("node-id");
        var childs = $("#treeview").find("[pid='" + id + "']");
        childs.show();
    }

});
