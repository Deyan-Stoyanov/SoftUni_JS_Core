function getFormat(formatter) {
    function format(value) {
        return formatter(",", "$", true, value);
    }
    return format;
}
