//주어진 값이 함수이거나 객체 여부를 판단
export function isObject(value) {
    if (value === null) return false;
    return ( (typeof value === 'function') || (typeof value === 'object') );
}
//객체 default, child 객체 탐색
export function defaultAll(obj, defaultVal) {
    for (let key in obj) {
        if ( isObject(obj[key]) ) {
            defaultAll(obj[key], defaultVal); //재귀
        } else {
            obj[key] = defaultVal;
        }
    }
    return obj;
}
//객체 default, 특정 필드(excluded [])는 제외, child 객체는 탐색 안함
export function defaultExFields(obj, defaultVal, excluded) {
    if (!excluded) excluded = [];
    for (let key in obj) {
        if ( !excluded.includes(key) ) obj[key] = defaultVal;
    }
    return obj;
}
//객체 default, 특정 필드(included [])만 포함, child 객체는 탐색 안함
export function defaultInFields(obj, defaultVal, included) {
    if (!included) included = [];
    for (let key in obj) {
        if ( included.includes(key) ) obj[key] = defaultVal;
    }
    return obj;
}
//주어진 값이 null 또는 공백 여부
export function isEmpty(value){
    return value === null || value === "";
}
//주어진 값이 null 또는 공백 여부
export function isValid(value){
    return !isEmpty(value);
}
//params 내의 각 속성을 검사하여 그 값이 null이나 ""이면 해당 속성 제거
export function ignoreEmpty(obj) {
    let newObj = {};
    let isAnyValue = false;

    for(let key in obj) {
        if ( isObject(obj[key]) ) {
            let ret =  ignoreEmpty(obj[key]);
            if (ret) {
                isAnyValue = true;
                Object.assign(newObj, { [key]: ret }); //재귀
            }
        } else {
            if ( !isEmpty(obj[key]) ) {
                isAnyValue = true;
                Object.assign(newObj, { [key]: obj[key] });
            }
        }
    }
    /*
    for(let key in newObj) {
        if ( isEmpty(newObj[key]) ) {
            delete newObj[key];
        }
    }
    */

    if (isAnyValue) return newObj;
    else return false;
}
//params 내의 각 속성 값(value 프로퍼티)을 검사하여 속성 값이 null이나 ""이 아닌 유효한 값이 있을 경우 그 개수 반환(search=true 인 경우 한정)
export function countTextInSearchedParams(obj) {
    let count = 0;
    for(let key in obj) {
        if ( obj[key].search
                && key !== "and"
                && isValid(obj[key].value) ) { //search 속성이 true 인 경우(search 대상인 경우)만 검사
            count++;
        }
    }
    return count;
}
//위와 같은데 하나라도 유효한 값이 있으면 true 아니면 false(search=true 인 경우 한정)
export function isTextInSearchedParams(obj) {
    for(let key in obj) {
        if ( obj[key].search
                && key !== "and"
                && isValid(obj[key].value) ) { //search 속성이 true 인 경우(search 대상인 경우)만 검사
            return true;
        }
    }
    return false;
}
//현재 url path에서 가장 나중 디렉토리 추출하여 store의 namespace로 활용
export function getLastPath() {
    let str = window.location.pathname;
    let arr = str.trim().replace(/\/$/gi, "").split("/");
    return arr[arr.length-1];
}
export function storeNamespace() {
    let str = window.location.pathname;
    let arr = str.trim().replace(/\/$/gi, "").split("/");
    return arr[arr.length-1];
}
//첫문자를 대문자로
export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
//params를 index 순서에 따라 정렬(search=true인 경우에 한정), 새로운 객체로 리턴
export function sortSearchedParams(obj, indexField) {
    if (!indexField) indexField = "index";

    let sortedKeys  = Object.keys(obj).sort(function(a,b){
        return obj[a][indexField] < obj[b][indexField] ? -1 : obj[a][indexField] < obj[b][indexField] ? 1 : 0;
    });

    // let arr = [];
    let newObj = {};
    for (let i=0; i<sortedKeys.length; i++) {
        if (obj[sortedKeys[i]].search) {
            // arr.push(obj[sortedKeys[i]]);
            Object.assign(newObj, {[sortedKeys[i]]: obj[sortedKeys[i]]});
        }
    }
    // console.log("newObj", newObj);
    // return arr;
    return newObj;
}
// 'aaa.bbb' 를 camel case로 즉, 'AaaBaa'로
export function toCamelWithDot(str) {
    let arr = str.split(".");
    for (let i=0; i < arr.length; i++) {
        arr[i] = capitalizeFirstLetter(arr[i]);
    }
    return arr.join("");
}