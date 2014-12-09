(function(e,t){e(["JC.common"],function(){var e=$(document),t=$(window),n;return JC.FrameUtil=n={eventHost:{},heightOffset:0,autoUpdateSizeMs:1e3,childSizePattern:1,isChildAutoClose:!0,isChildAutoSize:!0,id:function(){return n._id},noticeSize:function(e){try{e=n.type(e);if(!n.parent())return n;var t={type:e};n.parent().jEventHost.trigger("size",[n.info(t)])}catch(r){JC.error("JC.FrameUtil noticeSize",r.message)}return n},autoNoticeSize:function(e,t){return typeof e=="undefined"&&(e=n.autoUpdateSizeMs),$(n).data("FUI_noticeSize")&&clearInterval($(n).data("FUI_noticeSize")),n.noticeSize(t),e&&$(n).data("FUI_noticeSize",setInterval(function(){n.noticeSize(t)},e)),n},subscribeEvent:function(e,t){return e?($(n.eventHost).on(e,t),n):n},noticeData:function(e,t){try{if(!e)return n;if(!n.parent())return n;t=n.type(t),n.parent().jEventHost.trigger("data",n.info({data:e,type:t}))}catch(r){JC.error("JC.FrameUtil noticeData",r.message)}return n},noticeReload:function(e,t){return n.parent()?(t=n.type(t),n.parent().jEventHost.trigger("reload",n.info({url:e,type:t})),n):n},noticeReady:function(e){if(!n.parent())return n;try{e=n.type(e),n.parent()&&n.parent().jEventHost.trigger("ready",n.info({type:e}))}catch(t){JC.error("JC.FrameUtil noticeReady",t.message)}return n},noticeChildData:function(e,t){return e?(e.type=n.type(t)||e.type,n.info().jEventHost.trigger("childData",n.info(e)),n):n},noticeClose:function(e){try{e=n.type(e),n.parent().jEventHost.trigger("close",n.info({type:e}))}catch(t){JC.error("JC.FrameUtil noticeClose",t.message)}return n},info:function(e){var t=$(document.body),r=JC.f.docSize(),i={$:$,width:r.width,height:r.height,bodyWidth:r.bodyWidth,bodyHeight:r.bodyHeight,id:n.id(),eventHost:n.eventHost,jEventHost:$(n.eventHost),FrameUtil:n};return e&&(i=JC.f.extendObject(i,e)),i},parent:function(){var e;return window.parent&&window.parent!=window&&window.parent.$&&window.parent.JC&&window.parent.JC.FrameUtil&&(e={$:window.parent.$,win:window.parent,jwin:window.parent.$(window.parent),JC:window.parent.JC,eventHost:window.parent.JC.FrameUtil.eventHost,jEventHost:window.parent.$(window.parent.JC.FrameUtil.eventHost),id:window.parent.JC.FrameUtil.id(),FrameUtil:window.parent.JC.FrameUtil}),e},frameInfo:function(e,t){e&&(e=$(e));var n=null;if(e&&e.length){try{var r=e.prop("contentWindow"),i=e.prop("contentDocument"),s=JC.f.getUrlParam(e.attr("src")||"","jsAction")||r.name||"",o=JC.f.docSize(i)}catch(u){return JC.error("JC.FrameUtil frameInfo",u.message),n}n={$:r.$,width:o.width,height:o.height,bodyWidth:o.bodyWidth,bodyHeight:o.bodyHeight,docWidth:o.docWidth,docHeight:o.docHeight,win:r,doc:i,type:s,id:""},i&&i.body&&(n.bodyWidth=i.body.offsetWidth,n.bodyHeight=i.body.offsetHeight),r.JC&&r.JC.FrameUtil&&(n.id=r.JC.FrameUtil.id()),t&&(n=JC.f.extendObject(n,t))}return n},type:function(e,t,n){return e||(n&&(n=$(n)),n&&n.length?(e=JC.f.getUrlParam(n.attr("jsAction")||"","jsAction"),e=e||n.prop("contentWindow").name||""):(e=JC.f.getUrlParam("jsAction"),e=e||window.name||"")),e&&t&&(e+=t),e},updateChildrenSize:function(e){return e&&(e=$(e)),!e||!e.length?n:(e.each(function(){n.updateChildSize($(this))}),n)},updateChildSize:function(e){e&&(e=$(e));if(!e||!e.length)return n;if(!e.is(":visible"))return n;var t,r;t=n.frameInfo(e);if(!t)return;return t.height?(e.css(n.cssFromSizePattern(n.childSizePattern,t)),e.css("height",t.height+"px"),n):n},childrenAutoSize:function(e,t){e&&(e=$(e));if(!e||!e.length)return n;typeof t=="undefined"&&(t=n.autoUpdateSizeMs);var r={frames:e};return n.updateChildrenSize(e),e.data("FUI_autoSize")&&clearInterval(e.data("FUI_autoSize")),t&&e.data("FUI_autoSize",setInterval(function(){n.updateChildrenSize(e)},t)),n},childIdMap:function(e){var t;return e&&(e in n._childIdMap?t=n._childIdMap[e]:$("iframe").each(function(r){var i=$(this),s=i.prop("contentWindow");if(s&&s.JC&&s.JC.FrameUtil&&s.JC.FrameUtil.id()&&s.JC.FrameUtil.id()===e)return n._childIdMap[e]=t=i,!1})),t},_childIdMap:{},cssFromSizePattern:function(e,t){var r={};switch(e){case 1:r.height=t.height+n.heightOffset;break;case 2:r.width=t.width;break;default:r.height=t.height+n.heightOffset,r.width=t.width}return r}},n._id=location.href+"_"+(new Date).getTime(),n.parent()&&(n.parent().FrameUtil.subscribeEvent("childData",function(e,t){if(t.id!==n._id)return;n.noticeChildData(t)}),setTimeout(function(){n.noticeReady()},1)),JC.f.safeTimeout(function(){n.isChildAutoSize&&JC.FrameUtil.subscribeEvent("size",function(e,t){if(!t.height)return;var r=n.childIdMap(t.id),i;r&&r.length&&r.css(n.cssFromSizePattern(n.childSizePattern,t))}),n.isChildAutoClose&&JC.FrameUtil.subscribeEvent("close",function(e,t){var r=n.childIdMap(t.id),i,s;r&&r.length&&(s=JC.f.parentSelector(r,"div.UPanel"),s&&s.length&&JC.Panel.getInstance(s)&&JC.Panel.getInstance(s).close())}),JC.FrameUtil.subscribeEvent("reload",function(e,t){var n=t.url||location.href;JC.f.reloadPage(n)})},null,"JCFrameUtilInit",200),JC.FrameUtil})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);