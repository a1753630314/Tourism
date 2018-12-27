(function () {
    //创建时间
    var create_start = {
        elem: '#create_start',
        format: "YYYY-MM-DD",
        min: '2001-06-16 23:59:59',
        max: "2099-06-16 23:59:59",
        //istime: true,
        istoday: false,
        choose: function (datas) {
            create_end.min = datas; //开始日选好后，重置结束日的最小日期
            create_end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var create_end = {
        elem: '#create_end',
        format: "YYYY-MM-DD",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        //istime: true,
        istoday: false,
        choose: function(datas) {
            create_start.max = datas
        }
    };
    //支付时间
    var pay_start = {
        elem: '#pay_start',
        format: "YYYY-MM-DD",
        min: '2001-06-16 23:59:59',
        max: "2099-06-16 23:59:59",
        //istime: true,
        istoday: false,
        choose: function (datas) {
            pay_end.min = datas; //开始日选好后，重置结束日的最小日期
            pay_end.start = datas //将结束日的初始值设定为开始日
        }
    };
    var pay_end = {
        elem: '#pay_end',
        format: "YYYY-MM-DD",
        min: laydate.now(),
        max: "2099-06-16 23:59:59",
        //istime: true,
        istoday: false,
        choose: function (datas) {
            pay_start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    laydate(create_start);
    laydate(create_end);
    laydate(pay_start);
    laydate(pay_end);
    //laydate.skin('molv');

    //添加人员
    $(document).on("click",".btnAddSell",addSellUser);
    function addSellUser(){
        var obj = this ;
        var userId=$(obj).parents("li").data("userid");
        var userName=$(obj).parents("li").data("username");
        var t_htm = '<li data-userId="$userId" data-userName="$userName" >$userName<button class="btn btn-xs btn-warning pull-right m-t-xs btnRemoveSell" ><i class="fa fa-times"></i> 移除</button></li>'
        t_htm = t_htm.replace(/\$userId/g,userId).replace(/\$userName/g,userName);
        console.log(t_htm);
        $(t_htm).appendTo("#curSellUser ul");
        $(obj).parents("li").remove();
    }
    //移除人员
    $(document).on("click",".btnRemoveSell",removeSellUser);
    function removeSellUser(){
        var obj = this ;
        var userId=$(obj).parents("li").data("userid");
        var userName=$(obj).parents("li").data("username");
        console.log(userId,userName);
        var t_htm = '<li data-userId="$userId" data-userName="$userName">$userName<button class="btn btn-xs btn-primary pull-right m-t-xs btnAddSell" ><i class="fa fa-check"></i> 添加</button></li>'
        var t_htm = t_htm.replace(/\$userId/g,userId).replace(/\$userName/g,userName);
        $(t_htm).appendTo("#noSellUser ul");
        $(obj).parents("li").remove();
    }

    function queryData(page){
        var url =  'order';
        var searchType = $('#searchType').val();
        var keywords = $('#keywords').val();
        var payStatus = $('#payStatus').val();
        var payWay = $('#payWay').val();
        var payType = $('#payType').val();
        var payFrom = $('#payFrom').val();
        var create_start = $('#create_start').val();
        var create_end = $('#create_end').val();
        var pay_start = $('#pay_start').val();
        var pay_end = $('#pay_end').val();
        var siteCode = $("#siteCode").val();
//        var status= getQueryString("status");

        var pageSize =  getQueryString("pageSize");
        page = page == undefined? 1:page;
        url +="?page="+page+"&siteCode="+siteCode;

        if(keywords){
            url += "&searchType=" + searchType + "&keywords="+ keywords;
        }
        if(payStatus){
            url += "&status="+ payStatus;
        }
        if(payWay){
            url += "&payWay="+ payWay;
        }
        if(payType)
        {
            url += "&payType="+ payType;
        }
        if(payFrom)
        {
            url += "&payFrom="+ payFrom;
        }
        if(create_start){
            url += "&create_start="+ create_start;
        }
        if(create_end){
            url += "&create_end="+ create_end;
        }
        if(pay_start){
            url += "&pay_start="+ pay_start;
        }
        if(pay_end){
            url += "&pay_end="+ pay_end;
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

    $("#search").click(function(){
        queryData(1);
    });

    $(document).on("click",".child-table tr td.target",function() {
        var id = $(this).data('id');
        var url = $(this).data('url');
        var tr = $(this).parent().next("tr");
        if (tr && tr.hasClass("row-detial")) {
            var body = tr.find("table tbody");
            var tr_list = body.find("tr");
            //有数据 返回
            if (tr_list && tr_list.length > 0) {
                return;
            }

            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                data: {order_id: id},
                success: function (json) {
                    if (json.code == 200) {
                        if(json.item.length ==0){
                            body.html("<tr><td colspan='3' style='text-align: center;'>暂无数据</td></tr>");
                        }else{
                            var html = "";
                            $.each(json.item, function(idx, obj) {
                                var htm = "";
                                htm +="<tr><td>" + obj.profile.nickname +"</td>";
                                htm +="<td>" + new Date(obj.create_time*1000).Format("yyyy-MM-dd hh:mm:ss") +"</td>";
                                htm +="<td>" + obj.content +"</td></tr>";
                                html += htm;
                            });
                            body.html(html);
                        }

                    } else {
                        layer.msg(json.message);
                    }
                }
            });
        }
    });


}());