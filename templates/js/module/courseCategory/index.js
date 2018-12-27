 //首页推荐开关
$(document).find('[name=is_recommend]').bootstrapSwitch();
    
//点击 添加分类、编辑分类
$(document).find('.btn-category').on('click',function(){
    $('#category-modal').find('.up-category-name').text("");
    $('#category-modal').find('[name=name]').val("");
    $('#category-modal').find('[name=index_show_name]').val("");
    $('#category-modal').find('[name=is_recommend]').bootstrapSwitch("state",false);

    var type = $(this).attr('data-type');
    var pid = parseInt($(this).attr('data-pid'));
    var id = 0;

    if(type == 'save'){
        var url = $('#save-url').attr('data-url');
        $('#category-modal').find('.modal-title').text('添加分类');
    }
    if(type == 'update'){
        id = parseInt($(this).attr('data-id'));
        var url = $('#update-url').attr('data-url');
        $('#category-modal').find('.modal-title').text('编辑分类');

        var self_name = $('.name-'+id).text();
        var self_recommend_name = $('.recommend-name-'+id).text();
        var self_is_recommend = $('.is-recommend-'+id).text() == '是' ? true : false ;

        $('#category-modal').find('[name=name]').val(self_name);
        $('#category-modal').find('[name=index_show_name]').val(self_recommend_name);
        $('#category-modal').find('[name=is_recommend]').bootstrapSwitch("state",self_is_recommend);
    }

    if(pid == 0){
        $('#category-modal').find('.up-category').hide();
        $('#category-modal').find('.index-show-name').hide();
        $('#category-modal').find('.index-recommend').hide();
    }else{
        var up_category_name = $('.name-'+pid).text();
        $('#category-modal').find('.up-category-name').text(up_category_name);
        $('#category-modal').find('.up-category').show();
        $('#category-modal').find('.index-show-name').show();
        $('#category-modal').find('.index-recommend').show();
    }

    $('#btn-save').attr({'data-type':type,'data-pid':pid,'data-url':url,'data-id':id});
});
    
//点击 提交
$(document).find('#btn-save').on('click',function(){
    var self = $(this);
    var type = self.attr('data-type');
    var pid = self.attr('data-pid');
    var id = self.attr('data-id');
    var url = self.attr('data-url');

    var data = {};
    data.name = $('[name=name]').val();
    data.parent_id = pid;
    data.id = id;
    if(pid != 0){
        data.recommend_name = $('[name=index_show_name]').val();
        data.is_recommend = $('[name=is_recommend]').bootstrapSwitch('state') ? 1 : 0;
    }
    if(type == 'save') type = 'post';
    if(type == 'update') type = 'put';

    if(self.attr('data-lock') == 1) return false;
    self.attr('data-lock',1);
    $.ajax({
        url: url,
        type: type,
        data: data,
        complete: function(){
            self.attr('data-lock',0);
        },
        success: function (result) {
            if(result.code == 200){
                parent.layer.msg(result.message, {icon: 1});
                window.location.reload();
            }else{
                parent.layer.msg(result.message, {icon: 2});
            }
        }
    });
});
    
//点击 删除
$(document).find('.op_del').on('click',function(){
    var self = $(this);
    var id = self.attr('data-id');
    var url = $('#delete-url').attr('data-url');
    var type = 'delete';

    parent.layer.confirm('您确定要删除该分类么？', {
        title : '提示',
        btn : ['确定','取消'],
        shade : false
    }, function(){
        $.ajax({
            url : url,
            type : type,
            data : {id:id},
            success : function(result){
                if(result.code == 200){
                    parent.layer.msg(result.message, {icon: 1});
                    window.location.reload();
                }else{
                    parent.layer.msg(result.message, {icon: 2});
                }
            }
        });
    });
});

//拖动
$(document).find('#nestable22').nestable({
    maxDepth:3
}).on('change',function(){
    var data = JSON.stringify($("#nestable22").nestable('serialize'));
    var url = $('#update-all-url').attr('data-url');
    $.ajax({
        url : url,
        type : 'put',
        data : {data:data},
        success: function (result) {
            if(result.code != 200){
                parent.layer.msg(result.message, {icon: 2});
            }
        }
    });
}).on('mousedown','.item-p .item-r',function(){
    return false;
});
//默认收起
$(document).find('#nestable22').nestable('collapseAll');
