(function () {
    $("#commentForm").validate();

    $("#titleForm").validate();
    $('#module-list').sortable({
        update: function () {
            var url = $(this).data("url");
            var sort = $("#module-list").sortable('serialize');
            $.ajax({
                url: url,
                type: 'POST',
                data: sort,
                success: function (response) {
                    window.location.reload();
                }
            });
        }
    });
    $(document).on('click', '.setting', function () {
        var role = $("input[name=role]").val();
        var type = $(this).attr('data-type');
        var id = $(this).parent().parent().parent().parent().attr('id');
        var id = id.substring(5);
        $.ajax({
            type: 'PUT',
            url: $("#get-url").data('app-module').replace('-id-',id),
            data: {types: type, type: 'UPDATESTATUS',role:role},
            success: function (response) {
                //console.log(response);return false;
                if (response) {
                    window.location.reload();
                } else {
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
    $("#preview").click(function () {
        var role = $("input[name=role]").val();
        var id = 1;
        $.ajax({
            type: 'GET',
            data: {role: role, type: 'PREVIEW'},
            url: $("#get-url").data('app-course').replace('-id-',id),
            success: function (response) {
                var response = response.items;
                for (i = 0; i < response.length; i++) {
                    var html = "<div class='thumbnail'>" +
                        "<div style='padding:4px;'><span class='pull-left'>" + response[i].title + "</span><span class='pull-right'>更多&gt;&gt;</span></div>" +
                        "<img src=__IMG__/app/" + response[i].img + ">" +
                        "</div>" +
                        "</div>";

                    $("#preview-img").append(html);
                }
                $('#myModal2').modal('show');
            }
        });

    });
    $("#me_preview").click(function(){
        var role = $("input[name=role]").val();
        var id = 1;
        $.ajax({
            type:'GET',
            data:{role:role,type:'ME_PREVIEW'},
            url:$("#get-url").data('app-course').replace('-id-',id),
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
            url:$("#get-url").data('app-course').replace('-id-',id),
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
                url: $("#get-url").data('app-course').replace('-id-',id),
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
    // 我的 应用配置
    $("#use-me-setting").click(function(){
        var role = $("input[name=role]").val();
        var id = 2;
        layer.confirm('确定要应用吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {
            $.ajax({
                type: 'GET',
                data: {role: role, type: 'USEMESETTING'},
                url: $("#get-url").data('app-course').replace('-id-',id),
                success: function (response) {
                    // console.log(response);return false;
                    window.location.reload();
                }
            });
        }, function () {
            //return false;
        });
    });
    $(".add").click(function () {
        var form = $("#commentForm");
        if ($(".add").hasClass('disabled'))
            return false;
        $(".add").addClass('disabled').text('正在提交');
        $.post(form.attr('action'), form.serialize(), function (response) {
            if (response.item) {
                window.location.reload();
            } else {
                alert('失败喽，哈哈');
            }
        });
    });
    //还原配置
    $(document).on("click", ".back-setting", function () {
        layer.confirm('确定要还原吗？', {
            btn: ['确定', '取消'], //按钮
            shade: false, //不显示遮罩
            title: "提示"
        }, function () {
            layer.closeAll();
            var role = $("input[name=role]").val();
            var id = 3;
            $(".back-setting").addClass('disabled').removeClass("back-setting").text("正在还原默认配置，请稍等…");
            $.ajax({
                type: 'GET',
                url: $("#get-url").data('app-course').replace('-id-',id),
                data: {role: role, type: 'BACKSETTING'},
                success: function (response) {
                    window.location.reload();
                }
            });
        }, function () {
            //return false;
        });
    });
    //删除
    $(".delCustom").click(function () {
        var id = $(this).parents("li").attr('id');
        var id = id.substring(5);
        $.ajax({
            type: 'PUT',
            url: $("#get-url").data('app-module').replace('-id-',id),
            data: {type: 'DELETEMODULE'},
            success: function (response) {
                if (response.item) {
                    window.location.reload();
                } else {
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
            url:$("#get-url").data('app-module').replace('-id-',id),
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
                url: $("#get-url").data('app-course').replace('-id-',id),
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
                url: $("#get-url").data('app-course').replace('-id-',id),
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
            url:$("#get-url").data('app-course').replace('-id-',id),
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
                url: $("#get-url").data('app-course').replace('-id-',id),
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
}());