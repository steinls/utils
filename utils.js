/**
 * 去抖/节流函数
 * @param  {Function} func  需要延迟的函数
 * @param  {Number} delay   延迟时间
 * @param  {Object} context 上下文对象
 * @return {Function}       延迟执行函数
 */
function debounce(func, delay, context) {
	return function () {
		func.id && clearTimeout(func.id);
		func.id = setTimeout(() => {
			func.apply(context,arguments)
		}, delay)
	}
}


/**
 * URL地址分割成对象
 * @param  {String} url URL地址
 * @return {Array}     对象(协议，主机名，端口号，路径部分，查询字符串)
 */
function urlSplit(url){
	var obj = {
		href: '123',
		protocol: '',
		host:'',
		port:'',
		pathname:'',
		search:''
	};

	var urlArr = url.match(/(\w+):\/\/([^/:]+)(:\d*)?([^#\?]*)([^#]*)?/);
	
	var idx = 0;
	for (var key in obj) {
		obj[key] = urlArr[idx];
		idx++;
	}

	return obj;
}


/**
 * 将查询字符串转为对象
 * @param  {String} search 查询字符串
 * @return {Object}        对象
 */
function searchToObj(search){
	var obj = {}
	search.replace(/([^?&]+)=([^?&]+)/g, function(str, key, value){
	    // str匹配的字符串，key键名，value键值
	    obj[key] = decodeURIComponent(value);
	    return value + '=' +  key
	})
	return obj
}


/**
 * 从查询字符串中获取指定名称参数
 * @param  {String} search 查询字符串
 * @return {String}        字符串
 */
function searchGetParam(name, search){
	//构造一个含有目标参数的正则表达式对象
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	//匹配目标参数
	var param = search.slice(1).match(reg);
	if (param != null) return decodeURIComponent(param[2]);
	return null;
}


 /**
  * 获取URL地址中的参数
  * @param  {String} options.name  参数名，不填则返回对象
  * @param  {String} options.url   url地址
  * @return {String/Object}  参数值/对象
  */
 function getUrlData(name, url){
 	var name = name||'';
	var href = url||location.href;
	var search = urlSplit(href).search;

	if (!search) {
		console.warn('function getUrlParam 警告：URL中没有查询字符串！');
		return;
	}

	if (name) return searchGetParam(name, search);
	return searchToObj(search);
}


/**
 * 拼接URL地址
 * @param  {Object} option 参数对象
 * @return {String}     拼接好的字符串
 */
function param(option){
	var search = '';
	for(i in option){
		var key = encodeURIComponent(i);
		var value = option[i]?encodeURIComponent(option[i]):'';
		search+='&'+key+'='+value;
	}
	return search?search.slice(1):'';
}


//寄生组合式继承
//在子类中想要调用父类的方法可以使用
//父类.方法.apply(this,arguments)
Function.prototype.Inherit = function(parent){
	//非函数类型不做处理
	if (typeof parent != 'function') return this;
	// 对象冒充
	parent.call(this);
	//创建一个没有实例方法的类
	//这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
	var F=function(){}
	F.prototype=parent.prototype;
	this.prototype=new F();
	// 修改指针
	this.prototype.constructor=this;
}

/**
 * 去除json对象里的换行符
 * @param  {String} str 待处理字符串
 * @return {Obejct}     处理好的对象
 */
function decodeUnicode(str) {  
  str = str.replace(/\\/g, "%");
  str = unescape(str);
  str = str.replace(/%/g, "\\");
  str = str.replace(/\\/g, "");
  return JSON.parse(str);
}