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
		this.cache = new CT_SlicerCacheDefinition();
		this.cache.init(name, obj, type);
	};
	CT_slicer.prototype.initPostOpen = function () {
	};

	function CT_slicerCacheDefinition() {
		this.pivotTables = [];//SlicerCachePivotTables
		this.data = null;//CSlicerCacheData
		this.extLst = null;
		this.name = null;
		//<xsd:attribute ref="xr10:uid" use="optional"/>
		this.sourceName = null;

		return this;
	}
	CT_slicerCacheDefinition.prototype.init = function (name, obj, type) {
		if (true/*table*/) {
			this.sourceName = name;
			//TODO для генерации имени нужна отдельная функция
			this.name = "Slicer_" + name;
			var tableCache = new CTableSlicerCache();
			tableCache.tableId = obj.name;
			tableCache.column = name;
			this.extLst.push(tableCache);
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
		this.ranges = [];//OlapSlicerCacheRanges
		this.uniqueName = null;
		this.sourceCaption = null;
		this.count = null;
		this.sortOrder = null;//OlapSlicerCacheSortOrder
		this.crossFilter = null;//SlicerCacheCrossFilter
	}

	function CT_olapSlicerCache() {
		this.levels = [];//OlapSlicerCacheLevelsData
		this.selections = [];//OlapSlicerCacheSelection
		this.extLst = [];//ExtensionList
		this.pivotCacheId = null;
	}

	function CT_olapSlicerCacheSelection() {
		this.p = null;//OlapSlicerCacheItemParent - состоит из одного поля, поэтому данную структуру не добавляю
		this.n = null;
	}

	function CTableSlicerCache() {
		//id генерируется только на запись
		this.tableId = null;
		this.column = null;
		return this;
	}

	function CT_tabularSlicerCache() {
		this.items = [];//TabularSlicerCacheItem
		this.extLst = [];//ExtensionList
		this.pivotCacheId = null;
		this.sortOrder = null;
		this.customListSort = null;
		this.showMissing = null;
		this.crossFilter = null;//SlicerCacheCrossFilter
	}

	function CT_tabularSlicerCacheItem() {
		this.x = null;
		this.s = null;
		this.nd = null;
	}

	window['Asc'] = window['Asc'] || {};
	window['AscCommonExcel'] = window['AscCommonExcel'] || {};
	window['AscCommonExcel'].CT_Slicer = CT_Slicer;

})(window);