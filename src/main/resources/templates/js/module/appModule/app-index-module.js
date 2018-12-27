/**
 * Created by Administrator on 2017/4/12.
 */
$(function(){

    $('input[type="checkbox"]').bootstrapSwitch();
    $('input[type="checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        var $parent = $(this).parents(".info-element");
        var id = $parent.attr("data-id");
        var url = $parent.data("put");
        if(state){
            var status = 1; //选中
        }else{
            var status = 0; //未选中
        }
        $.ajax({
            type:'PUT',
            url : url,
            data:{status:status},
            success:function(response){
                if(response){
                    window.location.reload();
                }else{
                    alert('失败喽，哈哈');
                }
            }
        });
    });

    //编辑
    $(document).on("click",".editModuleName",function(){
        $(this).prev().removeAttr("readonly");
        $(this).parents(".module-name").addClass("edit");
    });
    //取消
    $(document).on("click",".module-name .cancal",function(){
        $(this).parents(".module-name").removeClass("edit");
        $(this).parents(".module-name").find(".txt").attr("readonly");
        $(this).parents(".module-name").find(".txt").html("");
    });

    $('#module-list').sortable({
        update: function () {
            var url = $(this).data("url");
            var sort = $("#module-list").sortable('serialize');
            $.ajax({
                url: url,
                type: 'PUT',
                data: sort,
                success: function (response) {
                    if(response.code == 200)
                    {
                        window.location.reload();
                    }
                    else
                    {
                        alert('失败喽，哈哈');
                    }

                }
            });
        }
    });
    $(document).on("click",".editTitle",function(){
        var $parent = $(this).parents(".info-element");
        var id = $parent.attr("data-mid");
        var url = $parent.data("m-put");
        var title = $(this).parents(".module-name").children().children(".txt").val();
        $.ajax({
            type:'PUT',
            url : url,
            data:{title:title},
            success:function(response)
            {

                if(response.code == 200)
                {
                    window.location.reload();
                }
                else
                {
                    console.log(response);
                }
            }
        });

    });

});