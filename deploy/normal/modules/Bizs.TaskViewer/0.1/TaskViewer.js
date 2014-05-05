(function(e,t){e(["JC.BaseMVC"],function(){function e(t){t&&(t=$(t));if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init()}return window.Bizs.TaskViewer=e,e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data(e.Model._instanceName,n),t.data(e.Model._instanceName)},e.init=function(t){var n=[];return t=$(t||document),t.length&&(t.hasClass("js_COMPTaskViewer")?n.push(new e(t)):t.find(".js_COMPTaskViewer").each(function(){n.push(new e(this))})),n},BaseMVC.build(e,"Bizs"),JC.f.extendObject(e.prototype,{_beforeInit:function(){this._model.allMonths={},this._model.allDays={}},_initHanlderEvent:function(){JC.log("TaskViewer _initHanlderEvent",(new Date).getTime());var e=this;e._model.getAllDates(),e._view.layout()},_inited:function(){}}),e.Model._instanceName="TaskViewer",JC.f.extendObject(e.Model.prototype,{init:function(){},selectedDates:function(){var e=this,t=e.attrProp("taskselecteddates"),n;n=e.selector().find(t),n.length&&e.dates(n,"selected")},delDates:function(){var e=this,t=e.attrProp("taskdeleteddates"),n;n=e.selector().find(t),n.length&&e.dates(n,"deleted")},newAddDates:function(){var e=this,t=e.attrProp("tasknewaddeddates"),n;n=e.selector().find(t),n.length&&e.dates(n,"added")},dates:function(e,t){var n=this,r=[];e.each(function(){r.push($(this).text().replace(/[^\d\-,]/g,""))}),$.each(r,function(e,r){var i,s={},o=[];r=r.replace(/[^\d]/g,""),i=r.slice(0,6),r.length===8&&(s={start:r,end:r,type:t}),r.length===16&&(s={start:r.slice(0,8),end:r.slice(8),type:t}),i in n.allMonths||(n.allMonths[i]=s.start,n.allDays[i]=[]),o.push(s),n.allDays[i]=n.allDays[i].concat(o)})},getAllDates:function(){var e=this;e.selectedDates(),e.delDates(),e.newAddDates()},buildHeaderTpl:function(e){var t="一二三四五六日",n=0,r='<tr><th class="COMP_task_view_counter">已选天数</th><th style="width:80px; height:30px; padding:0!important;"><div class="COMP_task_view_slash"><b>星期</b><em>日期</em></div></th>',i="";for(n=0;n<e;n++)n%7===5||n%7===6?i="weekend":i="",r+='<th class="'+i+'">'+t.charAt(n%7)+"</th>";return r+="</tr>",r},buildMonthTpl:function(){var e=this,t,n,r,i,s,o,u,a,f="",l="";for(t in e.allMonths){n=JC.f.dateDetect(e.allMonths[t]),s=n.getFullYear(),i=n.getMonth(),u=JC.f.maxDayOfMonth(n),f="",a=(new Date(s,i,1)).getDay()-1;while(a--){if(a<=0)break;f+="<td>&nbsp;</td>"}l+='<tr class="'+t+'"><td class="COMP_task_view_counter">&nbsp;</td><td class="COMP_task_view_date">'+s+"年"+(i+1)+"月"+"</td>"+f;for(r=1;r<=u;r++)o=new Date(s,i,r),l+='<td class="date" data-date="'+JC.f.formatISODate(o)+'" title="'+JC.f.formatISODate(o)+'">'+r+"</td>";l+="</tr>"}return"<tbody>"+l+"</tbody>"},allDays:{},allMonths:{}}),JC.f.extendObject(e.View.prototype,{init:function(){return this},layout:function(){var e=this,t='<table class="COMP_task_view"><thead></thead>',n;t+=e._model.buildMonthTpl(),e._model.selector().append(t),n=e.fixLayout(),e._model.selector().find(".COMP_task_view>thead").append(e._model.buildHeaderTpl(n)),e.setSelected()},fixLayout:function(){var e=this,t=e.selector().find(".COMP_task_view>tbody>tr"),n=0,r=[];return t.each(function(){r.push($(this).find("td").length)}),n=Math.max.apply(Math,r),t.each(function(e){var t=$(this),r=t.find("td").length,i=0,s="";if(n>r){i=n-r;while(i--)s+="<td>&nbsp;</td>";t.append(s)}}),n-2},setSelected:function(){var e=this,t=e._model.allDays,n=e._model.selector(),r=n.find(".COMP_task_view>tbody"),i=r.find(".date"),s=r.find("tr"),o;$.each(t,function(e,t){var n=0,i=0,s=0,o=0,u=0,a="",f=r.find("tr."+e);$.each(t,function(e,t){var r=JC.f.dateDetect(t.start).getTime(),l=JC.f.dateDetect(t.end).getTime(),c=t.type;f.find(".date").each(function(){var e=$(this),t=JC.f.dateDetect(e.data("date")).getTime();t>=r&&t<=l&&e.addClass(c)}),n=f.find(".selected").length,i=f.find(".added").length,s=f.find(".deleted").length,u=n+s,o=u+i-s,i||s?a='<span class="updatedDays">'+o+"天</span>"+'<span class="defaultDays">'+u+"天</span>":a="<span>"+n+"天</span>",f.find("td").eq(0).html(a)})})}}),$(document).ready(function(){var t=0;e.autoInit&&(t=e.init())}),Bizs.TaskViewer})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);