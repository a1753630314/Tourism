(function () {
    $(function(){

        $('#action .recommend').click(function(){
            var id =$(this).data('id');
            $.ajax({
                type: 'put',
                url:$(this).data('control-url'),
                data:{action:'recommend',recommend:$(this).data('recommend')},
                success:function (json) {
                    console.log(json);
                    if(json.code == 200)
                    {
                        window.location.reload();
                    } else {
                        parent.layer.msg(json.message, {icon: 2});
                    }
                }
            })
        })


        $(".edit-sort").click(function(event) {
            $this = $(this);
            var id = $this.data('id');
            var sort = $this.data('sort');
            var total = $('#count').data('count');
            $("#sort").val(sort);
            $("#total").val(total);
            $("#id").val(id);
        });

        $("#submit").click(function(event) {
            $this = $(this);

            var sort = $("#sort").val();
            if(!sort || sort<=0 || parseInt(sort, 10) != sort){
                layer.msg("序号错误", {icon: 2});
                return false;
            }
            var total = $("#total").val();

            // if(parseInt(sort)>parseInt(total)){
            //     layer.msg("序号不能大于"+total, {icon: 2});
            //     return false;
            // }

            if($this.hasClass('disabled')){
                return false;
            }
            $this.addClass('disabled');

            $.ajax({
                url: $("#Rank").data("url").replace('-id-', $("#id").val()),
                type: 'put',
                data : {
                    recommend_sort : sort,
                    recommend : "1",
                },
                success: function( response ) {
                    $this.removeClass('disabled');

                    if(response.code!=200){
                        layer.msg(response.message, {icon: 2});
                        $this.removeClass('disabled')
                        return false;
                    }
                    window.location.reload();
                },
                error: function() {
                    layer.msg(response, {icon: 2});
                    $this.removeClass('disabled')
                }
            })
        });
    })
}());