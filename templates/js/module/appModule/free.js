$(function () {

	//重新 设置内容宽度 取整
	var _width = $(".live-template .list").width();
	var _showCount = parseInt(_width/290);
	var _newWidth = _showCount * 290;
	$(".live-template .list").width(_newWidth);
	var _index = 0;
	$(".button-right").click(function () {
		var len = $(".live-template ul li").length;
		if(len<=_showCount) return;
		if(_showCount+_index>=len) return;
		_index++;
		$(".live-template ul").stop().animate({left: -_index * 290}, 500);
	});
	$(".button-left").click(function () {
		if(_index==0) return;
		_index--;
		$(".live-template ul").stop().animate({left: -_index * 290}, 500);
	});

	$(document).on("click",".style",function(){
		$(".list li div").removeClass("active");
		$(this).addClass("active");
		return false;
	});
	if(!$(".list li div").hasClass("active")){
		$(".list li div").eq(0).addClass("active");
	}
	$(".other").click(function(){
		$(".clearfix li").siblings().removeClass("active");
		$(".clearfix li").eq(1).addClass("active");
	});
	$(this).keydown( function(e) {
		var key = window.event?e.keyCode:e.which;
		if(key.toString() == "13"){
			return false;
		}
	});
	//推荐至首页
	$(document).on("click",".recommend",function(){

        if($("#selected-course").find("tr").length > 20){
            layer.msg('推荐数量不能大于20',{'icon':2});
            return false;
        }

		var current= $(this).parents("tr").children();
		var currentImgSrc = current.eq(0).children().attr('src');
		var currentTitle = current.eq(1).text();
		var currentTeacher = current.eq(2).text();
		var role = $("input[name=role]").val();
		var id = $("input[name=id]").val();
		var courseId = $(this).parents("tr").children("input:last-child").val();
		var html= "<tr data-id="+courseId+">"+
			"<!--<td>"+
			"<img class='live-img-sm' src='"+currentImgSrc+"'>"+
			"</td>-->"+
			"<td>"+
			currentTitle
			+"</td>"+
			"<td>"+
			currentTeacher
			+"</td>"+
			"<td>"
			+"<span class='up'><a href='javascript:;'><i class='fa fa-arrow-up text-navy'></i> 上移</a></span>"+
			"<span class='down'><a href='javascript:;' class='m-l'><i class='fa fa-arrow-down text-navy'></i> 下移</a></span>"+
			"</td>"+
			"<!--<td>"
			+"<img class='live-cover-img' src=''>"+
			"</td>-->"+
			"<td>"+
			"<span class='cancel-recommend'><a href='javascript:;' class='m-l'><i class='fa fa-trash text-navy'></i> 取消推荐</a></span>"+
			"&nbsp;&nbsp;&nbsp;"+
			"<!--<a href='javascript:;' class='confirm'><i class='fa fa-file-image-o text-navy'></i> 设置封面图</a>-->"+
			"</td>"+
			"<input type='hidden' value='"+courseId+"' name='cousreId' class='cour'>"+

			"<input type='hidden' value='"+courseId+"' name='course_id' class='recom'>"+
			"</tr>";
		$(".recommendCourse").append(html);
		$(this).text('已推荐');
		$(this).addClass("btn-default");
		$(this).attr("disabled","disabled");
		
		$('#save').click();

	});
	//取消推荐至首页
	$(document).on("click",".cancel-recommend",function(){
		var courseId = $(this).parents("tr").children("input:last-child").val();
		$(".course_"+courseId).prev().children().removeClass("btn-default");
		$(".course_"+courseId).prev().children().addClass("btn-primary");
		$(".course_"+courseId).prev().children().addClass("recommend");
		$(".course_"+courseId).prev().children().removeAttr("disabled","disabled").text("推荐到首页");
		$(this).parents("tr").remove();
		$('#save').click();
	});

	//上移
	$(document).on("click",".up",function(){
		var Current = $(this).parents("tr").html();
		var Last = $(this).parents("tr").prev().html();
		$(this).parents("tr").prev().html(Current);
		$(this).parents("tr").html(Last);
	});
	//下移
	$(document).on("click",".down",function(){
		var Current = $(this).parents("tr").html();
		var Last = $(this).parents("tr").next().html();
		$(this).parents("tr").next().html(Current);
		$(this).parents("tr").html(Last);
	});

	$("#save").click(function(){

		var max=$("#cname2").val();

		if(max <2){

			layer.msg('数量不能小于2',{'icon':2});

			return false;
		}

        if(max >20){
            layer.msg('数量不能大于20',{'icon':2});
            return false;
        }

        if($("#selected-course").find("tr").length > 20){
            layer.msg('推荐数量不能大于20',{'icon':2});
            return false;
		}

		var role = $("input[name=role]").val();

		var id = $("input[name=id]").val();

		var title = $("#cname").val();

		var courseIds = '';

		var recom_id = '';

		var CurTheme = $(".active").parent().attr('data-sytle'); //获取选中的主题

		$(".cour").each(function(){

			courseIds+= ','+$(this).val();

		});

		$(".recom").each(function(){

			recom_id += ',' + $(this).val();

		});
        var rigid_where = $("#inlineCheckbox4:checked").val();
		$.ajax({

			type:'PUT',

			data:{
				CurTheme:CurTheme,
				courseIds:courseIds,
				title:title,
				max:max,
				type:'FREE',
				recom_id:recom_id,
				keywords:$("#btnQuerytree").data("serialize"),
                rigid_where : rigid_where ? rigid_where : 0
			},

			url:getUrl(role,id),

			success:function(response)
			{
				if(response.item)
				{
					layer.msg('保存成功');

					window.location.reload();
				}
				else
				{
					layer.msg('保存失败',{'icon':2});
				}
			}

		});
	});

	$("#back").click(function(){
		var role = $("input[name=role]").val();

		window.location.href = getBackUrl(role);

	});

	$(document).on("click",".confirm",function(){

		layer.msg("请先保存");

	});
    function getBackUrl(role)
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


function getSelectCourse(){
	var obj=$('#selected-course tr');
	var strId=[];
	
	if(obj.length>0){
		for(var i=0;i<obj.length;i++){
			strId[i]=$(obj[i]).data('id');
		}
	}
	
	return strId;
	
}

function getAllCourse(){
	var obj=$('#page tbody tr input');
	var strAllId=[];
	
	if(obj.length>0){
		for(var i=0;i<obj.length;i++){
			strAllId[i]=obj[i].value;
		}
	}
	
	return strAllId;
}
/*
 * 返回两个数组的差异值
 */
function diff(arr1, arr2) {  
  var newArr = [];  
  var arr3 = [];  
  for (var i=0;i<arr1.length;i++) {  
    if(arr2.indexOf(arr1[i]) === -1)     
      arr3.push(arr1[i]);  
  }  
   var arr4 = [];  
  for (var j=0;j<arr2.length;j++) {  
    if(arr1.indexOf(arr2[j]) === -1)  
      arr4.push(arr2[j]);  
  }  
   newArr = arr3.concat(arr4);  
  return newArr;  
}  
/*
 * 返回两个数组的相同值
 */
function  FilterData(a,b){  
    var result = new Array();
    var c=b.toString();
    for(var i=0;i<a.length;i++)
    {
      if(c.indexOf(a[i].toString())>-1)
      {

         for(var j=0;j<b.length;j++)

         {

             if(a[i]==b[j]) 

             {

                result.push(a[i]);

                break;

             }

         }

      }      
    }
    return result;
}



function checkCourse(){
	var recommendStr=getSelectCourse();
	var recommendAllStr=getAllCourse();
	if(recommendAllStr.length>0){
		
		for(var r=0;r<recommendAllStr.length;r++){
			(function(){
				var rd=r;
				changeToRecommend(str[rd]);
			})()
		}
	}
	
	if(recommendStr.length>0){
		var str=FilterData(recommendStr, recommendAllStr);//重复数组
		for(var s=0;s<str.length;s++){
			(function(){
				var d=s;
				changeRecommend(str[d]);
			})()
		}
	}
	
}

function changeRecommend(id){
	console.log(id)
	var obj=$('#page tbody tr');
	if(obj.length>0){
		for(var i=0;i<obj.length;i++){
			if($(obj[i]).find('input')[0].value==id){
				var thisObj=$(obj[i]).find('a');
				thisObj.attr('class','btn btn-primary btn-xs recommend btn-default');
				thisObj.attr('disabled','disabled');
				thisObj.text('已推荐');
				thisObj.click(function(){
					return false;
				})
			}
		}
	}
}

function changeToRecommend(id){
	console.log(id)
	var obj=$('#page tbody tr');
	if(obj.length>0){
		for(var i=0;i<obj.length;i++){
			if($(obj[i]).find('input')[0].value==id){
				var thisObj=$(obj[i]).find('a');
				thisObj.attr('class',' btn btn-primary btn-xs recommend');
				thisObj.attr('disabled',false);
				thisObj.text('推荐到首页');
				thisObj.click(function(){
//					Recommend();
				})
			}
		}
	}
}

