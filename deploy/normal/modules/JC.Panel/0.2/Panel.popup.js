(function(e,t){e(["JC.Panel.default"],function(){JC.msgbox=function(t,n,r,i,s){typeof n=="number"&&(r=n,n=null),typeof i=="number"&&(s=i,i=null);var o=e.popup(JC.msgbox.tpl||e.tpls.msgbox,t,n,r);return i&&o.on("close",i),setTimeout(function(){o.autoClose(s)},1),o},JC.msgbox.tpl,JC.alert=function(t,n,r,i){return typeof n=="number"&&(r=n,n=null),e.popup(JC.alert.tpl||e.tpls.alert,t,n,r,i)},JC.alert.tpl,JC.confirm=function(t,n,r,i,s){typeof n=="number"&&(r=n,n=null);var o=e.popup(JC.confirm.tpl||e.tpls.confirm,t,n,r,i);return o&&s&&o.on("cancel",s),o},JC.confirm.tpl;var e={minWidth:180,maxWidth:500,xoffset:9,yoffset:3,popupIdentifier:function(e){var t;e?(e.selector().addClass("UPanelPopup_identifer"),e.selector().data("PopupInstance",e)):($("body > div.UPanelPopup_identifer").each(function(){var e=$(this),t=Panel.getInstance(e);if(!t)return;t.hide(),t.close()}),$("body > div.UPanel_TMP").remove())},popup:function(t,n,r,i,s){if(!n)return;e.popupIdentifier(),r&&(r=$(r));var t=t.replace(/\{msg\}/g,n).replace(/\{status\}/g,e.getStatusClass(i||"")),o=new JC.Panel(t);return e.popupIdentifier(o),o.selector().data("popupSrc",r),e.fixWidth(n,o),s&&o.on("confirm",s),r||o.center(),o.on("show_default",function(){JC.log("user show_default");if(r&&r.length)return e.showEffect(o,r,function(){o.focusButton()}),!1}),o.on("close_default",function(){return JC.log("user close_default"),r&&r.length?e.hideEffect(o,r,function(){o.selector().remove(),o=null}):o.selector().remove(),!1}),o.on("hide_default",function(){JC.log("user hide_default");if(r&&r.length)return e.hideEffect(o,r,function(){o.selector().hide()}),!1;o.selector().hide()}),r&&r.length&&o.selector().css({left:"-9999px",top:"-9999px"}),o.selector().css("z-index",window.ZINDEX_COUNT++),o.show(),o},hideEffect:function(t,n,r){n&&(n=$(n));if(!n||!n.length){r&&r(t);return}if(!t||!t.selector)return;var i=n.offset(),s=t.selector(),o=s[0];o.interval&&clearInterval(o.interval),o.defaultWidth&&s.width(o.defaultWidth),o.defaultHeight&&s.height(o.defaultHeight);var u=n.width(),a=s.height();o.defaultWidth=s.width(),o.defaultHeight=s.height();var f=e.getLeft(i.left,u,s.width()),l=e.getTop(i.top,n.height(),a);l=l-a-e.yoffset,s.height(0),s.css({left:f+"px"}),o.interval=JC.f.easyEffect(function(e,i){s.css({top:l+e+"px",height:a-e+"px"}),n&&!n.is(":visible")&&(clearInterval(o.interval),r&&r(t)),a===e&&s.hide(),i&&r&&r(t)},a)},showEffect:function(t,n,r){n&&(n=$(n));if(!n||!n.length)return;if(!t||!t.selector)return;var i=n.offset(),s=t.selector(),o=s[0];o.interval&&clearInterval(o.interval),o.defaultWidth&&s.width(o.defaultWidth),o.defaultHeight&&s.height(o.defaultHeight);var u=n.width(),a=s.height();o.defaultWidth=s.width(),o.defaultHeight=s.height();var f=e.getLeft(i.left,u,s.width()),l=e.getTop(i.top,n.height(),a,e.xoffset);s.height(0),s.css({left:f+"px"}),JC.log(l,i.top),l>i.top?o.interval=JC.f.easyEffect(function(n,i){s.css({top:l-a-e.yoffset+"px",height:n+"px"}),i&&r&&r(t)},a):o.interval=JC.f.easyEffect(function(n,i){s.css({top:l-n-e.yoffset+"px",height:n+"px"}),i&&r&&r(t)},a)},onresize:function(t){if(!t.selector().is(":visible"))return;var n=t.selector(),r=n.data("popupSrc");if(!r||!r.length)t.center();else{var i=r.offset(),s=i.top,o=r.height(),u=n.height(),a=0,f=i.left,l=r.width(),c=n.width(),h=0,p=e.getLeft(f,l,c,h)+e.xoffset,d=e.getTop(s,o,u,a)-u-e.yoffset;n.css({left:p+"px",top:d+"px"})}},getTop:function(e,t,n,r){var i=e,s=$(document).scrollTop(),o=$(window).height()-n;return i-n<s&&(i=e+t+n+r),i},getLeft:function(e,t,n,r){r==undefined&&(r=5);var i=e+t/2+r-n/2,s=$(document).scrollLeft(),o=$(window).width()+s-n;return i>o&&(i=o-2),i<s&&(i=s+1),i},fixWidth:function(t,n){var r=$('<div class="UPanel_TMP" style="position:absolute; left:-9999px;top:-9999px;">'+t+"</div>").appendTo("body"),i=r.width()+80;r.remove(),i>e.maxWidth&&(i=e.maxWidth),i<e.minWidth&&(i=e.minWidth),n.selector().css("width",i)},getStatusClass:function(e){var t="UPanelSuccess";switch(e){case 0:t="UPanelSuccess";break;case 1:t="UPanelError";break;case 2:t="UPanelAlert"}return t},tpls:{msgbox:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),alert:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join(""),confirm:['<div class="UPanel UPanelPopup {status}" >','    <div class="UPContent">','        <div class="bd">',"            <dl>",'                <dd class="UPopupContent">','                <button class="UIcon" align="absMiddle" ></button><div class="UText"><button type="button" class="UPlaceholder"></button>{msg}</div>',"                </dd>",'                <dd class="UButton">','                    <button type="button" class="UPanel_confirm" eventtype="confirm">确定</button>','                    <button type="button" class="UPanel_cancel" eventtype="cancel">取消</button>',"                </dd>","            </dl>","        </div>","    </div><!--end UPContent-->","</div>"].join("")}};return $(window).on("resize",function(t){$("body > div.UPanelPopup_identifer").each(function(){var t=$(this);t.data("PopupInstance")&&e.onresize(t.data("PopupInstance"))})}),JC.Panel})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);