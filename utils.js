//节流函数
export function debounce(func, delay) {
  var timer;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this,arguments)
    }, delay)
  }
}


