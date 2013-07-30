DateFormat
==========

<h2>Date Format是一个封装日期格式化的库.</h2>
<p>提供的全局的接口DateFormat(DF).</p>
<h2>日期格式化 DateFormat 使用：</h2>
<p>格式化依据的字符串关键字 可以是一下字符组合：</p>
<p>y M d H h a ap A AP m s z %</p>
<p>例如：</p>
<p>'MM dd yyyy dddd hh:mm:ss'</p>
<p>说明：<i>y--年、M--月、d|dd--日、ddd|dddd--星期、H--24小时制小时数、h--12小时制小时数、a|ap--am pm、A|AP--AM PM、m--分钟、s--秒、z--毫秒、%--当一些关键字连在一起的时候需要区分的字符</i></p>
<h3>1、DataFormat静态方法</h3>
<pre>
var d = new Date();
DF.format(d, 'dd.MM.yyyy. HH:mm:ss.zzz'); // 30.07.2013. 16:59:17.846
DF.format(d, 'yyyy年M月dd日 HH:mm:ss.zzz'); // 2013年7月30日 16:59:17.846
DF.format(d, 'yyyy年MM月dd日 dddd HH:mm:ss.zzz'); // 2013年07月30日 星期二 16:59:17.846
DF.format(d, 'yyyy年MMM%dd日 HH:mm:ss.zzz'); // 2013年7月30日 16:59:17.846
DF.parseFormatted('2013年7月29日 2:50:06.570pm', 'yyyy年M月dd日 h:mm:ss.zzz%a'); // Mon Jul 29 2013 14:50:06 GMT+0800 (中国标准时间)
DF.parseFormatted('2013年7月29日 2:50:06.570am', 'yyyy年M月dd日 h:mm:ss.zzz%ap'); // Mon Jul 29 2013 02:50:06 GMT+0800 (中国标准时间)
</pre>
<p>此外还有：<i>prettyDate mix type now getQR parse pad convertTo12Hour convertTo24Hour parseToInt</i>等方法，具体可参见源代码</p>
<h3>2、DateFormat原型方法</h3>
<pre>
var df = new DF(d);
df.toFormattedString('dd.MM.yyyy. HH:mm:ss.zzz'); // 30.07.2013. 16:59:17.846
df.toFormattedString('dd.MM.yyyy. HH:mm:ss.zzz'); // 30.07.2013. 16:59:17.846
df.toFormattedString('yyyy年M月dd日 HH:mm:ss.zzz'); // 2013年7月30日 16:59:17.846
df.toFormattedString('yyyy年MM月dd日 HH:mm:ss.zzz'); // 2013年07月30日 16:59:17.846
df.toFormattedString('yyyy年MMM%dd日 HH:mm:ss.zzz'); // 2013年7月30日 16:59:17.846
df.fromFormattedString('2013年7月29日 2:50:06.570pm', 'yyyy年M月dd日 h:mm:ss.zzz%a'); // Mon Jul 29 2013 14:50:06 GMT+0800 (中国标准时间)
df.fromFormattedString('2013年7月29日 2:50:06.570am', 'yyyy年M月dd日 h:mm:ss.zzz%ap'); // Mon Jul 29 2013 02:50:06 GMT+0800 (中国标准时间)
</pre>
<p>此外还有：<i>prettyDate setdate getQR</i>等方法，具体可参见源代码</p>


