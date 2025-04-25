// Custom Scripts
/*!
 * validate.js 0.13.1
 * http://validatejs.org/
 * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
 * validate.js may be freely distributed under the MIT license.
*/

(function(a,b,c){"use strict";var d=function(a,b,c){c=e.extend({},e.options,c);var f=e.runValidations(a,b,c);if(f.some(function(a){return e.isPromise(a.error)}))throw new Error("Use validate.async if you want support for promises");return d.processValidationResults(f,c)},e=d;e.extend=function(a){return[].slice.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]}),a},e.extend(d,{version:{major:0,minor:13,patch:1,metadata:null,toString:function(){var a=e.format("%{major}.%{minor}.%{patch}",e.version);return e.isEmpty(e.version.metadata)||(a+="+"+e.version.metadata),a}},Promise:"undefined"!=typeof Promise?Promise:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(a,b,c){var d,f,g,h,i,j,k,l=[];(e.isDomElement(a)||e.isJqueryElement(a))&&(a=e.collectFormValues(a));for(d in b){g=e.getDeepObjectValue(a,d),h=e.result(b[d],g,a,d,c,b);for(f in h){if(i=e.validators[f],!i)throw k=e.format("Unknown validator %{name}",{name:f}),new Error(k);j=h[f],j=e.result(j,g,a,d,c,b),j&&l.push({attribute:d,value:g,validator:f,globalOptions:c,attributes:a,options:j,error:i.call(i,g,j,d,a,c)})}}return l},processValidationResults:function(a,b){a=e.pruneEmptyErrors(a,b),a=e.expandMultipleErrors(a,b),a=e.convertErrorMessages(a,b);var c=b.format||"grouped";if("function"!=typeof e.formatters[c])throw new Error(e.format("Unknown format %{format}",b));return a=e.formatters[c](a),e.isEmpty(a)?void 0:a},async:function(a,b,c){c=e.extend({},e.async.options,c);var d=c.wrapErrors||function(a){return a};c.cleanAttributes!==!1&&(a=e.cleanAttributes(a,b));var f=e.runValidations(a,b,c);return new e.Promise(function(g,h){e.waitForResults(f).then(function(){var i=e.processValidationResults(f,c);i?h(new d(i,c,a,b)):g(a)},function(a){h(a)})})},single:function(a,b,c){return c=e.extend({},e.single.options,c,{format:"flat",fullMessages:!1}),e({single:a},{single:b},c)},waitForResults:function(a){return a.reduce(function(a,b){return e.isPromise(b.error)?a.then(function(){return b.error.then(function(a){b.error=a||null})}):a},new e.Promise(function(a){a()}))},result:function(a){var b=[].slice.call(arguments,1);return"function"==typeof a&&(a=a.apply(null,b)),a},isNumber:function(a){return"number"==typeof a&&!isNaN(a)},isFunction:function(a){return"function"==typeof a},isInteger:function(a){return e.isNumber(a)&&a%1===0},isBoolean:function(a){return"boolean"==typeof a},isObject:function(a){return a===Object(a)},isDate:function(a){return a instanceof Date},isDefined:function(a){return null!==a&&void 0!==a},isPromise:function(a){return!!a&&e.isFunction(a.then)},isJqueryElement:function(a){return a&&e.isString(a.jquery)},isDomElement:function(a){return!!a&&(!(!a.querySelectorAll||!a.querySelector)&&(!(!e.isObject(document)||a!==document)||("object"==typeof HTMLElement?a instanceof HTMLElement:a&&"object"==typeof a&&null!==a&&1===a.nodeType&&"string"==typeof a.nodeName)))},isEmpty:function(a){var b;if(!e.isDefined(a))return!0;if(e.isFunction(a))return!1;if(e.isString(a))return e.EMPTY_STRING_REGEXP.test(a);if(e.isArray(a))return 0===a.length;if(e.isDate(a))return!1;if(e.isObject(a)){for(b in a)return!1;return!0}return!1},format:e.extend(function(a,b){return e.isString(a)?a.replace(e.format.FORMAT_REGEXP,function(a,c,d){return"%"===c?"%{"+d+"}":String(b[d])}):a},{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(a){return e.isNumber(a)?100*a%1===0?""+a:parseFloat(Math.round(100*a)/100).toFixed(2):e.isArray(a)?a.map(function(a){return e.prettify(a)}).join(", "):e.isObject(a)?e.isDefined(a.toString)?a.toString():JSON.stringify(a):(a=""+a,a.replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,function(a,b,c){return""+b+" "+c.toLowerCase()}).toLowerCase())},stringifyValue:function(a,b){var c=b&&b.prettify||e.prettify;return c(a)},isString:function(a){return"string"==typeof a},isArray:function(a){return"[object Array]"==={}.toString.call(a)},isHash:function(a){return e.isObject(a)&&!e.isArray(a)&&!e.isFunction(a)},contains:function(a,b){return!!e.isDefined(a)&&(e.isArray(a)?a.indexOf(b)!==-1:b in a)},unique:function(a){return e.isArray(a)?a.filter(function(a,b,c){return c.indexOf(a)==b}):a},forEachKeyInKeypath:function(a,b,c){if(e.isString(b)){var d,f="",g=!1;for(d=0;d<b.length;++d)switch(b[d]){case".":g?(g=!1,f+="."):(a=c(a,f,!1),f="");break;case"\\":g?(g=!1,f+="\\"):g=!0;break;default:g=!1,f+=b[d]}return c(a,f,!0)}},getDeepObjectValue:function(a,b){if(e.isObject(a))return e.forEachKeyInKeypath(a,b,function(a,b){if(e.isObject(a))return a[b]})},collectFormValues:function(a,b){var c,d,f,g,h,i,j={};if(e.isJqueryElement(a)&&(a=a[0]),!a)return j;for(b=b||{},g=a.querySelectorAll("input[name], textarea[name]"),c=0;c<g.length;++c)if(f=g.item(c),!e.isDefined(f.getAttribute("data-ignored"))){var k=f.name.replace(/\./g,"\\\\.");i=e.sanitizeFormValue(f.value,b),"number"===f.type?i=i?+i:null:"checkbox"===f.type?f.attributes.value?f.checked||(i=j[k]||null):i=f.checked:"radio"===f.type&&(f.checked||(i=j[k]||null)),j[k]=i}for(g=a.querySelectorAll("select[name]"),c=0;c<g.length;++c)if(f=g.item(c),!e.isDefined(f.getAttribute("data-ignored"))){if(f.multiple){i=[];for(d in f.options)h=f.options[d],h&&h.selected&&i.push(e.sanitizeFormValue(h.value,b))}else{var l="undefined"!=typeof f.options[f.selectedIndex]?f.options[f.selectedIndex].value:"";i=e.sanitizeFormValue(l,b)}j[f.name]=i}return j},sanitizeFormValue:function(a,b){return b.trim&&e.isString(a)&&(a=a.trim()),b.nullify!==!1&&""===a?null:a},capitalize:function(a){return e.isString(a)?a[0].toUpperCase()+a.slice(1):a},pruneEmptyErrors:function(a){return a.filter(function(a){return!e.isEmpty(a.error)})},expandMultipleErrors:function(a){var b=[];return a.forEach(function(a){e.isArray(a.error)?a.error.forEach(function(c){b.push(e.extend({},a,{error:c}))}):b.push(a)}),b},convertErrorMessages:function(a,b){b=b||{};var c=[],d=b.prettify||e.prettify;return a.forEach(function(a){var f=e.result(a.error,a.value,a.attribute,a.options,a.attributes,a.globalOptions);return e.isString(f)?("^"===f[0]?f=f.slice(1):b.fullMessages!==!1&&(f=e.capitalize(d(a.attribute))+" "+f),f=f.replace(/\\\^/g,"^"),f=e.format(f,{value:e.stringifyValue(a.value,b)}),void c.push(e.extend({},a,{error:f}))):void c.push(a)}),c},groupErrorsByAttribute:function(a){var b={};return a.forEach(function(a){var c=b[a.attribute];c?c.push(a):b[a.attribute]=[a]}),b},flattenErrorsToArray:function(a){return a.map(function(a){return a.error}).filter(function(a,b,c){return c.indexOf(a)===b})},cleanAttributes:function(a,b){function c(a,b,c){return e.isObject(a[b])?a[b]:a[b]=!!c||{}}function d(a){var b,d={};for(b in a)a[b]&&e.forEachKeyInKeypath(d,b,c);return d}function f(a,b){if(!e.isObject(a))return a;var c,d,g=e.extend({},a);for(d in a)c=b[d],e.isObject(c)?g[d]=f(g[d],c):c||delete g[d];return g}return e.isObject(b)&&e.isObject(a)?(b=d(b),f(a,b)):{}},exposeModule:function(a,b,c,d,e){c?(d&&d.exports&&(c=d.exports=a),c.validate=a):(b.validate=a,a.isFunction(e)&&e.amd&&e([],function(){return a}))},warn:function(a){"undefined"!=typeof console&&console.warn&&console.warn("[validate.js] "+a)},error:function(a){"undefined"!=typeof console&&console.error&&console.error("[validate.js] "+a)}}),d.validators={presence:function(a,b){if(b=e.extend({},this.options,b),b.allowEmpty!==!1?!e.isDefined(a):e.isEmpty(a))return b.message||this.message||"can't be blank"},length:function(a,b,c){if(e.isDefined(a)){b=e.extend({},this.options,b);var d,f=b.is,g=b.maximum,h=b.minimum,i=b.tokenizer||function(a){return a},j=[];a=i(a);var k=a.length;return e.isNumber(k)?(e.isNumber(f)&&k!==f&&(d=b.wrongLength||this.wrongLength||"is the wrong length (should be %{count} characters)",j.push(e.format(d,{count:f}))),e.isNumber(h)&&k<h&&(d=b.tooShort||this.tooShort||"is too short (minimum is %{count} characters)",j.push(e.format(d,{count:h}))),e.isNumber(g)&&k>g&&(d=b.tooLong||this.tooLong||"is too long (maximum is %{count} characters)",j.push(e.format(d,{count:g}))),j.length>0?b.message||j:void 0):b.message||this.notValid||"has an incorrect length"}},numericality:function(a,b,c,d,f){if(e.isDefined(a)){b=e.extend({},this.options,b);var g,h,i=[],j={greaterThan:function(a,b){return a>b},greaterThanOrEqualTo:function(a,b){return a>=b},equalTo:function(a,b){return a===b},lessThan:function(a,b){return a<b},lessThanOrEqualTo:function(a,b){return a<=b},divisibleBy:function(a,b){return a%b===0}},k=b.prettify||f&&f.prettify||e.prettify;if(e.isString(a)&&b.strict){var l="^-?(0|[1-9]\\d*)";if(b.onlyInteger||(l+="(\\.\\d+)?"),l+="$",!new RegExp(l).test(a))return b.message||b.notValid||this.notValid||this.message||"must be a valid number"}if(b.noStrings!==!0&&e.isString(a)&&!e.isEmpty(a)&&(a=+a),!e.isNumber(a))return b.message||b.notValid||this.notValid||this.message||"is not a number";if(b.onlyInteger&&!e.isInteger(a))return b.message||b.notInteger||this.notInteger||this.message||"must be an integer";for(g in j)if(h=b[g],e.isNumber(h)&&!j[g](a,h)){var m="not"+e.capitalize(g),n=b[m]||this[m]||this.message||"must be %{type} %{count}";i.push(e.format(n,{count:h,type:k(g)}))}return b.odd&&a%2!==1&&i.push(b.notOdd||this.notOdd||this.message||"must be odd"),b.even&&a%2!==0&&i.push(b.notEven||this.notEven||this.message||"must be even"),i.length?b.message||i:void 0}},datetime:e.extend(function(a,b){if(!e.isFunction(this.parse)||!e.isFunction(this.format))throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");if(e.isDefined(a)){b=e.extend({},this.options,b);var c,d=[],f=b.earliest?this.parse(b.earliest,b):NaN,g=b.latest?this.parse(b.latest,b):NaN;return a=this.parse(a,b),isNaN(a)||b.dateOnly&&a%864e5!==0?(c=b.notValid||b.message||this.notValid||"must be a valid date",e.format(c,{value:arguments[0]})):(!isNaN(f)&&a<f&&(c=b.tooEarly||b.message||this.tooEarly||"must be no earlier than %{date}",c=e.format(c,{value:this.format(a,b),date:this.format(f,b)}),d.push(c)),!isNaN(g)&&a>g&&(c=b.tooLate||b.message||this.tooLate||"must be no later than %{date}",c=e.format(c,{date:this.format(g,b),value:this.format(a,b)}),d.push(c)),d.length?e.unique(d):void 0)}},{parse:null,format:null}),date:function(a,b){return b=e.extend({},b,{dateOnly:!0}),e.validators.datetime.call(e.validators.datetime,a,b)},format:function(a,b){(e.isString(b)||b instanceof RegExp)&&(b={pattern:b}),b=e.extend({},this.options,b);var c,d=b.message||this.message||"is invalid",f=b.pattern;if(e.isDefined(a))return e.isString(a)?(e.isString(f)&&(f=new RegExp(b.pattern,b.flags)),c=f.exec(a),c&&c[0].length==a.length?void 0:d):d},inclusion:function(a,b){if(e.isDefined(a)&&(e.isArray(b)&&(b={within:b}),b=e.extend({},this.options,b),!e.contains(b.within,a))){var c=b.message||this.message||"^%{value} is not included in the list";return e.format(c,{value:a})}},exclusion:function(a,b){if(e.isDefined(a)&&(e.isArray(b)&&(b={within:b}),b=e.extend({},this.options,b),e.contains(b.within,a))){var c=b.message||this.message||"^%{value} is restricted";return e.isString(b.within[a])&&(a=b.within[a]),e.format(c,{value:a})}},email:e.extend(function(a,b){b=e.extend({},this.options,b);var c=b.message||this.message||"is not a valid email";if(e.isDefined(a))return e.isString(a)&&this.PATTERN.exec(a)?void 0:c},{PATTERN:/^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i}),equality:function(a,b,c,d,f){if(e.isDefined(a)){e.isString(b)&&(b={attribute:b}),b=e.extend({},this.options,b);var g=b.message||this.message||"is not equal to %{attribute}";if(e.isEmpty(b.attribute)||!e.isString(b.attribute))throw new Error("The attribute must be a non empty string");var h=e.getDeepObjectValue(d,b.attribute),i=b.comparator||function(a,b){return a===b},j=b.prettify||f&&f.prettify||e.prettify;return i(a,h,b,c,d)?void 0:e.format(g,{attribute:j(b.attribute)})}},url:function(a,b){if(e.isDefined(a)){b=e.extend({},this.options,b);var c=b.message||this.message||"is not a valid url",d=b.schemes||this.schemes||["http","https"],f=b.allowLocal||this.allowLocal||!1,g=b.allowDataUrl||this.allowDataUrl||!1;if(!e.isString(a))return c;var h="^(?:(?:"+d.join("|")+")://)(?:\\S+(?::\\S*)?@)?(?:",i="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";if(f?i+="?":h+="(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",h+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"+i+")(?::\\d{2,5})?(?:[/?#]\\S*)?$",g){var j="\\w+\\/[-+.\\w]+(?:;[\\w=]+)*",k="[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*",l="data:(?:"+j+")?(?:;base64)?,"+k;h="(?:"+h+")|(?:^"+l+"$)"}var m=new RegExp(h,"i");return m.exec(a)?void 0:c}},type:e.extend(function(a,b,c,d,f){if(e.isString(b)&&(b={type:b}),e.isDefined(a)){var g=e.extend({},this.options,b),h=g.type;if(!e.isDefined(h))throw new Error("No type was specified");var i;if(i=e.isFunction(h)?h:this.types[h],!e.isFunction(i))throw new Error("validate.validators.type.types."+h+" must be a function.");if(!i(a,g,c,d,f)){var j=b.message||this.messages[h]||this.message||g.message||(e.isFunction(h)?"must be of the correct type":"must be of type %{type}");return e.isFunction(j)&&(j=j(a,b,c,d,f)),e.format(j,{attribute:e.prettify(c),type:h})}}},{types:{object:function(a){return e.isObject(a)&&!e.isArray(a)},array:e.isArray,integer:e.isInteger,number:e.isNumber,string:e.isString,date:e.isDate,"boolean":e.isBoolean},messages:{}})},d.formatters={detailed:function(a){return a},flat:e.flattenErrorsToArray,grouped:function(a){var b;a=e.groupErrorsByAttribute(a);for(b in a)a[b]=e.flattenErrorsToArray(a[b]);return a},constraint:function(a){var b;a=e.groupErrorsByAttribute(a);for(b in a)a[b]=a[b].map(function(a){return a.validator}).sort();return a}},d.exposeModule(d,this,a,b,c)}).call(this,"undefined"!=typeof exports?exports:null,"undefined"!=typeof module?module:null,"undefined"!=typeof define?define:null);
//# sourceMappingURL=validate.min.map
var Notyf=function(){"use strict";var e,o=function(){return(o=Object.assign||function(t){for(var i,e=1,n=arguments.length;e<n;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);return t}).apply(this,arguments)},n=(t.prototype.on=function(t,i){var e=this.listeners[t]||[];this.listeners[t]=e.concat([i])},t.prototype.triggerEvent=function(t,i){var e=this;(this.listeners[t]||[]).forEach(function(t){return t({target:e,event:i})})},t);function t(t){this.options=t,this.listeners={}}(i=e=e||{})[i.Add=0]="Add",i[i.Remove=1]="Remove";var f,i,s=(a.prototype.push=function(t){this.notifications.push(t),this.updateFn(t,e.Add,this.notifications)},a.prototype.splice=function(t,i){i=this.notifications.splice(t,i)[0];return this.updateFn(i,e.Remove,this.notifications),i},a.prototype.indexOf=function(t){return this.notifications.indexOf(t)},a.prototype.onUpdate=function(t){this.updateFn=t},a);function a(){this.notifications=[]}(i=f=f||{}).Dismiss="dismiss";var r={types:[{type:"success",className:"notyf__toast--success",backgroundColor:"#3dc763",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",className:"notyf__toast--error",backgroundColor:"#ed3d3d",icon:{className:"notyf__icon--error",tagName:"i"}}],duration:2e3,ripple:!0,position:{x:"right",y:"bottom"},dismissible:!(i.Click="click")},c=(p.prototype.on=function(t,i){var e;this.events=o(o({},this.events),((e={})[t]=i,e))},p.prototype.update=function(t,i){i===e.Add?this.addNotification(t):i===e.Remove&&this.removeNotification(t)},p.prototype.removeNotification=function(t){var i,e,n=this,t=this._popRenderedNotification(t);t&&((e=t.node).classList.add("notyf__toast--disappear"),e.addEventListener(this.animationEndEventName,i=function(t){t.target===e&&(e.removeEventListener(n.animationEndEventName,i),n.container.removeChild(e))}))},p.prototype.addNotification=function(t){var i=this._renderNotification(t);this.notifications.push({notification:t,node:i}),this._announce(t.options.message||"Notification")},p.prototype._renderNotification=function(t){var i=this._buildNotificationCard(t),e=t.options.className;return e&&(t=i.classList).add.apply(t,e.split(" ")),this.container.appendChild(i),i},p.prototype._popRenderedNotification=function(t){for(var i=-1,e=0;e<this.notifications.length&&i<0;e++)this.notifications[e].notification===t&&(i=e);if(-1!==i)return this.notifications.splice(i,1)[0]},p.prototype.getXPosition=function(t){return(null===(t=null==t?void 0:t.position)||void 0===t?void 0:t.x)||"right"},p.prototype.getYPosition=function(t){return(null===(t=null==t?void 0:t.position)||void 0===t?void 0:t.y)||"bottom"},p.prototype.adjustContainerAlignment=function(t){var i=this.X_POSITION_FLEX_MAP[this.getXPosition(t)],e=this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],t=this.container.style;t.setProperty("justify-content",e),t.setProperty("align-items",i)},p.prototype._buildNotificationCard=function(n){var o=this,t=n.options,i=t.icon;this.adjustContainerAlignment(t);var e=this._createHTMLElement({tagName:"div",className:"notyf__toast"}),s=this._createHTMLElement({tagName:"div",className:"notyf__ripple"}),a=this._createHTMLElement({tagName:"div",className:"notyf__wrapper"}),r=this._createHTMLElement({tagName:"div",className:"notyf__message"});r.innerHTML=t.message||"";var c,p,d,l,u=t.background||t.backgroundColor;i&&(c=this._createHTMLElement({tagName:"div",className:"notyf__icon"}),("string"==typeof i||i instanceof String)&&(c.innerHTML=new String(i).valueOf()),"object"==typeof i&&(p=i.tagName,d=i.className,l=i.text,i=void 0===(i=i.color)?u:i,l=this._createHTMLElement({tagName:void 0===p?"i":p,className:d,text:l}),i&&(l.style.color=i),c.appendChild(l)),a.appendChild(c)),a.appendChild(r),e.appendChild(a),u&&(t.ripple?(s.style.background=u,e.appendChild(s)):e.style.background=u),t.dismissible&&(s=this._createHTMLElement({tagName:"div",className:"notyf__dismiss"}),u=this._createHTMLElement({tagName:"button",className:"notyf__dismiss-btn"}),s.appendChild(u),a.appendChild(s),e.classList.add("notyf__toast--dismissible"),u.addEventListener("click",function(t){var i,e;null!==(e=(i=o.events)[f.Dismiss])&&void 0!==e&&e.call(i,{target:n,event:t}),t.stopPropagation()})),e.addEventListener("click",function(t){var i,e;return null===(e=(i=o.events)[f.Click])||void 0===e?void 0:e.call(i,{target:n,event:t})});t="top"===this.getYPosition(t)?"upper":"lower";return e.classList.add("notyf__toast--"+t),e},p.prototype._createHTMLElement=function(t){var i=t.tagName,e=t.className,t=t.text,i=document.createElement(i);return e&&(i.className=e),i.textContent=t||null,i},p.prototype._createA11yContainer=function(){var t=this._createHTMLElement({tagName:"div",className:"notyf-announcer"});t.setAttribute("aria-atomic","true"),t.setAttribute("aria-live","polite"),t.style.border="0",t.style.clip="rect(0 0 0 0)",t.style.height="1px",t.style.margin="-1px",t.style.overflow="hidden",t.style.padding="0",t.style.position="absolute",t.style.width="1px",t.style.outline="0",document.body.appendChild(t),this.a11yContainer=t},p.prototype._announce=function(t){var i=this;this.a11yContainer.textContent="",setTimeout(function(){i.a11yContainer.textContent=t},100)},p.prototype._getAnimationEndEventName=function(){var t,i=document.createElement("_fake"),e={MozTransition:"animationend",OTransition:"oAnimationEnd",WebkitTransition:"webkitAnimationEnd",transition:"animationend"};for(t in e)if(void 0!==i.style[t])return e[t];return"animationend"},p);function p(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:"flex-start",center:"center",right:"flex-end"},this.Y_POSITION_FLEX_MAP={top:"flex-start",center:"center",bottom:"flex-end"};var t=document.createDocumentFragment(),i=this._createHTMLElement({tagName:"div",className:"notyf"});t.appendChild(i),document.body.appendChild(t),this.container=i,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}function d(t){var e=this;this.dismiss=this._removeNotification,this.notifications=new s,this.view=new c;var i=this.registerTypes(t);this.options=o(o({},r),t),this.options.types=i,this.notifications.onUpdate(function(t,i){return e.view.update(t,i)}),this.view.on(f.Dismiss,function(t){var i=t.target,t=t.event;e._removeNotification(i),i.triggerEvent(f.Dismiss,t)}),this.view.on(f.Click,function(t){var i=t.target,t=t.event;return i.triggerEvent(f.Click,t)})}return d.prototype.error=function(t){t=this.normalizeOptions("error",t);return this.open(t)},d.prototype.success=function(t){t=this.normalizeOptions("success",t);return this.open(t)},d.prototype.open=function(i){var t=this.options.types.find(function(t){return t.type===i.type})||{},t=o(o({},t),i);this.assignProps(["ripple","position","dismissible"],t);t=new n(t);return this._pushNotification(t),t},d.prototype.dismissAll=function(){for(;this.notifications.splice(0,1););},d.prototype.assignProps=function(t,i){var e=this;t.forEach(function(t){i[t]=(null==i[t]?e.options:i)[t]})},d.prototype._pushNotification=function(t){var i=this;this.notifications.push(t);var e=(void 0!==t.options.duration?t:this).options.duration;e&&setTimeout(function(){return i._removeNotification(t)},e)},d.prototype._removeNotification=function(t){t=this.notifications.indexOf(t);-1!==t&&this.notifications.splice(t,1)},d.prototype.normalizeOptions=function(t,i){t={type:t};return"string"==typeof i?t.message=i:"object"==typeof i&&(t=o(o({},t),i)),t},d.prototype.registerTypes=function(t){var i=(t&&t.types||[]).slice();return r.types.map(function(e){var n=-1;i.forEach(function(t,i){t.type===e.type&&(n=i)});var t=-1!==n?i.splice(n,1)[0]:{};return o(o({},e),t)}).concat(i)},d}();

document.addEventListener("DOMContentLoaded", () => {
  const notyf = new Notyf({
    duration: 4000,
    position: { x: "right", y: "bottom" },
    dismissible: true,
  });
  const form = document.querySelector(".contact-form");

  const constraints = {
    name: {
      presence: { allowEmpty: false, message: "^Name is required" },
    },
    email: {
      presence: { allowEmpty: false, message: "^Email is required" },
      email: { message: "^Email is not valid" },
    },
    message: {
      presence: { allowEmpty: false, message: "^Message is required" },
    },
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: form.querySelector("#name").value,
      email: form.querySelector("#email").value,
      message: form.querySelector("#message").value,
    };

    form
      .querySelectorAll(".contact-form__error")
      .forEach((el) => (el.textContent = ""));

    const errors = validate(formData, constraints);

    if (errors) {
      Object.keys(errors).forEach((key) => {
        const input = form.querySelector(`#${key}`);
        const errorEl = input
          .closest(".contact-form__group")
          .querySelector(".contact-form__error");
        errorEl.textContent = errors[key];
      });
      return;
    }

    // Получаем reCAPTCHA токен
    grecaptcha.ready(function () {
      grecaptcha
        //заменить 6LfMhxgrAAAAAPycPkH37QH4R8lR-ik7mAV249D0 на Site Key, получить тут: https://www.google.com/recaptcha/admin/create
        .execute("6LfMhxgrAAAAAPycPkH37QH4R8lR-ik7mAV249D0", {
          action: "submit",
        })
        .then(function (token) {
          formData.recaptchaToken = token;

          // fetch('/backend/php/form-handler.php')
          // Убедитесь, что путь корректен относительно корня сайта.
          // Если PHP-файлы перенесены или находятся за пределами /public,
          // лучше папку backend не хранить в папке public
          // путь возможно нужно будет адаптировать.
          fetch("/backend/php/form-handler.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                notyf.success(data.message || "Message sent!");
                form.reset();
              } else {
                if (data.noty && typeof data.noty.msg === "object") {
                  Object.keys(data.noty.msg).forEach((key) => {
                    notyf.error(data.noty.msg[key]);
                  });
                } else {
                  notyf.error(data.message || "Something went wrong");
                }
              }
            })
            .catch((err) => {
              console.error(err);
              notyf.error("Unexpected error. Please try again later.");
            });
        });
    });
  });

  const scrollOffset = 78;
  const navLinks = document.querySelectorAll(".scroll-link");
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  function closeMobileMenu() {
    menu.classList.remove("active");
    burger.classList.remove("active");
    body.classList.remove("locked");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementTop =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementTop - scrollOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      if (menu.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  });

  function burgerMenu() {
    burger.addEventListener("click", () => {
      if (!menu.classList.contains("active")) {
        menu.classList.add("active");
        burger.classList.add("active");
        body.classList.add("locked");
      } else {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 991.98) {
        closeMobileMenu();
      }
    });
  }
  burgerMenu();

  function fixedHeader() {
    const nav = document.querySelector(".header");
    if (window.scrollY >= 100) {
      nav.classList.add("fixed");
    } else {
      nav.classList.remove("fixed");
    }
  }
  window.addEventListener("scroll", fixedHeader);

  const LiquidButton = class LiquidButton {
    constructor(svg) {
      const options = svg.dataset;
      this.id = this.constructor.id || (this.constructor.id = 1);
      this.constructor.id++;
      this.xmlns = "http://www.w3.org/2000/svg";
      this.tension = options.tension * 1 || 0.4;
      this.width = options.width * 1 || 285;
      this.height = options.height * 1 || 54;
      this.margin = options.margin || 20;
      this.hoverFactor = options.hoverFactor || -0.1;
      this.gap = options.gap || 5;
      this.debug = options.debug || false;
      this.forceFactor = options.forceFactor || 0.2;
      this.color1 = options.color1 || "#b6ddff";
      this.color2 = options.color2 || "#f57343";
      this.color3 = options.color3 || "#f9a98c";
      this.textColor = options.textColor || "#FFFFFF";
      this.text = options.text || "SUPPORT THE PROJECT";
      this.svg = svg;
      this.layers = [
        {
          points: [],
          viscosity: 0.5,
          mouseForce: 100,
          forceLimit: 2,
        },
        {
          points: [],
          viscosity: 0.8,
          mouseForce: 150,
          forceLimit: 3,
        },
      ];
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        layer.viscosity =
          options["layer-" + (layerIndex + 1) + "Viscosity"] * 1 ||
          layer.viscosity;
        layer.mouseForce =
          options["layer-" + (layerIndex + 1) + "MouseForce"] * 1 ||
          layer.mouseForce;
        layer.forceLimit =
          options["layer-" + (layerIndex + 1) + "ForceLimit"] * 1 ||
          layer.forceLimit;
        layer.path = document.createElementNS(this.xmlns, "path");
        this.svg.appendChild(layer.path);
      }
      this.wrapperElement = options.wrapperElement || document.body;
      if (!this.svg.parentElement) {
        this.wrapperElement.append(this.svg);
      }

      this.svgText = document.createElementNS(this.xmlns, "text");
      this.svgText.setAttribute("x", "50%");
      this.svgText.setAttribute("y", "50%");
      this.svgText.setAttribute("dy", ~~(this.height / 8) + "px");
      this.svgText.setAttribute("font-size", ~~(this.height / 3));
      this.svgText.style.fontFamily = "sans-serif";
      this.svgText.setAttribute("text-anchor", "middle");
      this.svgText.setAttribute("pointer-events", "none");
      this.svg.appendChild(this.svgText);

      this.svgDefs = document.createElementNS(this.xmlns, "defs");
      this.svg.appendChild(this.svgDefs);

      this.touches = [];
      this.noise = options.noise || 0;
      document.body.addEventListener("touchstart", this.touchHandler);
      document.body.addEventListener("touchmove", this.touchHandler);
      document.body.addEventListener("touchend", this.clearHandler);
      document.body.addEventListener("touchcancel", this.clearHandler);
      this.svg.addEventListener("mousemove", this.mouseHandler);
      this.svg.addEventListener("mouseout", this.clearHandler);
      this.initOrigins();
      this.animate();
    }

    get mouseHandler() {
      return (e) => {
        this.touches = [
          {
            x: e.offsetX,
            y: e.offsetY,
            force: 1,
          },
        ];
      };
    }

    get touchHandler() {
      return (e) => {
        this.touches = [];
        const rect = this.svg.getBoundingClientRect();
        for (
          let touchIndex = 0;
          touchIndex < e.changedTouches.length;
          touchIndex++
        ) {
          const touch = e.changedTouches[touchIndex];
          const x = touch.pageX - rect.left;
          const y = touch.pageY - rect.top;
          if (x > 0 && y > 0 && x < this.svgWidth && y < this.svgHeight) {
            this.touches.push({ x, y, force: touch.force || 1 });
          }
        }
        e.preventDefault();
      };
    }

    get clearHandler() {
      return (e) => {
        this.touches = [];
      };
    }

    get raf() {
      return (
        this.__raf ||
        (this.__raf = (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            setTimeout(callback, 10);
          }
        ).bind(window))
      );
    }

    distance(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    update() {
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        const points = layer.points;
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const point = points[pointIndex];
          const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
          const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
          const d = Math.sqrt(dx * dx + dy * dy);
          const f = d * this.forceFactor;
          point.vx += f * (dx / d || 0);
          point.vy += f * (dy / d || 0);
          for (
            let touchIndex = 0;
            touchIndex < this.touches.length;
            touchIndex++
          ) {
            const touch = this.touches[touchIndex];
            let mouseForce = layer.mouseForce;
            if (
              touch.x > this.margin &&
              touch.x < this.margin + this.width &&
              touch.y > this.margin &&
              touch.y < this.margin + this.height
            ) {
              mouseForce *= -this.hoverFactor;
            }
            const mx = point.x - touch.x;
            const my = point.y - touch.y;
            const md = Math.sqrt(mx * mx + my * my);
            const mf = Math.max(
              -layer.forceLimit,
              Math.min(layer.forceLimit, (mouseForce * touch.force) / md)
            );
            point.vx += mf * (mx / md || 0);
            point.vy += mf * (my / md || 0);
          }
          point.vx *= layer.viscosity;
          point.vy *= layer.viscosity;
          point.x += point.vx;
          point.y += point.vy;
        }
        for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
          const prev = points[(pointIndex + points.length - 1) % points.length];
          const point = points[pointIndex];
          const next = points[(pointIndex + points.length + 1) % points.length];
          const dPrev = this.distance(point, prev);
          const dNext = this.distance(point, next);

          const line = {
            x: next.x - prev.x,
            y: next.y - prev.y,
          };
          const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

          point.cPrev = {
            x: point.x - (line.x / dLine) * dPrev * this.tension,
            y: point.y - (line.y / dLine) * dPrev * this.tension,
          };
          point.cNext = {
            x: point.x + (line.x / dLine) * dNext * this.tension,
            y: point.y + (line.y / dLine) * dNext * this.tension,
          };
        }
      }
    }

    animate() {
      this.raf(() => {
        this.update();
        this.draw();
        this.animate();
      });
    }

    get svgWidth() {
      return this.width + this.margin * 2;
    }

    get svgHeight() {
      return this.height + this.margin * 2;
    }

    draw() {
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        if (layerIndex === 1) {
          if (this.touches.length > 0) {
            while (this.svgDefs.firstChild) {
              this.svgDefs.removeChild(this.svgDefs.firstChild);
            }
            for (
              let touchIndex = 0;
              touchIndex < this.touches.length;
              touchIndex++
            ) {
              const touch = this.touches[touchIndex];
              const gradient = document.createElementNS(
                this.xmlns,
                "radialGradient"
              );
              gradient.id = "liquid-gradient-" + this.id + "-" + touchIndex;
              const start = document.createElementNS(this.xmlns, "stop");
              start.setAttribute("stop-color", this.color3);
              start.setAttribute("offset", "0%");
              const stop = document.createElementNS(this.xmlns, "stop");
              stop.setAttribute("stop-color", this.color2);
              stop.setAttribute("offset", "100%");
              gradient.appendChild(start);
              gradient.appendChild(stop);
              this.svgDefs.appendChild(gradient);
              gradient.setAttribute("cx", touch.x / this.svgWidth);
              gradient.setAttribute("cy", touch.y / this.svgHeight);
              gradient.setAttribute("r", touch.force);
              layer.path.style.fill = "url(#" + gradient.id + ")";
            }
          } else {
            layer.path.style.fill = this.color2;
          }
        } else {
          layer.path.style.fill = this.color1;
        }
        const points = layer.points;
        const commands = [];
        commands.push("M", points[0].x, points[0].y);
        for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
          commands.push(
            "C",
            points[(pointIndex + 0) % points.length].cNext.x,
            points[(pointIndex + 0) % points.length].cNext.y,
            points[(pointIndex + 1) % points.length].cPrev.x,
            points[(pointIndex + 1) % points.length].cPrev.y,
            points[(pointIndex + 1) % points.length].x,
            points[(pointIndex + 1) % points.length].y
          );
        }
        commands.push("Z");
        layer.path.setAttribute("d", commands.join(" "));
      }
      this.svgText.textContent = this.text;
      this.svgText.style.fill = this.textColor;
    }

    createPoint(x, y) {
      return {
        x: x,
        y: y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0,
      };
    }

    initOrigins() {
      this.svg.setAttribute("width", this.svgWidth);
      this.svg.setAttribute("height", this.svgHeight);
      for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
        const layer = this.layers[layerIndex];
        const points = [];
        for (
          let x = ~~(this.height / 2);
          x < this.width - ~~(this.height / 2);
          x += this.gap
        ) {
          points.push(this.createPoint(x + this.margin, this.margin));
        }
        for (
          let alpha = ~~(this.height * 1.25);
          alpha >= 0;
          alpha -= this.gap
        ) {
          const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
          points.push(
            this.createPoint(
              (Math.sin(angle) * this.height) / 2 +
                this.margin +
                this.width -
                this.height / 2,
              (Math.cos(angle) * this.height) / 2 +
                this.margin +
                this.height / 2
            )
          );
        }
        for (
          let x = this.width - ~~(this.height / 2) - 1;
          x >= ~~(this.height / 2);
          x -= this.gap
        ) {
          points.push(
            this.createPoint(x + this.margin, this.margin + this.height)
          );
        }
        for (
          let alpha = 0;
          alpha <= ~~(this.height * 1.25);
          alpha += this.gap
        ) {
          const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
          points.push(
            this.createPoint(
              this.height -
                (Math.sin(angle) * this.height) / 2 +
                this.margin -
                this.height / 2,
              (Math.cos(angle) * this.height) / 2 +
                this.margin +
                this.height / 2
            )
          );
        }
        layer.points = points;
      }
    }
  };

  const redraw = () => {
    button.initOrigins();
  };

  const buttons = document.getElementsByClassName("liquid-button");
  for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
    const button = buttons[buttonIndex];
    button.liquidButton = new LiquidButton(button);
  }

  const video = document.getElementById("video-in-laptop");
  const videoBtn = document.getElementById("video-laptop-btn");
  const label = document.getElementById("video-laptop-label");

  const circle = document.getElementById("circle");
  const playToPause = document.getElementById("from_play_to_pause");
  const pauseToPlay = document.getElementById("from_pause_to_play");
  const playToPauseLeft = document.getElementById("from_play_to_pause_left");
  const pauseToPlayLeft = document.getElementById("from_pause_to_play_left");

  // Начальное состояние
  circle.classList.remove("play");
  pauseToPlay.beginElement();
  pauseToPlayLeft.beginElement();
  label.textContent = "Watch now";

  // Управление кнопкой
  videoBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // Обновление текста и анимации при воспроизведении
  video.addEventListener("play", () => {
    circle.classList.add("play");
    playToPause.beginElement();
    playToPauseLeft.beginElement();
    label.textContent = "Pause";
  });

  // Обновление текста и анимации при паузе
  video.addEventListener("pause", () => {
    circle.classList.remove("play");
    pauseToPlay.beginElement();
    pauseToPlayLeft.beginElement();
    label.textContent = "Watch now";
  });
});

