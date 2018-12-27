var class_add_button = $(".add-class");
var class_del_button = $(".del-class");
var choose_course = $(".choose-course");
var receive_course = $("#receive_course");
var course_list = $(".cover-course");
var data  ='';
var class_data = '';
var li = '';
var class_str = '';
var list_str = '';
var hide_input = $("input[name='course_class']");
class_add_button.bind("click",function(){
    var _this = $(this);
    var course_id = _this.parents('li').attr('data-id');
    var class_id  = _this.parent().attr('data-id');
    _this.text('');
    add_course_list(course_id,class_id);
});
class_del_button.bind("click",function(){
    var _this = $(this);
    del_course_list(_this);
});

$(".confirm").click(function(){
    append_course_class();
});


/**
 * 关闭窗口追加内容
 */
function append_course_class()
{
    choose_course.children().each(function(){
        if(!$(this).hasClass('hidden')){ //展示的课程
            var choose_course_name = $(this).children('p').text(); //课程名称
            var choose_course_id = $(this).attr('data-id'); //课程id
            $(this).find(".class").children().each(function(){
                if(!$(this).hasClass('hidden')){
                    var class_id = $(this).attr('data-id'); //班级id
                    var name = $(this).text();
                    var class_name = name.substring(name,name.length-2);
                    class_data += class_name+' ';
                    class_str += class_id+',';
                }
            });
            list_str += choose_course_id+','+class_str+'|';
            data += '课程-'+choose_course_name+'   班级-'+class_data;
            class_data = '';
            class_str = '';
            li += "<li>"+data+"</li>";
            data = '';
        }
    });
    hide_input.val(list_str);
    list_str = '';
    receive_course.children("ul").children().each(function(){
        $(this).remove();
    });
    receive_course.children("ul").append(li);
    li = '';
}
/**
 * 增加课程列表
 */

function add_course_list(course_id,class_id)
{
    choose_course.children().each(function(){
        if($(this).attr('data-id') == course_id){
            $(this).removeClass('hidden');
            $(this).find(".class").children().each(function(){
                if($(this).attr('data-id') == class_id){
                    $(this).removeClass('hidden');
                }
            });
        }
    });
}

/**
 * 删除课程列表
 */
function del_course_list(which)
{
    var _parent = which.parent();
    var class_id = _parent.attr('data-id');//班级id
    var course_id = _parent.parents('li').attr('data-id'); //课程id
    var children_length = _parent.parents('.class').children().not('.hidden').length;
    _parent.addClass('hidden');
    if(children_length == 1){
        _parent.parents('.m-b-sm').addClass('hidden');
    }
    recoverButton(class_id,course_id);
}
/**
 * 恢复添加按钮
 */
function recoverButton(class_id,course_id)
{
    course_list.children().each(function(){
        if($(this).attr('data-id') == course_id){
            $(this).find(".class").children().each(function(){
                if($(this).attr('data-id') == class_id){
                    $(this).children("a").text('添加');
                }
            });
        }
    });
}

$("input[name='custom_time']").keyup(function() {
    var data = $(this).val();
    if (!(/^[0-9]{1,2}$/.test(data))) {
        $(this).val("");
    } else {
        var dataArr = data.split("");
        if(typeof(dataArr[1]) != 'undefined'){
            if(dataArr[0] > 3 || dataArr[0] == 0){
                $(this).val("");
            }else if (dataArr[0] == 3){
                $(this).val("30");
            }
        }
    }
});

$("input[name='plat']").bind("click",function(){
    var data = $('input:radio[name="plat"]:checked').val();
    if(data == 2){
        $("input[name='is_app']").removeAttr('checked');
        $("#mobile").css("display","none");
        //$("#mobile")[0].reset();
    }else{
        $("#mobile").css("display","block");
    }
});

$("input[name='is_app']").bind('click',function(){
    if($("input[name='is_app']").is(':checked')){
        $("#custom_mobile").css("display","block");
    }else{
        $("#custom_mobile").css("display","none");
    }
});



