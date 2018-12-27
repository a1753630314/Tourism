/**
 * Created by Administrator on 2017/4/18.
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

    //$("#btnQuerytree").on("click",function(){
    //    $(".list-group-item").removeClass("queryVal");
    //    var key =  $("#treeNodeKey").val();
    //    if(!key) return;
    //    var finds = $(".list-group-item:contains('"+key+"')");
    //    finds.addClass("queryVal");
    //    console.log(finds.length);
    //});
    $("#treeNodeKey").blur(function(){
        if(!$("#treeNodeKey").val())
            $(".list-group-item").removeClass("queryVal");
    });

    $(".style").click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        return false;
    });
    //推荐和取消推荐
    $(document).on("click",".recommend",function(){

        var nodeId = $(this).parent().attr("node-id");

        //var id = $("input[name=id]").val();

        var role = $("input[name=role]").val();

       // var types = $(this).parent().attr('data-type');

        var currentTitle= $(this).prev(".title").text();

        var html = "<tr>"+
                    "<td>"+
                        "<img class='topic-icon' src='http://html.gxy.com/manage/images/app/TOPIC/41.png'>"+
                    "</td>"+
                    "<td>"+
                        currentTitle+
                    "</td>"+
                    "<td>"+
                        "<a href='javascript:;' class='up'><i class='fa fa-arrow-up text-navy'></i> 上移</a>"+
                        "<a href='javascript:;' class='m-l down'><i class='fa fa-arrow-down text-navy'></i> 下移</a>"+
                    "</td>"+
                    "<td>"+
                        "<a href='javascript:;' class='confirm'><i class='fa fa-edit text-navy edit'></i> 编辑</a>"+
                        "<a href='javascript:;' class='m-l cancel-recommend'><i class='fa fa-trash text-navy'></i> 取消推荐</a>"+
                    "</td>"+
                    "<input type='hidden' name='noteId' value='"+nodeId+"' class='note_re_id'>"
            +"</tr>";

        $(".topic_list").append(html);

        $(this).text('已推荐');
        $(this).addClass("btn-default");
        $(this).attr("disabled","disabled");
        $(this).removeClass("recommend");
        
        $('#save').click();
    });
    //取消推荐至首页
    $(document).on("click",".cancel-recommend",function(){
        var noteId = $(this).parents("tr").children("input:last-child").val();
        $(".note_"+noteId).prev().removeClass("btn-default");
        $(".note_"+noteId).prev().addClass("btn-primary");
        $(".note_"+noteId).prev().addClass("recommend");
        $(".note_"+noteId).prev().removeAttr("disabled","disabled").text("推荐到首页");
        $(this).parents("tr").remove();
        
        $('#save').click();
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

    $(document).on("click",".confirm",function(){

        layer.msg("请先保存");

    });


    $("#save").click(function(){

        var role = $("input[name=role]").val();

        var id = $("input[name=id]").val();

        var CurTheme = $(".active").children().attr('data-sytle'); //获取选中的主题

        var title = $("#cname").val();

        var note_ids = '';

        $(".note_re_id").each(function(){

            note_ids+= ','+$(this).val();

        });

        $.ajax({
            type:'PUT',

            data:{CurTheme:CurTheme,note_ids:note_ids,title:title,type:'TOPIC'},

            url:getUrl(role,id),

            success:function(response)
            {
                if(response.code == 200)
                {
                    layer.msg('保存成功');

                    setTimeout("window.location.reload()",200);
                }
                else
                {
                    layer.msg(response);
                }

            }
        });
    });


    //限制回车键
    $(this).keydown( function(e) {
        var key = window.event?e.keyCode:e.which;
        if(key.toString() == "13"){
            return false;
        }
    });
    //$(document).on("click",".search",function(){
    //    var url = '/appCourse';
    //    var keywords = $(".keywords").val();
    //    var id = $("input[name=id]").val();
    //    var role = $("input[name=role]").val();
    //    if(!keywords){
    //        keywords = '';
    //    }
    //    $.ajax({
    //        type:'GET',
    //        url : url,
    //        data: {keywords:keywords,id:id,role:role,type:'TOPIC'},
    //        success:function(response){
    //            $(".list-group").html(response);
    //        }
    //
    //    });
    //});
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
    //折叠
    function node_collapse($node) {
        var id = $node.attr("node-id");//note-id
        var childs = $("#treeview").find("[pid='" + id + "']");
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
