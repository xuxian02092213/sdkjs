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

	var ST_slicerCacheCrossFilter = {
		None: 0,
		ShowItemsWithDataAtTop: 1,
		showItemsWithNoData: 2
	};

	function CT_slicer() {
		//from documentation
		this.extLst = null; //? CT_OfficeArtExtensionList
		this.name = null;
		//this.ref = null;//<xsd:attribute ref="xr10:uid" use="optional"/>
		this.cache = null;
		this.caption = null;
		this.startItem = null;
		this.columnCount = null;
		this.showCaption = null;
		this.columnCount = null;
		this.style = null;
		this.lockedPosition = null;
		this.rowHeight = null;

		this._obj = null; //?

		return this;
	}
	CT_slicer.prototype.init = function (name, obj, type) {
		this.name = name;
		this.caption = name;
		this._obj = obj;
		this.cache = new CT_slicerCacheDefinition();
		this.cache.init(name, obj, type);
	};
	CT_slicer.prototype.initPostOpen = function () {
	};

	function CT_slicerCacheDefinition() {
		this.pivotTables = [];//SlicerCachePivotTable
		this.data = null;//CSlicerCacheData
		this.extLst = null;
		this.name = null;
		//<xsd:attribute ref="xr10:uid" use="optional"/>
		this.sourceName = null;

		return this;
	}
	CT_slicerCacheDefinition.prototype.init = function (name, obj, type) {
		switch (type) {
			case insertSlicerType.table: {
				this.sourceName = name;
				//TODO для генерации имени нужна отдельная функция
				this.name = "Slicer_" + name;
				var tableCache = new CT_tableSlicerCache();
				tableCache.tableId = obj.name;
				tableCache.column = name;
				this.extLst.push(tableCache);
				break;
			}
			case insertSlicerType.pivotTable: {
				var pivot = new CT_slicerCachePivotTable();
				pivot.name = obj.name;
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
	};

	function CT_slicerCacheData() {
		this.olap = null;//OlapSlicerCache
		this.tabular = null;//TabularSlicerCache
	}

	function CT_slicerCachePivotTable() {
		this.tabId = null;
		this.name = null;
	}

	function CT_olapSlicerCacheItem() {
		this.p = null;//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
		this.n = null;
		this.c = null;
		this.nd = null;
	}

	function CT_olapSlicerCacheRange() {
		this.i = null;//OlapSlicerCacheItem
		this.startItem = null
	}

	function CT_olapSlicerCacheLevelData() {
		this.ranges = [];//OlapSlicerCacheRange
		this.uniqueName = null;
		this.sourceCaption = null;
		this.count = null;
		this.sortOrder = null;//ST_OlapSlicerCacheSortOrder
		this.crossFilter = null;//ST_SlicerCacheCrossFilter
	}

	function CT_olapSlicerCache() {
		this.levels = [];//OlapSlicerCacheLevelData
		this.selections = [];//OlapSlicerCacheSelection
		this.extLst = [];//ExtensionList
		this.pivotCacheId = null;
	}

	function CT_olapSlicerCacheSelection() {
		this.p = null;//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
		this.n = null;
	}

	function CT_tableSlicerCache() {
		//id генерируется только на запись
		this.extLst = [];//CT_ExtensionList
		this.tableId = null;
		this.column = null;
		this.sortOrder = null;
		this.customListSort = null;
		this.crossFilter = null;//ST_SlicerCacheCrossFilter

		return this;
	}

	function CT_tabularSlicerCache() {
		this.items = [];//TabularSlicerCacheItem
		this.extLst = [];//ExtensionList
		this.pivotCacheId = null;
		this.sortOrder = null;
		this.customListSort = null;
		this.showMissing = null;
		this.crossFilter = null;//ST_SlicerCacheCrossFilter
	}

	function CT_tabularSlicerCacheItem() {
		this.x = null;
		this.s = null;
		this.nd = null;
	}

	var prot;
	window['Asc'] = window['Asc'] || {};
	window['AscCommonExcel'] = window['AscCommonExcel'] || {};
	window['Asc']['CT_slicer'] = window['Asc'].CT_slicer = CT_slicer;
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

	window['Asc']['ST_olapSlicerCacheSortOrder'] = window['AscCommonExcel'].ST_olapSlicerCacheSortOrder = ST_olapSlicerCacheSortOrder;
	prot = ST_olapSlicerCacheSortOrder;
	prot['Natural'] = prot.Natural;
	prot['Ascending'] = prot.Ascending;
	prot['Descending'] = prot.Descending;

	window['Asc']['ST_slicerCacheCrossFilter'] = window['AscCommonExcel'].ST_slicerCacheCrossFilter = ST_slicerCacheCrossFilter;
	prot = ST_slicerCacheCrossFilter;
	prot['None'] = prot.None;
	prot['ShowItemsWithDataAtTop'] = prot.ShowItemsWithDataAtTop;
	prot['showItemsWithNoData'] = prot.showItemsWithNoData;

	window['AscCommonExcel'].insertSlicerType = insertSlicerType;
	prot = insertSlicerType;
	prot['table'] = prot.table;
	prot['pivotTable'] = prot.pivotTable;

})(window);
