/**
 * 节流函数
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



/*
* @Author: darke
* @Date:   2019-02-18 17:48:56
* @Last Modified by:   darke
* @Last Modified time: 2019-02-19 10:38:52
*/
/**
 * URL地址分割成对象
 * @param  {String} url URL地址
 * @return {Array}     对象(协议，主机名，端口号，路径部分，查询字符串)
 */
function URLToObj(url){
	var obj = {
		href: '',
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
  * 获取URL地址中查询字符串的值，或转成的对象
  * @param  {String} options.name  参数名，不填则返回对象
  * @param  {String} options.url   url地址
  * @return {String/Object}  参数值/对象
  */
 function getURLData(name, url){
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
 * 将对象拼接成查询字符串
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
 * 去除json字符串里的换行符
 * @param  {String} str 原文
 * @return {Obejct}     处理好的对象
 */
function decodeUnicode(str) {  
  str = str.replace(/\\/g, "%");
  str = unescape(str);
  str = str.replace(/%/g, "\\");
  str = str.replace(/\\/g, "");
  return JSON.parse(str);
}



/**
 * 去除空格
 * @param  {String} str  待处理的字符串
 * @param  {Number} type 处理模式 要清除的空格：
 * 不传 清除所有空格
 * 1 前后的空格
 * 2 前面空格
 * 3 后面空格
 * 其他 原样返回
 * 
 * @return {String}      [处理后的字符串]
 */
function trim(str,type){
	var str = type || 0
    switch (str){
        case 0:return str.replace(/\s+/g,"");
        case 1:return str.replace(/(^\s*)|(\s*$)/g, "");
        case 2:return str.replace(/(^\s*)/g, "");
        case 3:return str.replace(/(\s*$)/g, "");
        default:return str;
    }
}





/**
 * 大小写转换
 * @param  {String} str  待处理字符串
 * @param  {Number} type 大小写转换模式：
 * 1  首字母大写
 * 2  首字母小写
 * 3  大小写反转
 * 4  全部大写
 * 5  全部小写
 * 
 * @return {String}      处理后的字符串
 */
function changeCase(str,type)
{
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                }
                else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                }
                else{
                    itemText += item;
                }
            });
        return itemText;
    }
 
    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}




/**
 * 字符串替换
 * @param  {String} str       待处理字符串
 * @param  {String} AFindText 要替换的字符串
 * @param  {String} ARepText  TIHUAN1C
 * @return {[type]}           [description]
 */
function replaceAll(str,AFindText,ARepText){
　　　raRegExp = new RegExp(AFindText,"g");
　　　return str.replace(raRegExp,ARepText);
}




/**
 * 字符串替换
 * @param  {String} str       原文
 * @param  {String} AFindText 待替换内容
 * @param  {String} ARepText  替换内容
 * @return {String}           处理后字符串
 */
function replaceAll(str,AFindText,ARepText){
　　　raRegExp = new RegExp(AFindText,"g");
　　　return str.replace(raRegExp,ARepText);
}


/**
 * 替换*
 * @param  {String} str      待处理字符串
 * @param  {Array} regArr   前段，中段，后段
 * @param  {Number} type     0中段替换，1两边替换，2前段替换，3后段替换
 * @param  {String} ARepText 要替换成的字符串
 * @return {String}          处理好的字符串
 */
function replaceStr(str, regArr, type,ARepText) {
    var regtext = '', Reg = null,replaceText=ARepText||'*';
    //replaceStr('18819322663',[3,5,3],0)
    //188*****663
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    //replaceStr('asdasdasdaa',[3,5,3],1)
    //***asdas***
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = repeatSte(replaceText, regArr[0]);
        var replaceCount2 = repeatSte(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    //replaceStr('1asd88465asdwqe3',[5],0)
    //*****8465asdwqe3
    else if (regArr.length === 1 && type == 0) {
        regtext = '(^\\w{' + regArr[0] +  '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    //replaceStr('1asd88465asdwqe3',[5],1,'+')
    //"1asd88465as+++++"
    else if (regArr.length === 1 && type == 1) {
        regtext = '(\\w{' + regArr[0] +  '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}



/**
 * 字符串循环复制
 * @param  {String} str   待处理字符串
 * @param  {Number} count 要复制的个数
 * @return {String}       处理好的字符串
 */
function repeatStr(str, count) {
    var text = '';
    var countNum = count || 2;
    for (var i = 0; i < countNum; i++) {
        text += str;
    }
    return text;
}


//checkPwd('12asdASAD')
//3(强度等级为3)
/**
 * 检测密码强度
 * @param  {String} str 密码
 * @return {Number}     强度
 */
function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    }
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    }
    return nowLv;
}

//checkType('165226226326','phone')
//false
//大家可以根据需要扩展
/**
 * 格式验证
 * @param  {String} str  原文
 * @param  {String} type 哪种格式
 * @return {Boolean}     验证结果
 */
function checkType (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default :
            return true;
    }
}



//count取值范围0-36
 
//randomNumber(10)
//"2584316588472575"
 
//randomNumber(14)
//"9b405070dd00122640c192caab84537"
 
//Math.random().toString(36).substring(2);
//"83vhdx10rmjkyb9"
/**
 * 随机码
 * @param  {Number} count 需要几位随机码
 * @return {String}       随机码
 */
function randomNumber(count){
   return Math.random().toString(count).substring(2);
}




/**
 * 字符串出现次数
 * @param  {String} str      原文
 * @param  {String} strSplit 需要检查的字符串
 * @return {Number}          出现次数
 */
function countStr (str,strSplit){
    return str.split(strSplit).length-1
}
// var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
//countStr(strTest,'blog')
//6





// 实现思路：如果当前数组的第i项在当前数组中第一次出现的位置不是i，
// 那么表示第i项是重复的，忽略掉。否则存入结果数组。
// var aa = [1,2,"2",4,9,"a","a",2,3,5,6,5];
// console.log(uniq(aa));
/**
 * 数组去重
 * @param  {Array} array 数组
 * @return {Array}       去重后的数组
 */
function uniq(array){
    var temp = [];
    for(var i = 0; i < array.length; i++) {
        //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
        if(array.indexOf(array[i]) == i){
            temp.push(array[i])
        }
    }
    return temp;
}



/**
 * 打乱数组顺序
 * @param  {Array} arr 数组
 * @return {Array}     打乱后的数组
 */
function upsetArr(arr){
    return arr.sort(function(){ return Math.random() - 0.5});
}



//这一块的封装，主要是针对数字类型的数组
/**
 * 求最大值
 * @param  {Array} arr 数组
 * @return {Number}     最大值
 */
function maxArr(arr){
    return Math.max.apply(null,arr);
}
/**
 * 求最小值
 * @param  {Array} arr 数组
 * @return {Number}     最小值
 */
function minArr(arr){
    return Math.min.apply(null,arr);
}
/**
 * 求和
 * @param  {Array} arr 数组
 * @return {Number}     总数
 */
function sumArr(arr){
    var sumText=0;
    for(var i=0,len=arr.length;i<len;i++){
        sumText+=arr[i];
    }
    return sumText
}
/**
 * 平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
 * @param  {Array} arr 数组
 * @return {Number}     平均值
 */
function covArr(arr){
    var sumText=sumArr(arr);
    var covText=sumText/length;
    return covText
}




/**
 * 从数组中随机获取元素
 * @param  {Array} arr 数组
 * @return {}     随机获取的元素
 */
function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}



