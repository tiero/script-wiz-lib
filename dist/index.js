module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var u=t[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)r.d(n,u,function(t){return e[t]}.bind(null,u));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.opcodeToWord=t.hexLittleEndian=void 0;var u=n(r(7));t.hexLittleEndian=function(e){if(e.length%2==0){var t="0x",r=0;e.startsWith("0x")&&(r=2);for(var n=e.length;n>r;n-=2)t+=e.substring(n-2,n);return t}return console.warn("its odd"),"something went wrong"};t.opcodeToWord=function(e){var t;return(null===(t=u.default.find((function(t){return t.opcode===e})))||void 0===t?void 0:t.word)||""}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MAX_INTEGER=t.EMOJI_REGEX=void 0;t.MAX_INTEGER=2147483647;t.EMOJI_REGEX=/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),u=r(1);t.default=function(e){var t,r=e;e.length%2==1&&(r=e.substr(0,e.length-1)+"0"+e.substr(e.length-1,1));var a=void 0,i=n.hexLittleEndian(r),o=parseInt(i);return o<=u.MAX_INTEGER?(a=o,t=o):t=r,{input:e,numberValue:a,byteValue:r,byteValueDisplay:t.toString(),stringValue:e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),u=r(1),a=function(e){if(0===e)return"";var t=function(e){var t=0;if(0===e)return t;Math.abs(e);for(var r=1;r<5;r++){var n=Math.pow(2,8*(r-1)-1),u=Math.pow(2,8*r-1);if(-1*u<e&&e<=-1*n||n<=e&&e<u){t=r;break}}return t}(e),r=e;e<0&&0!==t&&(r=Math.pow(2,8*t-1)-e);var n=r.toString(16);return n.length%2==1&&(n="0"+n),(n.length/2<t||0===t)&&(n="00"+n),n};t.default=function(e){var t=Number(e),r=a(t),i=n.hexLittleEndian(r),o=void 0,l=i;return t<=u.MAX_INTEGER&&(o=t,l=e),{input:e,numberValue:o,byteValueDisplay:l,byteValue:i}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);t.default=function(e){var t="0x"+function(e){var t,r="";for(t=0;t<e.length;t++){r+=("0"+e.charCodeAt(t).toString(16)).slice(-2)}return r}(e),r=parseInt(t),u=void 0;return r<=n.MAX_INTEGER&&(u=r),{input:e,byteValue:t,byteValueDisplay:e,numberValue:u,stringValue:e}}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.stackDataArray=t.clearStack=t.parse=void 0;var u=n(r(6)),a=[];t.stackDataArray=a;t.parse=function(e){var r=u.default(e,a);return r.removeLastSize>0&&(t.stackDataArray=a=a.slice(0,a.length-r.removeLastSize)),a.push(r.data),a};t.clearStack=function(){t.stackDataArray=a=[]}},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=r(0),a=n(r(2)),i=n(r(3)),o=n(r(8)),l=n(r(4));t.default=function(e,t){if(e.startsWith("<")&&e.endsWith(">"))return{data:function(e){if(e.startsWith("0x"))return console.log("byte data input"),a.default(e);if(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'")){var t=e.substr(1,e.length-2);return l.default(t)}if(e.startsWith("OP_"),isNaN(e))throw console.log("what happend"),"it is not a valid input";return console.log("number data input"),i.default(e)}(e.substr(1,e.length-2)),removeLastSize:0};if("OP_0"===e||"OP_FALSE"===e)return{data:{byteValue:"0x00",input:"0x00",numberValue:0,byteValueDisplay:"0"},removeLastSize:0};if(isNaN(e),e.startsWith("OP_")||!isNaN(e)){var r=e;if(!isNaN(e)&&""===(r=u.opcodeToWord(Number(e))))throw"Unknown OP code number";var n=t.length;if(n<2)throw"Empty stack error";var s=2===n?void 0:t[n-3];return o.default(r,t[n-1],t[n-2],s)}throw"it is not a valid input or OP code"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=[{word:"OP_CAT",opcode:126},{word:"OP_SUBSTR",opcode:127},{word:"OP_ADD",opcode:147},{word:"OP_SUB",opcode:148}]},function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=n(r(2)),a=n(r(3)),i=n(r(4)),o=function(e,t){if(void 0!==e.numberValue&&void 0!==t.numberValue){var r=e.numberValue+t.numberValue;return a.default(r.toString())}throw console.error("Invalid input: this operation requires a valid Script Number."),"Invalid input: this operation requires a valid Script Number."},l=function(e,t){if(void 0!==t.numberValue&&void 0!==e.numberValue){var r=e.numberValue-t.numberValue;return a.default(r.toString())}throw console.error("Invalid input: this operation requires a valid Script Number."),"Invalid input: this operation requires a valid Script Number."},s=function(e,t){var r="0x"+e.byteValue.substring(2)+t.byteValue.substring(2);return u.default(r)},d=function(e,t,r){if(void 0!==e.stringValue){if(t.numberValue&&r.numberValue){var n=e.stringValue.substr(t.numberValue,r.numberValue);return i.default(n)}throw console.error("Index and size must be number !"),"Index and size must be number !"}throw console.error("Data string value undefined !"),"Data string value undefined !"};t.default=function(e,t,r,n){if("OP_ADD"===e)return{data:o(r,t),removeLastSize:2};if("OP_SUB"===e)return{data:l(r,t),removeLastSize:2};if("OP_CAT"===e)return{data:s(r,t),removeLastSize:2};if("OP_SUBSTR"===e&&n)return{data:d(n,r,t),removeLastSize:3};throw"Invalid OP code!"}}]);
//# sourceMappingURL=index.js.map