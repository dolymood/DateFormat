/*
 * ----------------------------------------------------------------------------
 * Package:     JavaScript Date Format
 * Version:     0.1.0
 * Date:        2013-07-29
 * Author:      Doly Mood
 * ----------------------------------------------------------------------------
 * Copyright (c) 2013 Doly Mood
 * Dual licensed under the MIT licenses.
 * ----------------------------------------------------------------------------
 */
(function(win) {

    var Dat = win.Date,
        DatP = Dat.prototype,
        DATAINFO = {
            GB: {
                dayNames:        ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                shortDayNames:   ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                monthNames:      ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                shortMonthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            US: {
                dayNames:        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                shortDayNames:   ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                monthNames:      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        },
        toStr = DATAINFO.toString,
        rrg = /(?:\b|%)([dMyHhaAmsz]+|ap|AP)(?:\b|%)/g;

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

    // 扩展原型方法
    mix(DateFormat.prototype, {
        
        /**
         * 通过格式化字符串设置日期
         * @param strDate {String} 日期字符串
         * @param format {String} 格式化依据字符串
         * @return {Date} 日期
         */
        fromFormattedString: function(strDate, format) {
            this.date.setTime(DateFormat.parseFormatted(strDate, format).getTime());
            return this.date;
        },

        /**
         * 将日期格式化为指定格式字符串
         * @param format {String} 格式化依据字符串
         * @param lang {String|Undefined} 语言 只有两个值 GB | US
         * @return {String} 格式化后日期字符串
         */
        toFormattedString: function(format, lang) {
            return DateFormat.format(this.date, format, lang);
        },

        /**
         * 设置日期
         * @param date {Date} 日期
         * @return {Boolean} 是否设置成功
         */
        setdate: function(date) {
            date = DateFormat.parse(date);
            if (date) {
                this.date = date;
                return true;
            } else {
                return false;
            }
        },

        /**
         * 得到第几季度
         * @return {Number} 1 2 3 4
         */
        getQR: function() {
            return DateFormat.getQR(this.date);
        }

    });
    
    // 扩展 DateFormat 原型 使其具有Date的一切原型方法
    for (var key in DatP) {
        if (DatP.hasOwnProperty(key)) {
            DateFormat.prototype[key] = function() {
                return this.date[key].apply(this.date, arguments);
            };
        }
    }

    // 静态方法
    mix(DateFormat, {

        mix: mix,

        type: getType,

        now: function() {
            return Dat.now();
        },

        /**
         * 得到第几季度
         * @param date {Date} 日期
         * @return {Number} 1 2 3 4
         */
        getQR: function(date) {
            return (Math.floor(date.getMonth()/3) + 1);
        },

        /**
         * 转换为日期
         * @param strDate {String|Date|Undefined} 要转换的日期 
         * @return {Date|NULL} 转换后的日期 或者 null(不能转化为可用日期)
         */
        parse: function(strDate) {
            if (!strDate) return new Dat();
            if (strDate instanceof Dat) return strDate;
            var ret = new Date(strDate);
            if (!ret.getTime()) ret = null;
            return ret;
        },

        /**
         * 格式化为多少位数字--03
         * @param val {Number|String} 数字或者数字字符串
         * @param len {Number} 格式化后的位数 整数
         * @param cut {Boolean|Undefined} 是否裁剪
         * @return {String} 格式化后数字字符串
         */
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

        /**
         * 将小时数转化为12小时制的小时数
         * @param h {Number} 几时
         * @return {Number} 12小时制的小时数
         */
        convertTo12Hour: function(h) {
            return h % 12 === 0 ? 12 : h % 12;
        },

        /**
         * 将小时数转化为24小时制的小时数
         * @param h {Number} 几时
         * @param ap {String} pm PM am AM
         * @return {Number} 24小时制的小时数
         */
        convertTo24Hour: function(h, ap) {
            ap = ap.toLowerCase();
            h = DateFormat.parseToInt(h);
            return ap === 'pm' ?
                            h < 12 ? (h + 12) :
                                     h 
                               :
                            h === 12 ? 0 :
                                       h; 
        },

        parseToInt: function(val) {
            return parseInt(val, 10);
        },

        /**
         * 将日期格式化为指定格式字符串
         * @param date {Date} 日期
         * @param format {String} 格式化依据字符串
         * @param lang {String|Undefined} 语言 只有两个值 GB | US
         * @return {String} 格式化后日期字符串
         */
        format: function(date, format, lang) {
            var parts = {},
                lang = (lang ? (lang == 'GB' || lang == 'US') ? lang : 'GB' : 'GB'),
                i18n = DATAINFO[lang],
                isAmPm = (format.indexOf('a') !== -1) || (format.indexOf('A') !== -1),
                pad = DateFormat.pad,
                convertTo12Hour = DateFormat.convertTo12Hour,
                temp;

            parts['d']     = date.getDate();
            parts['dd']    = pad(parts['d'], 2);
            temp           = date.getDay();
            parts['ddd']   = i18n.shortDayNames[temp];
            parts['dddd']  = i18n.dayNames[temp];
            parts['M']     = date.getMonth() + 1;
            temp           = parts['M'],
            parts['MM']    = pad(temp, 2);
            parts['MMM']   = i18n.shortMonthNames[temp - 1];
            parts['MMMM']  = i18n.monthNames[temp - 1];
            parts['yyyy']  = date.getFullYear();
            temp           = parts['yyyy'];
            parts['yyy']   = pad(temp, 2) + 'y';
            parts['yy']    = pad(temp, 2);
            parts['y']     = 'y';
            parts['H']     = date.getHours();
            temp           = parts['H'];
            parts['hh']    = pad(isAmPm ? convertTo12Hour(temp) : temp, 2);
            parts['h']     = isAmPm ? convertTo12Hour(temp) : temp;
            parts['HH']    = pad(temp, 2);
            temp           = parts['H'] < 12;
            parts['ap']    = temp ? 'am' : 'pm';
            parts['a']     = temp ? 'am' : 'pm';
            parts['AP']    = temp ? 'AM' : 'PM';
            parts['A']     = temp ? 'AM' : 'PM';
            parts['m']     = date.getMinutes();
            parts['mm']    = pad(parts['m'], 2);
            parts['s']     = date.getSeconds();
            parts['ss']    = pad(parts['s'], 2);
            parts['z']     = date.getMilliseconds();
            temp           = parts['z'];
            parts['zz']    = temp + 'z';
            parts['zzz']   = pad(temp, 3);

            return format.replace(rrg, function(match, $1) {
                var _ = parts[$1];
                return _ == undefined ? $1 : _
            });
        },

        /**
         * 通过格式化字符串将日期字符串转换为日期
         * @param strDate {String} 日期字符串
         * @param format {String} 格式化依据字符串
         * @return {Date} 日期
         */
        parseFormatted: function(strDate, format) {
            var lang = (lang ? (lang == 'GB' || lang == 'US') ? lang : 'GB' : 'GB'),
                i18n = DATAINFO[lang],
                parseToInt = DateFormat.parseToInt,
                convertTo24Hour = DateFormat.convertTo24Hour,
                i, ret;
            ret = DateFormat.parse(strDate);
            if (ret) return ret;
            ret = new Date(2000, 0, 1);
            i = 0;
            format.replace(rrg, function(match, $1, index, _, tmp, temp) {
                if ($1 === 'a') $1 = 'ap';
                if ($1 === 'A') $1 = 'AP';
                temp = strDate.slice(index + i, index + i + $1.length);
                tmp = parseToInt(temp);
                i += ($1.length - match.length);
                switch($1)
                {
                    case 'yyyy':
                    case 'yyy':
                        ret.setYear(tmp);
                        break;

                    case 'yy':
                        ret.setYear(2000 + tmp);
                        break;

                    case 'MM':
                    case 'M':
                        ret.setMonth(tmp - 1);
                        break;

                    case 'dd':
                    case 'd':
                        ret.setDate(tmp);
                        break;

                    case 'hh':
                    case 'h':
                    case 'HH':
                    case 'H':
                        ret.setHours(tmp);
                        break;

                    case 'mm':
                    case 'm':
                        ret.setMinutes(tmp);
                        break;

                    case 'ss':
                    case 's':
                        ret.setSeconds(tmp);
                        break;

                    case 'zzz':
                    case 'zz':
                    case 'z':
                        ret.setMilliseconds(tmp);
                        break;

                    case 'AP':
                    case 'ap':
                        ret.setHours(convertTo24Hour(ret.getHours(), temp));
                        break;
                }
                return $1;
            });
            return ret;
        }

    });

    win.DateFormat = win.DF = DateFormat;

})(window)