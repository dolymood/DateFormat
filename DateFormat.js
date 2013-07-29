(function(win) {

    var Dat = win.Date,
        formarObj = {},
        aslice = [].slice,
        toStr = formarObj.toString;

    if (!Dat.now) {
        Dat.now = function() {
            return new Dat().getTime();
        };
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '')
        };
    }

    function getType(obj, typeVal) {
        var ret = '';
        if (obj == null) ret = String(obj);
        ret = typeof obj;
        if (ret === 'object' || ret === 'function') {
            ret = toStr.call(obj).slice(8, -1).toLowerCase();
        }
        return (typeVal && typeof typeVal === 'string' && (typeVal = typeVal.toLowerCase())) ?
               typeVal === ret :
               ret;
    }

    function mix(target) {
        var args = [].slice.call(arguments, 1);
        for (var i = 0, len = args.length, key, tmp; i < len; i++) {
            tmp = args[i];
            if (Object(tmp) === tmp) {
                for (key in tmp) {
                    if (tmp.hasOwnProperty(key)) {
                        target[key] = tmp[key];
                    }
                }
            }
        }
        return target;
    }

    function DateFormat(date) {
        this.date = DateFormat.parse(date);
    }

    mix(DateFormat, {

        mix: mix,

        type: getType,

        Date: Dat,

        parse: function(strDate) {
            if (!strDate) return new Dat();
            if (strDate instanceof Dat) return strDate;
            return new Date(strDate);
        },

        pad: function(val, len, cut) {
            if (len < 1) return '';
            if (getType(cut, 'undefined')) cut = true;
            val = '' + val;
            for (var i = 0 ; i < len; i++) {
                val = '0' + val;
            }
            i = val.length - len;
            return val.substring(cut ? i : i > 0 ? len : i);
        },

        format: function(date, format) {

        }

    });

    win.DateFormat = win.DF = DateFormat;

})(window)