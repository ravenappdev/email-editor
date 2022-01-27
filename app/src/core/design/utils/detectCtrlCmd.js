function ifCtrlCmdPressed(e, path) {
    var mac = navigator.userAgent.indexOf("Mac OS X");

    if (mac == -1) {
        if (e.ctrlKey && path != "#") {
            window.open(path, "_blank");
        }
    } else {
        if (e.metaKey && path != "#") {
            window.open(path, "_blank");
        }
    }
}

export default ifCtrlCmdPressed;
