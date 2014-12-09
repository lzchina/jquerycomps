(function(e,t){e(["JC.common"],function(){function e(t){if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this);var n=e.type(t);switch(n){case"week":this._model=new e.WeekModel(t),this._view=new e.WeekView(this._model);break;case"month":this._model=new e.MonthModel(t),this._view=new e.MonthView(this._model);break;case"season":this._model=new e.SeasonModel(t),this._view=new e.SeasonView(this._model);break;case"year":this._model=new e.YearModel(t),this._view=new e.YearView(this._model);break;case"monthday":this._model=new e.MonthDayModel(t),this._view=new e.MonthDayView(this._model);break;default:this._model=new e.Model(t),this._view=new e.View(this._model)}this._init()}function t(e){this._selector=e}function n(e){this._model=e}return window.Calendar=JC.Calendar=e,JC.f.addAutoInit&&JC.f.addAutoInit(e),e.prototype={_init:function(){var e=this;return e._initHanlderEvent(),$([e._view,e._model]).on("BindEvent",function(t,n,r){e.on(n,r)}),$([e._view,e._model]).on("TriggerEvent",function(t,n){var r=JC.f.sliceArgs(arguments).slice(2);e.trigger(n,r)}),e._model.init(),e._view.init(),e},_initHanlderEvent:function(){var t=this;return t.on(e.Model.INITED,function(e){t._model.calendarinited()&&t._model.calendarinited().call(t._model.selector(),t._model.layout(),t)}),t.on(e.Model.SHOW,function(e){t._model.calendarshow()&&t._model.calendarshow().call(t._model.selector(),t._model.selector(),t)}),t.on(e.Model.HIDE,function(e){t._model.calendarhide()&&t._model.calendarhide().call(t._model.selector(),t._model.selector(),t)}),t.on(e.Model.UPDATE,function(e){if(!t._model.selector())return;t._model.selector().blur(),t._model.selector().trigger("change");var n=[],r=t._model.selector().val().trim(),i,s,o,u,a,f;if(r){o=r.split(",");for(var l=0,c=o.length;l<c;l++){if(t._model.dateParse(t._model.selector())){var h=t._model.dateParse(t._model.selector())(o[l]);i=h.start,s=h.end,!s&&(s=i)}else u=o[l].replace(/[^\d]/g,""),u.length==16?(a=JC.f.parseISODate(u.slice(0,8)),f=JC.f.parseISODate(u.slice(8))):u.length==8&&(a=JC.f.parseISODate(u.slice(0,8)),f=JC.f.cloneDate(a)),l===0&&(i=JC.f.cloneDate(a),s=JC.f.cloneDate(f));n.push({start:a,end:f})}}t._model.calendarupdate()&&t._model.calendarupdate().apply(t._model.selector(),[i,s,t]),t._model.multiselect()&&t._model.calendarupdatemultiselect()&&t._model.calendarupdatemultiselect().call(t._model.selector(),n,t)}),t.on(e.Model.CLEAR,function(e){t._model.calendarclear()&&t._model.calendarclear().call(t._model.selector(),t._model.selector(),t)}),t.on(e.Model.CANCEL,function(e){t._model.calendarcancel()&&t._model.calendarcancel().call(t._model.selector(),t._model.selector(),t)}),t.on(e.Model.LAYOUT_CHANGE,function(e){t._model.calendarlayoutchange()&&t._model.calendarlayoutchange().call(t._model.selector(),t._model.selector(),t)}),t.on(e.Model.UPDATE_MULTISELECT,function(e){t._model.multiselect()&&t._model.calendarupdatemultiselect()&&t._model.calendarupdatemultiselect().call(t._model.selector(),t._model.selector(),t)}),t},show:function(){return e.hide(),e.lastIpt=this._model.selector(),this._view.show(),this.trigger(e.Model.SHOW),this},hide:function(){return this._view.hide(),this.trigger(e.Model.HIDE),this.selector()&&this.selector().blur(),this},selector:function(){return this._model.selector()},layout:function(){return this._model.layout()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this},updateLayout:function(){return this._view.updateLayout(),this},updateSelector:function(t){return e.lastIpt=t,this._model&&this._model.selector(t),this},updateYear:function(t){return this._view&&this._view.updateYear(t),this.trigger(e.Model.LAYOUT_CHANGE),this},updateMonth:function(t){return this._view&&this._view.updateMonth(t),this.trigger(e.Model.LAYOUT_CHANGE),this},updateSelected:function(e){return this._view&&this._view.updateSelected(e),this},updatePosition:function(){return this._view&&this._view.updatePosition(),this},clear:function(){var t=!this._model.selector().val().trim();return this._model&&this._model.selector().val(""),!t&&this.trigger(e.Model.CLEAR),this},cancel:function(){return this.trigger(e.Model.CANCEL),this._view&&this._view.hide(),this},visible:function(){var e,t;return this._model&&(t=this._model.layout())&&(e=t.is(":visible")),e},defaultDate:function(e){return this._model.defaultDate(e)},updateFormat:function(e){this._model.updateFormat(e)}},e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;var r=e.type(t);return typeof n!="undefined"&&(e._ins[r]=n),e._ins[r]&&e._ins[r].updateSelector(t),e._ins[r]},e._ins={},e.type=function(e){e=$(e);var t,n=$.trim(e.attr("multidate")||"").toLowerCase()||$.trim(e.attr("datatype")||"").toLowerCase();switch(n){case"week":case"month":case"season":case"year":case"monthday":t=n;break;default:t="date"}return t},e.isCalendar=function(e){e=$(e);var t=0;return e.length&&(e.hasClass("UXCCalendar_btn")&&(t=1),e.prop("nodeName")&&e.attr("datatype")&&(e.prop("nodeName").toLowerCase()=="input"||e.prop("nodeName").toLowerCase()=="button")&&(e.attr("datatype").toLowerCase()=="date"||e.attr("datatype").toLowerCase()=="week"||e.attr("datatype").toLowerCase()=="month"||e.attr("datatype").toLowerCase()=="season"||e.attr("datatype").toLowerCase()=="year"||e.attr("datatype").toLowerCase()=="daterange"||e.attr("datatype").toLowerCase()=="monthday")&&(t=1),e.prop("nodeName")&&e.attr("multidate")&&(e.prop("nodeName").toLowerCase()=="input"||e.prop("nodeName").toLowerCase()=="button")&&(t=1)),t},e.isCalendarElement=function(t){return e.isCalendar(t)},e.pickDate=function(t){t=$(t);if(!t||!t.length)return;var n,r=t.is("[ignoreprocess]");t.attr("ignoreprocess",!0),t.blur(),!r&&t.removeAttr("ignoreprocess"),n=e.getInstance(t),!n&&(n=new e(t)),n.show();return},e.autoInit=!0,e.defaultDateSpan=20,e.lastIpt=null,e.tpl="",e.layoutInitedCallback=null,e.layoutShowCallback=null,e.layoutHideCallback=null,e.domClickFilter=null,e.hide=function(){for(var t in e._ins)e._ins[t]&&e._ins[t].visible()&&e._ins[t].hide()},e.getDate=function(t){return e.getInstance(t).defaultDate()},e.cnWeek="日一二三四五六",e.cnUnit="十一二三四五六七八九",e.getCnNum=function(t){var n=e.cnUnit.charAt(t%10);return t>10&&(n=(t%10!==0?e.cnUnit.charAt(0):"")+n),t>19&&(n=e.cnUnit.charAt(Math.floor(t/10))+n),n},e.position=function(t){e.getInstance(t)&&e.getInstance(t).updatePosition()},e.setPosition=e.position,e.init=e.initTrigger=function(t){t.each(function(){var n=$(this),r=(n.prop("nodeName")||"").toLowerCase(),i,s;if(r!="input"&&r!="textarea"){e.initTrigger(t.find("input[type=text], textarea"));return}s=$.trim(n.attr("datatype")||"").toLowerCase();if(s!="date"&&s!="week"&&s!="month"&&s!="season"&&s!="year"&&s!="daterange"&&s!="monthday"&&!$.trim(n.attr("multidate")||""))return;var o=n.find("+ input.UXCCalendar_btn");o.length||n.after(o=$('<input type="button" class="UXCCalendar_btn"  />')),(i=n.attr("minvalue")||"")&&(i=JC.f.dateDetect(i))&&n.attr("minvalue",JC.f.formatISODate(i)),(i=n.attr("maxvalue")||"")&&(i=JC.f.dateDetect(i))&&n.attr("maxvalue",JC.f.formatISODate(i));if(!JC.f.parseBool(n.attr("ignoreInitCalendarDate"))&&!JC.f.parseBool(n.data("ignoreInitCalendarDate"))){(i=n.val().trim())&&(i=JC.f.dateDetect(i))&&n.val(JC.f.formatISODate(i));if(n.is("[dateFormat]")||n.is("[fullDateFormat]")){var u=e.getInstance(t);!u&&(u=new e(t)),u.updateSelector(t),u.updateFormat(n)}if((n.attr("datatype")||"").toLowerCase()=="monthday"||(n.attr("multidate")||"").toLowerCase()=="monthday")if(!n.is("[placeholder]")){var a=new Date;n.attr("defaultdate")&&(a=JC.f.parseISODate(n.attr("defaultdate"))||a),n.val().trim()&&(a=JC.f.parseISODate(n.val().replace(/[^d]/g,"").slice(0,8))||a),a&&n.attr("placeholder",JC.f.printf("{0}年 {1}月",a.getFullYear(),a.getMonth()+1))}}o.data(e.Model.INPUT,n)})},e.fixDefaultDate=function(t){t&&(t=$(t));if(!t||!t.length)return;var n;n=t.val().trim(),n&&(n=n.replace(e.Model.REG_REMOVE_NOT_DIGITAL,"").replace(e.Model.REG_REMOVE_ALL_ZERO,""),!n&&t.val("")),n=(t.attr("minvalue")||"").trim(),n&&(n=n.replace(e.Model.REG_REMOVE_NOT_DIGITAL,"").replace(e.Model.REG_REMOVE_ALL_ZERO,""),!n&&t.removeAttr("minvalue")),n=(t.attr("maxvalue")||"").trim(),n&&(n=n.replace(e.Model.REG_REMOVE_NOT_DIGITAL,"").replace(e.Model.REG_REMOVE_ALL_ZERO,""),!n&&t.removeAttr("maxvalue"))},e.updateMultiYear=function(e,t){var n,r;return n=e.getDate(),e.setDate(1),e.setFullYear(e.getFullYear()+t),r=JC.f.maxDayOfMonth(e),n>r&&(n=r),e.setDate(n),e},e.updateMultiMonth=function(e,t){var n,r;return n=e.getDate(),e.setDate(1),e.setMonth(e.getMonth()+t),r=JC.f.maxDayOfMonth(e),n>r&&(n=r),e.setDate(n),e},e.clone=function(e,r){var i;if(e)for(i in t.prototype)e.prototype[i]=t.prototype[i];if(r)for(i in n.prototype)r.prototype[i]=n.prototype[i]},e.Model=t,e.Model.INPUT="CalendarInput",e.Model.INITED="CalendarInited",e.Model.SHOW="CalendarShow",e.Model.HIDE="CalendarHide",e.Model.UPDATE="CalendarUpdate",e.Model.CLEAR="CalendarClear",e.Model.CANCEL="CalendarCancel",e.Model.LAYOUT_CHANGE="CalendarLayoutChange",e.Model.UPDATE_MULTISELECT="CalendarUpdateMultiSelect",e.Model.REG_REMOVE_ALL_ZERO=/^[0]+$/,e.Model.REG_REMOVE_NOT_DIGITAL=/[^\d]+/g,t.prototype={init:function(){return this},selector:function(e){return typeof e!="undefined"&&(this._selector=e),this._selector},layout:function(){var t=$("#UXCCalendar");if(!t.length){t=$(e.tpl||this.tpl).hide(),t.attr("id","UXCCalendar").hide().appendTo(document.body);var n=$(['<option value="0">一月</option>','<option value="1">二月</option>','<option value="2">三月</option>','<option value="3">四月</option>','<option value="4">五月</option>','<option value="5">六月</option>','<option value="6">七月</option>','<option value="7">八月</option>','<option value="8">九月</option>','<option value="9">十月</option>','<option value="10">十一月</option>','<option value="11">十二月</option>'].join("")).appendTo(t.find("select.UMonth"))}return t},startYear:function(t){var n=e.defaultDateSpan,r=t.date.getFullYear();return this.selector().is("[calendardatespan]")&&(n=parseInt(this.selector().attr("calendardatespan"),10)),r-n},endYear:function(t){var n=e.defaultDateSpan,r=t.date.getFullYear();return this.selector().is("[calendardatespan]")&&(n=parseInt(this.selector().attr("calendardatespan"),10)),r+n},currentcanselect:function(){var e=!0;return this.selector().is("[currentcanselect]")&&(e=JC.f.parseBool(this.selector().attr("currentcanselect"))),e},year:function(){return parseInt(this.layout().find("select.UYear").val(),10)||1},month:function(){return parseInt(this.layout().find("select.UMonth").val(),10)||0},day:function(){var e,t=new Date;return e=this.layout().find("td.cur > a[date], td.cur > a[dstart]"),e.length&&t.setTime(e.attr("date")||e.attr("dstart")),t.getDate()},defaultDate:function(){var e=this,t={date:null,minvalue:null,maxvalue:null,enddate:null,multidate:null};return e.selector()&&(t=e.multiselect()?e.defaultMultiselectDate(t):e.defaultSingleSelectDate(t)),e.dateParse(e.selector())?(e.selector().is("[minvalue]")&&(t.minvalue=e.dateParse(e.selector())(e.selector().attr("minvalue")).start),e.selector().is("[maxvalue]")&&(t.maxvalue=e.dateParse(e.selector())(e.selector().attr("maxvalue")).start)):(e.selector().is("[minvalue]")&&(t.minvalue=JC.f.parseISODate(e.selector().attr("minvalue"))),e.selector().is("[maxvalue]")&&(t.maxvalue=JC.f.parseISODate(e.selector().attr("maxvalue")))),t.minvalue&&(t.minvalue=JC.f.pureDate(t.minvalue)),t.maxvalue&&(t.maxvalue=JC.f.pureDate(t.maxvalue)),t.date&&t.minvalue&&t.minvalue.getTime()>t.date.getTime()&&(t.date=JC.f.cloneDate(t.minvalue)),t.date&&t.maxvalue&&t.maxvalue.getTime()<t.date.getTime()&&(t.date=JC.f.cloneDate(t.maxvalue)),t},defaultSingleSelectDate:function(t){var n=this,r=n.selector(),i,s=r.val().trim();if(!s)return t.date=new Date,e.lastIpt&&e.lastIpt.is("[defaultdate]")&&(i=JC.f.parseISODate(e.lastIpt.attr("defaultdate"))||i),i&&(t.date=JC.f.pureDate(i)),t.enddate=JC.f.cloneDate(t.date),t;if(n.dateParse(n.selector())){var o=n.dateParse(n.selector())(n.selector().val().trim());t.date=o.start,t.enddate=o.end,!t.enddate&&(t.enddate=t.date)}else(i=JC.f.parseISODate(r.val()))?t.date=i:r.val()&&(i=r.val().replace(/[^\d]/g,"")).length==16?(t.date=JC.f.parseISODate(i.slice(0,8)),t.enddate=JC.f.parseISODate(i.slice(8))):(i=new Date,e.lastIpt&&e.lastIpt.is("[defaultdate]")&&(i=JC.f.parseISODate(e.lastIpt.attr("defaultdate"))||i),t.date=new Date(i.getFullYear(),i.getMonth(),i.getDate()));return t},defaultMultiselectDate:function(t){var n=this,r=e.lastIpt,i,s,o,u;return r.val()?(i=r.val().trim().replace(/[^\d,]/g,"").split(","),s=[],$.each(i,function(e,i){if(n.dateParse(r)){var a=n.dateParse(r)(i);o=a.start,u=a.end,!u&&(u=o),s.push({start:o,end:u})}else i.length==16?(o=JC.f.parseISODate(i.slice(0,8)),u=JC.f.parseISODate(i.slice(8)),e||(t.date=JC.f.cloneDate(o),t.enddate=JC.f.cloneDate(u)),s.push({start:o,end:u})):i.length==8&&(o=JC.f.parseISODate(i.slice(0,8)),u=JC.f.cloneDate(o),e||(t.date=JC.f.cloneDate(o),t.enddate=JC.f.cloneDate(u)),s.push({start:o,end:u}))}),t.multidate=s):(i=new Date,e.lastIpt&&e.lastIpt.is("[defaultdate]")&&(i=JC.f.parseISODate(e.lastIpt.attr("defaultdate"))||i),t.date=new Date(i.getFullYear(),i.getMonth(),i.getDate()),t.enddate=JC.f.cloneDate(t.date),t.enddate.setDate(JC.f.maxDayOfMonth(t.enddate)),t.multidate=[],t.multidate.push({start:JC.f.cloneDate(t.date),end:JC.f.cloneDate(t.enddate)})),t},layoutDate:function(){return this.multiselect()?this.multiLayoutDate():this.singleLayoutDate()},singleLayoutDate:function(){var e=this,t=e.defaultDate(),n=this.day(),r;return t.date.setDate(1),t.date.setFullYear(this.year()),t.date.setMonth(this.month()),r=JC.f.maxDayOfMonth(t.date),n>r&&(n=r),t.date.setDate(n),t},multiLayoutDate:function(){var e=this,t=e.defaultDate(),n=e.year(),r=e.month(),i=e.day(),s=new Date(n,r,1),o=JC.f.maxDayOfMonth(s),u=e.layout().find("select.UMonth");return t.multidate=[],e.layout().find("td.cur").each(function(){var e=$(this),n=e.find("> a[dstart]"),r=new Date,i=new Date;r.setTime(n.attr("dstart")),i.setTime(n.attr("dend")),t.multidate.push({start:r,end:i})}),t.date=new Date(n,r,1),t.date.enddate=new Date(n,r,o),u.length&&(t.date.setMonth(r),t.enddate.setMonth(r)),$.each(t.multidate,function(e,t){t.start.setFullYear(n),t.end.setFullYear(n),u.length&&(t.start.setMonth(r),t.end.setMonth(r))}),t},selectedDate:function(){var e,t,n;return t=this.layout().find("td.cur"),t.length&&!t.hasClass("unable")&&(n=t.find("a[date]"))&&(e=new Date,e.setTime(n.attr("date"))),e},multiselectDate:function(){var e=[];return e},calendarinited:function(){var t=this.selector(),n=e.layoutInitedCallback,r;return t&&t.attr("calendarinited")&&(r=window[t.attr("calendarinited")])&&(n=r),n},calendarshow:function(){var t=this.selector(),n=e.layoutShowCallback,r;return t&&t.attr("calendarshow")&&(r=window[t.attr("calendarshow")])&&(n=r),n},calendarhide:function(){var t=this.selector(),n=e.layoutHideCallback,r;return t&&t.attr("calendarhide")&&(r=window[t.attr("calendarhide")])&&(n=r),n},calendarupdate:function(e){var t=this.selector(),n,r;return t&&t.attr("calendarupdate")&&(r=window[t.attr("calendarupdate")])&&(n=r),n},calendarclear:function(){var e=this.selector(),t,n;return e&&e.attr("calendarclear")&&(n=window[e.attr("calendarclear")])&&(t=n),t},calendarcancel:function(){var e=this.selector(),t,n;return e&&e.attr("calendarcancel")&&(n=window[e.attr("calendarcancel")])&&(t=n),t},calendarlayoutchange:function(){var e=this.selector(),t,n;return e&&e.attr("calendarlayoutchange")&&(n=window[e.attr("calendarlayoutchange")])&&(t=n),t},multiselect:function(){var e;return this.selector().is("[multiselect]")&&(e=JC.f.parseBool(this.selector().attr("multiselect"))),e},calendarupdatemultiselect:function(e){var t=this.selector(),n,r;return t&&t.attr("calendarupdatemultiselect")&&(r=window[t.attr("calendarupdatemultiselect")])&&(n=r),n},updateFormat:function(e){e&&(e=$(e));if(!e||!e.length)return;var t=this,n=(e.attr("datetype")||e.attr("multidate")||"").toLowerCase().trim(),r=e.val().trim(),i=t.dateParse(e),s,o,u;if(!r)return;n=="date"&&!e.attr("fullDateFormat")&&e.attr("fullDateFormat","{0}");if(i)switch(n){case"date":break;case"week":case"month":case"season":case"year":u=i(r),e.val(t.fullFormat(t.dateFormat(u.start,e),t.dateFormat(u.end,e),e))}else switch(n){case"date":s=JC.f.parseISODate(r),e.val(t.dateFormat(s,e)||r)}},dateFormat:function(e,t){t=t||this.selector();var n="",r=t.attr("dateFormat")||"YY-MM-DD";return e&&(n=JC.f.dateFormat(e,r)),n},fullFormat:function(e,t,n){n=n||this.selector();var r="",i=n.attr("fullDateFormat")||"{0} 至 {1}";return e&&t?r=JC.f.printf(i,this.dateFormat(e,n),this.dateFormat(t,n)):e?r=JC.f.printf(i,this.dateFormat(e,n)):t&&(r=JC.f.printf(i,this.dateFormat(t,n))),r},dateParse:function(e){var t;return e&&e.attr("dateParse")&&(t=window[e.attr("dateParse")]),t},tpl:['<div id="UXCCalendar" class="UXCCalendar">','    <div class="UHeader">','        <select class="UYear"></select>','        <img class="UImg yearctl" align="absMiddle" usemap="#UXCCalendar_Year" />','        <map name="UXCCalendar_Year"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>','        <select class="UMonth"></select>','        <img class="UImg monthctl" align="absMiddle" usemap="#UXCCalendar_Month"  />','        <map name="UXCCalendar_Month"><area shape="rect" coords="0,0,13,8" href="#" action="up"><area shape="rect" coords="0,10,13,17" href="#" action="down"></map>',"    </div>",'    <table class="UTable">',"        <thead>","            <tr>","                <th>一</th>","                <th>二</th>","                <th>三</th>","                <th>四</th>","                <th>五</th>","                <th>六</th>","                <th>日</th>","            </tr>","        </thead>","   </table>",'   <table class="UTable UTableBorder">',"        <tbody>","           <!--<tr>",'                <td class="cur"><a href="#">2</a></td>','                <td class="unable"><a href="#">2</a></td>','                <td class="weekend cur"><a href="#">6</a></td>','                <td class="weekend hover"><a href="#">13</a></td>','                <td class="weekend other"><a href="#">41</a></td>','                <td class="weekend other"><a href="#">42</a></td>',"            </tr>-->","        </tbody>","    </table>",'    <div class="UFooter">','        <button type="button" class="UConfirm">确定</button>','        <button type="button" class="UClear">清空</button>','        <button type="button" class="UCancel">取消</button>',"    </div>","</div>"].join("")},e.View=n,n.prototype={init:function(){return this},hide:function(){this._model.layout().hide()},show:function(){var e=this._model.defaultDate();this._buildLayout(e),this._buildDone()},updateLayout:function(e){typeof e=="undefined"&&(e=this._model.layoutDate());if(e.minvalue||e.maxvalue)e.minvalue&&e.date.getTime()<e.minvalue.getTime()&&(e.date=JC.f.cloneDate(e.minvalue)),e.maxvalue&&e.date.getTime()>e.maxvalue.getTime()&&(e.date=JC.f.cloneDate(e.maxvalue));this._buildLayout(e),this._buildDone()},updateYear:function(e){if(typeof e=="undefined"||e==0)return;var t=this._model.layoutDate(),n;if(t.minvalue||t.maxvalue){var r;n=JC.f.cloneDate(t.date),n.setFullYear(n.getFullYear()+e),t.minvalue&&(n.getFullYear()<t.minvalue.getFullYear()?(n=JC.f.cloneDate(t.minvalue),e=0,r=!0):(new Date(n.getFullYear(),n.getMonth(),1)).getTime()<(new Date(t.minvalue.getFullYear(),t.minvalue.getMonth(),1)).getTime()&&(e=0,n=JC.f.cloneDate(t.minvalue),r=!0)),t.maxvalue&&(n.getFullYear()>t.maxvalue.getFullYear()?(e=0,n=JC.f.cloneDate(t.maxvalue),r=!0):(new Date(n.getFullYear(),n.getMonth(),1)).getTime()>(new Date(t.maxvalue.getFullYear(),t.maxvalue.getMonth(),1)).getTime()&&(e=0,n=JC.f.cloneDate(t.maxvalue),r=!0)),r||(n=null)}this._model.multiselect()?this.updateMultiYear(e,n):this.updateSingleYear(e,n)},updateSingleYear:function(e,t){var n=this._model.layoutDate();if(t)n.date=t;else{var r=n.date.getDate(),i;n.date.setDate(1),n.date.setFullYear(n.date.getFullYear()+e),i=JC.f.maxDayOfMonth(n.date),r>i&&(r=i),n.date.setDate(r)}this._buildLayout(n),this._buildDone()},updateMultiYear:function(e,t){var n=this._model.layoutDate();n.date=t||n.date;var r,i;JC.Calendar.updateMultiYear(n.date,e),JC.Calendar.updateMultiYear(n.enddate,e),n.multidate&&$.each(n.multidate,function(t,n){JC.Calendar.updateMultiYear(n.start,e),JC.Calendar.updateMultiYear(n.end,e)}),this._buildLayout(n),this._buildDone()},updateMonth:function(e){if(typeof e=="undefined"||e==0)return;var t=this._model.layoutDate(),n;if(t.minvalue||t.maxvalue){n=JC.f.cloneDate(t.date),n.setDate(1),n.setMonth(n.getMonth()+e);var r=t.minvalue?JC.f.cloneDate(t.minvalue):null,i=t.maxvalue?JC.f.cloneDate(t.maxvalue):null,s;r&&r.setDate(1),i&&i.setDate(1),r&&(n.getTime()<r.getTime()&&(e=0,n=JC.f.cloneDate(t.minvalue),s=!0),(new Date(n.getFullYear(),n.getMonth(),1)).getTime()<(new Date(t.minvalue.getFullYear(),t.minvalue.getMonth(),1)).getTime()&&(e=0,n=JC.f.cloneDate(t.minvalue),s=!0)),i&&(n.getTime()>i.getTime()&&(e=0,n=JC.f.cloneDate(t.maxvalue),s=!0),(new Date(n.getFullYear(),n.getMonth(),1)).getTime()>(new Date(t.maxvalue.getFullYear(),t.maxvalue.getMonth(),1)).getTime()&&(e=0,n=JC.f.cloneDate(t.maxvalue),s=!0));if(!s)n=null;else{var o=JC.f.maxDayOfMonth(n),u=t.date.getDate();u>o&&(u=o),n.setDate(u)}}this._model.multiselect()?this.updateMultiMonth(e,n):this.updateSingleMonth(e,n)},updateMultiMonth:function(e,t){var n=this._model.layoutDate(),r,i;t?(n.date=t,e=0):(JC.Calendar.updateMultiMonth(n.date,e),JC.Calendar.updateMultiMonth(n.enddate,e),n.multidate&&$.each(n.multidate,function(t,n){JC.Calendar.updateMultiMonth(n.start,e),JC.Calendar.updateMultiMonth(n.end,e)})),this._buildLayout(n),this._buildDone()},updateSingleMonth:function(e,t){var n=this._model.layoutDate();if(t)n.date=t;else{var r=n.date.getDate(),i;n.date.setDate(1),n.date.setMonth(n.date.getMonth()+e),i=JC.f.maxDayOfMonth(n.date),r>i&&(r=i),n.date.setDate(r)}this._buildLayout(n),this._buildDone()},updateSelected:function(t){var n=this,r,i;if(!t)r=this._model.selectedDate();else{t=$(t),i=JC.f.getJqParent(t,"td");if(i&&i.hasClass("unable"))return;r=new Date,r.setTime(t.attr("date"))}if(!r)return;n._model.selector().val(n._model.dateFormat(r)),$(n).trigger("TriggerEvent",[JC.Calendar.Model.UPDATE,"date",r,r]),e.hide()},updatePosition:function(){var e=this,t=e._model.selector(),n=e._model.layout();if(!(t&&n&&t.length&&n.length))return;n.css({left:"-9999px",top:"-9999px","z-index":ZINDEX_COUNT++}).show();var r=n.width(),i=n.height(),s=t.width(),o=t.height(),u=t.offset(),a,f,l=$(window).width(),c=$(window).height(),h=$(document).scrollLeft(),p=$(document).scrollTop();a=u.left,f=u.top+o+5,f+i-p>c&&(f=u.top-i-3,f<p&&(f=p)),a+r-h>l&&(a=l-r+h-5),a<h&&(a=h+0),n.css({left:a+"px",top:f+"px"})},_buildDone:function(){this.updatePosition(),$(this).trigger("TriggerEvent",[e.Model.INITED])},_buildLayout:function(e){this._model.layout();if(!e||!e.date)return;this._buildHeader(e),this._buildBody(e),this._buildFooter(e)},_buildHeader:function(t){var n=this,r=n._model.layout(),i=[],s,o=t.date.getFullYear(),u=t.date.getMonth(),a=n._model.startYear(t),f=n._model.endYear(t),l=t.date.getFullYear(),c=new Date(t.date.getFullYear(),t.date.getMonth(),1),h=t.minvalue?t.minvalue.getFullYear():0,p=t.maxvalue?t.maxvalue.getFullYear():0,d=t.minvalue?new Date(t.minvalue.getFullYear(),t.minvalue.getMonth(),1):0,v=t.maxvalue?new Date(t.maxvalue.getFullYear(),t.maxvalue.getMonth(),1):0,m,g,y,b,w,E;for(m=a;m<=f;m++){p&&l>p&&(E=!0);if(p&&m>p)break;if(h&&m<h)continue;h&&l<h&&(E=!0),i.push(JC.f.printf('<option value="{0}"{1}>{0}</option>',m,m===o?" selected":""))}E&&i.unshift(JC.f.printf('<option value="{0}"{1}>{0}</option>',l," selected")),$(i.join("")).appendTo(r.find("select.UYear").html("")),i=[];for(m=0;m<12;m++){y=e.getCnNum(m+1),b=new Date(l,m,1);if(v&&b.getTime()>v.getTime())break;if(d&&b.getTime()<d.getTime())continue;i.push(JC.f.printf('<option value="{0}"{1}>{2}月</option>',m,m===u?" selected":"",y))}i.length||(y=e.getCnNum(t.date.getMonth()+1),i.push(JC.f.printf('<option value="{0}"{1}>{2}月</option>',t.date.getMonth()," selected",y))),$(i.join("")).appendTo(r.find("select.UMonth").html(""))},_buildBody:function(e){var t=this,n=t._model.layout(),r=JC.f.maxDayOfMonth(e.date),i=e.date.getDay()||7,s=i+r,o=6,u=[],a,f,l,c,h,p=new Date(e.date.getFullYear(),e.date.getMonth(),1),d=p.getDay()||7;d<2?p.setDate(-(d-1+6)):p.setDate(-(d-2));var v=new Date;e.maxvalue&&!t._model.currentcanselect()&&e.maxvalue.setDate(e.maxvalue.getDate()-1),u.push("<tr>");for(c=1;c<=42;c++)h=[],(p.getDay()===0||p.getDay()==6)&&h.push("weekend"),JC.f.isSameMonth(e.date,p)||h.push("other"),e.minvalue&&p.getTime()<e.minvalue.getTime()&&h.push("unable"),e.maxvalue&&p.getTime()>e.maxvalue.getTime()&&h.push("unable"),JC.f.isSameDay(p,v)&&h.push("today"),JC.f.isSameDay(e.date,p)&&h.push("cur"),u.push('<td class="',h.join(" "),'">','<a href="javascript:" date="',p.getTime(),'" title="'+JC.f.formatISODate(p)+'" >',p.getDate(),"</a></td>"),p.setDate(p.getDate()+1),c%7===0&&c!=42&&u.push("</tr><tr>");u.push("</tr>"),n.find("table.UTableBorder tbody").html($(u.join("")))},_buildFooter:function(e){}},$(document).delegate("body > div.UXCCalendar select.UYear, body > div.UXCCalendar select.UMonth","change",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateLayout()}),$(document).delegate("body > div.UXCCalendar button.UNextYear","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateYear(1)}),$(document).delegate("body > div.UXCCalendar button.UPreYear","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateYear(-1)}),$(document).delegate("map[name=UXCCalendar_Year] area","click",function(t){t.preventDefault();var n=$(this),r=e.getInstance(e.lastIpt);n.attr("action")&&r&&(n.attr("action").toLowerCase()=="up"&&r.updateYear(1),n.attr("action").toLowerCase()=="down"&&r.updateYear(-1))}),$(document).delegate("map[name=UXCCalendar_Month] area","click",function(t){t.preventDefault();var n=$(this),r=e.getInstance(e.lastIpt);n.attr("action")&&r&&(n.attr("action").toLowerCase()=="up"&&r.updateMonth(1),n.attr("action").toLowerCase()=="down"&&r.updateMonth(-1))}),$(document).delegate("body > div.UXCCalendar button.UNextMonth","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateMonth(1)}),$(document).delegate("body > div.UXCCalendar button.UPreMonth","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateMonth(-1)}),$(document).delegate("div.UXCCalendar table a[date], div.UXCCalendar table a[dstart]","click",function(t){t.preventDefault(),e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateSelected($(this))}),$(document).delegate("body > div.UXCCalendar button.UConfirm","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).updateSelected()}),$(document).delegate("body > div.UXCCalendar button.UClear","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).clear()}),$(document).delegate("body > div.UXCCalendar button.UCancel","click",function(t){e.getInstance(e.lastIpt)&&e.getInstance(e.lastIpt).cancel()}),$(document).delegate("input.UXCCalendar_btn","click",function(t){var n=$(this),r;n.data(e.Model.INPUT)||(r=n.prev("input[type=text], textarea"),r.length&&n.data(e.Model.INPUT,r)),n.data(e.Model.INPUT)&&!n.data(e.Model.INPUT).is("[disabled]")&&e.pickDate(n.data(e.Model.INPUT))}),$(document).delegate("body > div.UXCCalendar","click",function(e){e.stopPropagation()}),$(document).ready(function(t){JC.f.safeTimeout(function(t){if(!e.autoInit)return;e.initTrigger($(document))},null,"CalendarInitTrigger",200),$(window).on("scroll resize",function(t){var n=e.getInstance(e.lastIpt);n&&n.visible()&&n.updatePosition()}),$(document).on("click",function(t){var n=t.target||t.srcElement;if(e.domClickFilter&&e.domClickFilter($(n))===!1)return;if(e.isCalendar(t.target||t.targetElement))return;if(n&&n.nodeName.toLowerCase()!="input"&&n.nodeName.toLowerCase()!="button"&&n.nodeName.toLowerCase()!="textarea"){e.hide();return}JC.f.safeTimeout(function(){if(e.lastIpt&&e.lastIpt.length&&n==e.lastIpt[0])return;e.hide()},null,"CalendarClickHide",100)})}),$(document).delegate(["input[datatype=date]","input[datatype=daterange]","input[multidate=date]","input[multidate=daterange]"].join(),"focus",function(t){e.pickDate(this)}),$(document).delegate(["button[datatype=date]","button[datatype=daterange]","button[multidate=date]","button[multidate=daterange]"].join(),"click",function(t){e.pickDate(this)}),$(document).delegate(["textarea[datatype=date]","textarea[datatype=daterange]","textarea[multidate=date]","textarea[multidate=daterange]"].join(),"click",function(t){e.pickDate(this)}),JC.Calendar})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);