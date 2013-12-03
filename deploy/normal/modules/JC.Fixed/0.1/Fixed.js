(function(e,t){e(["JC.common"],function(){return function(e){function t(e){if(t.getInstance(e))return t.getInstance(e);t.getInstance(e,this),this._model=new n(e),this._view=new r(this._model),this._init()}function n(e){this._layout=e}function r(e){this._model=e}window.JC=window.JC||{log:function(){}},window.Fixed=JC.Fixed=t,t.prototype={_init:function(){return e([this._view,this._model]).on("BindEvent",function(e,t,n){_p.on(t,n)}),e([this._view,this._model]).on("TriggerEvent",function(e,t){var n=JC.f.sliceArgs(arguments);n.shift(),n.shift(),_p.trigger(t,n)}),this._model.init(),this._view.init(),JC.log("Fixed init:",(new Date).getTime()),this},show:function(){return this._view.show(),this},hide:function(){return this._view.hide(),this},layout:function(){return this._model.layout()},on:function(t,n){return e(this).on(t,n),this},trigger:function(t,n){return e(this).trigger(t,n),this}},t.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=e(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data("FixedIns",n),t.data("FixedIns")},t.autoInit=!0,t.durationms=300,t.stepms=3,t.interval=function(e){t._interval&&clearInterval(t._interval),e&&(t._interval=e)},n.prototype={init:function(){return this},isFixedTop:function(){return this._layout.is("[fixedtop]")},isFixedRight:function(){return this._layout.is("[fixedright]")},isFixedBottom:function(){return this._layout.is("[fixedbottom]")},isFixedLeft:function(){return this._layout.is("[fixedleft]")},isFixedCenter:function(){return this._layout.is("[fixedcenter]")},fixedtop:function(){return parseInt(this._layout.attr("fixedtop"),10)},fixedright:function(){return parseInt(this._layout.attr("fixedright"),10)},fixedbottom:function(){return parseInt(this._layout.attr("fixedbottom"),10)},fixedleft:function(){return parseInt(this._layout.attr("fixedleft"),10)},fixedcenter:function(){var e=(this._layout.attr("fixedcenter")||"").replace(/[^\d.,\-]/g,"").split(",");return e.length<2&&e.push("0"),e[0]=parseInt(e[0],10)||0,e[1]=parseInt(e[1],10)||0,e},fixeddurationms:function(e){var n;return this.layout().is("[fixeddurationms]")&&(n=parseInt(this.layout().attr("fixeddurationms"))),e.is("[fixeddurationms]")&&(n=parseInt(e.attr("fixeddurationms"))),typeof n=="undefined"&&(n=t.durationms),isNaN(n)&&(n=t.durationms),n},fixedstepms:function(e){var n;return this.layout().is("[fixedstepms]")&&(n=parseInt(this.layout().attr("fixedstepms"))),e.is("[fixedstepms]")&&(n=parseInt(e.attr("fixedstepms"))),typeof n=="undefined"&&(n=t.stepms),isNaN(n)&&(n=t.stepms),n},fixedmoveto:function(t){var n="";return t&&(t=e(t))&&t.length&&(n=t.attr("fixedmoveto")||""),n.trim()},moveToItem:function(){var e=this.layout().is("[fixedmoveto]")?this.layout():null,t;return e||(t=this._layout.find("[fixedmoveto]")).length&&(e=t),e},layout:function(){return this._layout},fixedeffect:function(e){var t=!0,n=this;return n.layout().is("[fixedeffect]")&&(t=JC.f.parseBool(n.layout().attr("fixedeffect"))),e&&e.is("[fixedeffect]")&&(t=JC.f.parseBool(e.attr("fixedeffect"))),t}},r.prototype={init:function(){var t=this;return e.support.isFixed?(this._initFixedSupport(),e(window).on("resize",function(){t._updateFixedSupport()})):this._initFixedUnsupport(),this._initMoveTo(),this._model.layout().show(),this},_initMoveTo:function(){var n=this,r=n._model.moveToItem();if(!r||!r.length)return;r.on("click",function(t){var r=e(this),i=n._model.fixedmoveto(r).toLowerCase();n._processMoveto(i,r)}),e(window).on("resize",function(){t.interval()}),JC.f.mousewheelEvent(function(n){t.interval()})},_processMoveto:function(n,r){if(!n)return;var i=this,s=parseInt(n,10),o=e(document).height(),u=o-e(window).height(),a=e(document).scrollTop(),f=a,l=0,c,h,p,d;if(isNaN(s))switch(n){case"top":s=0;break;case"bottom":s=u;break;default:d=e(n),d.length&&(s=d.offset().top)}(isNaN(s)||s<0)&&(s=0),s>u&&(s=u);if(a==s)return;c=s<a?!0:!1,h=a>s?a:s,p=a>s?s:a;if(!i._model.fixedeffect(r)){e(document).scrollTop(s);return}t.interval(JC.f.easyEffect(function(t,n){c&&(t=h-t+p),e(document).scrollTop(t)},h,p,i._model.fixeddurationms(r),i._model.fixedstepms(r)))},_initFixedSupport:function(){var t=this,n=t._model.layout().width(),r=t._model.layout().height(),i=e(window).width(),s=e(window).height(),o;t._model.isFixedCenter()?t._updateFixedSupport():(t._model.isFixedTop()&&t._model.layout().css("top",t._model.fixedtop()+"px"),t._model.isFixedRight()&&t._model.layout().css("right",t._model.fixedright()+"px"),t._model.isFixedBottom()&&t._model.layout().css("bottom",t._model.fixedbottom()+"px"),t._model.isFixedLeft()&&t._model.layout().css("left",t._model.fixedleft()+"px")),t._model.layout().css("position","fixed")},_updateFixedSupport:function(){var t=this,n,r,i=e(document).scrollLeft(),s=t._model.layout().width(),o=t._model.layout().height(),u=e(window).width(),a=e(window).height(),f;t._model.isFixedCenter()&&(f=t._model.fixedcenter(),n=u/2-s/2+f[0],r=a/2-o/2+f[1],t._model.layout().css("left",n+"px"),t._model.layout().css("top",r+"px"))},_initFixedUnsupport:function(){var t=this;t._model.layout().css("position","absolute"),t._updateFixedUnsupport(),e(window).on("scroll resize",function(){t._updateFixedUnsupport()})},_updateFixedUnsupport:function(){var t=this,n,r,i,s,o=e(document).scrollTop(),u=e(document).scrollLeft(),a=t._model.layout().width(),f=t._model.layout().height(),l=e(window).width(),c=e(window).height();t._model.isFixedTop()&&(n=t._model.fixedtop()+o,t._model.layout().css("top",n+"px")),t._model.isFixedRight()&&(r=l-t._model.fixedright()-a+u,t._model.layout().css("left",r+"px")),t._model.isFixedBottom()&&(i=o+c-t._model.fixedbottom()-f,t._model.layout().css("top",i+"px")),t._model.isFixedLeft()&&(s=u+t._model.fixedleft(),t._model.layout().css("left",s+"px"))},hide:function(){},show:function(){}},e(document).ready(function(){if(!t.autoInit)return;e(["div.js_autoFixed","dl.js_autoFixed","ul.js_autoFixed","ol.js_autoFixed","button.js_autoFixed"].join()).each(function(){new t(e(this))})})}(jQuery),JC.Fixed})})(typeof define=="function"&&define.amd?define:function(e,t){t&&t()},this);