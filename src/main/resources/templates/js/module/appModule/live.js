/**
 * Created by Administrator on 2017/4/18.
 */
$(function () {
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

    $(document).on("click",".up,.down",function(){
        var type = $(this).data('type'); //类型
        var parent_cur = $(this).parents("tr");
        var parent_next = parent_cur.next();
        var parent_prev = parent_cur.prev();
        var cur_sort = parent_cur.children().eq(4).find(".up").data("sort");
        var next_sort = parent_next.children().eq(4).find(".up").data("sort"); //下一个sort
        var prev_sort = parent_prev.children().eq(4).find(".up").data("sort"); //上一个的sort
        if(type == 'up'){
            parent_cur.children().eq(4).find(".up,.down").data("sort",prev_sort);
            parent_prev.children().eq(4).find(".up,.down").data("sort",cur_sort);
            parent_prev.before(parent_cur);
        }else{
            parent_cur.children().eq(4).find(".up,.down").data("sort",next_sort);
            parent_next.children().eq(4).find(".up,.down").data("sort",cur_sort);
            parent_next.after(parent_cur);
        }
        var url = $(this).data('url'); // 链接
        $.ajax({
            type:'PUT',
            url:url,
            data:{type:type,sorder:cur_sort},
            success:function(response){
                console.log(response.code);
            }
        });
    });

    $(document).on("click",".style",function(){
        $(".list li div").removeClass("active");
        $(this).addClass("active");
        return false;
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
        var currentTeacher = current.eq(2).text();
        var role = $("input[name=role]").val();
        var id = $("input[name=id]").val();
        var liveId = $(this).parents("tr").children("input:last-child").val();
        var html= "<tr>"+
            "<td>"+
            "<img class='live-img-sm' src='"+currentImgSrc+"'>"+
            "</td>"+
            "<td>"+
            currentTitle
            +"</td>"+
            "<td>"+
            currentTeacher
            +"</td>"+
            "<td>"
            +"<span class='up'><a href='javascript:;'><i class='fa fa-arrow-up text-navy'></i> 上移</a></span>"+
            "<span class='down'><a href='javascript:;' class='m-l'><i class='fa fa-arrow-down text-navy'></i> 下移</a></span>"+
            "</td>"+
            "<td>"
            +"<img class='live-cover-img' src=''>"+
            "</td>"+
            "<td>"+
            "<span class='cancel-recommend'><a href='javascript:;' class='m-l'><i class='fa fa-trash text-navy'></i> 取消推荐</a></span>"+
            "&nbsp;&nbsp;&nbsp;"+
            "<a href='javascript:;' class='confirm'><i class='fa fa-file-image-o text-navy'></i> 设置封面图</a>"+
            "</td>"+
            "<input type='hidden' value='"+liveId+"' name='liveId' class='cour'>"+

            "<input type='hidden' value='"+liveId+"' name='live_id' class='recom'>"+
            "</tr>";
        $(".recommendLive").append(html);
        $(this).text('已推荐');
        $(this).addClass("btn-default");
        $(this).attr("disabled","disabled");
        $('#save').click();
    });

    //取消推荐至首页
    $(document).on("click",".cancel-recommend",function(){
        var liveId = $(this).parents("tr").children("input:last-child").val();
        $(".live_"+liveId).prev().children().removeClass("btn-default");
        $(".live_"+liveId).prev().children().addClass("btn-primary");
        $(".live_"+liveId).prev().children().addClass("recommend");
        $(".live_"+liveId).prev().children().removeAttr("disabled","disabled").text("推荐到首页");
        $(this).parents("tr").remove();
        $('#save').click();
    });

    $("#save").click(function(){
        console.log(1);
        var max=$("#cname2").val();

        if(max <2){

            layer.msg('数量不能小于2',{'icon':2});

            return false;

        }

        var role = $("input[name=role]").val();

        var id = $("input[name=id]").val();

        var title = $("#cname").val();

        var liveIds = '';

        var recom_id = '';

        var CurTheme = $(".active").parent().attr('data-sytle'); //获取选中的主题

        $(".cour").each(function(){

            liveIds+= ','+$(this).val();

        });

        recom_id = liveIdSaveId();
        // console.log(getUrl(role,id));
        // console.log({CurTheme:CurTheme,liveIds:liveIds,title:title,max:max,type:'LIVE',recom_id:recom_id});
        // return false;
        $.ajax({

            type:'PUT',

            data:{CurTheme:CurTheme,liveIds:liveIds,title:title,max:max,type:'LIVE',recom_id:recom_id},

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
    function liveIdSaveId(){
        var arr = new Array();
        $("#live-list").children().each(function(i){
            arr[i] = $(this).find('input[name="liveId"]').val();
        });
        return arr;
    }
    $("#back").click(function(){
        var role = $("input[name=role]").val();

        window.location.href = getBackUrl(role);

    });

    $(document).on("click",".confirm",function(){

        layer.msg("请先保存");

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
