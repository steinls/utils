/**
 * 去抖/节流函数
 * @param  {Function} func  需要延迟的函数
 * @param  {Number} delay   延迟时间
 * @param  {Object} context 上下文对象
 * @return {Function}       延迟执行函数
 */
export let debounce = (func = ()=>{}, delay = 700, context = this, ...args) => {
	return () => {
		func.id && clearTimeout(func.id)
		func.id = setTimeout(() => {
			func.apply(context, args)
		}, delay)
	}
}

/**
 * URL地址分割
 * @param  {String} url URL地址
 * @return {Array}     对象(协议，主机名，端口号，路径部分，查询字符串)
 */
export let urlSplit = (url) => {
	let obj = {
		href: '123',
		protocol: '',
		host:'',
		port:'',
		pathname:'',
		search:''
	};
	let urlArr = url.match(/(\w+):\/\/([^/:]+)(:\d*)?([^#\?]*)([^#]*)?/);
	
	let idx = 0;
	for (let key in obj) {
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
export let searchToObj = (search) => {
	let obj = {}
	search.replace(/([^?&]+)=([^?&]+)/g, (str, key, value) => {
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
export let searchGetParam = (name, search) => {
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
export let getUrlData = ({name = '', url} = {}) => {
	let href = url||location.href;
	let search = urlSplit(href).search;

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
export let param = (option) => {
	var search = ''
	for(let i in option){
		var key = encodeURIComponent(i)
		var value = option[i]?encodeURIComponent(option[i]):''
		search+=`&${key}=${value}`
	}
	// 去除开头的&
	return search?search.slice(1):''
}

/**
 * 对象深拷贝
 * @param  {Object} obj1 要拷贝的对象
 * @return {Object}      拷贝的对象
 */
export let deepClone = (obj1) => {
	var obj2 = obj1.constructor === Array ? [] : {};
	for (let key in obj1) {
		// 如果没这个属性就结束本次循环
		if (!obj1.hasOwnProperty(key)) {
			continue;
		}
		// 是对象就递归一下，不然就直接赋值
		if (typeof obj1[key] === 'Object') {
			obj2[key] = deepClone(obj1[key]);
		} else {
			obj2[key] = obj1[key];
		}
	}
	return obj2;
}




