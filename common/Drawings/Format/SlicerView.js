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

    function CTextBox(txBody, transformText) {
        this.txBody = txBody;
        this.transformText = transformText;
    }

    function CSlicer() {
        AscFormat.CShape.call(this);
        this.name = null;

        this.recalcInfo.recalculateHeader = true;
        this.recalcInfo.recalculateButtons = true;
        this.header = null;

        AscFormat.ExecuteNoHistory(function() {
            this.txStyles = new CStyles(false);
        }, this, []);

        this.buttonsContainer = new CButtonsContainer(this);
    }
    CSlicer.prototype = Object.create(AscFormat.CShape.prototype);
    CSlicer.prototype.constructor = CSlicer;
    CSlicer.prototype.setName = function(val) {
        this.name = val;
    };
    CSlicer.prototype.getFont = function(nType) {
        var oFont = new AscCommonExcel.Font();//TODO: Take font from slicerStyle when it will be implemented.
        return oFont;
    };
    CSlicer.prototype.getFill = function(nType) {
        var oFill;
        oFill = new AscCommonExcel.Fill();//TODO: Take background from styles when in will be implemented
        oFill.fromColor(new AscCommonExcel.RgbColor(0xFFFFFF));
        return oFill;
    };
    CSlicer.prototype.getBorder = function(nType) {
        var oBorder = new AscCommonExcel.Border(null);
        oBorder.l = new AscCommonExcel.BorderProp();
        oBorder.l.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.l.c = AscCommonExcel.createRgbColor(0, 0, 0);
        oBorder.t = new AscCommonExcel.BorderProp();
        oBorder.t.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.t.c = AscCommonExcel.createRgbColor(0, 0, 0);
        oBorder.r = new AscCommonExcel.BorderProp();
        oBorder.r.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.r.c = AscCommonExcel.createRgbColor(0, 0, 0);
        oBorder.b = new AscCommonExcel.BorderProp();
        oBorder.b.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.b.c = AscCommonExcel.createRgbColor(0, 0, 0);
        return oBorder;
    };
    CSlicer.prototype.recalculateBrush = function() {
        var oFill = this.getFill(STYLE_TYPE.WHOLE);
        var oParents = this.getParentObjects();
        this.brush = AscCommonExcel.convertFillToUnifill(oFill);
        this.brush.calculate(oParents.theme, oParents.slide, oParents.layout, oParents.master, {R:0, G:0, B:0, A: 255});
    };
    CSlicer.prototype.recalculatePen = function() {
        this.pen = null;
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
        var oView = this.worksheet.getSlicerByName(this.name);
        if(!oView || !oView.obj) {
            return null;
        }
        return oView.obj;
    };
    CSlicer.prototype.recalculate = function () {
        AscFormat.ExecuteNoHistory(function () {
            AscFormat.CShape.prototype.recalculate.call(this);
            if(this.recalcInfo.recalculateHeader) {
                this.recalculateHeader();
                this.recalcInfo.recalculateHeader = false;
            }
            if(this.recalcInfo.recalculateButtons) {
                this.recalculateButtons();
                this.recalcInfo.recalculateButtons = false;
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
        if(!oCache || !oCache.obj) {
            return;
        }
        var oCacheDef = oCache.obj;
        var oValues = oCacheDef.getFilterValues();
        if(!oValues) {
            return;
        }
        if(oValues.values.length === 0) {
            return;
        }
        for(var nValue = 0; nValue < oValues.values.length; ++nValue) {
            this.buttonsContainer.addButton(new CButton(this, oValues.values[nValue]));
        }
        this.buttonsContainer.recalculate();
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
        var nRet = 0.26 * 25.4;
        if(AscFormat.isRealNumber(oView.rowHeight)) {
            nRet = oView.rowHeight * g_dKoef_emu_to_mm;
        }
        return nRet;
    };
    CSlicer.prototype.getTxStyles = function (nType) {
        var oFont = this.getFont(nType);
        this.txStyles.Default.TextPr.InitDefault();
        this.txStyles.Default.TextPr.FillFromExcelFont(oFont);
        return {styles: this.txStyles, lastId: undefined};
    };
    CSlicer.prototype.draw = function (graphics, transform, transformText, pageIndex) {
        var r = graphics.updatedRect;
        if(r) {
            if(!this.bounds.isIntersect(r.x, r.y, r.x + r.w, r.y + r.h)) {
                return;
            }
        }
        AscFormat.CShape.prototype.draw.call(this, graphics, transform, transformText, pageIndex);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }

        var oBorder = this.getBorder(STYLE_TYPE.WHOLE);
        if(oBorder) {
            var oTransform = transform || this.transform;
            graphics.SaveGrState();
            graphics.transform3(oTransform);
            var oSide;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawVerLine(1, 0, 0, this.extY, 0);
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawHorLine(1, 0, 0, this.extX, 0);
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawVerLine(1, this.extX, 0, this.extY, 0);
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawHorLine(1, this.extY, 0, this.extX, 0);
            }
            graphics.drawVerLine()
            graphics.RestoreGrState();
        }
        if(this.header) {
            this.header.draw(graphics, transform, transformText, pageIndex);
        }
        this.buttonsContainer.draw(graphics, transform, transformText, pageIndex);
    }
    CSlicer.prototype.handleUpdateExtents = function () {
        this.recalcInfo.recalculateHeader = true;
        this.recalcInfo.recalculateButtons = true;
        AscFormat.CShape.prototype.handleUpdateExtents.call(this);
    };

    function CHeader(slicer) {
        AscFormat.CShape.call(this);
        this.slicer = slicer;
        this.txBody = null;
        this.buttons = [];
        this.setBDeleted(false);
    }
    CHeader.prototype = Object.create(AscFormat.CShape.prototype);
    CHeader.prototype.recalculate = function () {

    };
    CHeader.prototype.draw = function (graphics) {

    };

    function CButton(slicer, options) {
        AscFormat.CShape.call(this);
        this.slicer = slicer;
        this.options = options;
        this.state = STYLE_TYPE.UNSELECTED_DATA;
        this.worksheet = slicer.worksheet;
        this.setBDeleted(false);
        AscFormat.CheckSpPrXfrm3(this);
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
        AscFormat.CShape.prototype.recalculate.call(this);
        if(bRecalcContent) {

        }
    };
    CButton.prototype.recalculateBrush = function () {
        //Empty procedure. Set of brushes for all states will be recalculated in CSlicer
    };
    CButton.prototype.recalculatePen = function () {
        this.pen = null;
    };
    CButton.prototype.recalculateContent = function () {
        var sText = this.getString(), oMetrics, oContent, oFirstParagraph, sFitText;
        for(var key in STYLE_TYPE) {
            if(STYLE_TYPE.hasOwnProperty(key)) {
                this.txBody = this.textBoxes[STYLE_TYPE[key]].txBody;
                this.txBody.recalculateOneString(sText);
            }
        }
    };
    CButton.prototype.getBodyPr = function () {
        return this.bodyPr;
    };
    CButton.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CButton.prototype.draw = function (graphics, transform, transformText, pageIndex) {
        this.brush = AscCommonExcel.convertFillToUnifill(this.slicer.getFill(this.state));
        AscFormat.CShape.prototype.draw.call(this, graphics, transform, transformText, pageIndex);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }
        var oBorder = this.slicer.getBorder(this.state);
        if(oBorder) {
            var oTransform = transform || this.transform;
            graphics.SaveGrState();
            graphics.transform3(oTransform);
            var oSide;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawVerLine(0, 0, 0, this.extY, 0);
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawHorLine(0, 0, 0, this.extX, 0);
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawVerLine(2, this.extX, 0, this.extY, 0);
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                graphics.drawHorLine(2, this.extY, 0, this.extX, 0);
            }
            graphics.drawVerLine()
            graphics.RestoreGrState();
        }
    };

    function CButtonsContainer(slicer) {
        this.slicer = slicer;
        this.buttons = [];
        this.x = 0;
        this.y = 0;
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

        this.x = 0;
        this.y = TOP_PADDING;
        if(this.slicer.header) {
            nHeight -= this.slicer.header.extY;
            this.y += this.slicer.header.extY;
        }
        this.extX = Math.max(nWidth - LEFT_PADDING - RIGHT_PADDING, 0);
        this.extY = Math.max(nHeight - TOP_PADDING - BOTTOM_PADDING, 0);
        var nColumnCount = this.slicer.getColumnsCount();
        var nSpaceCount = nColumnCount - 1;
        var dButtonWidth = Math.max(0, this.extX - nSpaceCount * SPACE_BETWEEN) / nColumnCount;
        var dButtonHeight = this.slicer.getButtonHeight();
        var nColumn, nRow, nButtonIndex, oButton, x ,y;
        for(nButtonIndex = 0; nButtonIndex < this.buttons.length; ++nButtonIndex) {
            nColumn = nButtonIndex % nColumnCount;
            nRow = nButtonIndex / nColumnCount >> 0;
            oButton = this.buttons[nButtonIndex];
            x = LEFT_PADDING + (dButtonWidth + SPACE_BETWEEN) * nColumn;
            y = TOP_PADDING + (dButtonHeight + SPACE_BETWEEN) * nRow;
            oButton.setTransformParams(x, y, dButtonWidth, dButtonHeight, 0, false, false);
            oButton.recalculate();
        }
    };
    CButtonsContainer.prototype.draw = function (graphics, transform, transformText, pageIndex) {
        if(this.buttons.length > 0) {
            graphics.transform3(this.slicer.transform);
            graphics.SaveGrState();
            graphics.AddClipRect(this.x, 0, this.slicer.extX, this.extY);
            var oButton, oTransform, oTransformText;
            var oMT = AscCommon.global_MatrixTransformer;
            var oBaseTr = new AscCommon.CMatrix();
            oMT.TranslateAppend(oBaseTr, -this.scrollLeft, -this.scrollTop);
            oMT.MultiplyAppend(oBaseTr, this.slicer.transform);
            for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                oButton = this.buttons[nButton];
                oTransform = oMT.CreateDublicateM(oButton.transform);
                oMT.MultiplyAppend(oTransform, oBaseTr);
                oTransformText = oMT.CreateDublicateM(oButton.transformText);
                oMT.MultiplyAppend(oTransformText, oBaseTr);
                oButton.draw(graphics, oTransform, oTransformText);
            }
            this.scroll.draw(graphics);
            graphics.RestoreGrState();
        }
    };

    var nScrollWidth = 10;
    function CScroll(parent, bHor) {
        this.parent = parent;
        this.bHor = bHor;
        this.extX = 0;
        this.extY = 0;
        this.bVisible = false

    }
    CScroll.prototype.update = function () {
        if(this.bHor) {
        }
    }
    CScroll.prototype.draw = function(graphics) {
        if(!this.bVisible) {
            return;
        }
    }
    window['AscFormat'] = window['AscFormat'] || {};
    window['AscFormat'].CSlicer = CSlicer;
})()

