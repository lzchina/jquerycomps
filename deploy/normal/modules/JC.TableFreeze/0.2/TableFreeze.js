(function(e,t){e(["JC.BaseMVC"],function(){function e(t){t&&(t=$(t));if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init()}return JC.TableFreeze=e,e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data(e.Model._instanceName,n),t.data(e.Model._instanceName)},e.init=function(t){var n=[];return t=$(t||document),t.length&&(t.hasClass("js_compTableFreeze")?n.push(new e(t)):t.find("div.js_compTableFreeze").each(function(){n.push(new e(this))})),n},BaseMVC.build(e),JC.f.extendObject(e.prototype,{_beforeInit:function(){var t=this,n=t._model.selector().find(">table");t._model.alternateClass()&&n.find(">tbody>tr:odd").addClass(t._model.alternateClass()),e.Model.sourceTable=n.clone(),e.Model.colnumWidth=t._model.colnumWidth(n),t._model.needProcess()&&n.detach(),e.Model.initWidth=t._model.selector().width()},_initHanlderEvent:function(){var e=this,t;e._model.beforeCreateTableCallback()&&e._model.beforeCreateTableCallback().call(e,e.selector()),e._view.update(),e._model.afterCreateTableCallback()&&e._model.afterCreateTableCallback().call(e,e.selector()),e._model.needHoverClass()&&(e._model.selector().addClass("needHoverClass"),e._model.needProcess()&&(t="compTFHover",$(document).delegate("tbody .CTF","mouseenter",function(){var e=$(this),n="tbody ."+e.attr("data-ctf"),r=e.parents(".js_compTableFreeze").find(n);r.addClass(t).attr("status","1")}).delegate("tbody .CTF","mouseleave",function(){var e=$(this),n="tbody ."+e.attr("data-ctf"),r=e.parents(".js_compTableFreeze").find(n);r.removeClass(t)})))},_inited:function(){},update:function(){var t=this,n=t._model.selector(),r=n.width(),i=n.find(".js-fixed-table>table>thead>tr,.js-fixed-table>table>tbody>tr,.js-roll-table>table>thead>tr,.js-roll-table>table>tbody>tr");r>e.Model.tempWidth&&i.height("auto"),t._view.fixHeight()}}),e.Model._instanceName="TableFreeze",e.Model.sourceTable="",e.Model.colnumWidth=[],e.Model.initWidth=0,e.Model.tempWidth=e.Model.initWidth,JC.f.extendObject(e.Model.prototype,{init:function(){},freezeType:function(){var e=this.stringProp("freezeType")||"prev";return e!=="prev"&&e!=="both"&&e!=="last"&&(e="prev"),e},freezeCols:function(){var e=this,t=e.attrProp("freezeCols"),n=e.freezeType(),r=[];return t?(r=t.split(","),r[0]=+r[0],r[1]=+r[1],n==="both"?r[0]===0&&r[1]===0?t=0:t=r.slice():t=r[0],t):(n!=="both"&&(t=1),n==="both"&&(t=[1,1]),t)},scrollWidth:function(){var e=this.attrProp("scrollWidth");return!e&&(e="120%"),e},needHoverClass:function(){var e=this.boolProp("needHoverClass");return typeof e=="undefined"&&(e=!0),e},alternateClass:function(){var e=this.attrProp("alternateClass");return e},colnum:function(){var t=e.Model.sourceTable,n=t.find("tr:eq(0)"),r=n.find(">th, >td"),i=r.length;return r.each(function(){var e=$(this),t=e.prop("colspan");e.prop("colspan")&&(i+=t-1)}),i},colnumWidth:function(e){var t=e.find("tr:eq(0)"),n=t.find(">th, >td"),r=[];return n.each(function(){r.push($(this).prop("offsetWidth"))}),r},trElement:function(e){var t=e.find(">thead"),n=e.find(">tbody"),r,i;return t.length?r=t.find(">tr"):r=e.find(">tr:eq(0)"),n.length?i=n.find(">tr"):i=e.find(">tr:gt(0)"),{theadTr:r,tbodyTr:i}},needProcess:function(){var t=this,n=t.freezeCols(),r=t.freezeType(),i=t.selector(),s=e.Model.sourceTable,o=!0;return s.find("tr").length===0?!1:n===0?(i.css("overflow-x","scroll").find(">table").css("width",t.scrollWidth()),!1):r==="both"&&n[0]+n[1]>=t.colnum()?!1:o},layout:function(e){var t,n,r="",i;switch(e){case"last":t="js-roll-table compTFLastRoll",n="js-fixed-table compTFLastFixed";break;case"both":t="js-fixed-table compTFBothFixed",n="js-fixed-table compTFBothFixed",r="js-roll-table compTFBothRoll";break;case"prev":default:t="js-fixed-table compTFPrevFixed",n="js-roll-table compTFPrevRoll"}return r?i='<div class="'+t+'"><table><thead>{0}</thead><tbody>{1}</tbody></table></div>'+'<div class="'+r+'"><table><thead>{2}</thead><tbody>{3}</tbody></table></div>'+'<div class="'+n+'"><table><thead>{4}</thead><tbody>{5}</tbody></table></div>':i='<div class="'+t+'"><table><thead>{0}</thead><tbody>{1}</tbody></table></div>'+'<div class="'+n+'"><table><thead>{2}</thead><tbody>{3}</tbody></table></div>',i},creatTpl:function(){var t=this,n=e.Model.sourceTable,r=t.freezeType(),i=t.freezeCols(),s=t.colnum(),o=t.trElement(n),u=o.theadTr,a=o.tbodyTr,f=t.getTr(r,i,u,s),l=t.getTr(r,i,a,s),c=t.layout(r),h;switch(r){case"both":h=JC.f.printf(c,f.leftTr,l.leftTr,f.midTr,l.midTr,f.rightTr,l.rightTr);break;case"last":case"prev":h=JC.f.printf(c,f.leftTr,l.leftTr,f.rightTr,l.rightTr)}t.selector().append(h)},getTr:function(e,t,n,r){var i=[],s=[],o=[],u,a=0,f=t;return n.each(function(n){var u=$(this),l="CTF CTF"+n,c=u[0].cloneNode(!1),h=u[0].cloneNode(!1),p=u.find(">td"),d="",v,m,g;switch(e){case"both":d=u[0].cloneNode(!1),f=t[0],v=u.find(">th,>td").slice(a,f).appendTo(c),m=u.find(">th,>td").slice(r-f-t[1],r).appendTo(h),g=u.find(">th,>td").appendTo(d);break;case"last":f=r-t,v=u.find(">th,>td").slice(a,f).appendTo(c),m=u.find(">th,>td").appendTo(h);break;case"prev":v=u.find(">th,>td").slice(a,f).appendTo(c),m=u.find(">th,>td").appendTo(h)}$(c).addClass(l).attr("data-ctf","CTF"+n),$(d).addClass(l).attr("data-ctf","CTF"+n),$(h).addClass(l).attr("data-ctf","CTF"+n),i.push(c.outerHTML),s.push(d.outerHTML),o.push(h.outerHTML)}),u={leftTr:i.join(" "),midTr:s.join(" "),rightTr:o.join(" ")},u},getSum:function(e){var t=1,n=e.length;while(n--)t+=e.pop();return t},beforeCreateTableCallback:function(){var e=this,t=e.selector(),n="beforeCreateTableCallback";return e.callbackProp(t,n)},afterCreateTableCallback:function(){var e=this,t=e.selector(),n="afterCreateTableCallback";return e.callbackProp(t,n)}}),JC.f.extendObject(e.View.prototype,{init:function(){},update:function(){var e=this,t=e._model.selector(),n=e._model.needProcess();n&&(e._model.creatTpl(),e.fixWidth(),e.fixHeight())},fixWidth:function(){var t=this,n=t.selector(),r=t._model.freezeType(),i=t._model.freezeCols(),s=e.Model.initWidth,o=t._model.scrollWidth(),u=e.Model.colnumWidth,a=u.length,f,l,c;switch(r){case"prev":f=t._model.getSum(u.slice(0,i)),l=s-f,n.find(">.js-fixed-table").width(f/s*100+"%").end().find(">.js-roll-table").width(l/s*100+"%").find(">table").width(o);break;case"last":l=t._model.getSum(u.slice(a-i,a)),f=s-l-1,n.find(">.js-fixed-table").width(l/s*100+"%").end().find(">.js-roll-table").width(f/s*100+"%").find(">table").width(o);break;case"both":f=t._model.getSum(u.slice(0,i[0])),l=t._model.getSum(u.slice(a-i[1],a)),c=s-f-l,n.find(">.js-fixed-table:eq(0)").width(f/s*100+"%").end().find(">.js-roll-table").width(c/s*100+"%").find(">table").width(o).end().end().find(">.js-fixed-table:eq(1)").width(l/s*100+"%")}},fixHeight:function(){var e=this,t=e._model.selector(),n=t.find(">.js-fixed-table:eq(0)>table>thead>tr, >.js-fixed-table:eq(0)>table>tbody>tr"),r=t.find(">.js-roll-table>table>thead>tr,>.js-roll-table>table>tbody>tr"),i=t.find(">.js-fixed-table:eq(1)>table>thead>tr, >.js-fixed-table:eq(1)>table>tbody>tr"),s=e._model.freezeType();n.each(function(e,t){var n=$(this),o=r.eq(e),u=i.eq(e),a=Math.max(n.prop("offsetHeight"),o.prop("offsetHeight"));s==="both"&&(a=Math.max(a,u.prop("offsetHeight")),u.height(a)),n.height(a),o.height(a)});return},highlight:function(){console.log("highlight")}}),$(document).ready(function(){function r(){n.off("resize",r),$("div.js_compTableFreeze").each(function(){var t=e.getInstance($(this));t&&t.update(),e.Model.tempWidth=t._model.selector().prop("offsetWidth")}),n.data("CTFResizeTimeout")&&clearTimeout(n.data("CTFResizeTimeout")),n.data("CTFResizeTimeout",setTimeout(function(){n.off("resize",r),n.on("resize",r)},80))}var t=0,n=$(window);e.autoInit&&(t=e.init()),n.on("resize",r)}),JC.TableFreeze})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);