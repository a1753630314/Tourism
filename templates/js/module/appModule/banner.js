/**
 * Created by Administrator on 2017/4/20.
 */
$(function () {
    $(document).on("click",".btn-set-link",function(){
        $(this).hide();
        $(this).next(".groupLink").show();
        return false;
    });
    $(document).on("click",".btnCancal",function(){
        $(this).parent().prev("a").show();
        $(this).parent().hide();
        $(this).prev().prev().val("");
        return false;
    });
    $(document).on("click",".btn-delete",function(){
        var item = $(this).parents(".item");
        layer.confirm('确定要删除？', {
            btn: ['确定','取消'], //按钮
            shade: false, //不显示遮罩
            title:"提示"
        }, function(){
            item.remove();
            layer.closeAll();
            //parent.layer.msg('的确很重要', {icon: 1});
        }, function(){
            //parent.layer.msg('奇葩么么哒', {shift: 6});
        });
    });
    $(document).on("click",".style",function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        return false;
    });
    $(document).on("click",".up",function(){
        var Current = $(this).parents(".item").html();
        var Last = $(this).parents(".item").prev().html();
        $(this).parents(".item").prev().html(Current);
        $(this).parents(".item").html(Last);

    });
    $(document).on("click",".down",function(){
        var Current = $(this).parents(".item").html();
        var Last = $(this).parents(".item").next().html();
        $(this).parents(".item").next().html(Current);
        $(this).parents(".item").html(Last);

    });


    $(document).on("click",".add",function(){
        $("#bannerImg").click();
        $("input[name=distin]").val('');
        $("input[name=position]").val("");
        return false;
    });
    $(document).on("click",".sure",function(){
        $(this).prev().addClass("focus");
        return false;
    });


    $(document).on("click",".btn-edit",function(){
        var position = $(this).parents(".item").children(".no").text();
        $("input[name=distin]").val('edit');
        $("input[name=position]").val(position);
        $("#bannerImg").click();

    });
    $(document).on('change','#bannerImg',function(){
        if($(this).val() == '') return false;
        var $action = $('#add-banner-img').attr('action');
        var options = {
            dataType: 'json',
            url: $action,
            success: function(data) {

                if(data.status)
                {
                    var len = $(".banner-list").children().length+1;
                    var html = "<div class='item'>" +
                        "<div class='no'>轮播图"+len+"</div>"+
                        "<div class='img'>"+
                        "<img src="+data.path+">"+
                        "</div>"+
                        "<div class='options'>"+
                        "<div class='clearfix' style='line-height: 44px;'>"+
                        "<a href='javascript:;' class='btn-set-link'>设置外链</a>"+
                        "<div class='groupLink'>"+
                        "<input class='form-control' name='links' value='' type='text'>"+
                        "<a href='javascript:;' class='btn-sm btn-primary m-l-md SureLink'>确定</a>"+
                        "<button class='btn btn-primary btn-sm m-l-md btnCancal'>取消</button>"+
                        "</div>"+
                        "</div>"+
                        "<div class='pull-left'>"+
                        "<a href='javascript:;' class='m-t btn-edit'>编辑</a>"+
                        "<br>"+
                        "<a href='javascript:;' class='m-t btn-delete'>删除</a>"+
                        "</div>"+
                        "<div class='pull-left'>"+
                        "<a href='javascript:;' class='m-t up'><span class='fa fa-arrow-up'></span>上移</a>"+
                        "<br>"+
                        "<a href='javascript:;' class='m-t down'><span class='fa fa-arrow-down'></span>下移</a>"+
                        "</div>"+
                        "</div>"+
                        "<input type='hidden' name='banner' value="+data.path+">"+
                        "</div>";

                    if($("input[name=distin]").val() == 'edit'){
                        $(".banner-list").children().each(function(){
                            if($(this).find(".no").text() == $("input[name=position]").val()){
                                $(this).find("img").attr("src",data.path);
                                $(this).find("input[name=banner]").val(data.path);
                            }
                        });
                    }else{
                        $(".banner-list").append(html);
                    }
                }
                else
                {
                    layer.msg('图片大小需小于2MB');
                }



            },
            error: function(xhr) {
                // Notify.danger('上传失败');
                alert('上传失败');
            }
        };
        $("#add-banner-img").ajaxSubmit(options);
    });
//        $(document).on("click",".SureLink",function(){
//            console.log('132132');return false;
//        });
    $(document).on("click",".SureLink",function(){
        $(this).parent().prev("a").show();
        $(this).parent().hide();
        return false;
    });

    $("#back").click(function(){
        var role = $("input[name=role]").val();

        window.location.href = getBackUrl(role);

    });
    $("#save").click(function(){
        var imgInputValues = new Array();

        var linkInputValues = new Array();

        var style = $(".active").attr("data-style");

        var id = $("input[name=id]").val();

        var role = $("input[name=role]").val();

        $("input[name=banner]").each(function(){
            imgInputValues.push($(this).val());
        });
        $("input[name=links]").each(function(){
            linkInputValues.push($(this).val());
        });
       // console.log(imgInputValues);return false;
        $.ajax({

            type:'PUT',

            data:{CurTheme:style,img:imgInputValues,links:linkInputValues,type:'BANNER'},

            url:getUrl(role,id),

            success:function(response){

                if(response.code == 200){
                    layer.msg('保存成功');
                    setTimeout("window.location.reload()",200);
                }else{
                    alert('失败了');
                }
            }
        });
        return false;
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


    function getBackUrl(role)
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
