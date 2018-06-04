//节流函数
function debounce(func, delay) {
  var timer;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,arguments)
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