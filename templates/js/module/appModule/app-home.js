/**
 * Created by Administrator on 2017/4/12.
 */
$(function () {
    $("#commentForm").validate();

    $("#titleForm").validate();
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
    $(document).on('click', '.setting', function () {

        var role = $("input[name=role]").val();

        var type = $(this).attr('data-type');
        var $prent = $(this).parents(".info-element");
        var id = $prent.attr("data-id");
        var url = $prent.data("setting");
        // console.log(id);
       // console.log(url);return false;
        $.ajax({
            type: 'PUT',

            url: url,

            data: {status:type},

            success: function (response) {
                if(response.code == 200){
                    window.location.reload();
                }else{
                    alert('失败喽，哈哈');
                }
            }
        });
    });
    //我的页面编辑标题
    $(document).on("click",".editTitle",function(){
        var id = $(this).parents("li").attr('id').substring(5);
        $("input[name=id]").val(id);
        $('#myModal3').modal('show');
    });
    //保存编辑的标题
    $(document).on("click",".saveTitle",function(){
        var title = $("#title").val();
        if(title < 4 || title < 0){
            layer.msg('标题在1-4个汉字', {icon: 2});
            return false;
        }
        var form = $("#titleForm");
        if ($(".saveTitle").hasClass('disabled'))
            return false;
        $(".saveTitle").addClass('disabled').text('正在提交');
        $.post(form.attr('action'), form.serialize(), function (response) {
            if (response.item) {
                window.location.reload();
            } else {
                alert('失败喽，哈哈');
            }
        });
    });
    //预览
    $("#preview,#preview-setting").click(function () {

        var text = $(this).text();

        var num = text.indexOf("应");

        if(num === -1)
        {
            var type = 'PREVIEW';
        }
        else
        {
            var type = 'SETTING';
        }

        var role = $("input[name=role]").val();

        var id = 1;

        $.ajax({

            type: 'GET',

            data: {role:role, type:type},

            url: getUrl(role,id),

            success: function (response)
            {
                if(response.code == 200)
                {
                    if(type == 'SETTING')
                    {
                        layer.msg('生成配置成功');

                        window.location.reload();
                    }
                    else
                    {
                        var response = response.items;

                        for (i = 0; i < response.length; i++) {
                            var html = "<div class='thumbnail'>" +
                                "<div style='padding:4px;'><span class='pull-left'>" + response[i].title + "</span><span class='pull-right'>更多&gt;&gt;</span></div>" +
                                "<img src=http://html.gxy.com/manage/images/app/" + response[i].image + ">" +
                                "</div>" +
                                "</div>";

                            $("#preview-img").append(html);
                        }
                        $('#myModal2').modal('show');
                    }

                }
                else
                {
                    layer.msg(response.message);

                    window.location.reload();
                }

            }
        });

    });
    $("#back-setting").click(function(){

        layer.confirm('确定要还原配置吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {

            if ($(this).hasClass('disabled'))
                return false;
            $(this).addClass('disabled').text('正在还原配置，请稍后....');

            var role = $("input[name=role]").val();

            var id = 1;
            $.ajax({
                type: 'GET',

                data: {role:role, type:'BACKSETTINGS'},

                url: getUrl(role,id),

                success: function (response)
                {

                    if(response.code == 200)
                    {
                        layer.msg("还原成功");

                        setTimeout("window.location.reload()",200);
                    }
                    else
                    {
                        layer.msg("还原失败");
                    }
                }
            });
        }, function () {
            //return false;
        });




    });
    $("#me_preview").click(function(){
        var role = $("input[name=role]").val();
        var id = 1;
        $.ajax({
            type:'GET',
            data:{role:role,type:'ME_PREVIEW'},
            url:'/appCourse/'+id,
            success:function(response){
                $("#me-preview").html(response);
                $('#myModal4').modal('show');

            }
        });
    });
    $("#discover-preview").click(function(){
        var role = $("input[name=role]").val();
        var id = 1;
        $.ajax({
            type:'GET',
            data:{role:role,type:'DISCOVER_PREVIEW'},
            url:'/appCourse/'+id,
            success:function(response){
                $("#discover-preview-page").html(response);
                $('#myModal5').modal('show');

            }
        });
    });
    //应用配置
    $("#use-setting").click(function () {
        var role = $("input[name=role]").val();
        var id = 2;
        layer.confirm('确定要应用吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {
            $.ajax({
                type: 'GET',
                data: {role: role, type: 'USESETTING'},
                url: '/appCourse/' + id,
                success: function (response) {

                    if(response){
                        window.location.reload();
                    }
                }
            });
        }, function () {
            //return false;
        });
    });
    //// 我的 应用配置
    //$("#use-me-setting").click(function(){
    //    var role = $("input[name=role]").val();
    //    var id = 2;
    //    layer.confirm('确定要应用吗？', {
    //        btn: ['确定', '取消'], //按钮
    //        shade: false, //不显示遮罩
    //        title: "提示"
    //    }, function () {
    //        $.ajax({
    //            type: 'GET',
    //            data: {role: role, type: 'USEMESETTING'},
    //            url: '/appCourse/' + id,
    //            success: function (response) {
    //                // console.log(response);return false;
    //                window.location.reload();
    //            }
    //        });
    //    }, function () {
    //        //return false;
    //    });
    //});
    $(".add").click(function () {
        if ($(".add").hasClass('disabled'))
            return false;

        $(".add").addClass('disabled').text('正在提交');

        var title = $("#cname").val();

        var role = $("input[name=role]").val();

        $.ajax({
            type:'POST',

            data:{title:title,role:role,type:'MODULE'},

            url: getPostUrl(role),

            success:function(response)
            {
                if(response.code == 200)
                {
                    window.location.reload();
                }
                else
                {
                    layer.msg(response);
                }
            }

        });
    });
    ////还原配置
    //$(document).on("click", ".back-setting", function () {
    //    layer.confirm('确定要还原吗？', {
    //        btn: ['确定', '取消'], //按钮
    //        shade: false, //不显示遮罩
    //        title: "提示"
    //    }, function () {
    //        layer.closeAll();
    //        var role = $("input[name=role]").val();
    //        var id = 3;
    //        $(".back-setting").addClass('disabled').removeClass("back-setting").text("正在还原默认配置，请稍等…");
    //        $.ajax({
    //            type: 'GET',
    //            url: '/appCourse/' + id,
    //            data: {role: role, type: 'BACKSETTING'},
    //            success: function (response) {
    //                window.location.reload();
    //            }
    //        });
    //    }, function () {
    //        //return false;
    //    });
    //});
    //删除
    $(".delCustom").click(function () {
        var role = $("input[name=role]").val();
        var $parent = $(this).parents("li");
        var id = $parent.attr('id');
        var url = $parent.data('put');

        var id = id.substring(5);

        $.ajax({
            type: 'PUT',

            url: url,

            data: {id:id},

            success: function (response)
            {

                if (response.code == 200)
                {
                    layer.msg('删除成功');
                    setTimeout("window.location.reload()",200);
                }
                else
                {
                    alert('失败喽，哈哈');
                }
            }
        });
    });

    //我的js
    $('input[type="checkbox"]').bootstrapSwitch();
    $('input[type="checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        var role = $("input[name=role]").val();
        var id = $(this).parents("li").attr('id');
        var id = id.substring(5);
        if(state){
            var types = 1; //选中
        }else{
            var types = 2; //未选中
        }
        $.ajax({
            type:'PUT',
            url:'/appModule/'+id,
            data:{type:'UPDATESTATUS',types:types,role:role},
            success:function(response){
                if(response){
                    window.location.reload();
                }else{
                    alert('失败喽，哈哈');
                }
            }
        });
    });
    $(document).on("click",".back-me-setting",function(){
        layer.confirm('确定要还原吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {
            layer.closeAll();
            var role = $("input[name=role]").val();
            var id = 3;
            $(".back-me-setting").addClass('disabled').removeClass("back-me-setting").text("正在还原默认配置，请稍等…");
            $.ajax({
                type: 'GET',
                url: '/appCourse/' + id,
                data: {role: role, type: 'BACKMESETTING'},
                success: function (response) {
                    window.location.reload();
                }
            });
        }, function () {
            //return false;
        });
    });
    //还原 discover
    $(document).on("click",".back-discover-setting",function(){
        layer.confirm('确定要还原吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {
            layer.closeAll();
            var role = $("input[name=role]").val();
            var id = 3;
            $(".back-discover-setting").addClass('disabled').removeClass("back-discover-setting").text("正在还原默认配置，请稍等…");
            $.ajax({
                type: 'GET',
                url: '/appCourse/' + id,
                data: {role: role, type: 'BACKDISCOVERSETTING'},
                success: function (response) {
                    window.location.reload();
                }
            });
        }, function () {
            //return false;
        });
    });
    //发现页修改类型js
    $(":radio").click(function(){
        var id = $(this).val();
        $.ajax({
            type:'PUT',
            url:'/appCourse/' + id,
            success:function(){
                window.location.reload();
            }
        });
    });
    //发现页的js
    $("#use-discover-setting").click(function(){
        var role = $("input[name=role]").val();
        var id = 2;
        layer.confirm('确定要应用吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {
            $.ajax({
                type: 'GET',
                data: {role: role, type: 'USEDISCOVERSETTING'},
                url: '/appCourse/' + id,
                success: function (response) {
                    if(response){
                        window.location.reload();
                    }
                }
            });
        }, function () {
            //return false;
        });
    });

    function getPostUrl(role)
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
