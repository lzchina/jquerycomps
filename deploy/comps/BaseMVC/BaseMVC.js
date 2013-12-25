(function(b,a){b(["JC.common"],function(){window.BaseMVC=JC.BaseMVC=c;function c(d){throw new Error("JC.BaseMVC is an abstract class, can't initialize!");if(c.getInstance(d)){return c.getInstance(d)}c.getInstance(d,this);this._model=new c.Model(d);this._view=new c.View(this._model);this._init()}c.prototype={_init:function(){var d=this;d._beforeInit();d._initHanlderEvent();$([d._view,d._model]).on("BindEvent",function(e,g,f){d.on(g,f)});$([d._view,d._model]).on("TriggerEvent",function(e,g){var f=JC.f.sliceArgs(arguments).slice(2);d.trigger(g,f)});d._model.init();d._view&&d._view.init();d._inited();return d},_beforeInit:function(){},_initHanlderEvent:function(){},_inited:function(){},selector:function(){return this._model.selector()},on:function(e,d){$(this).on(e,d);return this},trigger:function(e,d){$(this).trigger(e,d);return this}};c.getInstance=function(d,e,f){typeof d=="string"&&!/</.test(d)&&(d=$(d));if(!(d&&d.length)||(typeof d=="string")){return null}e.Model._instanceName=e.Model._instanceName||"CommonIns";typeof f!="undefined"&&d.data(e.Model._instanceName,f);return d.data(e.Model._instanceName)};c.autoInit=true;c.build=function(d){c.buildModel(d);c.buildView(d);c.buildClass(c,d);c.buildClass(c.Model,d.Model);c.buildClass(c.View,d.View)};c.buildClass=function(d,e){if(!(d&&e)){return}var h,g,f;if(e){for(h in d){if(!e[h]){if(d[h].constructor==Function){}else{e[h]=d[h]}}}for(h in d.prototype){!e.prototype[h]&&(e.prototype[h]=d.prototype[h])}}};c.buildModel=function(d){!d.Model&&(d.Model=function(e){this._selector=e},d.Model._instanceName="CommonIns")};c.buildView=function(d){!d.View&&(d.View=function(e){this._model=e})};c.buildModel(c);c.buildView(c);c.Model._instanceName="BaseMVCIns";JC.f.extendObject(c.Model.prototype,{init:function(){return this},selector:function(d){typeof d!="undefined"&&(this._selector=d);return this._selector},intProp:function(d,e){if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}var f=0;d&&d.is("["+e+"]")&&(f=parseInt(d.attr(e).trim(),10)||f);return f},floatProp:function(d,e){if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}var f=0;d&&d.is("["+e+"]")&&(f=parseFloat(d.attr(e).trim())||f);return f},stringProp:function(d,e){if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}var f=(this.attrProp(d,e)||"").toLowerCase();return f},attrProp:function(d,e){if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}var f="";d&&d.is("["+e+"]")&&(f=d.attr(e).trim());return f},boolProp:function(d,e,g){if(typeof e=="boolean"){g=e;e=d;d=this.selector()}else{if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}}var f=undefined;d&&d.is("["+e+"]")&&(f=JC.f.parseBool(d.attr(e).trim()));return f},callbackProp:function(d,f){if(typeof f=="undefined"){f=d;d=this.selector()}else{d&&(d=$(d))}var g,e;d&&d.is("["+f+"]")&&(e=window[d.attr(f)])&&(g=e);return g},windowProp:function(){return this.callbackProp.apply(this,JC.f.sliceArgs(arguments))},selectorProp:function(d,e){var f;if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}d&&d.is("["+e+"]")&&(f=JC.f.parentSelector(d,d.attr(e)));return f},is:function(d,e){if(typeof e=="undefined"){e=d;d=this.selector()}else{d&&(d=$(d))}return d&&d.is(e)}});JC.f.extendObject(c.View.prototype,{init:function(){return this}});return JC.BaseMVC})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));