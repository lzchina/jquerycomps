
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("autocomplete-highlighters",function(e,t){var n=e.Array,r=e.Highlight,i=e.mix(e.namespace("AutoCompleteHighlighters"),{charMatch:function(e,t,i){var s=n.unique((i?e:e.toLowerCase()).split(""));return n.map(t,function(e){return r.all(e.text,s,{caseSensitive:i})})},charMatchCase:function(e,t){return i.charMatch(e,t,!0)},phraseMatch:function(e,t,i){return n.map(t,function(t){return r.all(t.text,[e],{caseSensitive:i})})},phraseMatchCase:function(e,t){return i.phraseMatch(e,t,!0)},startsWith:function(e,t,i){return n.map(t,function(t){return r.all(t.text,[e],{caseSensitive:i,startsWith:!0})})},startsWithCase:function(e,t){return i.startsWith(e,t,!0)},subWordMatch:function(t,i,s){var o=e.Text.WordBreak.getUniqueWords(t,{ignoreCase:!s});return n.map(i,function(e){return r.all(e.text,o,{caseSensitive:s})})},subWordMatchCase:function(e,t){return i.subWordMatch(e,t,!0)},wordMatch:function(e,t,i){return n.map(t,function(t){return r.words(t.text,e,{caseSensitive:i})})},wordMatchCase:function(e,t){return i.wordMatch(e,t,!0)}})},"3.9.1",{requires:["array-extras","highlight-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("autocomplete-sources",function(e,t){var n=e.AutoCompleteBase,r=e.Lang,i="_sourceSuccess",s="maxResults",o="requestTemplate",u="resultListLocator";e.mix(n.prototype,{_YQL_SOURCE_REGEX:/^(?:select|set|use)\s+/i,_beforeCreateObjectSource:function(t){return t instanceof e.Node&&t.get("nodeName").toLowerCase()==="select"?this._createSelectSource(t):e.JSONPRequest&&t instanceof e.JSONPRequest?this._createJSONPSource(t):this._createObjectSource(t)},_createIOSource:function(t){function a(n){var o=n.request;if(r._cache&&o in r._cache){r[i](r._cache[o],n);return}s&&s.isInProgress()&&s.abort(),s=e.io(r._getXHRUrl(t,n),{on:{success:function(t,s){var u;try{u=e.JSON.parse(s.responseText)}catch(a){e.error("JSON parse error",a)}u&&(r._cache&&(r._cache[o]=u),r[i](u,n))}}})}var n={type:"io"},r=this,s,o,u;return n.sendRequest=function(t){o=t;if(u)return;u=!0,e.use("io-base","json-parse",function(){n.sendRequest=a,a(o)})},n},_createJSONPSource:function(t){function u(e){var n=e.request,s=e.query;if(r._cache&&n in r._cache){r[i](r._cache[n],e);return}t._config.on.success=function(t){r._cache&&(r._cache[n]=t),r[i](t,e)},t.send(s)}var n={type:"jsonp"},r=this,s,o;return n.sendRequest=function(i){s=i;if(o)return;o=!0,e.use("jsonp",function(){t instanceof e.JSONPRequest||(t=new e.JSONPRequest(t,{format:e.bind(r._jsonpFormatter,r)})),n.sendRequest=u,u(s)})},n},_createSelectSource:function(e){var t=this;return{type:"select",sendRequest:function(n){var r=[];e.get("options").each(function(e){r.push({html:e.get("innerHTML"),index:e.get("index"),node:e,selected:e.get("selected"),text:e.get("text"),value:e.get("value")})}),t[i](r,n)}}},_createStringSource:function(e){return this._YQL_SOURCE_REGEX.test(e)?this._createYQLSource(e):e.indexOf("{callback}")!==-1?this._createJSONPSource(e):this._createIOSource(e)},_createYQLSource:function(t){function c(o){var u=o.query,a=n.get("yqlEnv"),f=n.get(s),c,h,p;p=r.sub(t,{maxResults:f>0?f:1e3,request:o.request,query:u});if(n._cache&&p in n._cache){n[i](n._cache[p],o);return}c=function(e){n._cache&&(n._cache[p]=e),n[i](e,o)},h={proto:n.get("yqlProtocol")},l?(l._callback=c,l._opts=h,l._params.q=p,a&&(l._params.env=a)):l=new e.YQLRequest(p,{on:{success:c},allowCache:!1},a?{env:a}:null,h),l.send()}var n=this,o={type:"yql"},a,f,l;return n.get(u)||n.set(u,n._defaultYQLLocator),o.sendRequest=function(t){a=t,f||(f=!0,e.use("yql",function(){o.sendRequest=c,c(a)}))},o},_defaultYQLLocator:function(t){var n=t&&t.query&&t.query.results,i;return n&&r.isObject(n)?(i=e.Object.values(n)||[],n=i.length===1?i[0]:i,r.isArray(n)||(n=[n])):n=[],n},_getXHRUrl:function(e,t){var n=this.get(s);return t.query!==t.request&&(e+=t.request),r.sub(e,{maxResults:n>0?n:1e3,query:encodeURIComponent(t.query)})},_jsonpFormatter:function(e,t,n){var i=this.get(s),u=this.get(o);return u&&(e+=u(n)),r.sub(e,{callback:t,maxResults:i>0?i:1e3,query:encodeURIComponent(n)})}}),e.mix(n.ATTRS,{yqlEnv:{value:null},yqlProtocol:{value:"http"}}),e.mix(n.SOURCE_TYPES,{io:"_createIOSource",jsonp:"_createJSONPSource",object:"_beforeCreateObjectSource",select:"_createSelectSource",string:"_createStringSource",yql:"_createYQLSource"},!0)},"3.9.1",{optional:["io-base","json-parse","jsonp","yql"],requires:["autocomplete-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("event-key",function(e,t){var n="+alt",r="+ctrl",i="+meta",s="+shift",o=e.Lang.trim,u={KEY_MAP:{enter:13,esc:27,backspace:8,tab:9,pageup:33,pagedown:34},_typeRE:/^(up|down|press):/,_keysRE:/^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,processArgs:function(t){var n=t.splice(3,1)[0],r=e.Array.hash(n.match(/\+(?:alt|ctrl|meta|shift)\b/g)||[]),i={type:this._typeRE.test(n)?RegExp.$1:null,mods:r,keys:null},s=n.replace(this._keysRE,""),u,a,f,l;if(s){s=s.split(","),i.keys={};for(l=s.length-1;l>=0;--l){u=o(s[l]);if(!u)continue;+u==u?i.keys[u]=r:(f=u.toLowerCase(),this.KEY_MAP[f]?(i.keys[this.KEY_MAP[f]]=r,i.type||(i.type="down")):(u=u.charAt(0),a=u.toUpperCase(),r["+shift"]&&(u=a),i.keys[u.charCodeAt(0)]=u===a?e.merge(r,{"+shift":!0}):r))}}return i.type||(i.type="press"),i},on:function(e,t,o,u){var a=t._extra,f="key"+a.type,l=a.keys,c=u?"delegate":"on";t._detach=e[c](f,function(e){var t=l?l[e.which]:a.mods;t&&(!t[n]||t[n]&&e.altKey)&&(!t[r]||t[r]&&e.ctrlKey)&&(!t[i]||t[i]&&e.metaKey)&&(!t[s]||t[s]&&e.shiftKey)&&o.fire(e)},u)},detach:function(e,t,n){t._detach.detach()}};u.delegate=u.on,u.detachDelegate=u.detach,e.Event.define("key",u,!0)},"3.9.1",{requires:["event-synthetic"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("attribute-complex",function(e,t){var n=e.Attribute;n.Complex=function(){},n.Complex.prototype={_normAttrVals:n.prototype._normAttrVals,_getAttrInitVal:n.prototype._getAttrInitVal},e.AttributeComplex=n.Complex},"3.9.1",{requires:["attribute-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("plugin",function(e,t){function n(t){!this.hasImpl||!this.hasImpl(e.Plugin.Base)?n.superclass.constructor.apply(this,arguments):n.prototype.initializer.apply(this,arguments)}n.ATTRS={host:{writeOnce:!0}},n.NAME="plugin",n.NS="plugin",e.extend(n,e.Base,{_handles:null,initializer:function(e){this._handles=[]},destructor:function(){if(this._handles)for(var e=0,t=this._handles.length;e<t;e++)this._handles[e].detach()},doBefore:function(e,t,n){var r=this.get("host"),i;return e in r?i=this.beforeHostMethod(e,t,n):r.on&&(i=this.onHostEvent(e,t,n)),i},doAfter:function(e,t,n){var r=this.get("host"),i;return e in r?i=this.afterHostMethod(e,t,n):r.after&&(i=this.afterHostEvent(e,t,n)),i},onHostEvent:function(e,t,n){var r=this.get("host").on(e,t,n||this);return this._handles.push(r),r},afterHostEvent:function(e,t,n){var r=this.get("host").after(e,t,n||this);return this._handles.push(r),r},beforeHostMethod:function(t,n,r){var i=e.Do.before(n,this.get("host"),t,r||this);return this._handles.push(i),i},afterHostMethod:function(t,n,r){var i=e.Do.after(n,this.get("host"),t,r||this);return this._handles.push(i),i},toString:function(){return this.constructor.NAME+"["+this.constructor.NS+"]"}}),e.namespace("Plugin").Base=n},"3.9.1",{requires:["base-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("event-simulate",function(e,t){(function(){function d(t,u,a,f,l,c,h,p,d,v,m){t||e.error("simulateKeyEvent(): Invalid target.");if(r(u)){u=u.toLowerCase();switch(u){case"textevent":u="keypress";break;case"keyup":case"keydown":case"keypress":break;default:e.error("simulateKeyEvent(): Event type '"+u+"' not supported.")}}else e.error("simulateKeyEvent(): Event type must be a string.");i(a)||(a=!0),i(f)||(f=!0),s(l)||(l=e.config.win),i(c)||(c=!1),i(h)||(h=!1),i(p)||(p=!1),i(d)||(d=!1),o(v)||(v=0),o(m)||(m=0);var g=null;if(n(e.config.doc.createEvent)){try{g=e.config.doc.createEvent("KeyEvents"),g.initKeyEvent(u,a,f,l,c,h,p,d,v,m)}catch(y){try{g=e.config.doc.createEvent("Events")}catch(b){g=e.config.doc.createEvent("UIEvents")}finally{g.initEvent(u,a,f),g.view=l,g.altKey=h,g.ctrlKey=c,g.shiftKey=p,g.metaKey=d,g.keyCode=v,g.charCode=m}}t.dispatchEvent(g)}else s(e.config.doc.createEventObject)?(g=e.config.doc.createEventObject(),g.bubbles=a,g.cancelable=f,g.view=l,g.ctrlKey=c,g.altKey=h,g.shiftKey=p,g.metaKey=d,g.keyCode=m>0?m:v,t.fireEvent("on"+u,g)):e.error("simulateKeyEvent(): No event simulation framework present.")}function v(t,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x){t||e.error("simulateMouseEvent(): Invalid target."),r(f)?!u[f.toLowerCase()]&&!a[f]&&e.error("simulateMouseEvent(): Event type '"+f+"' not supported."):e.error("simulateMouseEvent(): Event type must be a string."),i(l)||(l=!0),i(c)||(c=f!=="mousemove"),s(h)||(h=e.config.win),o(p)||(p=1),o(d)||(d=0),o(v)||(v=0),o(m)||(m=0),o(g)||(g=0),i(y)||(y=!1),i(b)||(b=!1),i(w)||(w=!1),i(E)||(E=!1),o(S)||(S=0),x=x||null;var T=null;if(n(e.config.doc.createEvent))T=e.config.doc.createEvent("MouseEvents"),T.initMouseEvent?T.initMouseEvent(f,l,c,h,p,d,v,m,g,y,b,w,E,S,x):(T=e.config.doc.createEvent("UIEvents"),T.initEvent(f,l,c),T.view=h,T.detail=p,T.screenX=d,T.screenY=v,T.clientX=m,T.clientY=g,T.ctrlKey=y,T.altKey=b,T.metaKey=E,T.shiftKey=w,T.button=S,T.relatedTarget=x),x&&!T.relatedTarget&&(f==="mouseout"?T.toElement=x:f==="mouseover"&&(T.fromElement=x)),t.dispatchEvent(T);else if(s(e.config.doc.createEventObject)){T=e.config.doc.createEventObject(),T.bubbles=l,T.cancelable=c,T.view=h,T.detail=p,T.screenX=d,T.screenY=v,T.clientX=m,T.clientY=g,T.ctrlKey=y,T.altKey=b,T.metaKey=E,T.shiftKey=w;switch(S){case 0:T.button=1;break;case 1:T.button=4;break;case 2:break;default:T.button=0}T.relatedTarget=x,t.fireEvent("on"+f,T)}else e.error("simulateMouseEvent(): No event simulation framework present.")}function m(t,u,a,f,h,p){t||e.error("simulateUIEvent(): Invalid target."),r(u)?(u=u.toLowerCase(),l[u]||e.error("simulateUIEvent(): Event type '"+u+"' not supported.")):e.error("simulateUIEvent(): Event type must be a string.");var d=null;i(a)||(a=u in c),i(f)||(f=u==="submit"),s(h)||(h=e.config.win),o(p)||(p=1),n(e.config.doc.createEvent)?(d=e.config.doc.createEvent("UIEvents"),d.initUIEvent(u,a,f,h,p),t.dispatchEvent(d)):s(e.config.doc.createEventObject)?(d=e.config.doc.createEventObject(),d.bubbles=a,d.cancelable=f,d.view=h,d.detail=p,t.fireEvent("on"+u,d)):e.error("simulateUIEvent(): No event simulation framework present.")}function g(t,n,r,i,s,o,u,a,f,l,c,h,d,v,m,g){var y;(!e.UA.ios||e.UA.ios<2)&&e.error("simulateGestureEvent(): Native gesture DOM eventframe is not available in this platform."),t||e.error("simulateGestureEvent(): Invalid target."),e.Lang.isString(n)?(n=n.toLowerCase(),p[n]||e.error("simulateTouchEvent(): Event type '"+n+"' not supported.")):e.error("simulateGestureEvent(): Event type must be a string."),e.Lang.isBoolean(r)||(r=!0),e.Lang.isBoolean(i)||(i=!0),e.Lang.isObject(s)||(s=e.config.win),e.Lang.isNumber(o)||(o=2),e.Lang.isNumber(u)||(u=0),e.Lang.isNumber(a)||(a=0),e.Lang.isNumber(f)||(f=0),e.Lang.isNumber(l)||(l=0),e.Lang.isBoolean(c)||(c=!1),e.Lang.isBoolean(h)||(h=!1),e.Lang.isBoolean(d)||(d=!1),e.Lang.isBoolean(v)||(v=!1),e.Lang.isNumber(m)||(m=1),e.Lang.isNumber(g)||(g=0),y=e.config.doc.createEvent("GestureEvent"),y.initGestureEvent(n,r,i,s,o,u,a,f,l,c,h,d,v,t,m,g),t.dispatchEvent(y)}function y(t,n,r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w){var E;t||e.error("simulateTouchEvent(): Invalid target."),e.Lang.isString(n)?(n=n.toLowerCase(),h[n]||e.error("simulateTouchEvent(): Event type '"+n+"' not supported.")):e.error("simulateTouchEvent(): Event type must be a string."),n==="touchstart"||n==="touchmove"?m.length===0&&e.error("simulateTouchEvent(): No touch object in touches"):n==="touchend"&&y.length===0&&e.error("simulateTouchEvent(): No touch object in changedTouches"),e.Lang.isBoolean(r)||(r=!0),e.Lang.isBoolean(i)||(i=n!=="touchcancel"),e.Lang.isObject(s)||(s=e.config.win),e.Lang.isNumber(o)||(o=1),e.Lang.isNumber(u)||(u=0),e.Lang.isNumber(a)||(a=0),e.Lang.isNumber(f)||(f=0),e.Lang.isNumber(l)||(l=0),e.Lang.isBoolean(c)||(c=!1),e.Lang.isBoolean(p)||(p=!1),e.Lang.isBoolean(d)||(d=!1),e.Lang.isBoolean(v)||(v=!1),e.Lang.isNumber(b)||(b=1),e.Lang.isNumber(w)||(w=0),e.Lang.isFunction(e.config.doc.createEvent)?(e.UA.android?e.UA.android<4?(E=e.config.doc.createEvent("MouseEvents"),E.initMouseEvent(n,r,i,s,o,u,a,f,l,c,p,d,v,0,t),E.touches=m,E.targetTouches=g,E.changedTouches=y):(E=e.config.doc.createEvent("TouchEvent"),E.initTouchEvent(m,g,y,n,s,u,a,f,l,c,p,d,v)):e.UA.ios?e.UA.ios>=2?(E=e.config.doc.createEvent("TouchEvent"),E.initTouchEvent(n,r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w)):e.error("simulateTouchEvent(): No touch event simulation framework present for iOS, "+e.UA.ios+"."):e.error("simulateTouchEvent(): Not supported agent yet, "+e.UA.userAgent),t.dispatchEvent(E)):e.error("simulateTouchEvent(): No event simulation framework present.")}var t=e.Lang,n=t.isFunction,r=t.isString,i=t.isBoolean,s=t.isObject,o=t.isNumber,u={click:1,dblclick:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,mousemove:1,contextmenu:1},a={MSPointerOver:1,MSPointerOut:1,MSPointerDown:1,MSPointerUp:1,MSPointerMove:1},f={keydown:1,keyup:1,keypress:1},l={submit:1,blur:1,change:1,focus:1,resize:1,scroll:1,select:1},c={scroll:1,resize:1,reset:1,submit:1,change:1,select
:1,error:1,abort:1},h={touchstart:1,touchmove:1,touchend:1,touchcancel:1},p={gesturestart:1,gesturechange:1,gestureend:1};e.mix(c,u),e.mix(c,f),e.mix(c,h),e.Event.simulate=function(t,n,r){r=r||{},u[n]||a[n]?v(t,n,r.bubbles,r.cancelable,r.view,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.button,r.relatedTarget):f[n]?d(t,n,r.bubbles,r.cancelable,r.view,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.keyCode,r.charCode):l[n]?m(t,n,r.bubbles,r.cancelable,r.view,r.detail):h[n]?e.config.win&&"ontouchstart"in e.config.win&&!e.UA.phantomjs&&!(e.UA.chrome&&e.UA.chrome<6)?y(t,n,r.bubbles,r.cancelable,r.view,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.touches,r.targetTouches,r.changedTouches,r.scale,r.rotation):e.error("simulate(): Event '"+n+"' can't be simulated. Use gesture-simulate module instead."):e.UA.ios&&e.UA.ios>=2&&p[n]?g(t,n,r.bubbles,r.cancelable,r.view,r.detail,r.screenX,r.screenY,r.clientX,r.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,r.scale,r.rotation):e.error("simulate(): Event '"+n+"' can't be simulated.")}})()},"3.9.1",{requires:["event-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("async-queue",function(e,t){e.AsyncQueue=function(){this._init(),this.add.apply(this,arguments)};var n=e.AsyncQueue,r="execute",i="shift",s="promote",o="remove",u=e.Lang.isObject,a=e.Lang.isFunction;n.defaults=e.mix({autoContinue:!0,iterations:1,timeout:10,until:function(){return this.iterations|=0,this.iterations<=0}},e.config.queueDefaults||{}),e.extend(n,e.EventTarget,{_running:!1,_init:function(){e.EventTarget.call(this,{prefix:"queue",emitFacade:!0}),this._q=[],this.defaults={},this._initEvents()},_initEvents:function(){this.publish({execute:{defaultFn:this._defExecFn,emitFacade:!0},shift:{defaultFn:this._defShiftFn,emitFacade:!0},add:{defaultFn:this._defAddFn,emitFacade:!0},promote:{defaultFn:this._defPromoteFn,emitFacade:!0},remove:{defaultFn:this._defRemoveFn,emitFacade:!0}})},next:function(){var e;while(this._q.length){e=this._q[0]=this._prepare(this._q[0]);if(!e||!e.until())break;this.fire(i,{callback:e}),e=null}return e||null},_defShiftFn:function(e){this.indexOf(e.callback)===0&&this._q.shift()},_prepare:function(t){if(a(t)&&t._prepared)return t;var r=e.merge(n.defaults,{context:this,args:[],_prepared:!0},this.defaults,a(t)?{fn:t}:t),i=e.bind(function(){i._running||i.iterations--,a(i.fn)&&i.fn.apply(i.context||e,e.Array(i.args))},this);return e.mix(i,r)},run:function(){var e,t=!0;for(e=this.next();t&&e&&!this.isRunning();e=this.next())t=e.timeout<0?this._execute(e):this._schedule(e);return e||this.fire("complete"),this},_execute:function(e){this._running=e._running=!0,e.iterations--,this.fire(r,{callback:e});var t=this._running&&e.autoContinue;return this._running=e._running=!1,t},_schedule:function(t){return this._running=e.later(t.timeout,this,function(){this._execute(t)&&this.run()}),!1},isRunning:function(){return!!this._running},_defExecFn:function(e){e.callback()},add:function(){return this.fire("add",{callbacks:e.Array(arguments,0,!0)}),this},_defAddFn:function(t){var n=this._q,r=[];e.Array.each(t.callbacks,function(e){u(e)&&(n.push(e),r.push(e))}),t.added=r},pause:function(){return u(this._running)&&this._running.cancel(),this._running=!1,this},stop:function(){return this._q=[],this.pause()},indexOf:function(e){var t=0,n=this._q.length,r;for(;t<n;++t){r=this._q[t];if(r===e||r.id===e)return t}return-1},getCallback:function(e){var t=this.indexOf(e);return t>-1?this._q[t]:null},promote:function(e){var t={callback:e},n;return this.isRunning()?n=this.after(i,function(){this.fire(s,t),n.detach()},this):this.fire(s,t),this},_defPromoteFn:function(e){var t=this.indexOf(e.callback),n=t>-1?this._q.splice(t,1)[0]:null;e.promoted=n,n&&this._q.unshift(n)},remove:function(e){var t={callback:e},n;return this.isRunning()?n=this.after(i,function(){this.fire(o,t),n.detach()},this):this.fire(o,t),this},_defRemoveFn:function(e){var t=this.indexOf(e.callback);e.removed=t>-1?this._q.splice(t,1)[0]:null},size:function(){return this.isRunning()||this.next(),this._q.length}})},"3.9.1",{requires:["event-custom"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("gesture-simulate",function(e,t){function T(n){n||e.error(t+": invalid target node"),this.node=n,this.target=e.Node.getDOMNode(n);var r=this.node.getXY(),i=this._getDims();a=r[0]+i[0]/2,f=r[1]+i[1]/2}var t="gesture-simulate",n=e.config.win&&"ontouchstart"in e.config.win&&!e.UA.phantomjs&&!(e.UA.chrome&&e.UA.chrome<6),r={tap:1,doubletap:1,press:1,move:1,flick:1,pinch:1,rotate:1},i={touchstart:1,touchmove:1,touchend:1,touchcancel:1},s=e.config.doc,o,u=20,a,f,l={HOLD_TAP:10,DELAY_TAP:10,HOLD_PRESS:3e3,MIN_HOLD_PRESS:1e3,MAX_HOLD_PRESS:6e4,DISTANCE_MOVE:200,DURATION_MOVE:1e3,MAX_DURATION_MOVE:5e3,MIN_VELOCITY_FLICK:1.3,DISTANCE_FLICK:200,DURATION_FLICK:1e3,MAX_DURATION_FLICK:5e3,DURATION_PINCH:1e3},c="touchstart",h="touchmove",p="touchend",d="gesturestart",v="gesturechange",m="gestureend",g="mouseup",y="mousemove",b="mousedown",w="click",E="dblclick",S="x",x="y";T.prototype={_toRadian:function(e){return e*(Math.PI/180)},_getDims:function(){var e,t,n;return this.target.getBoundingClientRect?(e=this.target.getBoundingClientRect(),"height"in e?n=e.height:n=Math.abs(e.bottom-e.top),"width"in e?t=e.width:t=Math.abs(e.right-e.left)):(e=this.node.get("region"),t=e.width,n=e.height),[t,n]},_calculateDefaultPoint:function(t){var n;return!e.Lang.isArray(t)||t.length===0?t=[a,f]:(t.length==1&&(n=this._getDims[1],t[1]=n/2),t[0]=this.node.getX()+t[0],t[1]=this.node.getY()+t[1]),t},rotate:function(n,r,i,s,o,u,a){var f,l=i,c=s;if(!e.Lang.isNumber(l)||!e.Lang.isNumber(c)||l<0||c<0)f=this.target.offsetWidth<this.target.offsetHeight?this.target.offsetWidth/4:this.target.offsetHeight/4,l=f,c=f;e.Lang.isNumber(a)||e.error(t+"Invalid rotation detected."),this.pinch(n,r,l,c,o,u,a)},pinch:function(n,r,i,s,o,a,f){var g,y,b=u,w,E=0,S=i,x=s,T,N,C,k,L,A,O,M,_,D={start:[],end:[]},P={start:[],end:[]},H,B;r=this._calculateDefaultPoint(r),(!e.Lang.isNumber(S)||!e.Lang.isNumber(x)||S<0||x<0)&&e.error(t+"Invalid startRadius and endRadius detected.");if(!e.Lang.isNumber(o)||o<=0)o=l.DURATION_PINCH;if(!e.Lang.isNumber(a))a=0;else{a%=360;while(a<0)a+=360}e.Lang.isNumber(f)||(f=0),e.AsyncQueue.defaults.timeout=b,g=new e.AsyncQueue,N=r[0],C=r[1],O=a,M=a+f,D.start=[N+S*Math.sin(this._toRadian(O)),C-S*Math.cos(this._toRadian(O))],D.end=[N+x*Math.sin(this._toRadian(M)),C-x*Math.cos(this._toRadian(M))],P.start=[N-S*Math.sin(this._toRadian(O)),C+S*Math.cos(this._toRadian(O))],P.end=[N-x*Math.sin(this._toRadian(M)),C+x*Math.cos(this._toRadian(M))],k=1,L=s/i,g.add({fn:function(){var t,n,r,i;t={pageX:D.start[0],pageY:D.start[1],clientX:D.start[0],clientY:D.start[1]},n={pageX:P.start[0],pageY:P.start[1],clientX:P.start[0],clientY:P.start[1]},i=this._createTouchList([e.merge({identifier:E++},t),e.merge({identifier:E++},n)]),r={pageX:(D.start[0]+P.start[0])/2,pageY:(D.start[0]+P.start[1])/2,clientX:(D.start[0]+P.start[0])/2,clientY:(D.start[0]+P.start[1])/2},this._simulateEvent(this.target,c,e.merge({touches:i,targetTouches:i,changedTouches:i,scale:k,rotation:O},r)),e.UA.ios>=2&&this._simulateEvent(this.target,d,e.merge({scale:k,rotation:O},r))},timeout:0,context:this}),H=Math.floor(o/b),T=(x-S)/H,A=(L-k)/H,_=(M-O)/H,B=function(t){var n=S+T*t,r=N+n*Math.sin(this._toRadian(O+_*t)),i=C-n*Math.cos(this._toRadian(O+_*t)),s=N-n*Math.sin(this._toRadian(O+_*t)),o=C+n*Math.cos(this._toRadian(O+_*t)),u=(r+s)/2,a=(i+o)/2,f,l,c,p;f={pageX:r,pageY:i,clientX:r,clientY:i},l={pageX:s,pageY:o,clientX:s,clientY:o},p=this._createTouchList([e.merge({identifier:E++},f),e.merge({identifier:E++},l)]),c={pageX:u,pageY:a,clientX:u,clientY:a},this._simulateEvent(this.target,h,e.merge({touches:p,targetTouches:p,changedTouches:p,scale:k+A*t,rotation:O+_*t},c)),e.UA.ios>=2&&this._simulateEvent(this.target,v,e.merge({scale:k+A*t,rotation:O+_*t},c))};for(y=0;y<H;y++)g.add({fn:B,args:[y],context:this});g.add({fn:function(){var t=this._getEmptyTouchList(),n,r,i,s;n={pageX:D.end[0],pageY:D.end[1],clientX:D.end[0],clientY:D.end[1]},r={pageX:P.end[0],pageY:P.end[1],clientX:P.end[0],clientY:P.end[1]},s=this._createTouchList([e.merge({identifier:E++},n),e.merge({identifier:E++},r)]),i={pageX:(D.end[0]+P.end[0])/2,pageY:(D.end[0]+P.end[1])/2,clientX:(D.end[0]+P.end[0])/2,clientY:(D.end[0]+P.end[1])/2},e.UA.ios>=2&&this._simulateEvent(this.target,m,e.merge({scale:L,rotation:M},i)),this._simulateEvent(this.target,p,e.merge({touches:t,targetTouches:t,changedTouches:s,scale:L,rotation:M},i))},context:this}),n&&e.Lang.isFunction(n)&&g.add({fn:n,context:this.node}),g.run()},tap:function(t,r,i,s,o){var u=new e.AsyncQueue,a=this._getEmptyTouchList(),f,h,d,v,m;r=this._calculateDefaultPoint(r);if(!e.Lang.isNumber(i)||i<1)i=1;e.Lang.isNumber(s)||(s=l.HOLD_TAP),e.Lang.isNumber(o)||(o=l.DELAY_TAP),h={pageX:r[0],pageY:r[1],clientX:r[0],clientY:r[1]},f=this._createTouchList([e.merge({identifier:0},h)]),v=function(){this._simulateEvent(this.target,c,e.merge({touches:f,targetTouches:f,changedTouches:f},h))},m=function(){this._simulateEvent(this.target,p,e.merge({touches:a,targetTouches:a,changedTouches:f},h))};for(d=0;d<i;d++)u.add({fn:v,context:this,timeout:d===0?0:o}),u.add({fn:m,context:this,timeout:s});i>1&&!n&&u.add({fn:function(){this._simulateEvent(this.target,E,h)},context:this}),t&&e.Lang.isFunction(t)&&u.add({fn:t,context:this.node}),u.run()},flick:function(n,r,i,s,o){var u;r=this._calculateDefaultPoint(r),e.Lang.isString(i)?(i=i.toLowerCase(),i!==S&&i!==x&&e.error(t+"(flick): Only x or y axis allowed")):i=S,e.Lang.isNumber(s)||(s=l.DISTANCE_FLICK),e.Lang.isNumber(o)?o>l.MAX_DURATION_FLICK&&(o=l.MAX_DURATION_FLICK):o=l.DURATION_FLICK,Math.abs(s)/o<l.MIN_VELOCITY_FLICK&&(o=Math.abs(s)/l.MIN_VELOCITY_FLICK),u={start:e.clone(r),end:[i===S?r[0]+s:r[0],i===x?r[1]+s:r[1]]},this._move(n,u,o)},move:function(t,n,r){var i;e.Lang.isObject(n)?(e.Lang.isArray(n.point)?n.point=this._calculateDefaultPoint(n.point):n.point=this._calculateDefaultPoint([]),e.Lang.isNumber(n.xdist)||(n.xdist=l.DISTANCE_MOVE),e.Lang.isNumber(n.ydist)||(n.ydist=0)):n={point:this._calculateDefaultPoint([]),xdist:l.
DISTANCE_MOVE,ydist:0},e.Lang.isNumber(r)?r>l.MAX_DURATION_MOVE&&(r=l.MAX_DURATION_MOVE):r=l.DURATION_MOVE,i={start:e.clone(n.point),end:[n.point[0]+n.xdist,n.point[1]+n.ydist]},this._move(t,i,r)},_move:function(t,n,r){var i,s,o=u,d,v,m,g=0,y;e.Lang.isNumber(r)?r>l.MAX_DURATION_MOVE&&(r=l.MAX_DURATION_MOVE):r=l.DURATION_MOVE,e.Lang.isObject(n)?(e.Lang.isArray(n.start)||(n.start=[a,f]),e.Lang.isArray(n.end)||(n.end=[a+l.DISTANCE_MOVE,f])):n={start:[a,f],end:[a+l.DISTANCE_MOVE,f]},e.AsyncQueue.defaults.timeout=o,i=new e.AsyncQueue,i.add({fn:function(){var t={pageX:n.start[0],pageY:n.start[1],clientX:n.start[0],clientY:n.start[1]},r=this._createTouchList([e.merge({identifier:g++},t)]);this._simulateEvent(this.target,c,e.merge({touches:r,targetTouches:r,changedTouches:r},t))},timeout:0,context:this}),d=Math.floor(r/o),v=(n.end[0]-n.start[0])/d,m=(n.end[1]-n.start[1])/d,y=function(t){var r=n.start[0]+v*t,i=n.start[1]+m*t,s={pageX:r,pageY:i,clientX:r,clientY:i},o=this._createTouchList([e.merge({identifier:g++},s)]);this._simulateEvent(this.target,h,e.merge({touches:o,targetTouches:o,changedTouches:o},s))};for(s=0;s<d;s++)i.add({fn:y,args:[s],context:this});i.add({fn:function(){var t={pageX:n.end[0],pageY:n.end[1],clientX:n.end[0],clientY:n.end[1]},r=this._createTouchList([e.merge({identifier:g},t)]);this._simulateEvent(this.target,h,e.merge({touches:r,targetTouches:r,changedTouches:r},t))},timeout:0,context:this}),i.add({fn:function(){var t={pageX:n.end[0],pageY:n.end[1],clientX:n.end[0],clientY:n.end[1]},r=this._getEmptyTouchList(),i=this._createTouchList([e.merge({identifier:g},t)]);this._simulateEvent(this.target,p,e.merge({touches:r,targetTouches:r,changedTouches:i},t))},context:this}),t&&e.Lang.isFunction(t)&&i.add({fn:t,context:this.node}),i.run()},_getEmptyTouchList:function(){return o||(o=this._createTouchList([])),o},_createTouchList:function(n){var r=[],i,o=this;return!!n&&e.Lang.isArray(n)?e.UA.android&&e.UA.android>=4||e.UA.ios&&e.UA.ios>=2?(e.each(n,function(t){t.identifier||(t.identifier=0),t.pageX||(t.pageX=0),t.pageY||(t.pageY=0),t.screenX||(t.screenX=0),t.screenY||(t.screenY=0),r.push(s.createTouch(e.config.win,o.target,t.identifier,t.pageX,t.pageY,t.screenX,t.screenY))}),i=s.createTouchList.apply(s,r)):e.UA.ios&&e.UA.ios<2?e.error(t+": No touch event simulation framework present."):(i=[],e.each(n,function(e){e.identifier||(e.identifier=0),e.clientX||(e.clientX=0),e.clientY||(e.clientY=0),e.pageX||(e.pageX=0),e.pageY||(e.pageY=0),e.screenX||(e.screenX=0),e.screenY||(e.screenY=0),i.push({target:o.target,identifier:e.identifier,clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY})}),i.item=function(e){return i[e]}):e.error(t+": Invalid touchPoints passed"),i},_simulateEvent:function(t,r,s){var o;i[r]?n?e.Event.simulate(t,r,s):this._isSingleTouch(s.touches,s.targetTouches,s.changedTouches)?(r={touchstart:b,touchmove:y,touchend:g}[r],s.button=0,s.relatedTarget=null,o=r===g?s.changedTouches:s.touches,s=e.mix(s,{screenX:o.item(0).screenX,screenY:o.item(0).screenY,clientX:o.item(0).clientX,clientY:o.item(0).clientY},!0),e.Event.simulate(t,r,s),r==g&&e.Event.simulate(t,w,s)):e.error("_simulateEvent(): Event '"+r+"' has multi touch objects that can't be simulated in your platform."):e.Event.simulate(t,r,s)},_isSingleTouch:function(e,t,n){return e&&e.length<=1&&t&&t.length<=1&&n&&n.length<=1}},e.GestureSimulation=T,e.GestureSimulation.defaults=l,e.GestureSimulation.GESTURES=r,e.Event.simulateGesture=function(n,i,s,o){n=e.one(n);var u=new e.GestureSimulation(n);i=i.toLowerCase(),!o&&e.Lang.isFunction(s)&&(o=s,s={}),s=s||{};if(r[i])switch(i){case"tap":u.tap(o,s.point,s.times,s.hold,s.delay);break;case"doubletap":u.tap(o,s.point,2);break;case"press":e.Lang.isNumber(s.hold)?s.hold<l.MIN_HOLD_PRESS?s.hold=l.MIN_HOLD_PRESS:s.hold>l.MAX_HOLD_PRESS&&(s.hold=l.MAX_HOLD_PRESS):s.hold=l.HOLD_PRESS,u.tap(o,s.point,1,s.hold);break;case"move":u.move(o,s.path,s.duration);break;case"flick":u.flick(o,s.point,s.axis,s.distance,s.duration);break;case"pinch":u.pinch(o,s.center,s.r1,s.r2,s.duration,s.start,s.rotation);break;case"rotate":u.rotate(o,s.center,s.r1,s.r2,s.duration,s.start,s.rotation)}else e.error(t+": Not a supported gesture simulation: "+i)}},"3.9.1",{requires:["async-queue","event-simulate","node-screen"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("node-event-simulate",function(e,t){e.Node.prototype.simulate=function(t,n){e.Event.simulate(e.Node.getDOMNode(this),t,n)},e.Node.prototype.simulateGesture=function(t,n,r){e.Event.simulateGesture(this,t,n,r)}},"3.9.1",{requires:["node-base","event-simulate","gesture-simulate"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("node-focusmanager",function(e,t){var n="activeDescendant",r="id",i="disabled",s="tabIndex",o="focused",u="focusClass",a="circular",f="UI",l="key",c=n+"Change",h="host",p={37:!0,38:!0,39:!0,40:!0},d={a:!0,button:!0,input:!0,object:!0},v=e.Lang,m=e.UA,g=function(){g.superclass.constructor.apply(this,arguments)};g.ATTRS={focused:{value:!1,readOnly:!0},descendants:{getter:function(e){return this.get(h).all(e)}},activeDescendant:{setter:function(t){var n=v.isNumber,i=e.Attribute.INVALID_VALUE,s=this._descendantsMap,o=this._descendants,u,a,f;return n(t)?(u=t,a=u):t instanceof e.Node&&s?(u=s[t.get(r)],n(u)?a=u:a=i):a=i,o&&(f=o.item(u),f&&f.get("disabled")&&(a=i)),a}},keys:{value:{next:null,previous:null}},focusClass:{},circular:{value:!0}},e.extend(g,e.Plugin.Base,{_stopped:!0,_descendants:null,_descendantsMap:null,_focusedNode:null,_lastNodeIndex:0,_eventHandlers:null,_initDescendants:function(){var t=this.get("descendants"),o={},u=-1,a,f=this.get(n),l,c,h=0;v.isUndefined(f)&&(f=-1);if(t){a=t.size();for(h=0;h<a;h++)l=t.item(h),u===-1&&!l.get(i)&&(u=h),f<0&&parseInt(l.getAttribute(s,2),10)===0&&(f=h),l&&l.set(s,-1),c=l.get(r),c||(c=e.guid(),l.set(r,c)),o[c]=h;f<0&&(f=0),l=t.item(f);if(!l||l.get(i))l=t.item(u),f=u;this._lastNodeIndex=a-1,this._descendants=t,this._descendantsMap=o,this.set(n,f),l&&l.set(s,0)}},_isDescendant:function(e){return e.get(r)in this._descendantsMap},_removeFocusClass:function(){var e=this._focusedNode,t=this.get(u),n;t&&(n=v.isString(t)?t:t.className),e&&n&&e.removeClass(n)},_detachKeyHandler:function(){var e=this._prevKeyHandler,t=this._nextKeyHandler;e&&e.detach(),t&&t.detach()},_preventScroll:function(e){p[e.keyCode]&&this._isDescendant(e.target)&&e.preventDefault()},_fireClick:function(e){var t=e.target,n=t.get("nodeName").toLowerCase();e.keyCode===13&&(!d[n]||n==="a"&&!t.getAttribute("href"))&&t.simulate("click")},_attachKeyHandler:function(){this._detachKeyHandler();var t=this.get("keys.next"),n=this.get("keys.previous"),r=this.get(h),i=this._eventHandlers;n&&(this._prevKeyHandler=e.on(l,e.bind(this._focusPrevious,this),r,n)),t&&(this._nextKeyHandler=e.on(l,e.bind(this._focusNext,this),r,t)),m.opera&&i.push(r.on("keypress",this._preventScroll,this)),m.opera||i.push(r.on("keypress",this._fireClick,this))},_detachEventHandlers:function(){this._detachKeyHandler();var t=this._eventHandlers;t&&(e.Array.each(t,function(e){e.detach()}),this._eventHandlers=null)},_attachEventHandlers:function(){var t=this._descendants,n,r,i;t&&t.size()&&(n=this._eventHandlers||[],r=this.get(h).get("ownerDocument"),n.length===0&&(n.push(r.on("focus",this._onDocFocus,this)),n.push(r.on("mousedown",this._onDocMouseDown,this)),n.push(this.after("keysChange",this._attachKeyHandler)),n.push(this.after("descendantsChange",this._initDescendants)),n.push(this.after(c,this._afterActiveDescendantChange)),i=this.after("focusedChange",e.bind(function(e){e.newVal&&(this._attachKeyHandler(),i.detach())},this)),n.push(i)),this._eventHandlers=n)},_onDocMouseDown:function(e){var t=this.get(h),n=e.target,r=t.contains(n),i,s=function(e){var n=!1;return e.compareTo(t)||(n=this._isDescendant(e)?e:s.call(this,e.get("parentNode"))),n};r&&(i=s.call(this,n),i?n=i:!i&&this.get(o)&&(this._set(o,!1),this._onDocFocus(e))),r&&this._isDescendant(n)?this.focus(n):m.webkit&&this.get(o)&&(!r||r&&!this._isDescendant(n))&&(this._set(o,!1),this._onDocFocus(e))},_onDocFocus:function(e){var t=this._focusTarget||e.target,n=this.get(o),r=this.get(u),i=this._focusedNode,s;this._focusTarget&&(this._focusTarget=null),this.get(h).contains(t)?(s=this._isDescendant(t),!n&&s?n=!0:n&&!s&&(n=!1)):n=!1,r&&(i&&(!i.compareTo(t)||!n)&&this._removeFocusClass(),s&&n&&(r.fn?(t=r.fn(t),t.addClass(r.className)):t.addClass(r),this._focusedNode=t)),this._set(o,n)},_focusNext:function(e,t){var r=t||this.get(n),i;this._isDescendant(e.target)&&r<=this._lastNodeIndex&&(r+=1,r===this._lastNodeIndex+1&&this.get(a)&&(r=0),i=this._descendants.item(r),i&&(i.get("disabled")?this._focusNext(e,r):this.focus(r))),this._preventScroll(e)},_focusPrevious:function(e,t){var r=t||this.get(n),i;this._isDescendant(e.target)&&r>=0&&(r-=1,r===-1&&this.get(a)&&(r=this._lastNodeIndex),i=this._descendants.item(r),i&&(i.get("disabled")?this._focusPrevious(e,r):this.focus(r))),this._preventScroll(e)},_afterActiveDescendantChange:function(e){var t=this._descendants.item(e.prevVal);t&&t.set(s,-1),t=this._descendants.item(e.newVal),t&&t.set(s,0)},initializer:function(e){this.start()},destructor:function(){this.stop(),this.get(h).focusManager=null},focus:function(e){v.isUndefined(e)&&(e=this.get(n)),this.set(n,e,{src:f});var t=this._descendants.item(this.get(n));t&&(t.focus(),m.opera&&t.get("nodeName").toLowerCase()==="button"&&(this._focusTarget=t))},blur:function(){var e;this.get(o)&&(e=this._descendants.item(this.get(n)),e&&(e.blur(),this._removeFocusClass()),this._set(o,!1,{src:f}))},start:function(){this._stopped&&(this._initDescendants(),this._attachEventHandlers(),this._stopped=!1)},stop:function(){this._stopped||(this._detachEventHandlers(),this._descendants=null,this._focusedNode=null,this._lastNodeIndex=0,this._stopped=!0)},refresh:function(){this._initDescendants(),this._eventHandlers||this._attachEventHandlers()}}),g.NAME="nodeFocusManager",g.NS="focusManager",e.namespace("Plugin"),e.Plugin.NodeFocusManager=g},"3.9.1",{requires:["attribute","node","plugin","node-event-simulate","event-key","event-focus"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("base-pluginhost",function(e,t){var n=e.Base,r=e.Plugin.Host;e.mix(n,r,!1,null,1),n.plug=r.plug,n.unplug=r.unplug},"3.9.1",{requires:["base-base","pluginhost"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("widget-base",function(e,t){function R(e){var t=this,n,r,i=t.constructor;t._strs={},t._cssPrefix=i.CSS_PREFIX||s(i.NAME.toLowerCase()),e=e||{},R.superclass.constructor.call(t,e),r=t.get(T),r&&(r!==P&&(n=r),t.render(n))}var n=e.Lang,r=e.Node,i=e.ClassNameManager,s=i.getClassName,o,u=e.cached(function(e){return e.substring(0,1).toUpperCase()+e.substring(1)}),a="content",f="visible",l="hidden",c="disabled",h="focused",p="width",d="height",v="boundingBox",m="contentBox",g="parentNode",y="ownerDocument",b="auto",w="srcNode",E="body",S="tabIndex",x="id",T="render",N="rendered",C="destroyed",k="strings",L="<div></div>",A="Change",O="loading",M="_uiSet",_="",D=function(){},P=!0,H=!1,B,j={},F=[f,c,d,p,h,S],I=e.UA.webkit,q={};R.NAME="widget",B=R.UI_SRC="ui",R.ATTRS=j,j[x]={valueFn:"_guid",writeOnce:P},j[N]={value:H,readOnly:P},j[v]={value:null,setter:"_setBB",writeOnce:P},j[m]={valueFn:"_defaultCB",setter:"_setCB",writeOnce:P},j[S]={value:null,validator:"_validTabIndex"},j[h]={value:H,readOnly:P},j[c]={value:H},j[f]={value:P},j[d]={value:_},j[p]={value:_},j[k]={value:{},setter:"_strSetter",getter:"_strGetter"},j[T]={value:H,writeOnce:P},R.CSS_PREFIX=s(R.NAME.toLowerCase()),R.getClassName=function(){return s.apply(i,[R.CSS_PREFIX].concat(e.Array(arguments),!0))},o=R.getClassName,R.getByNode=function(t){var n,i=o();return t=r.one(t),t&&(t=t.ancestor("."+i,!0),t&&(n=q[e.stamp(t,!0)])),n||null},e.extend(R,e.Base,{getClassName:function(){return s.apply(i,[this._cssPrefix].concat(e.Array(arguments),!0))},initializer:function(t){var n=this.get(v);n instanceof r&&this._mapInstance(e.stamp(n)),this._applyParser&&this._applyParser(t)},_mapInstance:function(e){q[e]=this},destructor:function(){var t=this.get(v),n;t instanceof r&&(n=e.stamp(t,!0),n in q&&delete q[n],this._destroyBox())},destroy:function(e){return this._destroyAllNodes=e,R.superclass.destroy.apply(this)},_destroyBox:function(){var e=this.get(v),t=this.get(m),n=this._destroyAllNodes,r;r=e&&e.compareTo(t),this.UI_EVENTS&&this._destroyUIEvents(),this._unbindUI(e),n?(e.empty(),e.remove(P)):(t&&t.remove(P),r||e.remove(P))},render:function(e){return!this.get(C)&&!this.get(N)&&(this.publish(T,{queuable:H,fireOnce:P,defaultTargetOnly:P,defaultFn:this._defRenderFn}),this.fire(T,{parentNode:e?r.one(e):null})),this},_defRenderFn:function(e){this._parentNode=e.parentNode,this.renderer(),this._set(N,P),this._removeLoadingClassNames()},renderer:function(){var e=this;e._renderUI(),e.renderUI(),e._bindUI(),e.bindUI(),e._syncUI(),e.syncUI()},bindUI:D,renderUI:D,syncUI:D,hide:function(){return this.set(f,H)},show:function(){return this.set(f,P)},focus:function(){return this._set(h,P)},blur:function(){return this._set(h,H)},enable:function(){return this.set(c,H)},disable:function(){return this.set(c,P)},_uiSizeCB:function(e){this.get(m).toggleClass(o(a,"expanded"),e)},_renderBox:function(e){var t=this,n=t.get(m),i=t.get(v),s=t.get(w),o=t.DEF_PARENT_NODE,u=s&&s.get(y)||i.get(y)||n.get(y);s&&!s.compareTo(n)&&!n.inDoc(u)&&s.replace(n),!i.compareTo(n.get(g))&&!i.compareTo(n)&&(n.inDoc(u)&&n.replace(i),i.appendChild(n)),e=e||o&&r.one(o),e?e.appendChild(i):i.inDoc(u)||r.one(E).insert(i,0)},_setBB:function(e){return this._setBox(this.get(x),e,this.BOUNDING_TEMPLATE,!0)},_setCB:function(e){return this.CONTENT_TEMPLATE===null?this.get(v):this._setBox(null,e,this.CONTENT_TEMPLATE,!1)},_defaultCB:function(e){return this.get(w)||null},_setBox:function(t,n,i,s){return n=r.one(n),n||(n=r.create(i),s?this._bbFromTemplate=!0:this._cbFromTemplate=!0),n.get(x)||n.set(x,t||e.guid()),n},_renderUI:function(){this._renderBoxClassNames(),this._renderBox(this._parentNode)},_renderBoxClassNames:function(){var e=this._getClasses(),t,n=this.get(v),r;n.addClass(o());for(r=e.length-3;r>=0;r--)t=e[r],n.addClass(t.CSS_PREFIX||s(t.NAME.toLowerCase()));this.get(m).addClass(this.getClassName(a))},_removeLoadingClassNames:function(){var e=this.get(v),t=this.get(m),n=this.getClassName(O),r=o(O);e.removeClass(r).removeClass(n),t.removeClass(r).removeClass(n)},_bindUI:function(){this._bindAttrUI(this._UI_ATTRS.BIND),this._bindDOM()},_unbindUI:function(e){this._unbindDOM(e)},_bindDOM:function(){var t=this.get(v).get(y),n=R._hDocFocus;n||(n=R._hDocFocus=t.on("focus",this._onDocFocus,this),n.listeners={count:0}),n.listeners[e.stamp(this,!0)]=!0,n.listeners.count++,I&&(this._hDocMouseDown=t.on("mousedown",this._onDocMouseDown,this))},_unbindDOM:function(t){var n=R._hDocFocus,r=e.stamp(this,!0),i,s=this._hDocMouseDown;n&&(i=n.listeners,i[r]&&(delete i[r],i.count--),i.count===0&&(n.detach(),R._hDocFocus=null)),I&&s&&s.detach()},_syncUI:function(){this._syncAttrUI(this._UI_ATTRS.SYNC)},_uiSetHeight:function(e){this._uiSetDim(d,e),this._uiSizeCB(e!==_&&e!==b)},_uiSetWidth:function(e){this._uiSetDim(p,e)},_uiSetDim:function(e,t){this.get(v).setStyle(e,n.isNumber(t)?t+this.DEF_UNIT:t)},_uiSetVisible:function(e){this.get(v).toggleClass(this.getClassName(l),!e)},_uiSetDisabled:function(e){this.get(v).toggleClass(this.getClassName(c),e)},_uiSetFocused:function(e,t){var n=this.get(v);n.toggleClass(this.getClassName(h),e),t!==B&&(e?n.focus():n.blur())},_uiSetTabIndex:function(e){var t=this.get(v);n.isNumber(e)?t.set(S,e):t.removeAttribute(S)},_onDocMouseDown:function(e){this._domFocus&&this._onDocFocus(e)},_onDocFocus:function(e){var t=R.getByNode(e.target),n=R._active;n&&n!==t&&(n._domFocus=!1,n._set(h,!1,{src:B}),R._active=null),t&&(t._domFocus=!0,t._set(h,!0,{src:B}),R._active=t)},toString:function(){return this.name+"["+this.get(x)+"]"},DEF_UNIT:"px",DEF_PARENT_NODE:null,CONTENT_TEMPLATE:L,BOUNDING_TEMPLATE:L,_guid:function(){return e.guid()},_validTabIndex:function(e){return n.isNumber(e)||n.isNull(e)},_bindAttrUI:function(e){var t,n=e.length;for(t=0;t<n;t++)this.after(e[t]+A,this._setAttrUI)},_syncAttrUI:function(e){var t,n=e.length,r;for(t=0;t<n;t++)r=e[t],this[M+u(r)](this.get(r))},_setAttrUI:function(e){e.target===this&&this[M+u(e.attrName)](e.newVal,e.src)},_strSetter:function(t){return e.merge(this
.get(k),t)},getString:function(e){return this.get(k)[e]},getStrings:function(){return this.get(k)},_UI_ATTRS:{BIND:F,SYNC:F}}),e.Widget=R},"3.9.1",{requires:["attribute","base-base","base-pluginhost","classnamemanager","event-focus","node-base","node-style"],skinnable:!0});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("widget-htmlparser",function(e,t){var n=e.Widget,r=e.Node,i=e.Lang,s="srcNode",o="contentBox";n.HTML_PARSER={},n._buildCfg={aggregates:["HTML_PARSER"]},n.ATTRS[s]={value:null,setter:r.one,getter:"_getSrcNode",writeOnce:!0},e.mix(n.prototype,{_getSrcNode:function(e){return e||this.get(o)},_applyParsedConfig:function(t,n,r){return r?e.mix(n,r,!1):n},_applyParser:function(t){var n=this,r=this._getNodeToParse(),s=n._getHtmlParser(),o,u;s&&r&&e.Object.each(s,function(e,t,s){u=null,i.isFunction(e)?u=e.call(n,r):i.isArray(e)?(u=r.all(e[0]),u.isEmpty()&&(u=null)):u=r.one(e),u!==null&&u!==undefined&&(o=o||{},o[t]=u)}),t=n._applyParsedConfig(r,t,o)},_getNodeToParse:function(){var e=this.get("srcNode");return this._cbFromTemplate?null:e},_getHtmlParser:function(){var t=this._getClasses(),n={},r,i;for(r=t.length-1;r>=0;r--)i=t[r].HTML_PARSER,i&&e.mix(n,i,!0);return n}})},"3.9.1",{requires:["widget-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("widget-skin",function(e,t){var n="boundingBox",r="contentBox",i="skin",s=e.ClassNameManager.getClassName;e.Widget.prototype.getSkinName=function(){var e=this.get(r)||this.get(n),t=new RegExp("\\b"+s(i)+"-(\\S+)"),o;return e&&e.ancestor(function(e){return o=e.get("className").match(t),o}),o?o[1]:null}},"3.9.1",{requires:["widget-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("widget-uievents",function(e,t){var n="boundingBox",r=e.Widget,i="render",s=e.Lang,o=":",u=e.Widget._uievts=e.Widget._uievts||{};e.mix(r.prototype,{_destroyUIEvents:function(){var t=e.stamp(this,!0);e.each(u,function(n,r){n.instances[t]&&(delete n.instances[t],e.Object.isEmpty(n.instances)&&(n.handle.detach(),u[r]&&delete u[r]))})},UI_EVENTS:e.Node.DOM_EVENTS,_getUIEventNode:function(){return this.get(n)},_createUIEvent:function(t){var n=this._getUIEventNode(),i=e.stamp(n)+t,s=u[i],o;s||(o=n.delegate(t,function(e){var t=r.getByNode(this);t&&t._filterUIEvent(e)&&t.fire(e.type,{domEvent:e})},"."+e.Widget.getClassName()),u[i]=s={instances:{},handle:o}),s.instances[e.stamp(this)]=1},_filterUIEvent:function(e){return e.currentTarget.compareTo(e.container)||e.container.compareTo(this._getUIEventNode())},_getUIEvent:function(e){if(s.isString(e)){var t=this.parseType(e)[1],n,r;return t&&(n=t.indexOf(o),n>-1&&(t=t.substring(n+o.length)),this.UI_EVENTS[t]&&(r=t)),r}},_initUIEvent:function(e){var t=this._getUIEvent(e),n=this._uiEvtsInitQueue||{};t&&!n[t]&&(this._uiEvtsInitQueue=n[t]=1,this.after(i,function(){this._createUIEvent(t),delete this._uiEvtsInitQueue[t]}))},on:function(e){return this._initUIEvent(e),r.superclass.on.apply(this,arguments)},publish:function(e,t){var n=this._getUIEvent(e);return n&&t&&t.defaultFn&&this._initUIEvent(n),r.superclass.publish.apply(this,arguments)}},!0)},"3.9.1",{requires:["node-event-delegate","widget-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("arraylist",function(e,t){function s(t){t!==undefined?this._items=e.Lang.isArray(t)?t:n(t):this._items=this._items||[]}var n=e.Array,r=n.each,i;i={item:function(e){return this._items[e]},each:function(e,t){return r(this._items,function(n,r){n=this.item(r),e.call(t||n,n,r,this)},this),this},some:function(e,t){return n.some(this._items,function(n,r){return n=this.item(r),e.call(t||n,n,r,this)},this)},indexOf:function(e){return n.indexOf(this._items,e)},size:function(){return this._items.length},isEmpty:function(){return!this.size()},toJSON:function(){return this._items}},i._item=i.item,e.mix(s.prototype,i),e.mix(s,{addMethod:function(e,t){t=n(t),r(t,function(t){e[t]=function(){var e=n(arguments,0,!0),i=[];return r(this._items,function(n,r){n=this._item(r);var s=n[t].apply(n,e);s!==undefined&&s!==n&&(i[r]=s)},this),i.length?i:this}})}}),e.ArrayList=s},"3.9.1",{requires:["yui-base"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("widget-parent",function(e,t){function s(t){this.publish("addChild",{defaultTargetOnly:!0,defaultFn:this._defAddChildFn}),this.publish("removeChild",{defaultTargetOnly:!0,defaultFn:this._defRemoveChildFn}),this._items=[];var n,r;t&&t.children&&(n=t.children,r=this.after("initializedChange",function(e){this._add(n),r.detach()})),e.after(this._renderChildren,this,"renderUI"),e.after(this._bindUIParent,this,"bindUI"),this.after("selectionChange",this._afterSelectionChange),this.after("selectedChange",this._afterParentSelectedChange),this.after("activeDescendantChange",this._afterActiveDescendantChange),this._hDestroyChild=this.after("*:destroy",this._afterDestroyChild),this.after("*:focusedChange",this._updateActiveDescendant)}var n=e.Lang,r="rendered",i="boundingBox";s.ATTRS={defaultChildType:{setter:function(t){var r=e.Attribute.INVALID_VALUE,i=n.isString(t)?e[t]:t;return n.isFunction(i)&&(r=i),r}},activeDescendant:{readOnly:!0},multiple:{value:!1,validator:n.isBoolean,writeOnce:!0,getter:function(e){var t=this.get("root");return t&&t!=this?t.get("multiple"):e}},selection:{readOnly:!0,setter:"_setSelection",getter:function(t){var r=n.isArray(t)?new e.ArrayList(t):t;return r}},selected:{setter:function(t){var n=t;return t===1&&!this.get("multiple")&&(n=e.Attribute.INVALID_VALUE),n}}},s.prototype={destructor:function(){this._destroyChildren()},_afterDestroyChild:function(e){var t=e.target;t.get("parent")==this&&t.remove()},_afterSelectionChange:function(t){if(t.target==this&&t.src!=this){var n=t.newVal,r=0;n&&(r=2,e.instanceOf(n,e.ArrayList)&&n.size()===this.size()&&(r=1)),this.set("selected",r,{src:this})}},_afterActiveDescendantChange:function(e){var t=this.get("parent");t&&t._set("activeDescendant",e.newVal)},_afterParentSelectedChange:function(e){var t=e.newVal;this==e.target&&e.src!=this&&(t===0||t===1)&&this.each(function(e){e.set("selected",t,{src:this})},this)},_setSelection:function(e){var t=null,n;return this.get("multiple")&&!this.isEmpty()?(n=[],this.each(function(e){e.get("selected")>0&&n.push(e)}),n.length>0&&(t=n)):e.get("selected")>0&&(t=e),t},_updateSelection:function(e){var t=e.target,n;t.get("parent")==this&&(e.src!="_updateSelection"&&(n=this.get("selection"),!this.get("multiple")&&n&&e.newVal>0&&n.set("selected",0,{src:"_updateSelection"}),this._set("selection",t)),e.src==this&&this._set("selection",t,{src:this}))},_updateActiveDescendant:function(e){var t=e.newVal===!0?e.target:null;this._set("activeDescendant",t)},_createChild:function(t){var r=this.get("defaultChildType"),i=t.childType||t.type,s,o,u;return i&&(o=n.isString(i)?e[i]:i),n.isFunction(o)?u=o:r&&(u=r),u?s=new u(t):e.error("Could not create a child instance because its constructor is either undefined or invalid."),s},_defAddChildFn:function(t){var r=t.child,i=t.index,s=this._items;r.get("parent")&&r.remove(),n.isNumber(i)?s.splice(i,0,r):s.push(r),r._set("parent",this),r.addTarget(this),t.index=r.get("index"),r.after("selectedChange",e.bind(this._updateSelection,this))},_defRemoveChildFn:function(e){var t=e.child,n=e.index,r=this._items;t.get("focused")&&t.blur(),t.get("selected")&&t.set("selected",0),r.splice(n,1),t.removeTarget(this),t._oldParent=t.get("parent"),t._set("parent",null)},_add:function(t,r){var i,s,o;return n.isArray(t)?(i=[],e.each(t,function(e,t){s=this._add(e,r+t),s&&i.push(s)},this),i.length>0&&(o=i)):(e.instanceOf(t,e.Widget)?s=t:s=this._createChild(t),s&&this.fire("addChild",{child:s,index:r})&&(o=s)),o},add:function(){var t=this._add.apply(this,arguments),r=t?n.isArray(t)?t:[t]:[];return new e.ArrayList(r)},remove:function(e){var t=this._items[e],n;return t&&this.fire("removeChild",{child:t,index:e})&&(n=t),n},removeAll:function(){var t=[],n;return e.each(this._items.concat(),function(){n=this.remove(0),n&&t.push(n)},this),new e.ArrayList(t)},selectChild:function(e){this.item(e).set("selected",1)},selectAll:function(){this.set("selected",1)},deselectAll:function(){this.set("selected",0)},_uiAddChild:function(e,t){e.render(t);var n=e.get("boundingBox"),s,o=e.next(!1),u;o&&o.get(r)?(s=o.get(i),s.insert(n,"before")):(u=e.previous(!1),u&&u.get(r)?(s=u.get(i),s.insert(n,"after")):t.contains(n)||t.appendChild(n))},_uiRemoveChild:function(e){e.get("boundingBox").remove()},_afterAddChild:function(e){var t=e.child;t.get("parent")==this&&this._uiAddChild(t,this._childrenContainer)},_afterRemoveChild:function(e){var t=e.child;t._oldParent==this&&this._uiRemoveChild(t)},_bindUIParent:function(){this.after("addChild",this._afterAddChild),this.after("removeChild",this._afterRemoveChild)},_renderChildren:function(){var e=this._childrenContainer||this.get("contentBox");this._childrenContainer=e,this.each(function(t){t.render(e)})},_destroyChildren:function(){this._hDestroyChild.detach(),this.each(function(e){e.destroy()})}},e.augment(s,e.ArrayList),e.WidgetParent=s},"3.9.1",{requires:["arraylist","base-build","widget"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("widget-child",function(e,t){function r(){e.after(this._syncUIChild,this,"syncUI"),e.after(this._bindUIChild,this,"bindUI")}var n=e.Lang;r.ATTRS={selected:{value:0,validator:n.isNumber},index:{readOnly:!0,getter:function(){var e=this.get("parent"),t=-1;return e&&(t=e.indexOf(this)),t}},parent:{readOnly:!0},depth:{readOnly:!0,getter:function(){var e=this.get("parent"),t=this.get("root"),n=-1;while(e){n+=1;if(e==t)break;e=e.get("parent")}return n}},root:{readOnly:!0,getter:function(){var t=function(n){var r=n.get("parent"),i=n.ROOT_TYPE,s=r;return i&&(s=r&&e.instanceOf(r,i)),s?t(r):n};return t(this)}}},r.prototype={ROOT_TYPE:null,_getUIEventNode:function(){var e=this.get("root"),t;return e&&(t=e.get("boundingBox")),t},next:function(e){var t=this.get("parent"),n;return t&&(n=t.item(this.get("index")+1)),!n&&e&&(n=t.item(0)),n},previous:function(e){var t=this.get("parent"),n=this.get("index"),r;return t&&n>0&&(r=t.item([n-1])),!r&&e&&(r=t.item(t.size()-1)),r},remove:function(t){var r,i;return n.isNumber(t)?i=e.WidgetParent.prototype.remove.apply(this,arguments):(r=this.get("parent"),r&&(i=r.remove(this.get("index")))),i},isRoot:function(){return this==this.get("root")},ancestor:function(e){var t=this.get("root"),n;if(this.get("depth")>e){n=this.get("parent");while(n!=t&&n.get("depth")>e)n=n.get("parent")}return n},_uiSetChildSelected:function(e){var t=this.get("boundingBox"),n=this.getClassName("selected");e===0?t.removeClass(n):t.addClass(n)},_afterChildSelectedChange:function(e){this._uiSetChildSelected(e.newVal)},_syncUIChild:function(){this._uiSetChildSelected(this.get("selected"))},_bindUIChild:function(){this.after("selectedChange",this._afterChildSelectedChange)}},e.WidgetChild=r},"3.9.1",{requires:["base-build","widget"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("tabview-base",function(e,t){var n=e.ClassNameManager.getClassName,r="tabview",i="tab",s="panel",o="selected",u={},a=".",f={tabview:n(r),tabviewPanel:n(r,s),tabviewList:n(r,"list"),tab:n(i),tabLabel:n(i,"label"),tabPanel:n(i,s),selectedTab:n(i,o),selectedPanel:n(i,s,o)},l={tabview:a+f.tabview,tabviewList:"> ul",tab:"> ul > li",tabLabel:"> ul > li > a",tabviewPanel:"> div",tabPanel:"> div > div",selectedTab:"> ul > "+a+f.selectedTab,selectedPanel:"> div "+a+f.selectedPanel},c=function(){this.init.apply(this,arguments)};c.NAME="tabviewBase",c._queries=l,c._classNames=f,e.mix(c.prototype,{init:function(t){t=t||u,this._node=t.host||e.one(t.node),this.refresh()},initClassNames:function(t){e.Object.each(l,function(e,n){if(f[n]){var r=this.all(e);t!==undefined&&(r=r.item(t)),r&&r.addClass(f[n])}},this._node),this._node.addClass(f.tabview)},_select:function(e){var t=this._node,n=t.one(l.selectedTab),r=t.one(l.selectedPanel),i=t.all(l.tab).item(e),s=t.all(l.tabPanel).item(e);n&&n.removeClass(f.selectedTab),r&&r.removeClass(f.selectedPanel),i&&i.addClass(f.selectedTab),s&&s.addClass(f.selectedPanel)},initState:function(){var e=this._node,t=e.one(l.selectedTab),n=t?e.all(l.tab).indexOf(t):0;this._select(n)},_scrubTextNodes:function(){this._node.one(l.tabviewList).get("childNodes").each(function(e){e.get("nodeType")===3&&e.remove()})},refresh:function(){this._scrubTextNodes(),this.initClassNames(),this.initState(),this.initEvents()},tabEventName:"click",initEvents:function(){this._node.delegate(this.tabEventName,this.onTabEvent,l.tab,this)},onTabEvent:function(e){e.preventDefault(),this._select(this._node.all(l.tab).indexOf(e.currentTarget))},destroy:function(){this._node.detach(this.tabEventName)}}),e.TabviewBase=c},"3.9.1",{requires:["node-event-delegate","classnamemanager"]});
/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */



/* YUI 3.9.1 (build 5852) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add('tabview', function (Y, NAME) {

/**
 * The TabView module
 *
 * @module tabview
 */

var _queries = Y.TabviewBase._queries,
    _classNames = Y.TabviewBase._classNames,
    DOT = '.',

    /**
     * Provides a tabbed widget interface
     * @param config {Object} Object literal specifying tabview configuration properties.
     *
     * @class TabView
     * @constructor
     * @extends Widget
     * @uses WidgetParent
     */
    TabView = Y.Base.create('tabView', Y.Widget, [Y.WidgetParent], {
    _afterChildAdded: function() {
        this.get('contentBox').focusManager.refresh();
    },

    _defListNodeValueFn: function() {
        return Y.Node.create(TabView.LIST_TEMPLATE);
    },

    _defPanelNodeValueFn: function() {
        return Y.Node.create(TabView.PANEL_TEMPLATE);
    },

    _afterChildRemoved: function(e) { // update the selected tab when removed
        var i = e.index,
            selection = this.get('selection');

        if (!selection) { // select previous item if selection removed
            selection = this.item(i - 1) || this.item(0);
            if (selection) {
                selection.set('selected', 1);
            }
        }

        this.get('contentBox').focusManager.refresh();
    },

    _initAria: function() {
        var contentBox = this.get('contentBox'),
            tablist = contentBox.one(_queries.tabviewList);

        if (tablist) {
            tablist.setAttrs({
                //'aria-labelledby':
                role: 'tablist'
            });
        }
    },

    bindUI: function() {
        //  Use the Node Focus Manager to add keyboard support:
        //  Pressing the left and right arrow keys will move focus
        //  among each of the tabs.

        this.get('contentBox').plug(Y.Plugin.NodeFocusManager, {
                        descendants: DOT + _classNames.tabLabel,
                        keys: { next: 'down:39', // Right arrow
                                previous: 'down:37' },  // Left arrow
                        circular: true
                    });

        this.after('render', this._setDefSelection);
        this.after('addChild', this._afterChildAdded);
        this.after('removeChild', this._afterChildRemoved);
    },
    
    renderUI: function() {
        var contentBox = this.get('contentBox');
        this._renderListBox(contentBox);
        this._renderPanelBox(contentBox);
        this._childrenContainer = this.get('listNode');
        this._renderTabs(contentBox);
    },

    _setDefSelection: function() {
        //  If no tab is selected, select the first tab.
        var selection = this.get('selection') || this.item(0);

        this.some(function(tab) {
            if (tab.get('selected')) {
                selection = tab;
                return true;
            }
        });
        if (selection) {
            // TODO: why both needed? (via widgetParent/Child)?
            this.set('selection', selection);
            selection.set('selected', 1);
        }
    },

    _renderListBox: function(contentBox) {
        var node = this.get('listNode');
        if (!node.inDoc()) {
            contentBox.append(node);
        }
    },

    _renderPanelBox: function(contentBox) {
        var node = this.get('panelNode');
        if (!node.inDoc()) {
            contentBox.append(node);
        }
    },

    _renderTabs: function(contentBox) {
        var tabs = contentBox.all(_queries.tab),
            panelNode = this.get('panelNode'),
            panels = (panelNode) ? this.get('panelNode').get('children') : null,
            tabview = this;

        if (tabs) { // add classNames and fill in Tab fields from markup when possible
            tabs.addClass(_classNames.tab);
            contentBox.all(_queries.tabLabel).addClass(_classNames.tabLabel);
            contentBox.all(_queries.tabPanel).addClass(_classNames.tabPanel);

            tabs.each(function(node, i) {
                var panelNode = (panels) ? panels.item(i) : null;
                tabview.add({
                    boundingBox: node,
                    contentBox: node.one(DOT + _classNames.tabLabel),
                    panelNode: panelNode
                });
            });
        }
    }
}, {

    LIST_TEMPLATE: '<ul class="' + _classNames.tabviewList + '"></ul>',
    PANEL_TEMPLATE: '<div class="' + _classNames.tabviewPanel + '"></div>',

    ATTRS: {
        defaultChildType: {
            value: 'Tab'
        },

        listNode: {
            setter: function(node) {
                node = Y.one(node);
                if (node) {
                    node.addClass(_classNames.tabviewList);
                }
                return node;
            },

            valueFn: '_defListNodeValueFn'
        },

        panelNode: {
            setter: function(node) {
                node = Y.one(node);
                if (node) {
                    node.addClass(_classNames.tabviewPanel);
                }
                return node;
            },

            valueFn: '_defPanelNodeValueFn'
        },

        tabIndex: {
            value: null
            //validator: '_validTabIndex'
        }
    },

    HTML_PARSER: {
        listNode: _queries.tabviewList,
        panelNode: _queries.tabviewPanel
    }
});

Y.TabView = TabView;
var Lang = Y.Lang,
    _classNames = Y.TabviewBase._classNames;

/**
 * Provides Tab instances for use with TabView
 * @param config {Object} Object literal specifying tabview configuration properties.
 *
 * @class Tab
 * @constructor
 * @extends Widget
 * @uses WidgetChild
 */
Y.Tab = Y.Base.create('tab', Y.Widget, [Y.WidgetChild], {
    BOUNDING_TEMPLATE: '<li class="' + _classNames.tab + '"></li>',
    CONTENT_TEMPLATE: '<a class="' + _classNames.tabLabel + '"></a>',
    PANEL_TEMPLATE: '<div class="' + _classNames.tabPanel + '"></div>',

    _uiSetSelectedPanel: function(selected) {
        this.get('panelNode').toggleClass(_classNames.selectedPanel, selected);
    },

    _afterTabSelectedChange: function(event) {
       this._uiSetSelectedPanel(event.newVal);
    },

    _afterParentChange: function(e) {
        if (!e.newVal) {
            this._remove();
        } else {
            this._add();
        }
    },

    _initAria: function() {
        var anchor = this.get('contentBox'),
            id = anchor.get('id'),
            panel = this.get('panelNode');
 
        if (!id) {
            id = Y.guid();
            anchor.set('id', id);
        }
        //  Apply the ARIA roles, states and properties to each tab
        anchor.set('role', 'tab');
        anchor.get('parentNode').set('role', 'presentation');
 
 
        //  Apply the ARIA roles, states and properties to each panel
        panel.setAttrs({
            role: 'tabpanel',
            'aria-labelledby': id
        });
    },

    syncUI: function() {
        this.set('label', this.get('label'));
        this.set('content', this.get('content'));
        this._uiSetSelectedPanel(this.get('selected'));
    },

    bindUI: function() {
       this.after('selectedChange', this._afterTabSelectedChange);
       this.after('parentChange', this._afterParentChange);
    },

    renderUI: function() {
        this._renderPanel();
        this._initAria();
    },

    _renderPanel: function() {
        this.get('parent').get('panelNode')
            .appendChild(this.get('panelNode'));
    },

    _add: function() {
        var parent = this.get('parent').get('contentBox'),
            list = parent.get('listNode'),
            panel = parent.get('panelNode');

        if (list) {
            list.appendChild(this.get('boundingBox'));
        }

        if (panel) {
            panel.appendChild(this.get('panelNode'));
        }
    },
    
    _remove: function() {
        this.get('boundingBox').remove();
        this.get('panelNode').remove();
    },

    _onActivate: function(e) {
         if (e.target === this) {
             //  Prevent the browser from navigating to the URL specified by the
             //  anchor's href attribute.
             e.domEvent.preventDefault();
             e.target.set('selected', 1);
         }
    },
    
    initializer: function() {
       this.publish(this.get('triggerEvent'), {
           defaultFn: this._onActivate
       });
    },

    _defLabelGetter: function() {
        return this.get('contentBox').getHTML();
    },

    _defLabelSetter: function(label) {
        var labelNode = this.get('contentBox');
        if (labelNode.getHTML() !== label) { // Avoid rewriting existing label.
            labelNode.setHTML(label);
        }
        return label;
    },

    _defContentSetter: function(content) {
        var panel = this.get('panelNode');
        if (panel.getHTML() !== content) { // Avoid rewriting existing content.
            panel.setHTML(content);
        }
        return content;
    },

    _defContentGetter: function() {
        return this.get('panelNode').getHTML();
    },

    // find panel by ID mapping from label href
    _defPanelNodeValueFn: function() {
        var href = this.get('contentBox').get('href') || '',
            parent = this.get('parent'),
            hashIndex = href.indexOf('#'),
            panel;

        href = href.substr(hashIndex);

        if (href.charAt(0) === '#') { // in-page nav, find by ID
            panel = Y.one(href);
            if (panel) {
                panel.addClass(_classNames.tabPanel);
            }
        }

        // use the one found by id, or else try matching indices
        if (!panel && parent) {
            panel = parent.get('panelNode')
                    .get('children').item(this.get('index'));
        }

        if (!panel) { // create if none found
            panel = Y.Node.create(this.PANEL_TEMPLATE);
        }
        return panel;
    }
}, {
    ATTRS: {
        /**
         * @attribute triggerEvent
         * @default "click"
         * @type String
         */
        triggerEvent: {
            value: 'click'
        },

        /**
         * @attribute label
         * @type HTML
         */
        label: {
            setter: '_defLabelSetter',
            getter: '_defLabelGetter'
        },

        /**
         * @attribute content
         * @type HTML
         */
        content: {
            setter: '_defContentSetter',
            getter: '_defContentGetter'
        },

        /**
         * @attribute panelNode
         * @type Y.Node
         */
        panelNode: {
            setter: function(node) {
                node = Y.one(node);
                if (node) {
                    node.addClass(_classNames.tabPanel);
                }
                return node;
            },
            valueFn: '_defPanelNodeValueFn'
        },
        
        tabIndex: {
            value: null,
            validator: '_validTabIndex'
        }

    },

    HTML_PARSER: {
        selected: function() {
            var ret = (this.get('boundingBox').hasClass(_classNames.selectedTab)) ?
                        1 : 0;
            return ret;
        }
    }

});


}, '3.9.1', {
    "requires": [
        "widget",
        "widget-parent",
        "widget-child",
        "tabview-base",
        "node-pluginhost",
        "node-focusmanager"
    ],
    "skinnable": true
});
