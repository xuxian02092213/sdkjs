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

    AscDFH.drawingsChangesMap[AscDFH.historyitem_SlicerViewName] = function(oClass, value){oClass.name = value;};
    AscDFH.changesFactory[AscDFH.historyitem_SlicerViewName] = window['AscDFH'].CChangesDrawingsString;

    var LEFT_PADDING = 3;
    var RIGHT_PADDING = 3;
    var BOTTOM_PADDING = 3;
    var TOP_PADDING = 2;
    var SPACE_BETWEEN = 1.5;
    var HEADER_BUTTON_WIDTH = RIGHT_PADDING * 175 / 73;
    var HEADER_TOP_PADDING = RIGHT_PADDING;
    var HEADER_BOTTOM_PADDING = HEADER_TOP_PADDING;
    var HEADER_LEFT_PADDING = LEFT_PADDING;
    var HEADER_RIGHT_PADDING = 2*RIGHT_PADDING + 2*HEADER_BUTTON_WIDTH;
    var SCROLL_WIDTH = 17 * 25.4 / 96;
    var SCROLLER_WIDTH = 13 * 25.4 / 96;

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

    var INVERT_HOVER_STATE = {};
    INVERT_HOVER_STATE[STYLE_TYPE.SELECTED_DATA] = STYLE_TYPE.HOVERED_SELECTED_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.SELECTED_NO_DATA] = STYLE_TYPE.HOVERED_SELECTED_NO_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.UNSELECTED_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.UNSELECTED_NO_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.HOVERED_SELECTED_DATA] = STYLE_TYPE.SELECTED_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = STYLE_TYPE.SELECTED_NO_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = STYLE_TYPE.UNSELECTED_DATA;
    INVERT_HOVER_STATE[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = STYLE_TYPE.UNSELECTED_NO_DATA;

    var HOVERED_STATES = {};
    HOVERED_STATES[STYLE_TYPE.HOVERED_SELECTED_DATA] = true;
    HOVERED_STATES[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = true;
    HOVERED_STATES[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = true;
    HOVERED_STATES[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = true;

    var SELECTED_STATES = {};
    SELECTED_STATES[STYLE_TYPE.SELECTED_DATA] = true;
    SELECTED_STATES[STYLE_TYPE.SELECTED_NO_DATA] = true;
    SELECTED_STATES[STYLE_TYPE.HOVERED_SELECTED_DATA] = true;
    SELECTED_STATES[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = true;

    var RESET_SELECTED_STATES = {};
    RESET_SELECTED_STATES[STYLE_TYPE.SELECTED_DATA] = STYLE_TYPE.UNSELECTED_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.SELECTED_NO_DATA] = STYLE_TYPE.UNSELECTED_NO_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.HOVERED_SELECTED_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.UNSELECTED_DATA] = STYLE_TYPE.UNSELECTED_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.UNSELECTED_NO_DATA] = STYLE_TYPE.UNSELECTED_NO_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA;
    RESET_SELECTED_STATES[STYLE_TYPE.HEADER] = STYLE_TYPE.HEADER;
    RESET_SELECTED_STATES[STYLE_TYPE.WHOLE] = STYLE_TYPE.WHOLE;

    var SET_SELECTED_STATES = {};
    SET_SELECTED_STATES[STYLE_TYPE.SELECTED_DATA] = STYLE_TYPE.SELECTED_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.SELECTED_NO_DATA] = STYLE_TYPE.SELECTED_NO_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.HOVERED_SELECTED_DATA] = STYLE_TYPE.HOVERED_SELECTED_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = STYLE_TYPE.HOVERED_SELECTED_NO_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.UNSELECTED_DATA] = STYLE_TYPE.SELECTED_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.UNSELECTED_NO_DATA] = STYLE_TYPE.SELECTED_NO_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = STYLE_TYPE.HOVERED_SELECTED_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = STYLE_TYPE.HOVERED_SELECTED_NO_DATA;
    SET_SELECTED_STATES[STYLE_TYPE.HEADER] = STYLE_TYPE.HEADER;
    SET_SELECTED_STATES[STYLE_TYPE.WHOLE] = STYLE_TYPE.WHOLE;

    var SET_HOVER_STATES = {};
    SET_HOVER_STATES[STYLE_TYPE.SELECTED_DATA] = STYLE_TYPE.HOVERED_SELECTED_DATA;
    SET_HOVER_STATES[STYLE_TYPE.SELECTED_NO_DATA] = STYLE_TYPE.HOVERED_SELECTED_NO_DATA;
    SET_HOVER_STATES[STYLE_TYPE.HOVERED_SELECTED_DATA] = STYLE_TYPE.HOVERED_SELECTED_DATA;
    SET_HOVER_STATES[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = STYLE_TYPE.HOVERED_SELECTED_NO_DATA;
    SET_HOVER_STATES[STYLE_TYPE.UNSELECTED_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_DATA;
    SET_HOVER_STATES[STYLE_TYPE.UNSELECTED_NO_DATA] = STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA;
    SET_HOVER_STATES[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = STYLE_TYPE.HOVERED_SELECTED_DATA;
    SET_HOVER_STATES[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = STYLE_TYPE.HOVERED_SELECTED_NO_DATA;
    SET_HOVER_STATES[STYLE_TYPE.HEADER] = STYLE_TYPE.HEADER;
    SET_HOVER_STATES[STYLE_TYPE.WHOLE] = STYLE_TYPE.WHOLE;

    var SCROLL_COLORS = {};
    SCROLL_COLORS[STYLE_TYPE.WHOLE] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.HEADER] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.SELECTED_DATA] = 0xADADAD;
    SCROLL_COLORS[STYLE_TYPE.SELECTED_NO_DATA] = 0xADADAD;
    SCROLL_COLORS[STYLE_TYPE.UNSELECTED_DATA] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.UNSELECTED_NO_DATA] = 0xF1F1F1;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_SELECTED_DATA] = 0xCFCFCF;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_SELECTED_NO_DATA] = 0xCFCFCF;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_DATA] = 0xCFCFCF;
    SCROLL_COLORS[STYLE_TYPE.HOVERED_UNSELECTED_NO_DATA] = 0xCFCFCF;

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

        this.buttonsContainer = null;

        this.eventListener = null;
    }
    CSlicer.prototype = Object.create(AscFormat.CShape.prototype);
    CSlicer.prototype.constructor = CSlicer;
    CSlicer.prototype.getObjectType = function () {
        return AscDFH.historyitem_type_SlicerView;
    };
    CSlicer.prototype.toStream = function (s) {
        s.WriteUChar(AscCommon.g_nodeAttributeStart);
        s._WriteString2(0, this.name);
        s.WriteUChar(AscCommon.g_nodeAttributeEnd);
    };
    CSlicer.prototype.fromStream = function (s) {
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
                default:
                    s.Seek2(_end_pos);
                    return;
            }
        }
        s.Seek2(_end_pos);
    };
    CSlicer.prototype.setName = function(val) {
        History.Add(new AscDFH.CChangesDrawingsString(this, AscDFH.historyitem_SlicerViewName, this.name, val));
        this.name = val;
    };
    CSlicer.prototype.getFont = function(nType) {
        var oFont = new AscCommonExcel.Font();//TODO: Take font from slicerStyle when it will be implemented.
        oFont.setSize(11);
        if(nType === STYLE_TYPE.HEADER) {
            oFont.setBold(true);
        }
        return oFont;
    };
    CSlicer.prototype.getFill = function(nType) {
        var oFill;
        oFill = new AscCommonExcel.Fill();//TODO: Take background from styles when in will be implemented
        var nColor = 0xFFFFFF;
        if(!HOVERED_STATES[nType]) {
            if(SELECTED_STATES[nType]) {
                oFill.fromColor(new AscCommonExcel.RgbColor(0xBDD7EE));
            }
            else {
                oFill.fromColor(new AscCommonExcel.RgbColor(nColor));
            }
        }
        else {
            var oGF = new AscCommonExcel.GradientFill();
            var oGS = new AscCommonExcel.GradientStop();
            oGS.position = 0;
            oGS.color = AscCommonExcel.createRgbColor(248, 225, 98);
            oGF.stop.push(oGS);
            oGS = new AscCommonExcel.GradientStop();
            oGS.color = AscCommonExcel.createRgbColor(252, 247, 224);
            oGS.position = 1;
            oGF.stop.push(oGS);
            oGF.degree = 90;
            oFill.gradientFill = oGF;
        }
        return oFill;
    };
    CSlicer.prototype.getBorder = function(nType) {
        var r = 91, g = 155, b = 213;
        if(nType !== STYLE_TYPE.HEADER && nType !== STYLE_TYPE.WHOLE) {
            r = 204;
            g = 204;
            b = 204;
        }
        var oBorder = new AscCommonExcel.Border(null);
        if(nType !== STYLE_TYPE.HEADER) {
            oBorder.l = new AscCommonExcel.BorderProp();
            oBorder.l.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.l.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.t = new AscCommonExcel.BorderProp();
            oBorder.t.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.t.c = AscCommonExcel.createRgbColor(r, g, b);
            oBorder.r = new AscCommonExcel.BorderProp();
            oBorder.r.setStyle(AscCommon.c_oAscBorderStyles.Thin);
            oBorder.r.c = AscCommonExcel.createRgbColor(r, g, b);
        }
        oBorder.b = new AscCommonExcel.BorderProp();
        oBorder.b.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.b.c = AscCommonExcel.createRgbColor(r, g, b);
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
        if(false === oView.showCaption || !(typeof oView.caption === "string" && oView.caption.length > 1)) {
            return;
        }
        this.header = new CHeader(this, oView.caption);
        this.header.recalculate();
    };
    CSlicer.prototype.recalculateButtons = function() {
        if(!this.buttonsContainer) {
            this.buttonsContainer = new CButtonsContainer(this);
        }
        this.buttonsContainer.clear();
        var oView = this.getSlicerView();
        if(!oView) {
            return;
        }
        var oCache = this.worksheet.workbook.getSlicerCacheBySourceName(this.name);
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
        for(var nValue = 0; nValue < oValues.values.length; ++nValue) {
            this.buttonsContainer.addButton(new CButton(this.buttonsContainer, oValues.values[nValue]));
        }
        var nWidth = this.extX;
        var nHeight = this.extY;
        this.buttonsContainer.x = LEFT_PADDING;
        this.buttonsContainer.y = TOP_PADDING;
        if(this.header) {
            nHeight -= this.header.extY;
            this.buttonsContainer.y += this.header.extY;
        }
        this.buttonsContainer.extX = Math.max(nWidth - LEFT_PADDING - RIGHT_PADDING, 0);
        this.buttonsContainer.extY = Math.max(nHeight - TOP_PADDING - BOTTOM_PADDING, 0);
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
    CSlicer.prototype.getCaption = function() {
        var oView = this.getSlicerView();
        if(!oView) {
            return "";
        }
        var nRet = "";
        if(typeof oView.caption === "string") {
            nRet = oView.caption;
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
        this.txStyles.Default.TextPr.FillFromExcelFont(oFont);
        this.txStyles.Default.ParaPr.SetSpacing(1, undefined, 0, 0, undefined, undefined);
        return {styles: this.txStyles, lastId: undefined};
    };
    CSlicer.prototype.isMultiSelect = function() {
        if(this.header) {
            return this.header.isMultiSelect();
        }
        return false;
    };
    CSlicer.prototype.internalDraw = function(graphics, transform, transformText, pageIndex) {
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
                if(oSide.c) {
                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawVerLine(1, 0, 0, this.extY, 0);
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawHorLine(1, 0, 0, this.extX, 0);
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawVerLine(1, this.extX, 0, this.extY, 0);
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(1, this.extY, 0, this.extX, 0);
            }
            graphics.RestoreGrState();
        }
        if(this.header) {
            this.header.draw(graphics, transform, transformText, pageIndex);
        }
        if(this.buttonsContainer) {
            this.buttonsContainer.draw(graphics, transform, transformText, pageIndex);
        }
    };
    CSlicer.prototype.draw = function (graphics, transform, transformText, pageIndex) {
        AscFormat.ExecuteNoHistory(this.internalDraw, this, [graphics, transform, transformText, pageIndex]);

    };
    CSlicer.prototype.handleUpdateExtents = function () {
        this.recalcInfo.recalculateHeader = true;
        this.recalcInfo.recalculateButtons = true;
        AscFormat.CShape.prototype.handleUpdateExtents.call(this);
    };
    CSlicer.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CSlicer.prototype.setEventListener = function (child) {
        this.eventListener = child;
    };
    CSlicer.prototype.onUpdate = function () {
        if(this.drawingBase) {
            this.drawingBase.onUpdate();
        }
    };
    CSlicer.prototype.onMouseMove = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            if(!e.IsLocked) {
                return this.onMouseUp(e, x, y);
            }
            bRet =  this.eventListener.onMouseMove(e, x, y);

            if(bRet) {
                this.onUpdate();
            }
            return true;
        }
        if(this.header) {
            bRet = bRet || this.header.onMouseMove(e, x, y);
        }
        if(this.buttonsContainer) {
            bRet = bRet || this.buttonsContainer.onMouseMove(e, x, y);
        }
        if(bRet) {
            this.onUpdate();
        }
        if(this.hitInInnerArea(x, y)) {
            bRet = true;
        }
        return bRet;
    };
    CSlicer.prototype.onMouseDown = function (e, x, y) {
        var bRet = false, bRes;
        e.IsLocked = true;
        if(this.eventListener) {
            this.eventListener.onMouseUp(e, x, y);
        }
        if(this.header) {
            bRes = this.header.onMouseDown(e, x, y);
            bRet = bRet || bRes;
        }
        if(this.buttonsContainer) {
            bRes = this.buttonsContainer.onMouseDown(e, x, y);
            bRet = bRet || bRes;
        }
        if(bRet) {
            this.onUpdate();
        }
        return bRet;
    };
    CSlicer.prototype.onMouseUp = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            bRet = this.eventListener.onMouseUp(e, x, y);
            this.setEventListener(null);
            this.onUpdate();
            return bRet;
        }
        if(bRet) {
            this.onUpdate();
        }
        return bRet;
    };

    function CHeader(slicer) {
        AscFormat.CShape.call(this);
        this.slicer = slicer;
        this.worksheet = slicer.worksheet;
        this.txBody = null;
        this.buttons = [];
        this.buttons.push(new CInterfaceButton(this));
        this.buttons.push(new CInterfaceButton(this));
        this.setBDeleted(false);
        this.setTransformParams(0, 0, 0, 0, 0, false, false);
        this.createTextBody();
        this.bodyPr = new AscFormat.CBodyPr();
        this.bodyPr.setDefault();
        this.bodyPr.anchor = 1;//vertical align ctr
        this.bodyPr.lIns = HEADER_LEFT_PADDING;
        this.bodyPr.rIns = HEADER_RIGHT_PADDING;
        this.bodyPr.tIns = HEADER_TOP_PADDING;
        this.bodyPr.bIns = HEADER_BOTTOM_PADDING;
        this.bodyPr.horzOverflow = AscFormat.nOTClip;
        this.bodyPr.vertOverflow = AscFormat.nOTClip;
        this.eventListener = null;
    }
    CHeader.prototype = Object.create(AscFormat.CShape.prototype);
    CHeader.prototype.getString = function() {
        return this.slicer.getCaption();
    };
    CHeader.prototype.Get_Styles = function() {
        return this.slicer.getTxStyles(STYLE_TYPE.HEADER);
    };
    CHeader.prototype.isMultiSelect = function() {
        return this.buttons[0].isSelected();
    };
    CHeader.prototype.recalculateBrush = function () {
        //Empty procedure. Set of brushes for all states will be recalculated in CSlicer
    };
    CHeader.prototype.recalculatePen = function () {
        this.pen = null;
    };
    CHeader.prototype.recalculateContent = function () {
        if(this.bRecalcContent) {
            return;
        }
        this.setTransformParams(0, 0, this.slicer.extX, HEADER_BUTTON_WIDTH, 0, false, false);
        this.recalculateGeometry();
        this.recalculateTransform();
        this.txBody.recalculateOneString(this.getString());
        var dHeight = this.contentHeight + HEADER_TOP_PADDING + HEADER_BOTTOM_PADDING;
        dHeight = Math.max(dHeight, HEADER_BUTTON_WIDTH + 1);
        this.setTransformParams(0, 0, this.slicer.extX, dHeight, 0, false, false);
        this.recalcInfo.recalculateContent = false;
        this.bRecalcContent = true;
        this.recalculate();
        this.recalculateButtons();
        this.bRecalcContent = false;
    };
    CHeader.prototype.getBodyPr = function () {
        return this.bodyPr;
    };
    CHeader.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CHeader.prototype.recalculateButtons = function() {
        var oButton = this.buttons[1];
        var x, y;
        x = this.extX - RIGHT_PADDING - HEADER_BUTTON_WIDTH;
        y = this.extY / 2 - HEADER_BUTTON_WIDTH / 2;
        oButton.setTransformParams(x, y, HEADER_BUTTON_WIDTH, HEADER_BUTTON_WIDTH, 0, false, false);
        oButton.recalculate();
        oButton = this.buttons[0];
        x = this.extX - 2*RIGHT_PADDING - 2*HEADER_BUTTON_WIDTH;
        oButton.setTransformParams(x, y, HEADER_BUTTON_WIDTH, HEADER_BUTTON_WIDTH, 0, false, false);
        oButton.recalculate();
    };
    CHeader.prototype.draw = function (graphics) {
        var oMT = AscCommon.global_MatrixTransformer;
        var oTransform = this.transform.CreateDublicate();
        oMT.MultiplyAppend(oTransform, this.slicer.transform);
        var oTransformText = this.transformText.CreateDublicate();
        oMT.MultiplyAppend(oTransformText, this.slicer.transform);
        AscFormat.CShape.prototype.draw.call(this, graphics, oTransform, oTransformText);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }
        this.buttons[0].draw(graphics);
        this.buttons[1].draw(graphics);
        var oBorder = this.slicer.getBorder(STYLE_TYPE.HEADER);
        if(oBorder) {
            graphics.SaveGrState();
            graphics.transform3(oTransform);
            var oSide, bDrawn = false;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawVerLine(1, 0, 0, this.extY, 0);
                bDrawn = true;
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(1, 0, 0, this.extX, 0);
                bDrawn = true;
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                      graphics.p_color(0, 0, 0, 255);
                }
                graphics.drawVerLine(1, this.extX, 0, this.extY, 0);
                bDrawn = true;
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                if(bDrawn) {
                    graphics.drawHorLine(1, this.extY, 0, this.extX, 0);
                }
                else {
                    graphics.drawHorLine(1, this.extY, LEFT_PADDING, this.slicer.extX - RIGHT_PADDING, 0);
                }
            }
            graphics.drawVerLine();
            graphics.RestoreGrState();
        }
    };
    CHeader.prototype.getTxStyles = function (nType) {
        return this.slicer.getTxStyles(nType);
    };
    CHeader.prototype.getBorder = function (nType) {
        return this.slicer.getBorder(nType);
    };
    CHeader.prototype.getFill = function (nType) {
        return this.slicer.getFill(nType);
    };
    CHeader.prototype.getFullTransformMatrix = function () {
        var oMT = AscCommon.global_MatrixTransformer;
        var oTransform = oMT.CreateDublicateM(this.transform);
        oMT.MultiplyAppend(oTransform, this.slicer.transform);
        return oTransform;
    };
    CHeader.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CHeader.prototype.onMouseMove = function (e, x, y) {
        if(this.eventListener) {
            return this.eventListener.onMouseMove(e, x, y);
        }
        var bRet = false;
        bRet = bRet || this.buttons[0].onMouseMove(e, x, y);
        bRet = bRet || this.buttons[1].onMouseMove(e, x, y);
        return bRet;
    };
    CHeader.prototype.onMouseDown = function (e, x, y) {
        if(this.eventListener) {
            return this.eventListener.onMouseDown(e, x, y);
        }
        var bRet = false;
        bRet = bRet || this.buttons[0].onMouseDown(e, x, y);
        bRet = bRet || this.buttons[1].onMouseDown(e, x, y);
        return bRet;
    };
    CHeader.prototype.onMouseUp = function (e, x, y) {
        if(this.eventListener) {
            return this.eventListener.onMouseUp(e, x, y);
        }
        var bRet = false;
        bRet = bRet || this.buttons[0].onMouseUp(e, x, y);
        bRet = bRet || this.buttons[1].onMouseUp(e, x, y);
        this.setEventListener(null);
        return bRet;
    };
    CHeader.prototype.getButtons = function (e, x, y) {
        return this.buttons;
    };
    CHeader.prototype.getButtonIndex = function (oButton) {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            if(this.buttons[nButton] === oButton) {
                return nButton;
            }
        }
        return -1;
    };
    CHeader.prototype.setEventListener = function (child) {
        this.eventListener = child;
        if(child) {
            this.slicer.setEventListener(this);
        }
        else {
            if(this.slicer.isEventListener(this)) {
                this.slicer.setEventListener(null);
            }
        }
    };

    function CButton(parent, options) {
        AscFormat.CShape.call(this);
        this.parent = parent;
        this.options = options;
        this.state = STYLE_TYPE.UNSELECTED_DATA;
        this.tmpState = null;
        this.worksheet = parent.worksheet;
        this.setBDeleted(false);
        AscFormat.CheckSpPrXfrm3(this);
        this.textBoxes = {};
        if(options) {
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
        return this.parent.getTxStyles(this.getTxBodyType());
    };
    CButton.prototype.getBodyPr = function () {
        return this.bodyPr;
    };
    CButton.prototype.getFullTransform = function() {
        var oMT = AscCommon.global_MatrixTransformer;
        var oTransform = oMT.CreateDublicateM(this.transform);
        var oParentTransform = this.parent.getFullTransformMatrix();
        oParentTransform && oMT.MultiplyAppend(oTransform, oParentTransform);
        return oTransform;
    };
    CButton.prototype.getFullTextTransform = function() {
        var oMT = AscCommon.global_MatrixTransformer;
        var oParentTransform = this.parent.getFullTransformMatrix();
        var oTransformText = oMT.CreateDublicateM(this.transformText);
        oParentTransform && oMT.MultiplyAppend(oTransformText, oParentTransform);
        return oTransformText;
    };
    CButton.prototype.getInvFullTransformMatrix = function() {
        return this.parent.getInvFullTransformMatrix();
    };
    CButton.prototype.getState = function() {
        if(this.tmpState !== null) {
            return this.tmpState;
        }
        return this.state;
    };
    CButton.prototype.setUnselectTmpState = function() {
        this.tmpState = RESET_SELECTED_STATES[this.state];
    };
    CButton.prototype.setSelectTmpState = function() {
        this.tmpState = SET_SELECTED_STATES[this.state];
    };
    CButton.prototype.setHoverTmpState = function() {
        this.tmpState = SET_HOVER_STATES[this.state];
    };
    CButton.prototype.removeTmpState = function() {
        this.tmpState = null;
    };
    CButton.prototype.isSelected = function() {
        return true === SELECTED_STATES[this.getState()];
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
        var sText = this.getString();
        for(var key in this.textBoxes) {
            if(this.textBoxes.hasOwnProperty(key)) {
                this.txBody = this.textBoxes[key].txBody;
                this.txBody.recalculateOneString(sText);
            }
        }
    };
    CButton.prototype.recalculateGeometry = function() {
        this.calcGeometry = AscFormat.CreateGeometry("rect");
        this.calcGeometry.Recalculate(this.extX, this.extY);
    };
    CButton.prototype.recalculateTransform = function() {
        AscFormat.CShape.prototype.recalculateTransform.call(this);
        var oMT = AscCommon.global_MatrixTransformer;
        var oParentTransform = this.parent.getFullTransformMatrix();
        oParentTransform && oMT.MultiplyAppend(this.transform, oParentTransform);
        this.invertTransform = oMT.Invert(this.transform);
    };
    CButton.prototype.recalculateTransformText = function() {
        AscFormat.CShape.prototype.recalculateTransformText.call(this);
        var oMT = AscCommon.global_MatrixTransformer;
        var oParentTransform = this.parent.getFullTransformMatrix();
        oParentTransform && oMT.MultiplyAppend(this.transformText, oParentTransform);
        this.invertTransformText = oMT.Invert(this.transformText);
    };
    CButton.prototype.draw = function (graphics) {
        this.brush = AscCommonExcel.convertFillToUnifill(this.parent.getFill(this.getState()));
        AscFormat.CShape.prototype.draw.call(this, graphics);
        if(graphics.IsSlideBoundsCheckerType) {
            return;
        }
        var oBorder = this.parent.getBorder(this.getState());
        if(oBorder) {
            graphics.SaveGrState();
            graphics.transform3(this.transform);
            var oSide;
            oSide = oBorder.l;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawVerLine(0, 0, 0, this.extY, 0);
            }
            oSide = oBorder.t;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(0, 0, 0, this.extX, 0);
            }
            oSide = oBorder.r;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawVerLine(2, this.extX, 0, this.extY, 0);
            }
            oSide = oBorder.b;
            if(oSide && oSide.s !== AscCommon.c_oAscBorderStyles.None) {
                if(oSide.c) {

                    graphics.p_color(oSide.c.getR(), oSide.c.getG(), oSide.c.getB(), 255);
                }
                else {
                    graphics.p_color(0, 0, 0);
                }
                graphics.drawHorLine(2, this.extY, 0, this.extX, 0);
            }
            graphics.drawVerLine();
            graphics.RestoreGrState();
        }
    };
    CButton.prototype.hit = function(x, y) {
        return this.hitInInnerArea(x, y);
    };
    CButton.prototype.onMouseMove = function (e, x, y) {
        if(e.IsLocked) {
            return false;
        }
        var bHit = this.hit(x, y), bRet = false;
        var nState = this.getState();
        if(bHit && !HOVERED_STATES[nState] || !bHit && HOVERED_STATES[nState]) {
            this.state = INVERT_HOVER_STATE[nState];
            bRet = true;
        }
        return bRet;
    };
    CButton.prototype.onMouseDown = function (e, x, y) {
        if(this.hit(x, y)) {
            this.parent.setEventListener(this);
            return true;
        }
        return false;
    };
    CButton.prototype.onMouseUp = function (e, x, y) {
        this.parent.setEventListener(null);
        return false;
    };

    function CInterfaceButton(parent) {
        CButton.call(this, parent, null);
    }
    CInterfaceButton.prototype = Object.create(CButton.prototype);

    function CButtonsContainer(slicer) {
        this.slicer = slicer;
        this.worksheet = slicer.worksheet;
        this.buttons = [];
        this.x = 0;
        this.y = 0;
        this.extX = 0;
        this.extY = 0;
        this.contentW = 0;
        this.contentH = 0;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.scroll = new CScroll(this);

        this.eventListener = null;
        this.startX = 0;
        this.startY = 0;
        this.startButton = -1;
    }
    CButtonsContainer.prototype.clear = function() {
        this.buttons.length = 0;
    };
    CButtonsContainer.prototype.addButton = function (oButton) {
        this.buttons.push(oButton);
    };
    CButtonsContainer.prototype.getButtonIndex = function (oButton) {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            if(this.buttons[nButton] === oButton) {
                return nButton;
            }
        }
        return -1;
    };
    CButtonsContainer.prototype.getButton = function (nIndex) {
        if(nIndex > -1 && nIndex < this.buttons.length) {
            return this.buttons[nIndex];
        }
        return null;
    };
    CButtonsContainer.prototype.findButtonIndex = function (x, y) {
        var oInv = this.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        var nRow, nRowsCount = this.getRowsCount();
        for(nRow = 0;nRow < nRowsCount; ++nRow) {
            if(ty < this.getRowStart(nRow)) {
                break;
            }
        }
        --nRow;
        if(nRow === -1) {
            return -1
        }
        var nCol, nColsCount = this.getColumnsCount();
        for(nCol = 0; nCol < nColsCount; ++nCol) {
            if(tx < this.getColumnStart(nCol)) {
                break;
            }
        }
        --nCol;
        if(nCol === -1) {
            --nRow;
            if(nRow === -1) {
                return - 1;
            }
            nCol = nColsCount - 1
        }
        var nIndex = nRow * nColsCount;
        if(nRow < nRowsCount - 1) {
            nIndex += nCol;
        }
        else {
            nIndex += Math.min(nCol, this.buttons.length - (nRowsCount - 1)*nColsCount);
        }
        return nIndex;

    };
    CButtonsContainer.prototype.getTxStyles = function (nType) {
        return this.slicer.getTxStyles(nType);
    };
    CButtonsContainer.prototype.getBorder = function (nType) {
        return this.slicer.getBorder(nType);
    };
    CButtonsContainer.prototype.getFill = function (nType) {
        return this.slicer.getFill(nType);
    };
    CButtonsContainer.prototype.getButtonHeight = function () {
        return this.slicer.getButtonHeight();
    };
    CButtonsContainer.prototype.getButtonWidth = function () {
        var nColumnCount = this.getColumnsCount();
        var nSpaceCount = nColumnCount - 1;
        var dTotalHeight = this.getTotalHeight();
        var dButtonWidth;
        if(dTotalHeight <= this.extY) {
            dButtonWidth = Math.max(0, this.extX - nSpaceCount * SPACE_BETWEEN) / nColumnCount;
        }
        else {
            dButtonWidth = Math.max(0, this.extX - this.scroll.getWidth() - SPACE_BETWEEN - nSpaceCount * SPACE_BETWEEN) / nColumnCount;
        }
        return dButtonWidth;
    };
    CButtonsContainer.prototype.getColumnsCount = function () {
        return this.slicer.getColumnsCount();
    };
    CButtonsContainer.prototype.getRowsCount = function () {
        return ((this.buttons.length - 1) / this.getColumnsCount() >> 0) + 1;
    };
    CButtonsContainer.prototype.getRowsInFrame = function () {
        return (this.extY + SPACE_BETWEEN) / (this.getButtonHeight() + SPACE_BETWEEN)  >> 0
    };
    CButtonsContainer.prototype.getTotalHeight = function () {
        var nRowsCount = this.getRowsCount();
        return  this.getButtonHeight() * nRowsCount + SPACE_BETWEEN * (nRowsCount - 1);
    };
    CButtonsContainer.prototype.getColumnStart = function (nColumn) {
        return this.x + (this.getButtonWidth() + SPACE_BETWEEN) * nColumn;
    };
    CButtonsContainer.prototype.getRowStart = function (nRow) {
        return this.y + (this.getButtonHeight() + SPACE_BETWEEN) * nRow;
    };
    CButtonsContainer.prototype.recalculate = function() {
        var nColumnCount = this.getColumnsCount();
        var dButtonWidth, dButtonHeight;
        dButtonHeight = this.getButtonHeight();
        dButtonWidth = this.getButtonWidth();
        var nColumn, nRow, nButtonIndex, oButton, x ,y;
        for(nButtonIndex = 0; nButtonIndex < this.buttons.length; ++nButtonIndex) {
            nColumn = nButtonIndex % nColumnCount;
            nRow = nButtonIndex / nColumnCount >> 0;
            oButton = this.buttons[nButtonIndex];
            x = this.getColumnStart(nColumn);
            y = this.getRowStart(nRow);
            oButton.setTransformParams(x, y, dButtonWidth, dButtonHeight, 0, false, false);
            oButton.recalculate();
        }
        this.scroll.bVisible = this.getTotalHeight() > this.extY;
    };
    CButtonsContainer.prototype.draw = function (graphics) {
        if(this.buttons.length > 0) {
            graphics.SaveGrState();
            graphics.transform3(this.slicer.transform);
            graphics.AddClipRect(0, this.y - SPACE_BETWEEN, this.slicer.extX, this.extY + SPACE_BETWEEN);
            var oButton;
            var oMT = AscCommon.global_MatrixTransformer;
            var oBaseTr = new AscCommon.CMatrix();
            oMT.TranslateAppend(oBaseTr, -this.scrollLeft, -this.scrollTop);
            oMT.MultiplyAppend(oBaseTr, this.slicer.transform);
            for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                oButton = this.buttons[nButton];
                oButton.draw(graphics, oBaseTr);
            }
            graphics.RestoreGrState();
            this.scroll.draw(graphics);
        }
    };
    CButtonsContainer.prototype.getFullTransformMatrix = function () {
        var oMT = AscCommon.global_MatrixTransformer;
        return oMT.CreateDublicateM(this.slicer.transform);
    };
    CButtonsContainer.prototype.getInvFullTransformMatrix = function () {
        var oM = this.getFullTransformMatrix();
        return AscCommon.global_MatrixTransformer.Invert(oM);
    };
    CButtonsContainer.prototype.hit = function (x, y) {
        var oInv = this.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        return tx >= this.x && ty >= this.y &&
            tx <= this.x + this.extX && ty <= this.y + this.extY;
    };
    CButtonsContainer.prototype.isEventListener = function (child) {
        return this.eventListener === child;
    };
    CButtonsContainer.prototype.onMouseMove = function (e, x, y) {
        if(this.eventListener) {
            return this.eventListener.onMouseMove(e, x, y);
        }
        var bRet = false;
        if(e.IsLocked) {
            if(this.slicer.isEventListener(this)) {
                bRet = true;
                if(this.startButton > -1) {
                    var oButton = this.getButton(this.startButton), nButton;
                    if(oButton) {
                        if(!this.slicer.isMultiSelect()) {
                            for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                                this.buttons[nButton].setUnselectTmpState();
                            }
                            oButton.setHoverTmpState();
                            var nFindButton = this.findButtonIndex(x, y);
                            if(nFindButton < this.startButton) {
                                for(nButton = Math.max(0, nFindButton); nButton < this.startButton; ++nButton) {
                                    this.buttons[nButton].setSelectTmpState();
                                }
                            }
                            else {
                                var nLast = Math.min(nFindButton, this.buttons.length - 1);
                                for(nButton = this.startButton + 1; nButton <= nLast; ++nButton) {
                                    this.buttons[nButton].setSelectTmpState();
                                }
                            }
                        }
                    }
                }
            }
            else {
                bRet = false;
            }
        }
        else {
            if(this.slicer.isEventListener(this)) {
                bRet = this.slicer.onMouseUp(e, x, y);
            }
            else {
                for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                    bRet = bRet || this.buttons[nButton].onMouseMove(e, x, y);
                }
                bRet = bRet || this.scroll.onMouseMove(e, x, y);
            }
        }
        return bRet;
    };
    CButtonsContainer.prototype.onMouseDown = function (e, x, y) {
        if(this.eventListener) {
            this.onMouseUp(e, x, y);
            if(!this.eventListener) {
                return this.onMouseDown(e, x, y);
            }
        }
        if(this.scroll.onMouseDown(e, x, y)) {
            return true;
        }
        if(this.hit(x, y)) {
            this.slicer.setEventListener(this);
            var oInv = this.getInvFullTransformMatrix();
            this.startX = oInv.TransformPointX(x, y);
            this.startY = oInv.TransformPointY(x, y);
            this.startButton = -1;
            for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                if(this.buttons[nButton].hit(x, y)) {
                    this.startButton = nButton;
                    break;
                }
            }
            this.onMouseMove(e, x, y);
            return true;
        }
        return false;
    };
    CButtonsContainer.prototype.onMouseUp = function (e, x, y) {
        var bRet = false;
        if(this.eventListener) {
            bRet = this.eventListener.onMouseUp(e, x, y);
            this.setEventListener(null);
            return bRet;
        }
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            bRet = bRet || this.buttons[nButton].onMouseUp(e, x, y);
        }
        bRet = bRet || this.scroll.onMouseUp(e, x, y);
        this.setEventListener(null);
        return bRet;
    };
    CButtonsContainer.prototype.getButtons = function () {
        return this.buttons;
    };
    CButtonsContainer.prototype.setEventListener = function (child) {
        this.eventListener = child;
        if(child) {
            this.slicer.setEventListener(this);
        }
        else {
            if(this.slicer.isEventListener(this)) {
                this.slicer.setEventListener(null);
                for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
                    this.buttons[nButton].removeTmpState();
                }
            }
        }
    };

    function CScroll(parent) {
        this.parent = parent;
        this.extX = 0;
        this.extY = 0;
        this.bVisible = false;
        this.buttons = [];
        this.buttons[0] = new CInterfaceButton(this);
        this.buttons[1] = new CInterfaceButton(this);
        this.state = STYLE_TYPE.UNSELECTED_DATA;
    }
    CScroll.prototype.getTxStyles = function () {
        return this.parent.getTxStyles();
    };
    CScroll.prototype.getFullTransformMatrix = function () {
        return this.parent.getFullTransformMatrix();
    };
    CScroll.prototype.getInvFullTransformMatrix = function () {
        return this.parent.getInvFullTransformMatrix();
    };
    CScroll.prototype.getFill = function (nType) {
        var oFill = new AscCommonExcel.Fill();
        oFill.fromColor(new AscCommonExcel.RgbColor(SCROLL_COLORS[nType]));
        return oFill;
    };
    CScroll.prototype.getBorder = function(nType) {
        var r, g, b;
        r = 0xCE;
        g = 0xCE;
        b = 0xCE;
        var oBorder = new AscCommonExcel.Border(null);
        oBorder.l = new AscCommonExcel.BorderProp();
        oBorder.l.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.l.c = AscCommonExcel.createRgbColor(r, g, b);
        oBorder.t = new AscCommonExcel.BorderProp();
        oBorder.t.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.t.c = AscCommonExcel.createRgbColor(r, g, b);
        oBorder.r = new AscCommonExcel.BorderProp();
        oBorder.r.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.r.c = AscCommonExcel.createRgbColor(r, g, b);
        oBorder.b = new AscCommonExcel.BorderProp();
        oBorder.b.setStyle(AscCommon.c_oAscBorderStyles.Thin);
        oBorder.b.c = AscCommonExcel.createRgbColor(r, g, b);
        return oBorder;
    };
    CScroll.prototype.getPosX = function () {
        return this.parent.x + this.parent.extX - this.getWidth();
    };
    CScroll.prototype.getPosY = function () {
        return this.parent.y;
    };
    CScroll.prototype.getHeight = function() {
        return this.parent.extY;
    };
    CScroll.prototype.getWidth = function() {
        return SCROLL_WIDTH;
    };
    CScroll.prototype.getButtonContainerPosX = function(nIndex) {
        return this.getPosX();
    };
    CScroll.prototype.getButtonContainerPosY = function(nIndex) {
        var dRet = 0;
        if(nIndex === 0) {
            dRet = this.getPosY();
        }
        else {
            dRet = this.getPosY() + this.getHeight() - this.getButtonContainerSize();
        }
        return dRet;
    };
    CScroll.prototype.getButtonContainerSize = function() {
        return this.getWidth();
    };
    CScroll.prototype.getButtonPosX = function (nIndex) {
        return this.getButtonContainerPosX(nIndex) + this.getButtonContainerSize() / 2 - this.getButtonSize() / 2;
    };
    CScroll.prototype.getButtonPosY = function (nIndex) {
        return this.getButtonContainerPosY(nIndex) + this.getButtonContainerSize() / 2 - this.getButtonSize() / 2;
    };
    CScroll.prototype.getButtonSize = function () {
        return this.getScrollerWidth();
    };
    CScroll.prototype.getRailPosX = function () {
        return this.getPosX() + this.getWidth() / 2 - this.getRailWidth() / 2;
    };
    CScroll.prototype.getRailPosY = function () {
        return this.getPosY() + this.getButtonContainerSize();
    };
    CScroll.prototype.getRailHeight = function() {
        return this.getHeight() - 2 * this.getButtonContainerSize();
    };
    CScroll.prototype.getRailWidth = function() {
        return SCROLLER_WIDTH;
    };
    CScroll.prototype.getScrollerX = function() {
        return this.getRailPosX() +  this.getRailWidth() / 2 - this.getScrollerWidth() / 2;
    };
    CScroll.prototype.getScrollerY = function() {
        return this.getRailPosY() + (this.getRailHeight() - this.getScrollerHeight()) * (this.parent.scrollTop / (this.parent.getRowsCount() - this.parent.getRowsInFrame()));
    };
    CScroll.prototype.getScrollerWidth = function() {
        return this.getRailWidth();
    };
    CScroll.prototype.getScrollerHeight = function() {
        var dRailH = this.getRailHeight();
        var dMinRailH = dRailH / 4;
        return Math.max(dMinRailH, dRailH * (dRailH / this.parent.getTotalHeight()));
    };
    CScroll.prototype.getState = function() {
        return this.state;
    };
    CScroll.prototype.hit = function(x, y) {
        var oInv = this.parent.getInvFullTransformMatrix();
        var tx = oInv.TransformPointX(x, y);
        var ty = oInv.TransformPointY(x, y);
        var l = this.getPosX();
        var t = this.getPosY();
        var r = l + this.getWidth();
        var b = t + this.getHeight();
        return tx >= l && tx <= r && ty >= t && ty <= b;
    };
    CScroll.prototype.draw = function(graphics) {
        if(!this.bVisible) {
            return;
        }
        var x, y, extX, extY, oButton;
        oButton = this.buttons[0];
        x = this.getButtonPosX(0);
        y = this.getButtonPosY(0);
        extX = this.getButtonSize();
        extY = this.getButtonSize();
        oButton.setTransformParams(x, y, extX, extY, 0, false, false);
        oButton.recalculate();
        oButton.draw(graphics);
        oButton = this.buttons[1];
        x = this.getButtonPosX(1);
        y = this.getButtonPosY(1);
        oButton.setTransformParams(x, y, extX, extY, 0, false, false);
        oButton.recalculate();
        oButton.draw(graphics);

        x = this.getScrollerX();
        y = this.getScrollerY();
        extX = this.getScrollerWidth();
        extY = this.getScrollerHeight();
        var nColor = SCROLL_COLORS[this.getState()];

        graphics.SaveGrState();
        graphics.transform3(this.parent.getFullTransformMatrix());
        graphics.p_color(0xCE, 0xCE, 0xCE, 0xFF);
        graphics.b_color1((nColor >> 16) & 0xFF, (nColor >> 8) & 0xFF, nColor & 0xFF, 0xFF);
        graphics.AddSmartRect(x, y, extX, extY, 0);
        graphics.df();
        //graphics.drawHorLine(1, y, x, x + extX, 0);
        //graphics.drawHorLine(1, y + extY, x, x + extX, 0);
        //graphics.drawVerLine(1, x, y, y + extY, 0);
        //graphics.drawVerLine(1, x + extX, y, y + extY, 0);
        graphics.RestoreGrState();
    };
    CScroll.prototype.onMouseMove = function (e, x, y) {
        var bRet = false;
        var bHit = this.hit(x, y);
        var nState = this.getState();
        if(bHit && !HOVERED_STATES[nState] || !bHit && HOVERED_STATES[nState]) {
            this.state = INVERT_HOVER_STATE[nState];
            bRet = true;
        }
        return bRet;
    };
    CScroll.prototype.onMouseDown = function (e, x, y) {
        return false;
    };
    CScroll.prototype.onMouseUp = function (e, x, y) {
        this.setEventListener(null);
        return false;
    };
    CScroll.prototype.getButtons = function (e, x, y) {
        return this.buttons;
    };
    CScroll.prototype.getButtonIndex = function (oButton) {
        for(var nButton = 0; nButton < this.buttons.length; ++nButton) {
            if(this.buttons[nButton] === oButton) {
                return nButton;
            }
        }
        return -1;
    };
    CScroll.prototype.setEventListener = function (child) {
        this.eventListener = child;
        if(child) {
            this.parent.setEventListener(this);
        }
        else {
            if(this.parent.isEventListener(this)) {
                this.parent.setEventListener(null);
            }
        }
    };
    window['AscFormat'] = window['AscFormat'] || {};
    window['AscFormat'].CSlicer = CSlicer;
})();
