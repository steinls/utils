//节流函数
function debounce(func,delay,context) {
	return function () {
		func.id && clearTimeout(func.id);
		func.id = setTimeout(() => {
			func.apply(context,arguments)
		}, delay)
	}
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.slice(1).match(reg); //匹配目标参数
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

//将url转为对象
function getUrlObj(){
	var ret = {};
	var search = location.search.slice(1);
	search.replace(/([^?&]+)=([^?&]+)/g, function(s, v, k) {
	    ret[v] = decodeURIComponent(k);
	    return k + '=' +  v;
	})
	return ret;
}

// 拼接url
function param(option){
	var search = '';
	if(option){
		for(i in option){
			var key = encodeURIComponent(i);
			var value = option[i]?encodeURIComponent(option[i]):'';
			search+='&'+key+'='+value;
		}
	}
	return search?search.slice(1):'';
}


//寄生组合式继承
Function.prototype.Inherit = function(parent){
	//非函数类型不做处理
	if (typeof parent != 'function') return this;
	// 对象冒充
	Animal.call(this);
	//创建一个没有实例方法的类
	//这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
	var F=function(){}
	F.prototype=parent.prototype;
	this.prototype=new F();
	// 修改指针
	this.prototype.constructor=this;
}
