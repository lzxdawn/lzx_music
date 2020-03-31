// --------防抖函数--------
export function debounce(func, delay = 200) {
    let timer = null;
    return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

//生成随机数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//洗牌
export function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let t = getRandomInt(0, i)
        let j = _arr[i]
        _arr[i] = _arr[t]
        _arr[t] = j
    }
    return _arr
}