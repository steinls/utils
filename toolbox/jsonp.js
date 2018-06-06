import originJsonp from 'jsonp'

export default function jsonp(url,data,option){
  var url += (url.test(/?$/)?'?':'&')+param(data);
  return new Promise((resolve,reject)=>{
    originJsonp(url,option,(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  });
}

// 拼接url
function param(option){
  var search = ''
  for(i in option){
    var key = encodeURIComponent(i)
    var value = option[i]?encodeURIComponent(option[i]):''
    search+='&'+key+'='+value
  }
  return search?search.slice(1):''
}
