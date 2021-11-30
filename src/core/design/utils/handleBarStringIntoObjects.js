function checkifObjectPresent(obj, values, getKey) {
    if (getKey.index === values.length || Object.keys(obj).length == 0) {
        return;
    }
    for (const keys in obj) {
        if (keys == values[getKey.index]) {
            getKey.matchingKey = keys;
            getKey.index += 1;
            getKey.obj = obj[keys];
            checkifObjectPresent(obj[keys], values, getKey);
        }
    }
}
function convertHandlebarStringToObject(tmp1) {
    var i = 2,
        size = 0;
    var ans;
    var finalObject = {};
    for (const key in tmp1) {
        var str;
        var tempObject = {};
        var container = tempObject;

        var firstKey, flag, newKey;
        var arr = key.split(".");

        var getKey = { matchingKey: "", index: 0, obj: {} };
        checkifObjectPresent(finalObject, arr, getKey);

        if (getKey.matchingKey == "") {
            for (var i = 0; i < arr.length; i++) {
                if (i == 0) {
                    firstKey = arr[i];
                } else {
                    if (i == arr.length - 1) {
                        container[arr[i]] = "";
                    } else {
                        container[arr[i]] = {};
                        container = container[arr[i]];
                    }
                }
            }
            if (Object.keys(tempObject).length == 0) {
                finalObject[firstKey] = "";
            } else {
                finalObject[firstKey] = tempObject;
            }
        } else {
            for (var i = getKey.index; i < arr.length; i++) {
                if (arr[i] in getKey.obj) {
                    getKey.obj = getKey.obj[arr[i]];
                } else {
                    if (i == arr.length - 1) {
                        getKey.obj[arr[i]] = "";
                    } else {
                        getKey.obj[arr[i]] = {};
                        getKey.obj = getKey.obj[arr[i]];
                    }
                }
            }
        }
    }
    ans = JSON.stringify(finalObject, null, 4);
    return ans;
}
export default convertHandlebarStringToObject;
