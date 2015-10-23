$(function(){
   var str=""
	for (var i=0;i<localStorage.length ;i++ ){
	var key=localStorage.key(i)
	var val=localStorage.getItem(key)
	str+="<li key="+key+" val="+val+" > "+key+"</li>"
	}
	$("#noteList").html(str)		 
	$("button").eq(0).click(function(){
	//显示右侧栏
	$('#right').css('display','block');
	//清空输入框,并让title获取焦点
	$('#title').val('').focus();
	$('#content').val('');
});
$("button").eq(1).click(function (){
//向localStorage存值
	$('#right').css('display','none');
	var key = $('#title').val();
	var val = $('#content').val();
	localStorage.setItem(key,val);
	//清空输入框
	$('#title').val('');
	$('#content').val('');
	//向左侧列表追加项
	//把content的内容设为li的html
	//把title的内容设置li的data-key自定义属性
	//<li data-key="key">content</li>
	$("<li key="+key+" val="+val+" > "+key+"</li>").appendTo($('#noteList'));
});

$("#noteList").on("mousedown","li",function(event){
    var ox=event.offsetX
	$(this).mousemove(ox,function(event){
    var bigger=event.offsetX-event.data
	if (bigger<0)
	{
	$(this).css({left:bigger})
	}
	if(bigger<=-50){
		if (window.confirm("确认删除吗？")  ==1){
		localStorage.removeItem($(this).attr("key"))
		$(this).remove();
	    }else{
		$(this).css({left:0})
		$(this).unbind("mousemove")
		} 
	}
	}).mouseup(function(){
		$(this).css({left:0})
		$(this).unbind("mousemove")
		}).mouseout(function(){
		$(this).css({left:0})
		$(this).unbind("mousemove")
		})
	})
});
