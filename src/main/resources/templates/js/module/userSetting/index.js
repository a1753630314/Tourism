// 注册表单提交
$("#register-setting-submit-btn").click(function () {
    var form = $('#register-setting-form');
    $.post(form.attr('action'), form.serialize(), function (response) {
        if (response.code == 200) {
            layer.msg('修改成功', {icon: 1})
        } else {
            layer.msg(response.message, {icon: 2})
        }
    });

});

// 登录表单提交
$("#login-setting-submit-btn").click(function () {
    var form = $('#login-setting-form');
    form.ajaxSubmit({
        success: function (response) {
            if (response.code == 200) {
                layer.msg('修改成功', {icon: 1})
            } else {
                layer.msg(response.message, {icon: 2})
            }
        }
    });
});

// 协议表单提交
$("#protocol-setting-submit-btn").click(function () {
    var form = $('#protocol-setting-form');
    $.ajax({
        url:form.attr('action'),
        type:form.attr('method'),
        data:{"register_protocol":$('#register-protocol').code(),"service_protocol":$('#service-protocol').code()},
        success: function (response) {
            if (response.code == 200) {
                layer.msg('修改成功', {icon: 1})
            } else {
                layer.msg(response.message, {icon: 2})
            }
        }
    })
});

// 协议表单提交
$("#protocol-setting-submit-btn2").click(function () {
    var form = $('#protocol-setting-form2');
    $.ajax({
        url:form.attr('action'),
        type:form.attr('method'),
        data:{"register_protocol":$('#register-protocol').code(),"service_protocol":$('#service-protocol').code()},
        success: function (response) {
            if (response.code == 200) {
                layer.msg('修改成功', {icon: 1})
            } else {
                layer.msg(response.message, {icon: 2})
            }
        }
    })
});



$("#agencyequity-submit-btn").click(function () {
    var form = $('#agencyequity-form');
    $.ajax({
        url:form.attr('action'),
        type:form.attr('method'),
        data:{"value":$('#agencyequitytext').code()},
        success: function (response) {
            if (response.code == 200) {
                layer.msg('修改成功', {icon: 1})
            } else {
                layer.msg(response.message, {icon: 2})
            }
        }
    })
});
$("#agencyprotocol-submit-btn").click(function () {
    var form = $('#agencyprotocol-form');
    $.ajax({
        url:form.attr('action'),
        type:form.attr('method'),
        data:{"value":$('#agencyprotocoltext').code()},
        success: function (response) {
            if (response.code == 200) {
                layer.msg('修改成功', {icon: 1})
            } else {
                layer.msg(response.message, {icon: 2})
            }
        }
    })
});

$(document).ready(function () {
    $('#register-protocol').summernote({
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]]
        ],
        height:300,
        lang: 'zh-CN'
    });
    $('#service-protocol').summernote({
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]]
        ],
        height:300,
        lang: 'zh-CN'
    });


    $('#agencyequitytext').summernote({
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]]
        ],
        height:300,
        lang: 'zh-CN'
    });
    $('#agencyprotocoltext').summernote({
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "clear"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]]
        ],
        height:300,
        lang: 'zh-CN'
    });
});

// 选择自定义背景图
$('.login-img-module').click(function () {
    var url = $(this).data('url');
    $('.login-img-module').find('.check-icon').removeClass('check-ok').addClass('check-no');
    $(this).find('.check-icon').removeClass('check-no').addClass('check-ok');
    $('[name=login_page_background]').val(url);
});

//  出发自定义背景图上传
$('#add-custom-bg').click(function () {
    $('#up_img').trigger('click');
})

// 选择登录页面自定义背景图
// new uploadPreview({
//     beforeCallback:function (file) {
//         var re = /(?:\.([^.]+))?$/;
//         var ext = re.exec(file.name)[1];
//         // 文件上传大小限制
//         var maxFileSize = 1024 * 1024; //1M
//         // 允许上传的文件类型
//         var allowType = ['png', 'jpg', 'jpeg'];
//         if ($.inArray(ext, allowType) == -1) {
//             alert('当前文件类型不允许上传');
//             return false;
//         }
//         if (file.size > maxFileSize) {
//             alert('当前文件大小超出限制');
//             return false;
//         }
//
//         return true;
//     },
//     UpBtn: "up_img",
//     DivShow: "customLoginBgDiv",
//     ImgShow: "customLoginBg",
//     callback: function () {
//         $('#customLoginBgDiv').removeClass('hidden');
//         $('.login-img-module').find('.check-icon').removeClass('check-ok').addClass('check-no');
//         $('#customLoginBgDiv').find('.check-icon').removeClass('check-no').addClass('check-ok');
//         $('[name=login_page_background]').val('');
//     }
// });