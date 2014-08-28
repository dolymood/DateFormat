DateFormat
==========

## Date Format是一个日期格式化的库.

提供的全局的接口DateFormat(DF).支持中文、英文

### 日期格式化 DateFormat 使用：

格式化依据的字符串关键字 可以是一下字符组合：

  y M d H h a ap A AP m s z %

例如：

'MM dd yyyy dddd hh:mm:ss'

说明：_y--年、M--月、d|dd--日、ddd|dddd--星期、H--24小时制小时数、h--12小时制小时数、a|ap--am pm、A|AP--AM PM、m--分钟、s--秒、z--毫秒、%--当一些关键字连在一起的时候需要区分的字符_

#### 1、DataFormat静态方法

```js
DF.format(d, 'dd.MM.yyyy. HH:mm:ss.zzz'); // 31.07.2013. 10:48:19.751
DF.format(d, 'yyyy年M月dd日 HH:mm:ss.zzz'); // 2013年7月31日 10:48:19.751
DF.format(d, 'yyyy年MM月dd日 dddd HH:mm:ss.zzz'); // 2013年07月31日 星期三 10:48:19.751
DF.format(d, 'yyyy年MMM%dd日 HH:mm:ss.zzz'); // 2013年7月31日 10:48:19.751
DF.parseFormatted('2013年7月29日 2:50:06.570pm', 'yyyy年M月dd日 h:mm:ss.zzz%a'); // Mon Jul 29 2013 14:50:06 GMT+0800 (中国标准时间)
DF.parseFormatted('2013年7月29日 2:50:06.570am', 'yyyy年M月dd日 h:mm:ss.zzz%ap'); // Mon Jul 29 2013 02:50:06 GMT+0800 (中国标准时间)
DF.prettyDate(d, 'GB'); // 刚刚
DF.prettyDate(d, 'US'); // just now
DF.prettyDate(dd, 'GB'); // 1秒以前
DF.prettyDate(dd, 'US'); // 1 second ago
DF.prettyDate(dd, 'GB'); // 6秒以前
DF.prettyDate(dd, 'US'); // 6 seconds ago
DF.prettyDate(dd, 'GB'); // 1分钟以前
DF.prettyDate(dd, 'US'); // 1 minute ago
DF.prettyDate(dd, 'GB'); // 31分钟以前
DF.prettyDate(dd, 'US'); // 31 minutes ago
DF.prettyDate(dd, 'GB'); // 今天 09:47
DF.prettyDate(dd, 'US'); // Today 09:47
DF.prettyDate(dd, 'GB'); // 今天 06:47
DF.prettyDate(dd, 'US'); // Today 06:47
DF.prettyDate(dd, 'GB'); // 昨天 09:47
DF.prettyDate(dd, 'US'); // Yesterday 09:47
DF.prettyDate(dd, 'GB'); // 7月28日 09:47
DF.prettyDate(dd, 'US'); // 28/7 09:47
DF.prettyDate(dd, 'GB'); // 6月11日 09:47
DF.prettyDate(dd, 'US'); // 11/6 09:47
DF.prettyDate(dd, 'GB'); // 3月3日 09:47
DF.prettyDate(dd, 'US'); // 3/3 09:47
DF.prettyDate(dd, 'GB'); // 2012年8月3日 09:47
DF.prettyDate(dd, 'US'); // 3/8/2012 09:47
DF.prettyDate(dd, 'GB'); // 2010年8月3日 09:47
DF.prettyDate(dd, 'US'); // 3/8/2010 09:47
```

此外还有：_`mix` `type` `now` `getQR` `parse` `pad` `convertTo12Hour` `convertTo24Hour`  `parseToInt`_等方法，具体可参见源代码

#### 2、DateFormat原型方法

```js
df.toFormattedString('dd.MM.yyyy. HH:mm:ss.zzz'); // 31.07.2013. 10:50:27.864
df.toFormattedString('dd.MM.yyyy. HH:mm:ss.z'); // 31.07.2013. 10:50:27.864
df.toFormattedString('yyyy年M月dd日 HH:mm:ss.zzz'); // 2013年7月31日 10:50:27.864
df.toFormattedString('yyyy年MM月dd日 HH:mm:ss.zzz'); // 2013年07月31日 10:50:27.864
df.toFormattedString('yyyy年MMM%dd日 HH:mm:ss.zzz'); // 2013年7月31日 10:50:27.864
df.fromFormattedString('2013年7月29日 2:50:06.570pm', 'yyyy年M月dd日 h:mm:ss.zzz%a'); // Mon Jul 29 2013 14:50:06 GMT+0800 (中国标准时间)
df.fromFormattedString('2013年7月29日 2:50:06.570am', 'yyyy年M月dd日 h:mm:ss.zzz%ap'); // Mon Jul 29 2013 02:50:06 GMT+0800 (中国标准时间)
// 原型上的prettyDate方法和静态方法prettyDate基本一样.此处省略.
```

此外还有：_`setdate` `getQR`_等方法，具体可参见源代码


