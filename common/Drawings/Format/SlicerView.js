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

(function() {

    function CStyleInfo() {
        this.pen = {
            left: null,
            top: null,
            right: null,
            bottom: null
        }
        this.brush = null;
        this.font = null;
        this.fontSize = null;
    }

    function CSlicer() {
        AscFormat.CShape.call(this);
        this.name = null;

        this.recalcInfo.recalculateHeader = false;
        this.recalcInfo.recalculateButtons = false;
        this.recalcInfo.recalculateStyles = false;

        this.header = null;
        this.styles = {
            selected: new CStyleInfo(),
            unselected: new CStyleInfo(),
            hoveredSelected: new CStyleInfo(),
            hoveredUnselected: new CStyleInfo()
        };
        this.buttonsContainer = new CButtonsContainer(this);
    }
    CSlicer.prototype = Object.create(AscFormat.CShape.prototype);
    CSlicer.prototype.constructor = CSlicer;

    CSlicer.prototype.getSlicerView = function() {
        if(!this.worksheet) {
            return null;
        }
        return this.worksheet.getSlicerByName();
    };

    CSlicer.prototype.recalculate = function () {
        AscFormat.ExecuteNoHistory(function () {
            AscFormat.CShape.prototype.recalculate.call(this);
            if(this.recalcInfo.recalculateHeader) {
                this.recalculateHeader();
                this.recalcInfo.recalculateHeader = true;
            }
            if(this.recalcInfo.recalculateButtons) {
                this.recalculateHeader();
                this.recalcInfo.recalculateHeader = true;
            }
        }, this, []);
    };

    CSlicer.prototype.recalculateHeader = function() {
        this.header = null;
        var oView = this.getSlicerView();
        if(!oView) {
            return;
        }
        if(false === oView.showCaption) {
            return;
        }
        this.header = new CHeader(this);
        this.header.recalculate();
    };


    CSlicer.prototype.recalculateButtons = function() {
        this.buttonsContainer.clear();
        var oView = this.getSlicerView();
        if(!oView) {
            return;
        }
        var oCache = this.worksheet.getSlicerCacheBySourceName(this.name);
        if(!oCache) {
            return;
        }
        var oValues = oCache.getFilterValues();
        if(!oValues) {
            return;
        }
        if(oValues.values.length === 0) {
            return;
        }
        var nColumnCount = 1;
        if(oView.columnCount !== null) {
            nColumnCount = oView.columnCount;
        }
        this.buttonsContainer.setColumnsCount(nColumnCount);
        for(var nValueIndex = 0; nValueIndex < oValues.values.length; ++nValueIndex) {
            this.buttonsContainer.addButton(new CButton(this, oValues.values));
        }
        this.buttonsContainer.recalculate();
    };

    CSlicer.prototype.getBrushByState = function (nType) {
        var oRet = this.styles.unselected;
        switch (nType) {
            case BUTTON_STATE_SELECTED: {
                break;
            }
            case  BUTTON_STATE_UNSELECTED: {
                break;
            }
            case  BUTTON_STATE_HOVERED_SELECTED: {
                break;
            }
            case  BUTTON_STATE_HOVERED_UNSELECTED: {
                break;
            }
        }
        return oRet;
    };


    var BUTTON_STATE_SELECTED = 0;
    var BUTTON_STATE_UNSELECTED = 1;
    var BUTTON_STATE_HOVERED_SELECTED = 2;
    var BUTTON_STATE_HOVERED_UNSELECTED = 3;
    function CButton(slicer, options) {
        AscFormat.CShape.call(this);
        this.slicer = slicer;
        this.options = options;
        this.state = BUTTON_STATE_UNSELECTED;
        this.extX = 0;
        this.extY = 0;
        this.worksheet = slicer.worksheet;
        this.createTextBody();
    }
    CButton.prototype = Object.create(AscFormat.CShape.prototype);
    CButton.prototype.recalculate = function() {
        if(this.recalcInfo.recalculateContent) {
        }
        AscFormat.CShape.prototype.recalculate();
    };

    CButton.prototype.recalculateContent = function () {

    };

    function CHeader(slicer) {
        this.slicer = slicer;
        this.label = null;
        this.buttons = [];
    }

    function CButtonsContainer(slicer) {
        this.slicer = slicer;
        this.buttons = [];
        this.extX = 0;
        this.extY = 0;
        this.contentW = 0;
        this.contentH = 0;
        this.columnCount = 1;
        this.scrollTop = 0;
        this.scroll = new CScroll(this);
    }
    CButtonsContainer.prototype.clear = function() {
        this.buttons.length = 0;
    };
    CButtonsContainer.prototype.addButton = function (oButton) {
        this.buttons.push(oButton);
    }
    CButtonsContainer.prototype.setColumnsCount = function (nCount) {
        this.columnCount = nCount;
    }
    CButtonsContainer.prototype.recalculate = function() {

    };
    function CScroll(parent, bHor) {
        this.parent = parent;
        this.bHor = bHor;
    }
})()

