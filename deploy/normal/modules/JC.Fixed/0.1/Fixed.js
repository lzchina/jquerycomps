(function(e,t){e("JC.Fixed",["JC.common"],function(){function e(r){if(e.getInstance(r))return e.getInstance(r);e.getInstance(r,this),this._model=new t(r),this._view=new n(this._model),this._init()}function t(e){this._layout=e}function n(e){this._model=e}return window.Fixed=JC.Fixed=e,e.prototype={_init:function(){return $([this._view,this._model]).on("BindEvent",function(e,t,n){_p.on(t,n)}),$([this._view,this._model]).on("TriggerEvent",function(e,t){var n=JC.f.sliceArgs(arguments);n.shift(),n.shift(),_p.trigger(t,n)}),this._model.init(),this._view.init(),JC.log("Fixed init:",(new Date).getTime()),this},show:function(){return this._view.show(),this},hide:function(){return this._view.hide(),this},layout:function(){return this._model.layout()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this}},e.getInstance=function(e,t){typeof e=="string"&&!/</.test(e)&&(e=$(e));if(!e||!e.length||typeof e=="string")return;return typeof t!="undefined"&&e.data("FixedIns",t),e.data("FixedIns")},e.autoInit=!0,e.durationms=200,e.stepms=3,e.interval=function(t){e._interval&&clearInterval(e._interval),t&&(e._interval=t)},t.prototype={init:function(){return this},isFixedTop:function(){return this._layout.is("[fixedtop]")},isFixedRight:function(){return this._layout.is("[fixedright]")},isFixedBottom:function(){return this._layout.is("[fixedbottom]")},isFixedLeft:function(){return this._layout.is("[fixedleft]")},isFixedCenter:function(){return this._layout.is("[fixedcenter]")},fixedtop:function(){return parseInt(this._layout.attr("fixedtop"),10)},fixedright:function(){return parseInt(this._layout.attr("fixedright"),10)},fixedbottom:function(){return parseInt(this._layout.attr("fixedbottom"),10)},fixedleft:function(){return parseInt(this._layout.attr("fixedleft"),10)},fixedAutoHide:function(){return JC.f.parseBool(this._layout.attr("fixedAutoHide"))},fixedcenter:function(){var e=(this._layout.attr("fixedcenter")||"").replace(/[^\d.,\-]/g,"").split(",");return e.length<2&&e.push("0"),e[0]=parseInt(e[0],10)||0,e[1]=parseInt(e[1],10)||0,e},fixeddurationms:function(t){var n;return this.layout().is("[fixeddurationms]")&&(n=parseInt(this.layout().attr("fixeddurationms"))),t.is("[fixeddurationms]")&&(n=parseInt(t.attr("fixeddurationms"))),typeof n=="undefined"&&(n=e.durationms),isNaN(n)&&(n=e.durationms),n},fixedstepms:function(t){var n;return this.layout().is("[fixedstepms]")&&(n=parseInt(this.layout().attr("fixedstepms"))),t.is("[fixedstepms]")&&(n=parseInt(t.attr("fixedstepms"))),typeof n=="undefined"&&(n=e.stepms),isNaN(n)&&(n=e.stepms),n},fixedmoveto:function(e){var t="";return e&&(e=$(e))&&e.length&&(t=e.attr("fixedmoveto")||""),t.trim()},moveToItem:function(){var e=this.layout().is("[fixedmoveto]")?this.layout():null,t;return e||(t=this._layout.find("[fixedmoveto]")).length&&(e=t),e},layout:function(){return this._layout},fixedeffect:function(e){var t=!0,n=this;return n.layout().is("[fixedeffect]")&&(t=JC.f.parseBool(n.layout().attr("fixedeffect"))),e&&e.is("[fixedeffect]")&&(t=JC.f.parseBool(e.attr("fixedeffect"))),t}},n.prototype={init:function(){var e=this;return $.support.isFixed?(this._initFixedSupport(),$(window).on("resize",function(){e._updateFixedSupport()})):this._initFixedUnsupport(),this._initMoveTo(),$(e).on("hide_layout",function(){e._model.layout().hide()}),$(e).on("show_layout",function(){e._model.layout().show()}),e._model.fixedAutoHide()?(JDOC.scrollTop()<=20&&$(e).trigger("hide_layout"),JDOC.on("scroll",function(){JDOC.scrollTop()<=20?$(e).trigger("hide_layout"):$(e).trigger("show_layout")})):$(e).trigger("show_layout"),this},_initMoveTo:function(){var t=this,n=t._model.moveToItem();if(!n||!n.length)return;n.on("click",function(e){var n=$(this),r=t._model.fixedmoveto(n).toLowerCase();t._processMoveto(r,n)}),$(window).on("resize",function(){e.interval()}),JC.f.mousewheelEvent(function(n){e.interval()})},_processMoveto:function(t,n){if(!t)return;var r=this,i=parseInt(t,10),s=$(document).height(),o=s-$(window).height(),u=$(document).scrollTop(),a=u,f=0,l,c,h,p;if(isNaN(i))switch(t){case"top":i=0;break;case"bottom":i=o;break;default:p=$(t),p.length&&(i=p.offset().top)}(isNaN(i)||i<0)&&(i=0),i>o&&(i=o);if(u==i)return;l=i<u?!0:!1,c=u>i?u:i,h=u>i?i:u;if(!r._model.fixedeffect(n)){$(document).scrollTop(i);return}e.interval(JC.f.easyEffect(function(e,t){l&&(e=c-e+h),$(document).scrollTop(e)},c,h,r._model.fixeddurationms(n),r._model.fixedstepms(n)))},_initFixedSupport:function(){var e=this,t=e._model.layout().width(),n=e._model.layout().height(),r=$(window).width(),i=$(window).height(),s;e._model.isFixedCenter()?e._updateFixedSupport():(e._model.isFixedTop()&&e._model.layout().css("top",e._model.fixedtop()+"px"),e._model.isFixedRight()&&e._model.layout().css("right",e._model.fixedright()+"px"),e._model.isFixedBottom()&&e._model.layout().css("bottom",e._model.fixedbottom()+"px"),e._model.isFixedLeft()&&e._model.layout().css("left",e._model.fixedleft()+"px")),e._model.layout().css("position","fixed")},_updateFixedSupport:function(){var e=this,t,n,r=$(document).scrollLeft(),i=e._model.layout().width(),s=e._model.layout().height(),o=$(window).width(),u=$(window).height(),a;e._model.isFixedCenter()&&(a=e._model.fixedcenter(),t=o/2-i/2+a[0],n=u/2-s/2+a[1],e._model.layout().css("left",t+"px"),e._model.layout().css("top",n+"px"))},_initFixedUnsupport:function(){var e=this;e._model.layout().css("position","absolute"),e._updateFixedUnsupport(),$(window).on("scroll resize",function(){e._updateFixedUnsupport()})},_updateFixedUnsupport:function(){var e=this,t,n,r,i,s=$(document).scrollTop(),o=$(document).scrollLeft(),u=e._model.layout().width(),a=e._model.layout().height(),f=$(window).width(),l=$(window).height();e._model.isFixedTop()&&(t=e._model.fixedtop()+s,e._model.layout().css("top",t+"px")),e._model.isFixedRight()&&(n=f-e._model.fixedright()-u+o,e._model.layout().css("left",n+"px")),e._model.isFixedBottom()&&(r=s+l-e._model.fixedbottom()-a,e._model.layout().css("top",r+"px")),e._model.isFixedLeft()&&(i=o+e._model.fixedleft(),e._model.layout().css("left",i+"px"))},hide:function(){},show:function(){}},window.jQuery&&jQuery.support&&(jQuery.support.isFixed=function(e){try{var t,n=e(document.documentElement),r=e("<div style='position:fixed;top:100px;visibility:hidden;'>x</div>").appendTo(n),i=n[0].style.height,s=window,o=e(s),u=o.scrollLeft(),a=o.scrollTop();return n.height(screen.height*2+"px"),s.scrollTo(0,100),t=r[0].getBoundingClientRect().top===100,n.height(i),r.remove(),s.scrollTo(u,a),t}catch(f){alert(f.message)}}(jQuery)),$(document).ready(function(){if(!e.autoInit)return;$(["div.js_autoFixed","dl.js_autoFixed","ul.js_autoFixed","ol.js_autoFixed","button.js_autoFixed","a.js_autoFixed"].join()).each(function(){new e($(this))})}),JC.Fixed})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);