(function () {
    var create_start = {
        elem: '#create_start',
        istime: false, format: 'YYYY-MM-DD',
        choose: function (datas) {
            create_end.min = datas; //开始日选好后，重置结束日的最小日期
            create_end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var create_end = {
        elem: '#create_end',
        istime: false, format: 'YYYY-MM-DD',
        choose: function (datas) {
            create_start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    laydate(create_start);
    laydate(create_end);

    $(document).on("click","#search",function(){
        queryCondition(1);
    });

    function queryCondition(page)
    {
        var url = 'notify';
        var keywords = $("#keywords").val();
        var create_start = $('#create_start').val();
        var create_end = $('#create_end').val();
        var pageSize =  getQueryString("pageSize");
        page = page == undefined? 1:page;

        var siteCode = $('#siteCode').val();
        url +="?page="+page+'siteCode='+siteCode;

        if(keywords){
            url += "&keywords="+ keywords;
        }

        if(create_start){
            url += "&create_start="+ create_start;
        }
        if(create_end){
            url += "&create_end="+ create_end;
        }
        location.href=url;

    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    $('.cancel-user').click(function () {
        var url = $(this).data('url');
        var status = $(this).data('status');
        layer.confirm('确认执行此操作？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            $.ajax({
                url:url,
                type:'PUT',
                data:{status:status},
                success:function(response) {
                    if (response.code == 200) {
                        layer.msg('操作成功');
                        setTimeout(function () {
                            window.location.reload();
                        }, 600)
                    } else {
                        layer.msg(response.message);
                    }
                }
            });

        }, function(){

        });

    });
}());