(function(e,t){e("JC.Calendar.year",["JC.Calendar.date"],function(){function e(e){this._selector=e}function t(e){this._model=e}return JC.Calendar.yearTpl="",JC.Calendar.YearModel=e,JC.Calendar.YearView=t,JC.Calendar.clone(e,t),JC.f.extendObject(e.prototype,{layout:function(){var e=$("#UXCCalendar_year");return e.length||(e=$(JC.Calendar.yearTpl||this.tpl).hide(),e.attr("id","UXCCalendar_year").hide().appendTo(document.body)),e},tpl:['<div id="UXCCalendar_year" class="UXCCalendar UXCCalendar_week UXCCalendar_year">\n','    <table class="UTable UTableBorder">\n',"        <tbody>\n","            <tr>\n",'                <td class="UYearBox">\n','                    <button type="button" class="UButton UPreYear">&nbsp;&lt;&lt;&nbsp;</button>\n',"                </td>\n","                <td></td><td></td><td></td><td></td>\n","            </tr>\n","            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n","            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n","            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n","            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n","            <tr><td></td><td></td><td></td><td></td><td></td></tr>\n","            <tr>\n","                <td></td><td></td><td></td><td></td>\n",'                <td class="UYearBox">\n','                    <button type="button" class="UButton UNextYear">&nbsp;&gt;&gt;&nbsp;</button>\n',"                </td>\n","            </tr>\n","        </tbody>\n","    </table>\n",'    <div class="UFooter">\n','        <button type="button" class="UConfirm">确定</button>\n','        <button type="button" class="UClear">清空</button>\n','        <button type="button" class="UCancel">取消</button>\n',"    </div>\n","</div>\n"].join(""),selectedDate:function(){var e,t,n;return t=this.layout().find("td.cur"),t.length&&!t.hasClass("unable")&&(n=t.find("a[dstart]"))&&(e={start:new Date,end:new Date},e.start.setTime(n.attr("dstart")),e.end.setTime(n.attr("dend"))),e}}),JC.f.extendObject(t.prototype,{_buildBody:function(e){var t=this,n=t._model.selector(),r=n.val().trim(),i=r.replace(/[^\d]+/g,""),s=e.date,o=(new Date).getFullYear(),u=t._model.layout(),a=u.find("tbody > tr > td"),f=a.length-1,l,c,h,p=JC.f.parseBool(n.attr("currentcanselect")),d,v,m,g;i&&(i=i.slice(0,4)),!i&&(i=o),h=s.getFullYear(),l=h-Math.floor(f/2),e.minvalue&&p&&e.minvalue.setFullYear(e.minvalue.getFullYear()-1),e.maxvalue&&p&&e.maxvalue.setFullYear(e.maxvalue.getFullYear()+1),a.each(function(t,n){n=$(n),t!=0&&t!=f&&(d=JC.f.printf("{0}年",l),v=[],m=new Date(l,0,1),g=new Date(l,11,31),e.minvalue&&m.getFullYear()<=e.minvalue.getFullYear()&&v.push("unable"),e.maxvalue&&g.getFullYear()>=e.maxvalue.getFullYear()&&v.push("unable"),i&&i==l&&v.push("cur"),o==l&&v.push("today"),n.html(JC.f.printf('<a href="javascript:" title="{0}" dstart="{1}" dend="{2}" " >{3}</a></td>',d,m.getTime(),g.getTime(),l)),n.prop("className",v.join(" "))),l++})},updateSelected:function(e){var t=this,n,r,i;if(!e)i=this._model.selectedDate(),i&&(n=i.start,r=i.end);else{e=$(e),i=JC.f.getJqParent(e,"td");if(i&&i.hasClass("unable"))return;n=new Date,r=new Date,n.setTime(e.attr("dstart")),r.setTime(e.attr("dend"))}if(!n||!r)return;t._model.selector().val(t._model.fullFormat(t._model.dateFormat(n),t._model.dateFormat(r))),$(t).trigger("TriggerEvent",[JC.Calendar.Model.UPDATE,"year",n,r]),JC.Calendar.hide()},updateYear:function(e){if(typeof e=="undefined"||e==0)return;var t=this._model.layoutDate(),n;this._model.multiselect()?this.updateMultiYear(e):this.updateSingleYear(e)},updateSingleYear:function(e){if(!e)return;var t=this._model.layoutDate(),n=this._model.layout().find("a[dstart]"),r=n.first(),i=n.last(),s=new Date,o=new Date,u=17,a;e>0?(s.setTime(i.attr("dstart")),o.setTime(i.attr("dend")),t.date=s,t.enddate=o,t.date.setFullYear(t.date.getFullYear()+u),t.enddate.setFullYear(t.enddate.getFullYear()+u)):(s.setTime(r.attr("dstart")),o.setTime(r.attr("dend")),t.date=s,t.enddate=o,t.date.setFullYear(t.date.getFullYear()-u),t.enddate.setFullYear(t.enddate.getFullYear()-u));var f=t.date.getFullYear()-u+1,l=t.date.getFullYear()+u-1;if(t.minvalue&&t.minvalue.getFullYear()>l)return;if(t.maxvalue&&t.maxvalue.getFullYear()<f)return;this._buildLayout(t),this._buildDone()}}),$(document).delegate(["input[datatype=year]","input[multidate=year]"].join(),"focus",function(e){Calendar.pickDate(this)}),$(document).delegate(["button[datatype=year]","button[multidate=year]"].join(),"click",function(e){Calendar.pickDate(this)}),$(document).delegate(["textarea[datatype=year]","textarea[multidate=year]"].join(),"click",function(e){Calendar.pickDate(this)}),JC.Calendar})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);