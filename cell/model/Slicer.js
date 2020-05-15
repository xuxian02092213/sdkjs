/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";

(function(window, undefined){

	var insertSlicerType = {
		table: 0,
		pivotTable: 1
	};

	var ST_olapSlicerCacheSortOrder = {
		Natural: 0,
		Ascending: 1,
		Descending: 2
	};
	var ST_tabularSlicerCacheSortOrder = {
		Ascending: 0,
		Descending: 1
	};

	var ST_slicerCacheCrossFilter = {
		None: 0,
		ShowItemsWithDataAtTop: 1,
		showItemsWithNoData: 2
	};

	var ST_slicerStyleType = {
		unselectedItemWithData: 0,
		selectedItemWithData: 1,
		unselectedItemWithNoData: 2,
		selectedItemWithNoData: 3,
		hoveredUnselectedItemWithData: 4,
		hoveredSelectedItemWithData: 5,
		hoveredUnselectedItemWithNoData: 6,
		hoveredSelectedItemWithNoData: 7
	};

	function CT_slicerStyleElement() {
		this.type = null;
		this.dxfId = null;
		return this;
	}

	CT_slicerStyleElement.prototype.toStream = function(s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUChar2(0, this.type);
		s._WriteUInt2(1, this.dxfId);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

	};
	CT_slicerStyleElement.prototype.fromStream = function(s) {
		var _type;
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true) {
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd) {
				break;
			}
			switch (_at) {
				case 0: {
					this.type = s.GetUChar();
					break;
				}
				case 1: {
					this.dxfId = s.GetULong();
					break;
				}
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		while (true) {
			if (s.cur >= _end_pos) {
				break;
			}
			_type = s.GetUChar();
			switch (_type) {
				default: {
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_slicerStyle() {
		this.name = null;
		this.slicerStyleElements = [];
		return this;
	}

	CT_slicerStyle.prototype.toStream = function(s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.name);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.slicerStyleElements);
	};
	CT_slicerStyle.prototype.fromStream = function(s) {
		var _type;
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true) {
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd) {
				break;
			}
			switch (_at) {
				case 0: {
					this.name = s.GetString2();
					break;
				}
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		while (true) {
			if (s.cur >= _end_pos) {
				break;
			}
			_type = s.GetUChar();
			switch (_type) {
				case 0: {
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i) {
						s.Skip2(1); // type
						var tmp = new CT_slicerStyleElement();
						tmp.fromStream(s);
						this.slicerStyleElements.push(tmp);
					}
					break;
				}
				default: {
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_slicerStyles() {
		this.defaultSlicerStyle = null;
		this.slicerStyle = [];
		return this;
	}
	CT_slicerStyles.prototype.toStream = function(s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.defaultSlicerStyle);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.slicerStyle);
	};
	CT_slicerStyles.prototype.fromStream = function(s) {
		var _type;
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true) {
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd) {
				break;
			}
			switch (_at) {
				case 0: {
					this.defaultSlicerStyle = s.GetString2();
					break;
				}
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		while (true) {
			if (s.cur >= _end_pos) {
				break;
			}
			_type = s.GetUChar();
			switch (_type) {
				case 0: {
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i) {
						s.Skip2(1); // type
						var tmp = new CT_slicerStyle();
						tmp.fromStream(s);
						this.slicerStyle.push(tmp);
					}
					break;
				}
				default: {
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_slicers() {
		this.slicer = [];
		return this;
	}
	CT_slicers.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.slicer);
	};
	CT_slicers.prototype.fromStream = function (s, ws, slicerCaches) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_slicer(ws);
						tmp.fromStream(s, slicerCaches);
						this.slicer.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	
	function CT_slicer(ws) {
		//from documentation
		this.name = null;
		this.uid = AscCommon.CreateGUID();
		this.cacheDefinition = null;
		this.caption = null;
		this.startItem = 0;
		this.columnCount = 1;
		this.showCaption = true;
		this.level = 0;
		this.style = null;
		this.lockedPosition = false;
		this.rowHeight = null;

		this.ws = ws;

		this._writeBinaryForHistory = null;

		return this;
	}
	CT_slicer.prototype.getType = function() {
		return AscCommonExcel.UndoRedoDataTypes.Slicer;
	};
	CT_slicer.prototype.init = function (name, obj_name, type) {
		this.name = this.generateName(name);
		this.caption = name;
		this.rowHeight = 241300;

		//необходимо проверить, возможно данный кэш уже существует
		var cache;
		var caches = this.ws.getSlicerCachesBySourceName(name);
		if (caches) {
			for (var i = 0; i < caches.length; i++) {
				if (caches[i].checkObjApply(name, obj_name, type)) {
					cache = caches[i];
					break;
				}
			}
		}
		if (!cache) {
			cache = new CT_slicerCacheDefinition(this.ws);
			cache.init(name, obj_name, type);
		}

		this.cacheDefinition = cache;
	};
	CT_slicer.prototype.initPostOpen = function (tableIds) {
		if (this.cacheDefinition) {
			this.cacheDefinition.ws = this.ws;
			var tableCache = this.cacheDefinition.tableSlicerCache;
			if (tableCache) {
				var _obj = tableCache.initPostOpen(tableIds);
				if (_obj) {
					this.cacheDefinition._type = insertSlicerType.table;
				}
			}
		}
	};

	CT_slicer.prototype.Write_ToBinary2 = function(w) {
		this._writeBinaryForHistory = true;

		var old = new AscCommon.CMemory(true);
		pptx_content_writer.BinaryFileWriter.ExportToMemory(old);
		pptx_content_writer.BinaryFileWriter.ImportFromMemory(w);
		pptx_content_writer.BinaryFileWriter.WriteRecord4(0, this);
		pptx_content_writer.BinaryFileWriter.ExportToMemory(w);
		pptx_content_writer.BinaryFileWriter.ImportFromMemory(old);

		this._writeBinaryForHistory = false;
	};

	CT_slicer.prototype.Read_FromBinary2 = function(r) {
		var fileStream = r.ToFileStream();
		fileStream.GetUChar();
		this.fromStream(fileStream, null, true);
		r.FromFileStream(fileStream);
	}

	CT_slicer.prototype.toStream = function (s) {
		var historySerialize = this._writeBinaryForHistory;
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.name);
		s._WriteString2(1, this.uid);
		if (this.cacheDefinition && !historySerialize) {
			s._WriteString2(2, this.cacheDefinition.name);
		}
		s._WriteString2(3, this.caption);
		s._WriteUInt2(4, this.startItem);
		s._WriteUInt2(5, this.columnCount);
		s._WriteBool2(6, this.showCaption);
		s._WriteUInt2(7, this.level);
		s._WriteString2(8, this.style);
		s._WriteBool2(9, this.lockedPosition);
		s._WriteUInt2(10, this.rowHeight);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		if (null != this.cacheDefinition && historySerialize) {
			s.StartRecord(0);
			this.cacheDefinition.toStream(s, null, true);
			s.EndRecord();
		}
	};
	CT_slicer.prototype.fromStream = function (s, slicerCaches, historySerialize) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.name = s.GetString2(); break; }
				case 1: { this.uid = s.GetString2(); break; }
				case 2: {
					var cache = s.GetString2();
					this.cacheDefinition = slicerCaches[cache] || null;
					break;
				}
				case 3: { this.caption = s.GetString2(); break; }
				case 4: { this.startItem = s.GetULong(); break; }
				case 5: { this.columnCount = s.GetULong(); break; }
				case 6: { this.showCaption = s.GetBool(); break; }
				case 7: { this.level = s.GetULong(); break; }
				case 8: { this.style = s.GetString2(); break; }
				case 9: { this.lockedPosition = s.GetBool(); break; }
				case 10: { this.rowHeight = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}

		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_at = s.GetUChar();
			switch (_at)
			{
				case 0:
				{
					this.cacheDefinition = new CT_slicerCacheDefinition();
					this.cacheDefinition.fromStream(s);
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}

		s.Seek2(_end_pos);
	};
	CT_slicer.prototype.isExt = function () {
		return !!this.getTableSlicerCache();
	};
	CT_slicer.prototype.setName = function (val) {
		var oldVal = this.name;
		this.name = val;
		History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetName,
			this.ws.getId(), null, new AscCommonExcel.UndoRedoData_Slicer(null, oldVal, val), true);
	};
	CT_slicer.prototype.setCaption = function (val) {
		var oldVal = this.caption;
		this.caption = val;
		History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetCaption,
			this.ws.getId(), null, new AscCommonExcel.UndoRedoData_Slicer(this.name, oldVal, val), true);
	};
	CT_slicer.prototype.getSlicerCache = function () {
		return this.cacheDefinition;
	};
	CT_slicer.prototype.getTableSlicerCache = function () {
		return this.cacheDefinition && this.cacheDefinition.getTableSlicerCache();
	};
	CT_slicer.prototype.getCacheDefinition = function () {
		return this.cacheDefinition;
	};
	CT_slicer.prototype.generateName = function (name) {
		var wb = this.ws.workbook;
		var mapNames = [];
		var isContainName = false;
		for (var i = 0; i < wb.aWorksheets.length; i++) {
			if (!wb.aWorksheets[i].aSlicers) {
				continue;
			}
			for (var j = 0; j < wb.aWorksheets[i].aSlicers.length; j++) {
				if (name === wb.aWorksheets[i].aSlicers[j].name) {
					isContainName = true;
				}
				mapNames[wb.aWorksheets[i].aSlicers[j].name] = 1;
			}
		}
		if (isContainName) {
			var baseName = name + " ";
			var counter = 1;
			while (mapNames[baseName + counter]) {
				counter++;
			}
			name = baseName + counter;
		}

		return name;
	};

	CT_slicer.prototype.setTableColName = function (oldVal, newVal) {
		History.Create_NewPoint();
		History.StartTransaction();

		//TODO передать информацию во view о смене caption
		if (this.caption === oldVal) {
			this.setCaption(newVal);
		}
		this.setSourceName(newVal);
		this.setTableCacheColName(newVal);


		History.EndTransaction();
	};

	CT_slicer.prototype.setSourceName = function (val) {
		if (this.cacheDefinition) {
			var oldVal = this.cacheDefinition.sourceName;
			this.cacheDefinition.setSourceName(val);
			History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetCacheSourceName,
				this.ws.getId(), null, new AscCommonExcel.UndoRedoData_Slicer(this.name, oldVal, val), true);
		}
	};

	CT_slicer.prototype.setTableCacheColName = function (val) {
		if (!this.cacheDefinition) {
			return;
		}

		var _tableCache = this.cacheDefinition.getTableSlicerCache();
		if (_tableCache) {
			var oldVal = _tableCache.column;
			_tableCache.setColName(val);
			History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetTableColName,
				this.ws.getId(), null, new AscCommonExcel.UndoRedoData_Slicer(this.name, oldVal, val), true);
		}
	};

	CT_slicer.prototype.setTableName = function (val) {
		if (!this.cacheDefinition) {
			return;
		}

		var _tableCache = this.cacheDefinition.getTableSlicerCache();
		if (_tableCache) {
			var oldVal = _tableCache.tableId;
			_tableCache.setTableName(val);
			History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetTableName,
				this.ws.getId(), null, new AscCommonExcel.UndoRedoData_Slicer(this.name, oldVal, val), true);
		}
	};

	CT_slicer.prototype.setCacheName = function (val) {
		if (!this.cacheDefinition) {
			return;
		}


		var oldVal = this.cacheDefinition.name;
		this.cacheDefinition.setName(val);
		History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetCacheName,
			this.ws.getId(), null, new AscCommonExcel.UndoRedoData_Slicer(this.name, oldVal, val), true);

	};


	function CT_slicerCacheDefinition(ws) {
		this.pivotTables = [];//SlicerCachePivotTable
		this.data = null;//CSlicerCacheData
		this.name = null;
		this.uid = AscCommon.CreateGUID();
		this.sourceName = null;
		this.tableSlicerCache = null;
		this.slicerCacheHideItemsWithNoData = null;

		this.ws = ws;

		//пока добавил объект для хранения типа, чтобы не проходится по внутреннему дереву
		this._type = null;

		return this;
	}
	CT_slicerCacheDefinition.prototype.init = function (name, obj_name, type) {
		switch (type) {
			case insertSlicerType.table: {
				this.sourceName = name;
				//TODO для генерации имени нужна отдельная функция
				this.name = "Slicer_" + name;
				this.tableSlicerCache = new CT_tableSlicerCache();
				this.tableSlicerCache.tableId = obj_name;
				this.tableSlicerCache.column = name;
				break;
			}
			case insertSlicerType.pivotTable: {
				var pivot = new CT_slicerCachePivotTable();
				pivot.name = obj_name;
				//pivot.tabId = obj.name;
				this.pivotTables.push(pivot);

				//TODO data?

				/*
					<pivotTables>
					<pivotTable tabId="2" name="PivotTable1"/>
					</pivotTables>
					<data>
					<tabular pivotCacheId="1">
					<items count="2">
					<i x="0" s="1"/>
					<i x="1" s="1"/>
					</items>
					</tabular>
					</data>
				*/
				break;
			}
		}
		this._type = type;
	};

	CT_slicerCacheDefinition.prototype.toStream = function (s, tableIds, historySerialize) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.name);
		s._WriteString2(1, this.uid);
		s._WriteString2(2, this.sourceName);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.pivotTables);
		s.WriteRecord4(1, this.data);
		if (null != this.tableSlicerCache)
		{
			s.StartRecord(3);
			this.tableSlicerCache.toStream(s, tableIds, historySerialize);
			s.EndRecord();
		}
		if(null != this.slicerCacheHideItemsWithNoData) {
			var hideNoData = new CT_slicerCacheHideNoData();
			hideNoData.slicerCacheOlapLevelName = this.slicerCacheHideItemsWithNoData;
			hideNoData.count = this.slicerCacheHideItemsWithNoData.length;
			s.WriteRecord4(4, hideNoData);
		}
	};
	CT_slicerCacheDefinition.prototype.fromStream = function (s) {
		var _type;
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.name = s.GetString2(); break; }
				case 1: { this.uid = s.GetString2(); break; }
				case 2: { this.sourceName = s.GetString2(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				case 2:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_slicerCachePivotTable();
						tmp.fromStream(s);
						this.pivotTables.push(tmp);
					}
					break;
				}
				case 1:
				{
					this.data = new CT_slicerCacheData();
					this.data.fromStream(s);
					break;
				}
				case 3:
				{
					this.tableSlicerCache = new CT_tableSlicerCache();
					this.tableSlicerCache.fromStream(s);
					break;
				}
				case 4:
				{
					var hideNoData = new CT_slicerCacheHideNoData();
					hideNoData.fromStream(s);
					this.slicerCacheHideItemsWithNoData = hideNoData.slicerCacheOlapLevelName;
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	CT_slicerCacheDefinition.prototype.getFilterValues = function () {
		var res = null;
		switch (this._type) {
			case insertSlicerType.table: {
				//пока беру первый элемент, поскольку не очень понятно в каких случаях их вообще может быть несколько
				var tableCache = this.tableSlicerCache;
				var table = this.ws.getTableByName(tableCache.tableId);
				if (table) {
					var colId = table.getColIdByName(tableCache.column);
					if (colId !== null) {
						res = this.ws.autoFilters.getOpenAndClosedValues(table, colId);
					}
				}
				break;
			}
			case insertSlicerType.pivotTable: {
				break;
			}
		}
		return res;
	};

	CT_slicerCacheDefinition.prototype.getFilterObj = function () {
		var res = null;
		switch (this._type) {
			case insertSlicerType.table: {
				//пока беру первый элемент, поскольку не очень понятно в каких случаях их вообще может быть несколько
				var tableCache = this.tableSlicerCache;
				var table = this.ws.getTableByName(tableCache.tableId);
				if (table) {
					var colId = table.getColIdByName(tableCache.column);
					res = {obj: table, colId: colId}
				}
				break;
			}
			case insertSlicerType.pivotTable: {
				break;
			}
		}
		return res;
	};

	CT_slicerCacheDefinition.prototype.setSourceName = function (val) {
		this.sourceName = val;
	};

	CT_slicerCacheDefinition.prototype.getTableSlicerCache = function () {
		return this.tableSlicerCache;
	};

	CT_slicerCacheDefinition.prototype.checkObjApply = function (name, obj_name, type){
		var res = false;
		var _obj;
		switch (type) {
			case window['AscCommonExcel'].insertSlicerType.table : {
				_obj = this.getTableSlicerCache();
				if (_obj && _obj.tableId === obj_name && _obj.column === name) {
					res = true;
				}
				break;
			}
		}
		return res;
	};

	CT_slicerCacheDefinition.prototype.setName = function (val){
		this.name = val;
	};


	function CT_slicerCacheData() {
		this.olap = null;//OlapSlicerCache
		this.tabular = null;//TabularSlicerCache
	}
	CT_slicerCacheData.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecord4(0, this.olap);
		s.WriteRecord4(1, this.tabular);
	};
	CT_slicerCacheData.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					this.olap = new CT_olapSlicerCache();
					this.olap.fromStream(s);
					break;
				}
				case 1:
				{
					this.tabular = new CT_tabularSlicerCache();
					this.tabular.fromStream(s);
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_slicerCachePivotTable() {
		this.tabId = null;
		this.name = null;
	}
	CT_slicerCachePivotTable.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.tabId);
		s._WriteString2(1, this.name);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

	};
	CT_slicerCachePivotTable.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.tabId = s.GetULong(); break; }
				case 1: { this.name = s.GetString2(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
		s.Seek2(_end_pos);
	};


	function CT_olapSlicerCacheItem() {
		this.p = [];//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
		this.n = null;
		this.c = null;
		this.nd = false;
	}
	CT_olapSlicerCacheItem.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.n);
		s._WriteString2(1, this.c);
		s._WriteBool2(2, this.nd);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		if(this.p.length > 0){
			var p = this.p.map(function(currentValue){
				var res = new CT_olapSlicerCacheItemParent();
				res.n = currentValue;
				return res;
			});
			s.WriteRecordArray4(0, 0, p);
		}
	};
	CT_olapSlicerCacheItem.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.n = s.GetString2(); break; }
				case 1: { this.c = s.GetString2(); break; }
				case 2: { this.nd = s.GetBool(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_olapSlicerCacheItemParent();
						tmp.fromStream(s);
						this.p.push(tmp.n);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_olapSlicerCacheRange() {
		this.i = [];//OlapSlicerCacheItem
		this.startItem = null
	}
	CT_olapSlicerCacheRange.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.startItem);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.i);
	};
	CT_olapSlicerCacheRange.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.startItem = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_olapSlicerCacheItem();
						tmp.fromStream(s);
						this.i.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_olapSlicerCacheLevelData() {
		this.ranges = [];//OlapSlicerCacheRange
		this.uniqueName = null;
		this.sourceCaption = null;
		this.count = null;
		this.sortOrder = ST_olapSlicerCacheSortOrder.Natural;
		this.crossFilter = ST_slicerCacheCrossFilter.ShowItemsWithDataAtTop;
	}
	CT_olapSlicerCacheLevelData.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.uniqueName);
		s._WriteString2(1, this.sourceCaption);
		s._WriteUInt2(2, this.count);
		s._WriteUChar2(3, this.sortOrder);
		s._WriteUChar2(4, this.crossFilter);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.ranges);
	};
	CT_olapSlicerCacheLevelData.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.uniqueName = s.GetString2(); break; }
				case 1: { this.sourceCaption = s.GetString2(); break; }
				case 2: { this.count = s.GetULong(); break; }
				case 3: { this.sortOrder = s.GetUChar(); break; }
				case 4: { this.crossFilter = s.GetUChar(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_olapSlicerCacheRange();
						tmp.fromStream(s);
						this.ranges.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_olapSlicerCache() {
		this.levels = [];//OlapSlicerCacheLevelData
		this.selections = [];//OlapSlicerCacheSelection
		this.pivotCacheId = null;
	}
	CT_olapSlicerCache.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.pivotCacheId);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		if (this.levels.length > 0) {
			var levelsData = new CT_olapSlicerCacheLevelsData();
			levelsData.level = this.levels;
			levelsData.count = this.levels.length;
			s.WriteRecord4(0, levelsData);
		}
		if (this.selections.length > 0) {
			var selections = new CT_olapSlicerCacheSelections();
			selections.selection = this.selections;
			selections.count = this.selections.length;
			s.WriteRecord4(1, selections);
		}
	};
	CT_olapSlicerCache.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.pivotCacheId = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					var levelsData = new CT_olapSlicerCacheLevelsData();
					levelsData.fromStream(s);
					this.levels = levelsData.level;
					break;
				}
				case 1:
				{
					var selections = new CT_olapSlicerCacheSelections();
					selections.fromStream(s);
					this.selections = selections.selection;
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_olapSlicerCacheLevelsData() {
		this.count = null;
		this.level = [];
		return this;
	}
	CT_olapSlicerCacheLevelsData.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.count);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.level);
	};
	CT_olapSlicerCacheLevelsData.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.count = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_olapSlicerCacheLevelData();
						tmp.fromStream(s);
						this.level.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_olapSlicerCacheSelections() {
		this.count = null;
		this.selection = [];
		return this;
	}
	CT_olapSlicerCacheSelections.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.count);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.selection);
	};
	CT_olapSlicerCacheSelections.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.count = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_olapSlicerCacheSelection();
						tmp.fromStream(s);
						this.selection.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_olapSlicerCacheSelection() {
		this.p = [];//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
		this.n = null;
	}
	CT_olapSlicerCacheSelection.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.n);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		if(this.p.length > 0){
			var p = this.p.map(function(currentValue){
				var res = new CT_olapSlicerCacheItemParent();
				res.n = currentValue;
				return res;
			});
			s.WriteRecordArray4(0, 0, p);
		}
	};
	CT_olapSlicerCacheSelection.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.n = s.GetString2(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_olapSlicerCacheItemParent();
						tmp.fromStream(s);
						this.p.push(tmp.n);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_olapSlicerCacheItemParent() {
		this.n = null;
		return this;
	}
	CT_olapSlicerCacheItemParent.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.n);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

	};
	CT_olapSlicerCacheItemParent.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.n = s.GetString2(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
		s.Seek2(_end_pos);
	};

	function CT_tableSlicerCache() {
		this.tableId = null;
		this.tableIdOpen = null;//?
		this.column = null;
		this.columnOpen = null;//?
		this.sortOrder = ST_tabularSlicerCacheSortOrder.Ascending;
		this.customListSort = true;
		this.crossFilter = ST_slicerCacheCrossFilter.ShowItemsWithDataAtTop;

		return this;
	}
	CT_tableSlicerCache.prototype.initPostOpen = function (tableIds) {
		var table = null;
		if (null != this.tableIdOpen && null != this.columnOpen) {
			table = tableIds[this.tableIdOpen];
			this.tableId = table.DisplayName;
			this.column = table.getTableNameColumnByIndex(this.columnOpen - 1);
		}
		return table;
	};
	CT_tableSlicerCache.prototype.toStream = function (s, tableIds, historySerialize) {
		var tableIdOpen = null;
		var columnOpen = null;
		var elem = tableIds && tableIds[this.tableId];
		if (elem) {
			tableIdOpen = elem.id;
			columnOpen = (elem.table.getTableIndexColumnByName(this.column) + 1) || null;
		} else if (historySerialize) {
			tableIdOpen = this.tableId;
			columnOpen = this.column;
		}

		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, tableIdOpen);
		s._WriteUInt2(1, columnOpen);
		s._WriteUChar2(2, this.sortOrder);
		s._WriteBool2(3, this.customListSort);
		s._WriteUChar2(4, this.crossFilter);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);
	};
	CT_tableSlicerCache.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.tableIdOpen = s.GetULong(); break; }
				case 1: { this.columnOpen = s.GetULong(); break; }
				case 2: { this.sortOrder = s.GetUChar(); break; }
				case 3: { this.customListSort = s.GetBool(); break; }
				case 4: { this.crossFilter = s.GetUChar(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
		s.Seek2(_end_pos);
	};
	CT_tableSlicerCache.prototype.setTableName = function (val) {
		//TODO history
		this.tableId = val;
	};
	CT_tableSlicerCache.prototype.setColName = function (val) {
		//TODO history
		this.column = val;
	};

	function CT_tabularSlicerCache() {
		this.items = [];//TabularSlicerCacheItem
		this.pivotCacheId = null;
		this.sortOrder = ST_tabularSlicerCacheSortOrder.Ascending;
		this.customListSort = true;
		this.showMissing = true;
		this.crossFilter = ST_slicerCacheCrossFilter.ShowItemsWithDataAtTop;
	}
	CT_tabularSlicerCache.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.pivotCacheId);
		s._WriteUChar2(1, this.sortOrder);
		s._WriteBool2(2, this.customListSort);
		s._WriteBool2(3, this.showMissing);
		s._WriteUChar2(4, this.crossFilter);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		if (this.items.length > 0) {
			var items = new CT_tabularSlicerCacheItems();
			items.i = this.items;
			items.count = this.items.length;
			s.WriteRecord4(0, items);
		}
	};
	CT_tabularSlicerCache.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.pivotCacheId = s.GetULong(); break; }
				case 1: { this.sortOrder = s.GetUChar(); break; }
				case 2: { this.customListSort = s.GetBool(); break; }
				case 3: { this.showMissing = s.GetBool(); break; }
				case 4: { this.crossFilter = s.GetUChar(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					var items = new CT_tabularSlicerCacheItems();
					items.fromStream(s);
					this.items = items.i;
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	CT_tabularSlicerCache.prototype.setColumn = function (val) {
		var oldVal = this.column;
		this.column = val;
		History.Add(AscCommonExcel.g_oUndoRedoSlicer, AscCH.historyitem_Slicer_SetCacheSourceName,
			null, null, new AscCommonExcel.UndoRedoData_Slicer(this.name, oldVal, this.column), true);
	};

	function CT_slicerCacheOlapLevelName() {
		this.uniqueName = null;
		this.count = null;
		return this;
	}
	CT_slicerCacheOlapLevelName.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteString2(0, this.uniqueName);
		s._WriteUInt2(1, this.count);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

	};
	CT_slicerCacheOlapLevelName.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.uniqueName = s.GetString2(); break; }
				case 1: { this.count = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_slicerCacheHideNoData() {
		this.count = 0;
		this.slicerCacheOlapLevelName = [];
		return this;
	}
	CT_slicerCacheHideNoData.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.count);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.slicerCacheOlapLevelName);
	};
	CT_slicerCacheHideNoData.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.count = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_slicerCacheOlapLevelName();
						tmp.fromStream(s);
						this.slicerCacheOlapLevelName.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};


	function CT_tabularSlicerCacheItems() {
		this.count = null;
		this.i = [];
		return this;
	}
	CT_tabularSlicerCacheItems.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.count);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

		s.WriteRecordArray4(0, 0, this.i);
	};
	CT_tabularSlicerCacheItems.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.count = s.GetULong(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
//members
		var _type;
		while (true)
		{
			if (s.cur >= _end_pos)
				break;
			_type = s.GetUChar();
			switch (_type)
			{
				case 0:
				{
					s.Skip2(4);
					var _c = s.GetULong();
					for (var i = 0; i < _c; ++i)
					{
						s.Skip2(1); // type
						var tmp = new CT_tabularSlicerCacheItem();
						tmp.fromStream(s);
						this.i.push(tmp);
					}
					break;
				}
				default:
				{
					s.SkipRecord();
					break;
				}
			}
		}
		s.Seek2(_end_pos);
	};
	function CT_tabularSlicerCacheItem() {
		this.x = null;
		this.s = false;
		this.nd = false;
	}
	CT_tabularSlicerCacheItem.prototype.toStream = function (s) {
		s.WriteUChar(AscCommon.g_nodeAttributeStart);
		s._WriteUInt2(0, this.x);
		s._WriteBool2(1, this.s);
		s._WriteBool2(2, this.nd);
		s.WriteUChar(AscCommon.g_nodeAttributeEnd);

	};
	CT_tabularSlicerCacheItem.prototype.fromStream = function (s) {
		var _len = s.GetULong();
		var _start_pos = s.cur;
		var _end_pos = _len + _start_pos;
		var _at;
// attributes
		s.GetUChar();
		while (true)
		{
			_at = s.GetUChar();
			if (_at === AscCommon.g_nodeAttributeEnd)
				break;
			switch (_at)
			{
				case 0: { this.x = s.GetULong(); break; }
				case 1: { this.s = s.GetBool(); break; }
				case 2: { this.nd = s.GetBool(); break; }
				default:
					s.Seek2(_end_pos);
					return;
			}
		}
		s.Seek2(_end_pos);
	};

	var prot;
	window['Asc'] = window['Asc'] || {};
	window['AscCommonExcel'] = window['AscCommonExcel'] || {};
	window['Asc']['CT_slicer'] = window['Asc'].CT_slicer = CT_slicer;
	window['Asc']['CT_slicers'] = window['Asc'].CT_slicers = CT_slicers;
	window['Asc']['CT_slicerCacheDefinition'] = window['Asc'].CT_slicerCacheDefinition = CT_slicerCacheDefinition;
	window['Asc']['CT_slicerCacheData'] = window['Asc'].CT_slicerCacheData = CT_slicerCacheData;
	window['Asc']['CT_slicerCachePivotTable'] = window['Asc'].CT_slicerCachePivotTable = CT_slicerCachePivotTable;
	window['Asc']['CT_olapSlicerCacheItem'] = window['Asc'].CT_olapSlicerCacheItem = CT_olapSlicerCacheItem;
	window['Asc']['CT_olapSlicerCacheRange'] = window['Asc'].CT_olapSlicerCacheRange = CT_olapSlicerCacheRange;
	window['Asc']['CT_olapSlicerCacheLevelData'] = window['Asc'].CT_olapSlicerCacheLevelData = CT_olapSlicerCacheLevelData;
	window['Asc']['CT_olapSlicerCache'] = window['Asc'].CT_olapSlicerCache = CT_olapSlicerCache;
	window['Asc']['CT_olapSlicerCacheSelection'] = window['Asc'].CT_olapSlicerCacheSelection = CT_olapSlicerCacheSelection;
	window['Asc']['CT_tableSlicerCache'] = window['Asc'].CT_tableSlicerCache = CT_tableSlicerCache;
	window['Asc']['CT_tabularSlicerCache'] = window['Asc'].CT_tabularSlicerCache = CT_tabularSlicerCache;
	window['Asc']['CT_tabularSlicerCacheItem'] = window['Asc'].CT_tabularSlicerCacheItem = CT_tabularSlicerCacheItem;
	window['Asc']['CT_slicerStyles'] = window['Asc'].CT_slicerStyles = CT_slicerStyles;
	window['Asc']['CT_slicerStyle'] = window['Asc'].CT_slicerStyle = CT_slicerStyle;
	window['Asc']['CT_slicerStyleElement'] = window['Asc'].CT_slicerStyleElement = CT_slicerStyleElement;

	window['Asc']['ST_olapSlicerCacheSortOrder'] = window['AscCommonExcel'].ST_olapSlicerCacheSortOrder = ST_olapSlicerCacheSortOrder;
	prot = ST_olapSlicerCacheSortOrder;
	prot['Natural'] = prot.Natural;
	prot['Ascending'] = prot.Ascending;
	prot['Descending'] = prot.Descending;

	window['Asc']['ST_tabularSlicerCacheSortOrder'] = window['Asc'].ST_tabularSlicerCacheSortOrder = ST_tabularSlicerCacheSortOrder;
	prot = ST_tabularSlicerCacheSortOrder;
	prot['Ascending'] = prot.Ascending;
	prot['Descending'] = prot.Descending;

	window['Asc']['ST_slicerCacheCrossFilter'] = window['AscCommonExcel'].ST_slicerCacheCrossFilter = ST_slicerCacheCrossFilter;
	prot = ST_slicerCacheCrossFilter;
	prot['None'] = prot.None;
	prot['ShowItemsWithDataAtTop'] = prot.ShowItemsWithDataAtTop;
	prot['showItemsWithNoData'] = prot.showItemsWithNoData;

	window['Asc']['ST_slicerStyleType'] = window['Asc'].ST_slicerStyleType = ST_slicerStyleType;
	prot = ST_slicerStyleType;
	prot['unselectedItemWithData'] = prot.unselectedItemWithData;
	prot['selectedItemWithData'] = prot.selectedItemWithData;
	prot['unselectedItemWithNoData'] = prot.unselectedItemWithNoData;
	prot['selectedItemWithNoData'] = prot.selectedItemWithNoData;
	prot['hoveredUnselectedItemWithData'] = prot.hoveredUnselectedItemWithData;
	prot['hoveredSelectedItemWithData'] = prot.hoveredSelectedItemWithData;
	prot['hoveredUnselectedItemWithNoData'] = prot.hoveredUnselectedItemWithNoData;
	prot['hoveredSelectedItemWithNoData'] = prot.hoveredSelectedItemWithNoData;

	window['AscCommonExcel'].insertSlicerType = insertSlicerType;
	prot = insertSlicerType;
	prot['table'] = prot.table;
	prot['pivotTable'] = prot.pivotTable;

})(window);
