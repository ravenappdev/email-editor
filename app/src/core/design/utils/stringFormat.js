function format(fmtstr) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fmtstr.replace(/\{(\d+)\}/g, function(match, index) {
        return args[index];
    });
}

export default format;
