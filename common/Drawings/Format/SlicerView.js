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
    var LEFT_PADDING = 3;
    var RIGHT_PADDING = 3;
    var BOTTOM_PADDING = 3;
    var TOP_PADDING = 2
    var SPACE_BETWEEN = 1.5;

    var STYLE_TYPE = {};
    STYLE_TYPE.WHOLE = 0;
    STYLE_TYPE.HEADER = 1;
    STYLE_TYPE.SELECTED_DATA = 2;
    STYLE_TYPE.SELECTED_NO_DATA = 3;
    STYLE_TYPE.UNSELECTED_DATA = 4;
    STYLE_TYPE.UNSELECTED_NO_DATA = 5;
    STYLE_TYPE.HOVERED_SELECTED_DATA = 6;
    STYLE_TYPE.HOVERED_SELECTED_NO_DATA = 7;
    STYLE_TYPE.HOVERED_UNSELECTED_DATA = 8;
    STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA = 9;
    function CStyleInfo() {
        this.pen = {
            left: null,
            top: null,
            right: null,
            bottom: null
        }
        this.brush = null;
        this.txStyles = null;
        var t = this;
        AscFormat.ExecuteNoHistory(function(){
            t.txStyles = new CStyles(false);
        }, this, []);

    }

    function CTextBox(txBody, transformText) {
        this.txBody = txBody;
        this.transformText = transformText;
    }

    function CSlicer() {
        AscFormat.CShape.call(this);
        this.name = null;

        this.recalcInfo.recalculateHeader = true;
        this.recalcInfo.recalculateButtons = true;
        this.recalcInfo.recalculateStyles = true;
        this.header = null;
        this.styles = {};
        for(var key in STYLE_TYPE) {
            if(STYLE_TYPE.hasOwnProperty(key)) {
                this.styles[STYLE_TYPE[key]] = new CStyleInfo();
            }
        }
        this.buttonsContainer = new CButtonsContainer(this);
    }
    CSlicer.prototype = Object.create(AscFormat.CShape.prototype);
    CSlicer.prototype.constructor = CSlicer;
    CSlicer.prototype.setName = function(val) {
        this.name = val;
    };
    CSlicer.prototype.recalculateBrush = function() {
        var oStyle = this.styles[STYLE_TYPE.WHOLE];
        this.brush = oStyle.brush;
        var oParents = this.getParentObjects();
        this.brush.calculate(oParents.theme, oParents.slide, oParents.layout, oParents.master, {R:0, G:0, B:0, A: 255});
    };
    CSlicer.prototype.recalculatePen = function() {
        var oStyle = this.styles[STYLE_TYPE.WHOLE];
        this.pen = oStyle.pen.left;//TODO
        var oParents = this.getParentObjects();
        this.pen.calculate(oParents.theme, oParents.slide, oParents.layout, oParents.master, {R:0, G:0, B:0, A: 255});
    };
    CSlicer.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CSlicer.prototype.canRotate = function() {
        return false;
    };
    CSlicer.prototype.getSlicerView = function() {
        if(!this.worksheet) {
            return null;
        }
        return this.worksheet.getSlicerByName();
    };
    CSlicer.prototype.recalculate = function () {
        AscFormat.ExecuteNoHistory(function () {
            if(this.recalcInfo.recalculateStyles) {
                this.recalculateStyles();
            }
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
    CSlicer.prototype.recalculateStyles = function() {
        for(var key in this.styles) {
            if(this.styles.hasOwnProperty(key)) {
                var oStyle = this.styles[key];
                oStyle.txStyles = this.recalculateTextStyles(0);
                oStyle.brush = new AscFormat.CreateUnfilFromRGB(255, 255, 255);
                oStyle.pen.left = new AscFormat.CLn();
                oStyle.pen.left.setFill(new AscFormat.CreateUnfilFromRGB(0, 0, 0));
                oStyle.pen.left.setW(0);
                oStyle.pen.top = new AscFormat.CLn();
                oStyle.pen.top.setFill(new AscFormat.CreateUnfilFromRGB(0, 0, 0));
                oStyle.pen.top.setW(0);
                oStyle.pen.right = new AscFormat.CLn();
                oStyle.pen.right.setFill(new AscFormat.CreateUnfilFromRGB(0, 0, 0));
                oStyle.pen.right.setW(0);
                oStyle.pen.bottom = new AscFormat.CLn();
                oStyle.pen.bottom.setFill(new AscFormat.CreateUnfilFromRGB(0, 0, 0));
                oStyle.pen.bottom.setW(0);
                switch (key) {

                }
            }
        }
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
        for(var nValueIndex = 0; nValueIndex < oValues.values.length; ++nValueIndex) {
            this.buttonsContainer.addButton(new CButton(this, oValues.values));
        }
        this.buttonsContainer.recalculate();
    };
    CSlicer.prototype.getPen = function (nType) {
        return this.styles[nType].pen;
    };
    CSlicer.prototype.getBrush = function (nType) {
        return this.styles[nType].brush;
    };
    CSlicer.prototype.getColumnsCount = function() {
        var oView = this.getSlicerView();
        if(!oView) {
            return 1;
        }
        var nRet = 1;
        if(AscFormat.isRealNumber(oView.columnCount)) {
            nRet = oView.columnCount;
        }
        return nRet;
    };
    CSlicer.prototype.getButtonHeight = function() {
        var oView = this.getSlicerView();
        if(!oView) {
            return 1;
        }
        var nRet = 15;
        if(AscFormat.isRealNumber(oView.rowHeight)) {
            nRet = oView.rowHeight * g_dKoef_emu_to_mm;
        }
        return nRet;
    };
    CSlicer.prototype.getTxStyles = function (nType) {
        return this.styles[nType].txStyles;
    };

    function CHeader(slicer) {
        this.slicer = slicer;
        this.label = null;
        this.buttons = [];
    }
    CHeader.prototype.recalculate = function () {

    };

    function CButton(slicer, options) {
        AscFormat.CShape.call(this);
        this.slicer = slicer;
        this.options = options;
        this.state = STYLE_TYPE.UNSELECTED_DATA;
        this.worksheet = slicer.worksheet;
        this.setBDeleted(false);
        AscFormat.CheckSpPrXfrm3(this, false);
        this.textBoxes = {};
        for(var key in STYLE_TYPE) {
            if(STYLE_TYPE.hasOwnProperty(key)) {
                this.createTextBody();
                this.textBoxes[STYLE_TYPE[key]] = new CTextBox(this.txBody, new AscCommon.CMatrix());
            }
        }
        this.bodyPr = new AscFormat.CBodyPr();
        this.bodyPr.setDefault();
        this.bodyPr.anchor = 1;//vertical align ctr
        this.bodyPr.lIns = LEFT_PADDING;
        this.bodyPr.rIns = RIGHT_PADDING;
        this.bodyPr.tIns = 0;
        this.bodyPr.bIns = 0;
        this.bodyPr.bIns = 0;
        this.bodyPr.horzOverflow = AscFormat.nOTClip;
        this.bodyPr.vertOverflow = AscFormat.nOTClip;
    }
    CButton.prototype = Object.create(AscFormat.CShape.prototype);
    CButton.prototype.getTxBodyType = function () {
        var nRet = null;
        for(var key in this.textBoxes) {
            if(this.textBoxes.hasOwnProperty(key)) {
                if(this.textBoxes[key].txBody === this.txBody) {
                    nRet = key;
                    break;
                }
            }
        }
        return nRet;
    };
    CButton.prototype.getString = function() {
        if(this.options && typeof this.options.text === "string") {
            return this.options.text;
        }
        return "";
    };
    CButton.prototype.Get_Styles = function() {
        return this.slicer.getTxStyles(this.getTxBodyType());
    };
    CButton.prototype.recalculate = function() {
        var bRecalcContent = this.recalcInfo.recalculateContent;
        AscFormat.CShape.prototype.recalculate();
        if(bRecalcContent) {

        }
    };
    CButton.prototype.recalculateBrush = function () {
        //Empty procedure. Set of brushes for all states will be recalculated in CSlicer
    };
    CButton.prototype.recalculatePen = function () {
        //Empty procedure. Set of pens for all states will be recalculated in CSlicer
    };

    CButton.prototype.checkContentFit = function(sText) {
        var oContent = this.getDocContent();
        oContent.ClearContent(true);
        AscFormat.AddToContentFromString(oContent, sText);
        AscFormat.CShape.prototype.recalculateContent.call(this);
        var oFirstParagraph = oContent.Content[0];
        return oFirstParagraph.Lines.length === 1;
    };

    CButton.prototype.recalculateContent = function () {
        var sText = this.getString(), oMetrics, oContent, oFirstParagraph, sFitText;
        for(var key in STYLE_TYPE) {
            if(STYLE_TYPE.hasOwnProperty(key)) {
                this.txBody = this.textBoxes[STYLE_TYPE[key]].txBody;
                if(this.checkContentFit(sText)) {
                    continue;
                }
                var nLeftPos = 1, nRightPos = sText.length;
                var nMiddlePos;
                var sEnd = "...";
                sFitText = sText.slice(0, nLeftPos);
                sFitText += sEnd;
                if(!this.checkContentFit(sFitText)) {
                    while (nRightPos - nLeftPos > 1) {
                        nMiddlePos = (nRightPos + nLeftPos) / 2 + 0.5 >> 0;
                        sFitText = sText.slice(0, nMiddlePos - 1);
                        sFitText += sEnd;
                        if(!this.checkContentFit(sFitText)) {
                            nRightPos = nMiddlePos;
                        }
                        else {
                            nLeftPos = nMiddlePos;
                        }
                    }
                    sFitText = sText.slice(0, nLeftPos);
                    sFitText += sEnd;
                    this.checkContentFit(sFitText);
                }
                else {
                    var bFound = false;
                    for(var i = sEnd.length - 1; i > -1; i--) {
                        sFitText = sEnd.slice(0, i);
                        if(this.checkContentFit(sFitText)) {
                            bFound = true;
                        }
                    }
                    if(!bFound) {
                        this.checkContentFit("");
                    }
                }
            }
        }
    };
    CButton.prototype.getBodyPr = function () {
        return this.bodyPr;
    };

    function CButtonsContainer(slicer) {
        this.slicer = slicer;
        this.buttons = [];
        this.extX = 0;
        this.extY = 0;
        this.contentW = 0;
        this.contentH = 0;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.scroll = new CScroll(this, false);
    }
    CButtonsContainer.prototype.clear = function() {
        this.buttons.length = 0;
    };
    CButtonsContainer.prototype.addButton = function (oButton) {
        this.buttons.push(oButton);
    }
    CButtonsContainer.prototype.recalculate = function() {
        var nWidth = this.slicer.extX;
        var nHeight = this.slicer.extY;
        if(this.slicer.header) {
            nHeight -= this.slicer.header.extY;
        }
        this.extX = Math.max(nWidth - LEFT_PADDING - RIGHT_PADDING, 0);
        this.extY = Math.max(nHeight - TOP_PADDING - BOTTOM_PADDING, 0);
        var nColumnCount = this.slicer.getColumnsCount();
        var nSpaceCount = nColumnCount - 1;
        var dButtonWidth = Math.max(0, this.extX - nSpaceCount * SPACE_BETWEEN);
        var dButtonHeight = this.slicer.getButtonHeight();
        var nColumn, nRow, nButtonIndex, oButton;
        for(nButtonIndex = 0; nButtonIndex < this.buttons.length; ++nButtonIndex) {
            nColumn = nButtonIndex % nColumnCount;
            nRow = nButtonIndex / nColumnCount >> 0;
            oButton = this.buttons[nButtonIndex];
            oButton.extX = dButtonWidth;
            oButton.extY = dButtonHeight;
            oButton.x = (dButtonWidth + SPACE_BETWEEN) * nColumn;
            oButton.y = (dButtonHeight + SPACE_BETWEEN) * nRow;
            AscFormat.CheckSpPrXfrm3(oButton);
            oButton.recalculate();
        }
    };

    var nScrollWidth = 10;
    function CScroll(parent, bHor) {
        this.parent = parent;
        this.bHor = bHor;
        this.extX = 0;
        this.extY = 0;

    }

    CScroll.prototype.update = function () {
        if(this.bHor) {
        }
    }
    window['AscFormat'] = window['AscFormat'] || {};
    window['AscFormat'].CSlicer = CSlicer;
})()

