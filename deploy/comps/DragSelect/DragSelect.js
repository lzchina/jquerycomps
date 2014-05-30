(function(define,_win){define(["JC.BaseMVC"],function(){var _jdoc=$(document),_jwin=$(window);JC.DragSelect=DragSelect;function DragSelect(_selector){_selector&&(_selector=$(_selector));if(JC.BaseMVC.getInstance(_selector,DragSelect)){return JC.BaseMVC.getInstance(_selector,DragSelect)}JC.BaseMVC.getInstance(_selector,DragSelect,this);this._model=new DragSelect.Model(_selector);this._view=new DragSelect.View(this._model);this._init();JC.log(DragSelect.Model._instanceName,"all inited",new Date().getTime())}DragSelect.init=function(_selector){var _r=[];_selector=$(_selector||document);if(_selector.length){if(_selector.hasClass("js_compDragSelect")){_r.push(new DragSelect(_selector))}else{_selector.find("div.js_compDragSelect").each(function(){_r.push(new DragSelect(this))})}}return _r};DragSelect.RECT=function(){if(!(DragSelect._RECT&&DragSelect._RECT.length)){DragSelect._RECT=$(DragSelect.RECT_TPL);DragSelect._RECT.appendTo(document.body)}return DragSelect._RECT};DragSelect.RECT_TPL='<div class="js_compDragSelect_rect" style="display:none;position:absolute;left: -9999px;"></div>';DragSelect.DEFAULT_MOUSEUP=function(_evt){var _d=DragSelect.DRAG_DATA();if(!_d){return}var _p=_d.ins;_p.trigger("SELECT_DONE",[_p._model.offset(_evt)])};DragSelect.DEFAULT_MOUSEMOVE=function(_evt){var _d=DragSelect.DRAG_DATA();if(!_d){return}var _p=_d.ins,_newPoint=_p._model.offset(_evt);_p._view.updateRect(_newPoint);_p.trigger("SELECT_MOVE",[_newPoint])};DragSelect.DEFAULT_SELECT_EVENT=function(){return false};DragSelect.DRAG_DATA=function(_setter){typeof _setter!="undefined"&&(DragSelect._DRAG_DATA=_setter);return DragSelect._DRAG_DATA};DragSelect.MIN_RECT={width:20,height:20};JC.BaseMVC.build(DragSelect);JC.f.extendObject(DragSelect.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var _p=this,_ditems;if(!_p._model.config()){JC.log("JC.DragSelect config data not found!");return}_p.on("inited",function(){_ditems=_p._model.delegateItems();if(!_ditems.length){return}_p.selector().delegate(_ditems.join(","),"click",function(_evt){});$.each(_ditems,function(_k,_item){_p.selector().delegate(_item,"mousedown",function(_evt){var _sp=$(this);_p.trigger("SELECT_START",[_sp,_evt,_item])})})});_p.on("SELECT_START",function(_evt,_sp,_srcEvt,_type){var _d;_p.trigger("CLEAR_EVENT");_p.trigger("REMOVE_ALL_REALTIME_EFFECT");_d=_p._model.initDragData(_sp,_type);if(!_d){return}_d.ins=_p;_d.downPoint=_p._model.offset(_srcEvt);_p._view.showRect();_p.trigger("BIND_EVENT")});_p.on("BIND_EVENT",function(_evt){_jdoc.on("mousemove",DragSelect.DEFAULT_MOUSEMOVE);_jdoc.on("mouseup",DragSelect.DEFAULT_MOUSEUP);!_p._model.enableTextSelectable()&&_jdoc.on("selectstart",DragSelect.DEFAULT_SELECT_EVENT)});_p.on("CLEAR_EVENT",function(_evt){_jdoc.off("mousemove",DragSelect.DEFAULT_MOUSEMOVE);_jdoc.off("mouseup",DragSelect.DEFAULT_MOUSEUP);_jdoc.off("selectstart",DragSelect.DEFAULT_SELECT_EVENT);_p._model.realtimeEffect()&&_p.trigger("REMOVE_ALL_REALTIME_EFFECT");_p.trigger("CLEAR_DATA")});_p.on("SELECT_DONE",function(_evt,_newPoint){_p._view.updateRect(_newPoint);var _rectSize=selectorToRectangle(DragSelect.RECT());if(_p._model.rectIsOutsize(_rectSize)){}else{_p.trigger("PROCESSS_SELECT",[_rectSize,DragSelect.DRAG_DATA()])}_p._view.hideRect();_p.trigger("CLEAR_EVENT")});_p.on("PROCESSS_SELECT",function(_evt,_rectSize,_params){if(!DragSelect.RECT().is(":visible")){return}var _selectedItems=_p._model.getSelectItems(_rectSize,_params.type);if(!_selectedItems.length){return}if(_params.data){$.each(_selectedItems,function(_k,_item){_params.data.addClass&&_item.addClass(_params.data.addClass);_params.data.removeClass&&_item.removeClass(_params.data.removeClass)});_params.data.callback&&_params.data.callback.call(_p.selector(),_selectedItems,_params.type,_p)}_p._model.callback()&&_p._model.callback().call(_p.selector(),_selectedItems,_params.type,_p)});_p.on("SELECT_MOVE",function(_evt,_newPoint){if(_p._model.realtimeEffect()){_p.trigger("REALTIME_EFFECT",[_newPoint])}});_p.on("REALTIME_EFFECT",function(_evt,_newPoint){if(!DragSelect.RECT().is(":visible")){return}if(!_p._model.realtimeClass(DragSelect.DRAG_DATA().data)){return}var _rectSize=selectorToRectangle(DragSelect.RECT()),_params=DragSelect.DRAG_DATA(),_realtimeClass=_p._model.realtimeClass(DragSelect.DRAG_DATA().data);_p.trigger("REMOVE_REALTIME_EFFECT",_realtimeClass);if(_p._model.rectIsOutsize(_rectSize)){_p._model.preRealtimeItems([]);return}var _selectedItems=_p._model.getSelectItems(_rectSize,_params.type);$.each(_selectedItems,function(_k,_item){_item.addClass(_realtimeClass)});_p._model.preRealtimeItems(_selectedItems)});_p.on("REMOVE_REALTIME_EFFECT",function(_evt,_class,_items){_items=_items||_p._model.preRealtimeItems();_items&&_class&&$.each(_items,function(_ix,_item){_item.removeClass(_class)})});_p.on("REMOVE_ALL_REALTIME_EFFECT",function(){_p._model.realtimeClass()&&_p._model.allItems().removeClass(_p._model.realtimeClass());$.each(_p._model.config(),function(_k,_item){_item.data&&_item.data.realtimeClass&&_p._model.items(_k).removeClass(_items.data.realtimeClass)})});_p.on("CLEAR_DATA",function(_evt){DragSelect.DRAG_DATA(null)})},clearCache:function(){this.trigger("CLEAR_DATA")},_inited:function(){this.trigger("inited")}});DragSelect.Model._instanceName="JCDragSelect";DragSelect.Model.UNI_COUNT=1;DragSelect.Model.BEFORE_FIND_PREFIX="beforeSelected";JC.f.extendObject(DragSelect.Model.prototype,{init:function(){this._itemsCache={}},enableTextSelectable:function(){return this.boolProp("cdsEnableTextSelectable")},realtimeClass:function(_data){var _r=this.config().realtimeClass||this.attrProp("cdsRealtimeClass");_data&&_data.realtimeClass&&(_r=_data.realtimeClass);return _r||""},items:function(_type){var _r;!_r&&(_r=this.selector().find(_type));return _r},allItems:function(){var _r;!_r&&(_r=this.selector().find(this.delegateItems().join(",")));return _r},enableCache:function(){return this.boolProp("cdsEnableCache")},preRealtimeItems:function(_setter){typeof _setter!="undefined"&&(this._preRealtimeItems=_setter);return this._preRealtimeItems},realtimeEffect:function(){return this.boolProp("cdsRealtimeEffect")},getSelectItems:function(_rect,_type){var _p=this,_r=[],_items=_p.items(_type),_filter;$.each(_items,function(_k,_item){_item=$(_item);var _itemRect=selectorToRectangle(_item);if(intersectRect(_rect,_itemRect)){if(_filter=_p.itemFilter(_type)){if(_filter.call(_p.selector(),_item,_type,_p.config().items[_type],_p.config())===false){return}}_r.push(_item)}});return _r},itemFilter:function(_type){var _r=this.callbackProp("cdsItemFilter");this.config().itemFilter&&(_r=this.config().itemFilter);this.config().items&&this.config().items[_type]&&this.config().items[_type].itemFilter&&(_r=(this.config().items[_type].itemFilter));return _r},callback:function(){var _r=this.config().callback||this.callbackProp("cdsCallback");return _r},initDragData:function(_selector,_k){var _p=this,_itemData=_p.config().items[_k];if(!_itemData){return}return DragSelect.DRAG_DATA({type:_k,data:_itemData})},config:function(){if(!this._config){this._config=eval("("+(JC.f.scriptContent(this.selectorProp("cdsConfig")))+")")}return this._config},delegateItems:function(){var _r=[];$.each(this.config().items,function(_k,_item){_r.push(_k)});return _r},offset:function(_evt){var _r={x:_evt.pageX,y:_evt.pageY};return _r},rectMinWidth:function(){return this.intProp("cdsRectMinWidth")},rectMinHeight:function(){return this.intProp("cdsRectMinHeight")},rectMinSize:function(){var _p=this;return{width:_p.rectMinWidth()||DragSelect.MIN_RECT.width,height:_p.rectMinHeight()||DragSelect.MIN_RECT.height}},rectIsOutsize:function(_rectSize){var _p=this,_r,_minSize=_p.rectMinSize();_minSize.width>_rectSize.width&&_minSize.height>_rectSize.height&&(_r=true);return _r}});JC.f.extendObject(DragSelect.View.prototype,{init:function(){},showRect:function(){DragSelect.RECT().css({left:"-9999px"}).show()},updateRect:function(_newPoint){if(!(DragSelect.DRAG_DATA()&&DragSelect.RECT().is(":visible"))){return}var _p=this,_downPoint=DragSelect.DRAG_DATA().downPoint,_rect=DragSelect.RECT(),_size;if(!_downPoint){return}_size=pointToRect(_downPoint,_newPoint);_rect.css(_size)},hideRect:function(){var _p=this;DragSelect.RECT().hide()}});function intersectRect(r1,r2){return !(r2.x>(r1.x+r1.width)||(r2.x+r2.width)<r1.x||r2.y>(r1.y+r1.height)||(r2.y+r2.height)<r1.y)}function pointToRect(_p1,_p2){var _r={x:0,y:0,width:0,height:0};if(_p1&&_p2){if(_p1.x<_p2.x){_r.x=_p1.x;_r.width=_p2.x-_p1.x}else{_r.x=_p2.x;_r.width=_p1.x-_p2.x}if(_p1.y<_p2.y){_r.y=_p1.y;_r.height=_p2.y-_p1.y}else{_r.y=_p2.y;_r.height=_p1.y-_p2.y}_r.left=_r.x;_r.top=_r.y}return _r}function selectorToRectangle(_selector){_selector=$(_selector);var _offset=_selector.offset(),_w=_selector.prop("offsetWidth"),_h=_selector.prop("offsetHeight");return{x:_offset.left,y:_offset.top,width:_w,height:_h}}_jdoc.ready(function(){JC.f.safeTimeout(function(){DragSelect.autoInit&&DragSelect.init()},null,"INIT_DRAG_SELECT",200)});return JC.DragSelect})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));