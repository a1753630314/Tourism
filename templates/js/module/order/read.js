(function () {
    $('#pay').click(function(){
        var url = $(this).data('url');
        var payWay = $('#payWay').val();
        $.ajax({
            url: url,
            type: "put",
            dataType: "json",
            data: {tradeNo:payWay,payment_type:payWay},
            success: function (json) {
                if (json.code == 200)
                {
                    layer.msg('已经到账', {icon: 1});
                    setTimeout("window.location.reload()",2000);
                } else {
                    layer.msg(json.message, {icon: 2});
                }
            }
        });
    });
    $('#addNote').click(function(){
        var url = $(this).data('url');
        var note = $('#note').val();
        var id = $('#addNote').data('id');
        if(getByteLen(note) > 100)
        {
            layer.msg('备注不能超过50个汉字', {icon: 2});
            return false;
        }
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: {order_id:id,content:note},
            success: function (json) {
                if (json.code == 200)
                {
                    layer.msg('备注成功');
                    setTimeout("window.location.reload()",2000);
                } else {
                    layer.msg(json.message);
                }
            }
        });
    });

    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    }
}());