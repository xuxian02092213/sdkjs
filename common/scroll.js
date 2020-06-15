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

(function (window, undefined)
{

	var AscBrowser = window['AscCommon'].AscBrowser;
	var debug = false;

	var ScrollType = {
		None: 0,
		Vertical: 1,
		Horizontal: 2
	};
	var ArrowType = {
		Left: 0,
		Up: 1,
		Right: 2,
		Down: 3
	};
	var AnimationType = {
		ToOver: 0,
		ToNone: 1
	};

	function ElementColor(r, g, b)
	{
		this.R = r;
		this.G = g;
		this.B = b;
	}

	ElementColor.prototype.fromHEX = function (str)
	{
		if (!str || str.length !== 7)
			return;
		this.R = parseInt(str.substring(1, 3), 16);
		this.G = parseInt(str.substring(3, 5), 16);
		this.B = parseInt(str.substring(5, 7), 16);
	};
	ElementColor.prototype.copy = function ()
	{
		return new ElementColor(this.R, this.G, this.B);
	};
	ElementColor.prototype.isEqual = function (color)
	{
		if (!color)
			return false;
		if (this.R === color.R && this.G === color.G && this.B === color.B)
			return true;
		return false;
	};
	ElementColor.prototype.toStyle = function ()
	{
		return "rgb(" + this.R + "," + this.G + "," + this.B + ")";
	};

	function getAnimationStep(color1, color2, count)
	{
		return new ElementColor((color2.R - color1.R) / count, (color2.G - color1.G) / count, (color2.B - color1.B) / count);
	}

	function ArrowStyle(settings)
	{
		this.ColorBackground = new ElementColor(241, 241, 241);
		this.ColorBolder = new ElementColor(207, 207, 207);
		this.ColorDecorator = new ElementColor(173, 173, 173);

		this.ColorBackgroundOver = new ElementColor(209, 209, 209);
		this.ColorBorderOver = new ElementColor(207, 207, 207);
		this.ColorDecoratorOver = new ElementColor(241, 241, 241);

		this.ColorBackgroundDown = new ElementColor(173, 173, 173);
		this.ColorBorderDown = new ElementColor(173, 173, 173);
		this.ColorDecoratorDown = new ElementColor(241, 241, 241);

		this.ColorBackground.fromHEX(settings.arrowBackgroundColor);
		this.ColorBolder.fromHEX(settings.arrowBorderColor);
		this.ColorDecorator.fromHEX(settings.arrowColor);

		this.ColorBackgroundOver.fromHEX(settings.arrowOverBackgroundColor);
		this.ColorBorderOver.fromHEX(settings.arrowOverBorderColor);
		this.ColorDecoratorOver.fromHEX(settings.arrowOverColor);

		this.ColorBackgroundDown.fromHEX(settings.arrowActiveBackgroundColor);
		this.ColorBorderDown.fromHEX(settings.arrowActiveBorderColor);
		this.ColorDecoratorDown.fromHEX(settings.arrowActiveColor);
	}
	function ArrowState()
	{
		this.ColorBackground;
		this.ColorBorder;
		this.ColorDecorator;
	}

	ArrowStyle.getAnimationState = function (state_cur, type)
	{
		var state = state_cur;
		if (!state)
		{
			state = new AnimationState();
			switch (type)
			{
				case AnimationType.ToOver:
				{
					state.ColorBackground = this.ColorBackground.copy();
					state.ColorBolder = this.ColorBorder.copy();
					state.ColorDecorator = this.ColorDecorator.copy();
					break;
				}
				case AnimationType.ToNone:
				{
					state.ColorBackground = this.ColorBackgroundOver.copy();
					state.ColorBolder = this.ColorBorderOver.copy();
					state.ColorDecorator = this.ColorDecoratorOver.copy();
					break;
				}
				default:
					break;
			}
		}
		switch (type)
		{
			case AnimationType.ToOver:
			{
				state.ColorBackgroundEnd = this.ColorBackgroundOver.copy();
				state.ColorBolderEnd = this.ColorBorderOver.copy();
				state.ColorDecoratorEnd = this.ColorDecoratorOver.copy();
				break;
			}
			case AnimationType.ToNone:
			{
				state.ColorBackgroundEnd = this.ColorBackground.copy();
				state.ColorBolderEnd = this.ColorBorder.copy();
				state.ColorDecoratorEnd = this.ColorDecorator.copy();
				break;
			}
			default:
				break;
		}

		return state;
	};

	function ScrollerStyle(settings)
	{
		this.ColorBackground = new ElementColor(241, 241, 241);
		this.ColorBolder = new ElementColor(207, 207, 207);
		this.ColorDecorator = new ElementColor(207, 207, 207);

		this.ColorBackgroundOver = new ElementColor(207, 207, 207);
		this.ColorBorderOver = new ElementColor(207, 207, 207);
		this.ColorDecoratorOver = new ElementColor(241, 241, 241);

		this.ColorBackgroundDown = new ElementColor(173, 173, 173);
		this.ColorBorderDown = new ElementColor(173, 173, 173);
		this.ColorDecoratorDown = new ElementColor(241, 241, 241);

		this.ColorBackground.fromHEX(settings.scrollBackgroundColor);
		this.ColorBolder.fromHEX(settings.strokeStyleNone);
		this.ColorDecorator.fromHEX(settings.scrollerColor);

		this.ColorBackgroundOver.fromHEX(settings.scrollBackgroundColorHover);
		this.ColorBorderOver.fromHEX(settings.strokeStyleOver);
		this.ColorDecoratorOver.fromHEX(settings.scrollerColorOver);

		this.ColorBackgroundDown.fromHEX(settings.scrollBackgroundColorActive);
		this.ColorBorderDown.fromHEX(settings.strokeStyleActive);
		this.ColorDecoratorDown.fromHEX(settings.scrollerColorActive);
	}

	function AnimationState()
	{
		this.ColorBackground = null;
		this.ColorBolder = null;
		this.ColorDecorator = null;

		this.ColorBackgroundEnd = null;
		this.ColorBolderEnd = null;
		this.ColorDecoratorEnd = null;

		this.ColorBackgroundStep = null;
		this.ColorBolderStep = null;
		this.ColorDecoratorStep = null;
	}

	function Arrow(settings)
	{
		this.type = ArrowType.Up;
		this.w = 0; // ширина в пикселах
		this.h = 0; // высота в пикселах
		this.isDown = false; // нажата ли
		this.animationState = null; // состояние анимации
		this.style = new ArrowStyle(settings);
		this.state = new ArrowState();
		this.old_state = new ArrowState();
		this.cache = null;
	}

	Arrow.prototype.resize = function(width, height)
	{
		if (this.w === width && this.h === height)
			return;

		if (!this.cache)
			this.cache = document.createElement("canvas");

		this.w = width;
		this.h = height;

		if (0 === this.w) this.w = this.h;
		if (0 === this.h) this.h = this.w;

		this.cache.width = this.w;
		this.cache.height = this.h;

		var len = AscBrowser.convertToRetinaValue(6, true);
		if (0 === (len & 1))
			len += 1;

		var isDraw = true;
		switch (this.type)
		{
			case ArrowType.Left:
			case ArrowType.Right:
			{
				if (len >= this.w)
					isDraw = false;
				break;
			}
			case ArrowType.Up:
			case ArrowType.Down:
			{
				if (len >= this.h)
					isDraw = false;
				break;
			}
			default:
				break;
		}

		if (!isDraw)
			return;

		var ctx = this.canvas.getContext("2d");
		var data = ctx.createImageData(this.w, this.h);
		var data_px = data.data;

		var countPart = (len + 1) >> 1;
		var x, y, i, ind;
		var stride = 4 * this.w;

		switch (this.type)
		{
			case ArrowType.Up:
			{
				x = ((this.w - len) >> 1);
				y = this.h - ((this.h - countPart) >> 1);

				while (len > 0)
				{
					ind = 4 * (this.w * y + x) + 3;
					for (i = 0; i < len; i++, ind += 4)
					{
						data_px[ind] = 255;
					}

					x += 1;
					y -= 1;
					len -= 2;
				}
				break;
			}
			case ArrowType.Down:
			{
				x = ((this.w - len) >> 1);
				y = ((this.h - countPart) >> 1);

				while (len > 0)
				{
					ind = 4 * (this.w * y + x) + 3;
					for (i = 0; i < len; i++, ind += 4)
					{
						data_px[ind] = 255;
					}

					x += 1;
					y += 1;
					len -= 2;
				}
				break;
			}
			case ArrowType.Left:
			{
				x = this.w - ((this.w - len) >> 1);
				y = ((this.h - len) >> 1);

				while (len > 0)
				{
					ind = 4 * (this.w * y + x) + 3;
					for (i = 0; i < len; i++, ind += stride)
					{
						data_px[ind] = 255;
						ind += stride;
					}

					x -= 1;
					y += 1;
					len -= 2;
				}
				break;
			}
			case ArrowType.Right:
			{
				x = ((this.w - len) >> 1);
				y = ((this.h - len) >> 1);

				while (len > 0)
				{
					ind = 4 * (this.w * y + x) + 3;
					for (i = 0; i < len; i++, ind += stride)
					{
						data_px[ind] = 255;
						ind += stride;
					}

					x += 1;
					y += 1;
					len -= 2;
				}
				break;
			}
			default:
				break;
		}

		ctx.putImageData(data, 0, 0);
	};

	Arrow.prototype.draw = function (context, width, height)
	{
		if (this.state && this.old_state)
		{
			if (this.state.ColorBackground.isEqual(this.old_state.ColorBackground) &&
				this.state.ColorBorder.isEqual(this.old_state.ColorBorder) &&
				this.state.ColorDecorator.isEqual(this.old_state.ColorDecorator))
			{
				// ничего не поменялось.
				return;
			}
		}

		this.old_state.ColorBackground = this.state.ColorBackground.copy();
		this.old_state.ColorBorder = this.state.ColorBorder.copy();
		this.old_state.ColorDecorator = this.state.ColorDecorator.copy();

		var x = (this.type === ArrowType.Right) ? (width - this.w) : 0;
		var y = (this.type === ArrowType.Down) ? (height - this.h) : 0;

		// 1) background
		context.beginPath();
		context.fillStyle = this.old_state.ColorBackground.toStyle();
		context.fillRect(x, y, this.w, this.h);

		// 2) decorator
		var ctx_arrow = this.cache.getContext("2d");
		ctx_arrow.globalCompositeOperation = "source-in";
		ctx_arrow.fillStyle = this.ColorDecorator.toStyle();
		ctx_arrow.fillRect(0, 0, this.w, this.h);
		context.drawImage(this.cache, x, y, this.w, this.h);

		// 3) border
		context.beginPath();
		context.strokeStyle = this.old_state.ColorBolder.toStyle();
		var pen_width = AscBrowser.retinaPixelRatio >> 0;
		if (pen_width < 1) pen_width = 1;
		context.lineWidth = pen_width;
		context.moveTo(x + (pen_width / 2), y + (pen_width / 2));
		context.lineTo(x + (this.w - pen_width / 2), y + (pen_width / 2));
		context.lineTo(x + (this.w - pen_width / 2), y + this.h - (pen_width / 2));
		context.lineTo(x + (pen_width / 2), y + this.h - (pen_width / 2));
		context.closePath();
		context.stroke();

		// 4) clear path
		context.beginPath();
	};

	Arrow.prototype.animationNext = function (context, width, height)
	{

	};

	function Scroller(settings)
	{
		this.w = 0; // ширина в пикселах
		this.h = 0; // высота в пикселах
		this.isDown = false; // нажата ли
		this.animationState = null; // состояние анимации
		this.minSize = settings.scrollerMin ? settings.scrollerMin : 34;
		this.maxSize = settings.scrollerMax ? settings.scrollerMax : 99999;
		this.style = new ScrollerStyle(settings);
		this.state = new ArrowState();
		this.old_state = new ArrowState();
	}

	Scroller.prototype.draw = function (context, width, height, margin)
	{
		if (this.state && this.old_state)
		{
			if (this.state.ColorBackground.isEqual(this.old_state.ColorBackground) &&
				this.state.ColorBorder.isEqual(this.old_state.ColorBorder) &&
				this.state.ColorDecorator.isEqual(this.old_state.ColorDecorator))
			{
				// ничего не поменялось.
				return;
			}
		}

		this.old_state.ColorBackground = this.state.ColorBackground.copy();
		this.old_state.ColorBorder = this.state.ColorBorder.copy();
		this.old_state.ColorDecorator = this.state.ColorDecorator.copy();

		var x = (this.type === ArrowType.Right) ? (width - this.w) : 0;
		var y = (this.type === ArrowType.Down) ? (height - this.h) : 0;

		// 1) background
		context.beginPath();
		context.fillStyle = this.old_state.ColorBackground.toStyle();
		context.fillRect(x, y, this.w, this.h);

		// 2) decorator

		// 3) border
		context.beginPath();
		context.strokeStyle = this.old_state.ColorBolder.toStyle();
		var pen_width = AscBrowser.retinaPixelRatio >> 0;
		if (pen_width < 1) pen_width = 1;
		context.lineWidth = pen_width;
		context.moveTo(x + (pen_width / 2), y + (pen_width / 2));
		context.lineTo(x + (this.w - pen_width / 2), y + (pen_width / 2));
		context.lineTo(x + (this.w - pen_width / 2), y + this.h - (pen_width / 2));
		context.lineTo(x + (pen_width / 2), y + this.h - (pen_width / 2));
		context.closePath();
		context.stroke();

		// 4) clear path
		context.beginPath();
	};

	function ScrollSettings()
	{
		this.scroll_settings_id = true;

		this.screenW = -1;
		this.screenH = -1;
		this.screenAddH = 0;
		this.contentH = undefined;
		this.contentW = undefined;

		this.scrollerMin = undefined;
		this.scrollerMax = undefined;

		this.scrollerColor = undefined;
		this.scrollerColorOver = undefined;
		this.scrollerColorActive = undefined;
		this.scrollBackgroundColor = undefined;
		this.scrollBackgroundColorHover = undefined;
		this.scrollBackgroundColorActive = undefined;
		this.strokeStyleNone = undefined;
		this.strokeStyleOver = undefined;
		this.strokeStyleActive = undefined;

		this.arrowColor = undefined;
		this.arrowBorderColor = undefined;
		this.arrowBackgroundColor = undefined;
		this.arrowOverColor = undefined;
		this.arrowOverBorderColor = undefined;
		this.arrowOverBackgroundColor = undefined;
		this.arrowActiveColor = undefined;
		this.arrowActiveBorderColor = undefined;
		this.arrowActiveBackgroundColor = undefined;

		this.showArrows = true;
		this.cornerRadius = 0;
		this.slimScroll = false;
		this.alwaysVisible = false;
		this.initialDelay = 300;
		this.arrowRepeatFreq = 50;
		this.trackClickRepeatFreq = 70;
		this.scrollPagePercent = 1. / 8;
		this.marginScroller = 4;
		this.vscrollStep = 10;
		this.hscrollStep = 10;
		this.wheelScrollLines = 1;

		this.position = 0;
		this.positionMax = 0;
	}

	function ScrollObject(elemID, settings, scrollType)
	{
		if (settings.scroll_settings_id)
			this.settings = settings;
		else
		{
			this.settings = new ScrollSettings();
			for (var opt in settings)
				this.settings[opt] = settings[opt];
		}

		this.scroller = new Scroller(this.settings);
		this.scrollType = scrollType;

		if (this.settings.showArrows)
		{
			this.arrowMin = new Arrow(this.settings);
			this.arrowMax = new Arrow(this.settings);

			if (this.scrollType == ScrollType.Horizontal)
			{
				this.arrowMin.type = ArrowType.Left;
				this.arrowMax.type = ArrowType.Right;
			}
			if (this.scrollType == ScrollType.Vertical)
			{
				this.arrowMin.type = ArrowType.Up;
				this.arrowMax.type = ArrowType.Down;
			}
		}

		this.scrollTimeout = null;

		this.canvas = null;
		this.context = null;

		this.width = 1;
		this.heigth = 1;

		this.widthPx = 1;
		this.heightPx = 1;

		this.scrollerMargin = this.settings.marginScroller;

		this.position = this.settings.position;
		this.positionMax = this.settings.positionMax;

		this.eventListeners = [];

		this.disableCurrentScroll = false;
		this._init(elemID);
	}

	ScrollObject.prototype.clientWidth = function(elem)
	{
		var _w = elem.clientWidth;
		if (0 != _w)
			return _w;

		var _string_w = "" + elem.style.width;
		if (-1 < _string_w.indexOf("%"))
			return 0;

		var _intVal = parseInt(_string_w);
		if (!isNaN(_intVal) && 0 < _intVal)
			return _intVal;

		return 0;
	};
	ScrollObject.prototype.clientHeight = function(elem)
	{
		var _w = elem.clientWidth;
		if (0 != _w)
			return _w;

		var _string_w = "" + elem.style.width;
		if (-1 < _string_w.indexOf("%"))
			return 0;

		var _intVal = parseInt(_string_w);
		if (!isNaN(_intVal) && 0 < _intVal)
			return _intVal;

		return 0;
	};

	ScrollObject.prototype.resize = function()
	{
		this.width = this.clientWidth(this.canvas.parentNode);
		this.heigth = this.clientHeight(this.canvas.parentNode);

		this.canvas.style.width = this.width;
		this.canvas.style.height = this.heigth;
		AscCommon.calculateCanvasSize(this.canvas);

		this.widthPx = this.canvas.width;
		this.heightPx = this.canvas.height;

		this.context = this.canvas.getContext('2d');
		this.context.fillStyle = this.settings.scrollBackgroundColor;
		this.context.fillRect(0, 0, this.widthPx, this.heightPx);
	};

	ScrollObject.prototype._init = function ( elemID )
    {
		if (!elemID)
		    return false;

		var holder = document.getElementById(elemID);

		if (holder.getElementsByTagName('canvas').length === 0)
			this.canvas = holder.appendChild(document.createElement("CANVAS"));
		else
			this.canvas = holder.children[1];

		this.canvas.style.zIndex = 100;
		this.canvas.style.position = "absolute";
		this.canvas.style.top = "0px";
		this.canvas.style["msTouchAction"] = "none";
		if (AscBrowser.isWebkit)
			this.canvas.style.webkitUserSelect = "none";

		this.resize();

		var arrowSize = Math.min(this.width, this.heigth);
		if (this.settings.showArrows)
			this.scrollerMargin = arrowSize + 2;

		AscCommon.addMouseEvent(this.canvas, "down", this.evt_mousedown);
		AscCommon.addMouseEvent(this.canvas, "move", this.evt_mousemove);
		AscCommon.addMouseEvent(this.canvas, "up", this.evt_mouseup);
		AscCommon.addMouseEvent(this.canvas, "over", this.evt_mouseover);
		AscCommon.addMouseEvent(this.canvas, "out", this.evt_mouseout);
		this.canvas.onmousewheel = this.evt_mousewheel;

		var _that = this;
		this.canvas.ontouchstart = function ( e ) {
			_that.evt_mousedown( e.touches[0] );
			return false;
		};
		this.canvas.ontouchmove = function ( e ) {
			_that.evt_mousemove( e.touches[0] );
			return false;
		};
		this.canvas.ontouchend = function ( e ) {
			_that.evt_mouseup( e.changedTouches[0] );
			return false;
		};

		if (this.canvas.addEventListener)
			this.canvas.addEventListener("DOMMouseScroll", this.evt_mousewheel, false);

		this.draw();
        return true;
	};

	ScrollObject.prototype.disableCurrentScroll = function() {
		this.disableCurrentScroll = true;
	};
	ScrollObject.prototype.checkDisableCurrentScroll = function() {
		var ret = this.disableCurrentScroll;
		this.disableCurrentScroll = false;
		return ret;
	};
	ScrollObject.prototype.getMousePosition = function(e)
	{
		// get canvas position
		var obj = this.canvas;
		var top = 0;
		var left = 0;
		while (obj && obj.tagName != 'BODY')
		{
			top += obj.offsetTop;
			left += obj.offsetLeft;
			obj = obj.offsetParent;
		}

		// return relative mouse position
		var mouseX = e.clientX - left + window.pageXOffset;
		var mouseY = e.clientY - top + window.pageYOffset;

		return { x: mouseX, y: mouseY };
	};
	ScrollObject.prototype.RecalcScroller = function ( startpos ) {
		if ( this.isVerticalScroll ) {
			if ( this.settings.showArrows ) {
				this.verticalTrackHeight = this.canvasH - this.arrowPosition * 2;
				this.scroller.y = this.arrowPosition;
			}
			else {
				this.verticalTrackHeight = this.canvasH;
				this.scroller.y = 1;
			}
			var percentInViewV;

			percentInViewV = (this.maxScrollY + this.paneHeight ) / this.paneHeight;
			this.scroller.h = Math.ceil( 1 / percentInViewV * this.verticalTrackHeight );

			if ( this.scroller.h < this.settings.scrollerMinHeight )
				this.scroller.h = this.settings.scrollerMinHeight;
			else if ( this.scroller.h > this.settings.scrollerMaxHeight )
				this.scroller.h = this.settings.scrollerMaxHeight;
			this.scrollCoeff = this.maxScrollY / Math.max( 1, this.paneHeight - this.scroller.h );
			if ( startpos ) {
				this.scroller.y = startpos / this.scrollCoeff + this.arrowPosition;
			}
			this.dragMaxY = this.canvasH - this.arrowPosition - this.scroller.h + 1;
			this.dragMinY = this.arrowPosition;
		}

		if ( this.isHorizontalScroll ) {
			if ( this.settings.showArrows ) {
				this.horizontalTrackWidth = this.canvasW - this.arrowPosition * 2;
				this.scroller.x = this.arrowPosition + 1;
			}
			else {
				this.horizontalTrackWidth = this.canvasW;
				this.scroller.x = 1;
			}
			var percentInViewH;
			percentInViewH = ( this.maxScrollX + this.paneWidth ) / this.paneWidth;
			this.scroller.w = Math.ceil( 1 / percentInViewH * this.horizontalTrackWidth );

			if ( this.scroller.w < this.settings.scrollerMinWidth )
				this.scroller.w = this.settings.scrollerMinWidth;
			else if ( this.scroller.w > this.settings.scrollerMaxWidth )
				this.scroller.w = this.settings.scrollerMaxWidth;
			this.scrollCoeff = this.maxScrollX / Math.max( 1, this.paneWidth - this.scroller.w );
			if ( typeof startpos !== "undefined" ) {
				this.scroller.x = startpos / this.scrollCoeff + this.arrowPosition;
			}
			this.dragMaxX = this.canvasW - this.arrowPosition - this.scroller.w;
			this.dragMinX = this.arrowPosition;
		}
	};
	ScrollObject.prototype.Repos = function ( settings, bIsHorAttack, bIsVerAttack ) {
		if (this.IsRetina != AscBrowser.isCustomScalingAbove2())
		{
			this.IsRetina = AscBrowser.isCustomScalingAbove2();
			this.ArrowDrawer.InitSize(this.settings.arrowSizeH, this.settings.arrowSizeW, this.IsRetina);
		}

		if (bIsVerAttack)
		{
			var _canvasH = settings.screenH;
			if (undefined !== _canvasH && settings.screenAddH)
				_canvasH += settings.screenAddH;

			if (_canvasH == this.canvasH && undefined !== settings.contentH)
			{
				var _maxScrollY = settings.contentH - settings.screenH > 0 ? settings.contentH - settings.screenH : 0;
				if (_maxScrollY == this.maxScrollY)
					return;
			}
		}
		if (bIsHorAttack)
		{
			if (settings.screenW == this.canvasW && undefined !== settings.contentW)
			{
				var _maxScrollX = settings.contentW - settings.screenW > 0 ? settings.contentW - settings.screenW : 0;
				if (_maxScrollX == this.maxScrollX)
					return;
			}
		}

		var _parentClientW = GetClientWidth( this.canvas.parentNode );
		var _parentClientH = GetClientHeight( this.canvas.parentNode );

		var _firstChildW = 0;
		var _firstChildH = 0;
		if (this.canvas.parentNode)
		{
			_firstChildW = GetClientWidth(this.canvas.parentNode.firstElementChild);
			_firstChildH = GetClientHeight(this.canvas.parentNode.firstElementChild);
		}

		this._setDimension( _parentClientH, _parentClientW );
		this.maxScrollY = this.maxScrollY2 = _firstChildH - settings.screenH > 0 ? _firstChildH - settings.screenH : 0;
		this.maxScrollX = this.maxScrollX2 = _firstChildW - settings.screenW > 0 ? _firstChildW - settings.screenW : 0;

		this.isVerticalScroll = _firstChildH / Math.max( this.canvasH, 1 ) > 1 || this.isVerticalScroll || (true === bIsVerAttack);
		this.isHorizontalScroll = _firstChildW / Math.max( this.canvasW, 1 ) > 1 || this.isHorizontalScroll || (true === bIsHorAttack);
		this._setScrollerHW();

		this.paneHeight = this.canvasH - this.arrowPosition * 2;
		this.paneWidth = this.canvasW - this.arrowPosition * 2;
		this.RecalcScroller();
		if ( this.isVerticalScroll && !this.settings.alwaysVisible) {

			if (this.scrollVCurrentY > this.maxScrollY)
				this.scrollVCurrentY = this.maxScrollY;

			this.scrollToY( this.scrollVCurrentY );
			if(this.maxScrollY == 0){
				this.canvas.style.display = "none";
			}
			else{
				this.canvas.style.display = "";
			}
		}
		else if ( this.isHorizontalScroll ) {

			if (this.scrollHCurrentX > this.maxScrollX)
				this.scrollHCurrentX = this.maxScrollX;

			this.scrollToX( this.scrollHCurrentX );
			if(this.maxScrollX == 0 && !this.settings.alwaysVisible){
				this.canvas.style.display = "none";
			}
			else{
				this.canvas.style.display = "";
			}
		}

		this._drawArrow();
		this._draw();
	};
	ScrollObject.prototype.Reinit = function ( settings, pos ) {
		var size;
		this._setDimension( this.canvas.parentNode.clientHeight, this.canvas.parentNode.clientWidth );

		size = this.canvas.parentNode.firstElementChild.clientHeight - (settings.screenH || this.canvas.parentNode.offsetHeight);
		this.maxScrollY = this.maxScrollY2 = 0 < size ? size : 0;

		size = this.canvas.parentNode.firstElementChild.clientWidth - (settings.screenH || this.canvas.parentNode.offsetWidth);
		this.maxScrollX = this.maxScrollX2 = 0 < size ? size : 0;

		this.isVerticalScroll = this.canvas.parentNode.firstElementChild.clientHeight / Math.max( this.canvasH, 1 ) > 1 || this.isVerticalScroll;
		this.isHorizontalScroll = this.canvas.parentNode.firstElementChild.clientWidth / Math.max( this.canvasW, 1 ) > 1 || this.isHorizontalScroll;
		this._setScrollerHW();

		this.paneHeight = this.canvasH - this.arrowPosition * 2;
		this.paneWidth = this.canvasW - this.arrowPosition * 2;
		this.RecalcScroller();
		this.reinit = true;
		if ( this.isVerticalScroll ) {
			pos !== undefined ? this.scrollByY( pos - this.scrollVCurrentY ) : this.scrollToY( this.scrollVCurrentY );
		}

		if ( this.isHorizontalScroll ) {
			pos !== undefined ? this.scrollByX( pos - this.scrollHCurrentX ) : this.scrollToX( this.scrollHCurrentX );
		}
		this.reinit = false;
		this._drawArrow();
		this._draw();
	};
	ScrollObject.prototype._scrollV = function ( that, evt, pos, isTop, isBottom, bIsAttack ) {
		if ( !this.isVerticalScroll ) {
			return;
		}

		if ( that.scrollVCurrentY !== pos || bIsAttack === true ) {
			var oldPos = that.scrollVCurrentY;
			that.scrollVCurrentY = pos;
			evt.scrollD = evt.scrollPositionY = that.scrollVCurrentY;
			evt.maxScrollY = that.maxScrollY;
			that.handleEvents( "onscrollvertical", evt );
			if (that.checkDisableCurrentScroll()) {
				// prevented...
				that.scrollVCurrentY = oldPos;
				return;
			}
			that._draw();
		}
		else if ( that.scrollVCurrentY === pos && pos > 0 && !this.reinit && !this.moveble && !this.lock ) {
			evt.pos = pos;
			that.handleEvents( "onscrollVEnd", evt );
		}
	};
	ScrollObject.prototype._correctScrollV = function ( that, yPos ) {
		if ( !this.isVerticalScroll )
			return null;

		var events = that.eventListeners["oncorrectVerticalScroll"];
		if ( events ) {
			if ( events.length != 1 )
				return null;

			return events[0].handler.apply( that, [yPos] );
		}
		return null;
	};
	ScrollObject.prototype._correctScrollByYDelta = function ( that, delta ) {
		if ( !this.isVerticalScroll )
			return null;

		var events = that.eventListeners["oncorrectVerticalScrollDelta"];
		if ( events ) {
			if ( events.length != 1 )
				return null;

			return events[0].handler.apply( that, [delta] );
		}
		return null;
	};
	ScrollObject.prototype._scrollH = function ( that, evt, pos, isTop, isBottom ) {
		if ( !this.isHorizontalScroll ) {
			return;
		}
		if ( that.scrollHCurrentX !== pos ) {
			that.scrollHCurrentX = pos;
			evt.scrollD = evt.scrollPositionX = that.scrollHCurrentX;
			evt.maxScrollX = that.maxScrollX;

//            that._drawArrow();
			that._draw();
			that.handleEvents( "onscrollhorizontal", evt );
		}
		else if ( that.scrollHCurrentX === pos && pos > 0 && !this.reinit && !this.moveble && !this.lock ) {
			evt.pos = pos;
			that.handleEvents( "onscrollHEnd", evt );
		}

	};
	ScrollObject.prototype.scrollByY = function ( delta, bIsAttack ) {
		if ( !this.isVerticalScroll ) {
			return;
		}

		var result = this._correctScrollByYDelta( this, delta );
		if ( result != null && result.isChange === true )
			delta = result.Pos;

		var destY = this.scrollVCurrentY + delta, isTop = false, isBottom = false, vend = false;

		if ( destY < 0 ) {
			destY = 0;
			isTop = true;
			isBottom = false;
		}
		else if ( destY > this.maxScrollY2 ) {
			this.handleEvents( "onscrollVEnd", destY - this.maxScrollY );
			vend = true;
			destY = this.maxScrollY2;
			isTop = false;
			isBottom = true;
		}

		this.scroller.y = destY / Math.max( 1, this.scrollCoeff ) + this.arrowPosition;
		if ( this.scroller.y < this.dragMinY )
			this.scroller.y = this.dragMinY + 1;
		else if ( this.scroller.y > this.dragMaxY )
			this.scroller.y = this.dragMaxY;

		var arrow = this.settings.showArrows ? this.arrowPosition : 0;
		if ( this.scroller.y + this.scroller.h > this.canvasH - arrow ) {
			this.scroller.y -= Math.abs( this.canvasH - arrow - this.scroller.y - this.scroller.h );
		}

		this.scroller.y = Math.round(this.scroller.y);

		if ( vend ) {
			this.moveble = true;
		}
		this._scrollV( this, {}, destY, isTop, isBottom, bIsAttack );
		if ( vend ) {
			this.moveble = false;
		}
	};
	ScrollObject.prototype.scrollToY = function ( destY ) {
		if ( !this.isVerticalScroll ) {
			return;
		}

		this.scroller.y = destY / Math.max( 1, this.scrollCoeff ) + this.arrowPosition;
		if ( this.scroller.y < this.dragMinY )
			this.scroller.y = this.dragMinY + 1;
		else if ( this.scroller.y > this.dragMaxY )
			this.scroller.y = this.dragMaxY;

		var arrow = this.settings.showArrows ? this.arrowPosition : 0;
		if ( this.scroller.y + this.scroller.h > this.canvasH - arrow ) {
			this.scroller.y -= Math.abs( this.canvasH - arrow - this.scroller.y - this.scroller.h );
		}

		this.scroller.y = Math.round(this.scroller.y);

		this._scrollV( this, {}, destY, false, false );
	};
	ScrollObject.prototype.scrollByX = function ( delta ) {
		if ( !this.isHorizontalScroll ) {
			return;
		}
		var destX = this.scrollHCurrentX + delta, isTop = false, isBottom = false, hend = false;

		if ( destX < 0 ) {
			destX = 0;
			isTop = true;
			isBottom = false;
		}
		else if ( destX > this.maxScrollX2 ) {
			this.handleEvents( "onscrollHEnd", destX - this.maxScrollX );
			hend = true;
			destX = this.maxScrollX2;
			isTop = false;
			isBottom = true;
		}

		this.scroller.x = destX / Math.max( 1, this.scrollCoeff ) + this.arrowPosition;
		if ( this.scroller.x < this.dragMinX )
			this.scroller.x = this.dragMinX + 1;
		else if ( this.scroller.x > this.dragMaxX )
			this.scroller.x = this.dragMaxX;

		var arrow = this.settings.showArrows ? this.arrowPosition : 0;
		if ( this.scroller.x + this.scroller.w > this.canvasW - arrow ) {
			this.scroller.x -= Math.abs( this.canvasW - arrow - this.scroller.x - this.scroller.w );
		}

		this.scroller.x = Math.round(this.scroller.x);

		if ( hend ) {
			this.moveble = true;
		}
		this._scrollH( this, {}, destX, isTop, isBottom );
		if ( hend ) {
			this.moveble = true;
		}
	};
	ScrollObject.prototype.scrollToX = function ( destX ) {
		if ( !this.isHorizontalScroll ) {
			return;
		}

		this.scroller.x = destX / Math.max( 1, this.scrollCoeff ) + this.arrowPosition;
		if ( this.scroller.x < this.dragMinX )
			this.scroller.x = this.dragMinX + 1;
		else if ( this.scroller.x > this.dragMaxX )
			this.scroller.x = this.dragMaxX;

		var arrow = this.settings.showArrows ? this.arrowPosition : 0;
		if ( this.scroller.x + this.scroller.w > this.canvasW - arrow ) {
			this.scroller.x -= Math.abs( this.canvasW - arrow - this.scroller.x - this.scroller.w );
		}

		this.scroller.x = Math.round(this.scroller.x);

		this._scrollH( this, {}, destX, false, false );
	};
	ScrollObject.prototype.scrollTo = function ( destX, destY ) {
		this.scrollToX( destX );
		this.scrollToY( destY );
	};
	ScrollObject.prototype.scrollBy = function ( deltaX, deltaY ) {
		this.scrollByX( deltaX );
		this.scrollByY( deltaY );
	};

	ScrollObject.prototype.roundRect = function ( x, y, width, height, radius ) {
		if ( typeof radius === "undefined" ) {
			radius = 1;
		}
		this.context.beginPath();
		this.context.moveTo( x + radius, y );
		this.context.lineTo( x + width - radius, y );
		this.context.quadraticCurveTo( x + width, y, x + width, y + radius );
		this.context.lineTo( x + width, y + height - radius );
		this.context.quadraticCurveTo( x + width, y + height, x + width - radius, y + height );
		this.context.lineTo( x + radius, y + height );
		this.context.quadraticCurveTo( x, y + height, x, y + height - radius );
		this.context.lineTo( x, y + radius );
		this.context.quadraticCurveTo( x, y, x + radius, y );
		this.context.closePath();
	};

	ScrollObject.prototype._clearContent = function () {
		this.context.clearRect( 0, 0, this.canvasW, this.canvasH );
	};
	ScrollObject.prototype._draw = function () {
		// очистку не нужно делать - если потом рисовать рект такой же
		//this._clearContent();
		var piperImgIndex = 0, that = this,
			startColorFadeIn = this.startColorFadeInOutStart < 0 ? this.startColorFadeInStart : this.startColorFadeInOutStart,
			startColorFadeOut = this.startColorFadeInOutStart < 0 ? this.startColorFadeOutStart : this.startColorFadeInOutStart;

		function fadeIn() {

			clearTimeout( that.fadeInTimeout );
			that.fadeInTimeout = null;
			clearTimeout( that.fadeOutTimeout );
			that.fadeOutTimeout = null;

			var x, y, img, ctx_piperImg, _data, px;

			that.context.beginPath();

			drawScroller();

			that.context.fillStyle = "rgb(" + that.startColorFadeInOutStart + "," + that.startColorFadeInOutStart + "," + that.startColorFadeInOutStart + ")";
			that.context.strokeStyle = that.settings.strokeStyleOver;

			that.context.fill();
			that.context.stroke();

			startColorFadeIn -= 2;

			if ( that._checkPiperImagesV() ) {
				x = that.scroller.x + (that.settings.slimScroll ? 2 : 3);
				y = (that.scroller.y >> 0) + Math.floor( that.scroller.h / 2 ) - 6;

				ctx_piperImg = that.piperImgVert[0].getContext( '2d' );
				_data = ctx_piperImg.getImageData( 0, 0, that.piperImgVert[0].width, that.piperImgVert[0].height );
				px = _data.data;

				for ( var i = 0; i < that.piperImgVert[0].width * that.piperImgVert[0].height * 4; i += 4 ) {
					if ( px[i + 3] == 255 ) {
						px[i] += 2;
						px[i + 1] += 2;
						px[i + 2] += 2;
					}
				}

				ctx_piperImg.putImageData( _data, 0, 0 );

				img = that.piperImgVert[0];
			}
			else if ( that._checkPiperImagesH() ) {
				x = (that.scroller.x >> 0) + Math.floor( that.scroller.w / 2 ) - 6;
				y = that.scroller.y + (that.settings.slimScroll ? 2 : 3);

				ctx_piperImg = that.piperImgHor[0].getContext( '2d' );
				_data = ctx_piperImg.getImageData( 0, 0, that.piperImgHor[0].width, that.piperImgHor[0].height );
				px = _data.data;

				for ( var i = 0; i < that.piperImgHor[0].width * that.piperImgHor[0].height * 4; i += 4) {
					if ( px[i + 3] == 255 ) {
						px[i] += 2;
						px[i + 1] += 2;
						px[i + 2] += 2;
					}
				}

				ctx_piperImg.putImageData( _data, 0, 0 );

				img = that.piperImgHor[0];
			}

			if ( startColorFadeIn >= _HEXTORGB_(that.settings.scrollerColorOver).R ) {
				that.startColorFadeInOutStart = startColorFadeIn;
				that.fadeInTimeout = setTimeout( fadeIn, that.settings.fadeInFadeOutDelay );
			}
			else {
				clearTimeout( that.fadeInTimeout );
				that.fadeInTimeout = null;
				that.fadeInActive = false;
				that.startColorFadeInOutStart = startColorFadeIn + 2;

				if ( that._checkPiperImagesV() ) {

					ctx_piperImg = that.piperImgVert[0].getContext( '2d' );
					_data = ctx_piperImg.getImageData( 0, 0, that.piperImgVert[0].width, that.piperImgVert[0].height );
					px = _data.data;

					for ( var i = 0; i < that.piperImgVert[0].width * that.piperImgVert[0].height * 4; i += 4 ) {
						if ( px[i + 3] == 255 ) {
							px[i] -= 2;
							px[i + 1] -= 2;
							px[i + 2] -= 2;
						}
					}

					ctx_piperImg.putImageData( _data, 0, 0 );

					img = that.piperImgVert[0];

				}
				else if ( that._checkPiperImagesH() ) {

					ctx_piperImg = that.piperImgHor[0].getContext( '2d' );
					_data = ctx_piperImg.getImageData( 0, 0, that.piperImgHor[0].width, that.piperImgHor[0].height );
					px = _data.data;

					for ( var i = 0; i < that.piperImgHor[0].width * that.piperImgHor[0].height * 4; i += 4) {
						if ( px[i + 3] == 255 ) {
							px[i] -= 2;
							px[i + 1] -= 2;
							px[i + 2] -= 2;
						}
					}

					ctx_piperImg.putImageData( _data, 0, 0 )

					img = that.piperImgHor[0];

				}
			}

			if(img){
				that.context.drawImage( img, x, y );
			}

		}

		function fadeOut() {

			clearTimeout( that.fadeInTimeout );
			that.fadeInTimeout = null;
			clearTimeout( that.fadeOutTimeout );
			that.fadeOutTimeout = null;

			var x, y, img, ctx_piperImg, _data, px;

			that.context.beginPath();

			drawScroller();

			that.context.fillStyle = "rgb(" + that.startColorFadeInOutStart + "," + that.startColorFadeInOutStart + "," + that.startColorFadeInOutStart + ")";
			that.context.strokeStyle = that.settings.strokeStyleOver;

			that.context.fill();
			that.context.stroke();

			startColorFadeOut += 2;

			if ( that._checkPiperImagesV() ) {
				x = that.scroller.x + (that.settings.slimScroll ? 2 : 3);
				y = (that.scroller.y >> 0) + Math.floor( that.scroller.h / 2 ) - 6;

				ctx_piperImg = that.piperImgVert[0].getContext( '2d' );
				_data = ctx_piperImg.getImageData( 0, 0, that.piperImgVert[0].width, that.piperImgVert[0].height );
				px = _data.data;

				for ( var i = 0; i < that.piperImgVert[0].width * that.piperImgVert[0].height * 4; i += 4) {

					if ( px[i + 3] == 255 ) {
						px[i] -= 2;
						px[i + 1] -= 2;
						px[i + 2] -= 2;
					}
				}

				ctx_piperImg.putImageData( _data, 0, 0 );

				img = that.piperImgVert[0];

			}
			else if ( that._checkPiperImagesH() ) {
				x = (that.scroller.x >> 0) + Math.floor( that.scroller.w / 2 ) - 6;
				y = that.scroller.y + (that.settings.slimScroll ? 2 : 3);

				ctx_piperImg = that.piperImgHor[0].getContext( '2d' );
				_data = ctx_piperImg.getImageData( 0, 0, that.piperImgHor[0].width, that.piperImgHor[0].height );
				px = _data.data;

				for ( var i = 0; i < that.piperImgHor[0].width * that.piperImgHor[0].height * 4; i+=4 ) {
					if ( px[i + 3] == 255 ) {
						px[i] -= 2;
						px[i + 1] -= 2;
						px[i + 2] -= 2;
					}
				}

				ctx_piperImg.putImageData( _data, 0, 0 )

				img = that.piperImgHor[0];
			}

			if ( startColorFadeOut <= _HEXTORGB_(that.settings.scrollerColor).R ) {
				that.startColorFadeInOutStart = startColorFadeOut;
				that.fadeOutTimeout = setTimeout( fadeOut, that.settings.fadeInFadeOutDelay );
			}
			else {
				clearTimeout( that.fadeOutTimeout );
				that.fadeOutTimeout = null;
				that.startColorFadeInOutStart = startColorFadeOut - 2;
				that.fadeOutActive = false;

				if ( that._checkPiperImagesV() ) {

					ctx_piperImg = that.piperImgVert[0].getContext( '2d' );
					_data = ctx_piperImg.getImageData( 0, 0, that.piperImgVert[0].width, that.piperImgVert[0].height );
					px = _data.data;

					for ( var i = 0; i < that.piperImgVert[0].width * that.piperImgVert[0].height * 4; i+= 4 ) {
						if ( px[i + 3] == 255 ) {
							px[i] += 2;
							px[i + 1] += 2;
							px[i + 2] += 2;
						}
					}

					ctx_piperImg.putImageData( _data, 0, 0 );

					img = that.piperImgVert[0];

				}
				else if ( that._checkPiperImagesH() ) {
					x = (that.scroller.x >> 0) + Math.floor( that.scroller.w / 2 ) - 6;
					y = that.scroller.y + 3;

					ctx_piperImg = that.piperImgHor[0].getContext( '2d' );
					_data = ctx_piperImg.getImageData( 0, 0, that.piperImgHor[0].width, that.piperImgHor[0].height );
					px = _data.data;

					for ( var i = 0; i < that.piperImgHor[0].width * that.piperImgHor[0].height * 4; i+=4 ) {
						if ( px[i + 3] == 255 ) {
							px[i] += 2;
							px[i + 1] += 2;
							px[i + 2] += 2;
						}
					}

					ctx_piperImg.putImageData( _data, 0, 0 )

					img = that.piperImgHor[0];
				}
			}

			if(img){
				that.context.drawImage( img, x, y );
			}
		}

		function drawScroller() {

			that.context.beginPath();

			if ( that.isVerticalScroll ) {
				var _y = that.settings.showArrows ? that.arrowPosition : 0,
					_h = that.canvasH - (_y << 1);

				if ( _h > 0 ) {
					that.context.rect( 0, _y, that.canvasW, _h );
				}
			}
			else if ( that.isHorizontalScroll ) {
				var _x = that.settings.showArrows ? that.arrowPosition : 0,
					_w = that.canvasW - (_x << 1);

				if ( _w > 0 ) {
					that.context.rect( _x, 0, _w, that.canvasH );
				}
			}

			switch ( that.scrollerStatus ) {

				case ScrollOverType.OVER:
				{
					that.context.fillStyle = that.settings.scrollBackgroundColorHover;
					break;
				}
				case ScrollOverType.ACTIVE:
				{
					that.context.fillStyle = that.settings.scrollBackgroundColorActive;
					break;
				}
				case ScrollOverType.NONE:
				default:
				{
					that.context.fillStyle = that.settings.scrollBackgroundColor;
					break;
				}

			}

			that.context.fill();
			that.context.beginPath();

			if ( that.isVerticalScroll && that.maxScrollY != 0 ) {
				var _y = that.scroller.y >> 0, arrow = that.settings.showArrows ? that.arrowPosition : 0;
				if ( _y < arrow ) {
					_y = arrow;
				}
				var _b = Math.round(that.scroller.y + that.scroller.h);// >> 0;
				if ( _b > (that.canvasH - arrow - 1) ) {
					_b = that.canvasH - arrow - 1;
				}

				if ( _b > _y ) {
					that.roundRect( that.scroller.x - 0.5, _y + 0.5, that.scroller.w - 1, that.scroller.h - 1, that.settings.cornerRadius );
				}
			}
			else if ( that.isHorizontalScroll && that.maxScrollX != 0 ) {
				var _x = that.scroller.x >> 0, arrow = that.settings.showArrows ? that.arrowPosition : 0;
				if ( _x < arrow ) {
					_x = arrow;
				}
				var _r = (that.scroller.x + that.scroller.w) >> 0;
				if ( _r > (that.canvasW - arrow - 2) ) {
					_r = that.canvasW - arrow - 1;
				}

				if ( _r > _x ) {
					that.roundRect( _x + 0.5, that.scroller.y - 0.5, that.scroller.w - 1, that.scroller.h - 1, that.settings.cornerRadius );
				}
			}
		}

		if ( this.fadeInActive && this.lastScrollerStatus == ScrollOverType.OVER && this.scrollerStatus == ScrollOverType.OVER ) {
			return;
		}

		clearTimeout( this.fadeInTimeout );
		this.fadeInTimeout = null;
		clearTimeout( this.fadeOutTimeout );
		this.fadeOutTimeout = null;

		this.fadeInActive = false;
		this.fadeOutActive = false;

		drawScroller();

		this.context.lineWidth = 1;
		switch ( this.scrollerStatus ) {

			case ScrollOverType.LAYER:
			case ScrollOverType.OVER:
			{
				if ( this.lastScrollerStatus == ScrollOverType.NONE ) {
					this.lastScrollerStatus = this.scrollerStatus;
					this.startColorFadeInOutStart = this.startColorFadeInOutStart < 0 ? startColorFadeIn : this.startColorFadeInOutStart;
					this.fadeInActive = true;
					fadeIn();
				}
				else{
					this.context.fillStyle = this.settings.scrollerColorOver;
					this.context.strokeStyle = this.settings.strokeStyleOver;
					piperImgIndex = 1;
				}
				break;
			}
			case ScrollOverType.ACTIVE:
			{
				this.context.fillStyle = this.settings.scrollerColorActive;
				this.context.strokeStyle = this.settings.strokeStyleActive;
				piperImgIndex = 1;
				break;
			}
			case ScrollOverType.NONE:
			default:
			{
				if ( this.lastScrollerStatus == ScrollOverType.OVER ) {
					this.lastScrollerStatus = this.scrollerStatus;
					this.startColorFadeInOutStart = this.startColorFadeInOutStart < 0 ? startColorFadeOut : this.startColorFadeInOutStart;
					this.fadeOutActive = true;
					fadeOut();
				}
				else{
					this.context.fillStyle = this.settings.scrollerColor;
					this.context.strokeStyle = this.settings.strokeStyleNone;

					this.startColorFadeInOutStart = this.startColorFadeInStart = _HEXTORGB_(this.settings.scrollerColor).R;
					this.startColorFadeOutStart = _HEXTORGB_(this.settings.scrollerColorOver).R;

					piperImgIndex = 0;

					var r, g, b, ctx_piperImg, _data, px, _len;
					r = _HEXTORGB_( this.settings.piperColor );
					g = r.G;
					b = r.B;
					r = r.R;

					if ( this.isVerticalScroll ) {
						ctx_piperImg = this.piperImgVert[piperImgIndex].getContext( '2d' );
						_data = ctx_piperImg.getImageData( 0, 0, this.piperImgVert[piperImgIndex].width, this.piperImgVert[piperImgIndex].height );
					}
					else if ( this.isHorizontalScroll ) {
						ctx_piperImg = this.piperImgHor[piperImgIndex].getContext( '2d' );
						_data = ctx_piperImg.getImageData( 0, 0, this.piperImgHor[piperImgIndex].width, this.piperImgHor[piperImgIndex].height );
					}

					if( this.isVerticalScroll || this.isHorizontalScroll ){

						px = _data.data;
						_len = px.length;

						for ( var i = 0; i < _len; i += 4 ) {
							if ( px[i + 3] == 255 ) {
								px[i] = r;
								px[i + 1] = g;
								px[i + 2] = b;
							}
						}

						ctx_piperImg.putImageData( _data, 0, 0 );

					}

				}
				break;
			}

		}

		if ( !this.fadeInActive && !this.fadeOutActive ) {
			this.context.fill();
			this.context.stroke();

			if ( this._checkPiperImagesV() ) {
				this.context.drawImage( this.piperImgVert[piperImgIndex], this.scroller.x + (this.settings.slimScroll ? 2 : 3), (this.scroller.y >> 0) + Math.floor( this.scroller.h / 2 ) - 6 );
			}
			else if ( this._checkPiperImagesH() ) {
				this.context.drawImage( this.piperImgHor[piperImgIndex], (this.scroller.x >> 0) + Math.floor( this.scroller.w / 2 ) - 6, this.scroller.y + (this.settings.slimScroll ? 2 : 3) );
			}

		}

		this.lastScrollerStatus = this.scrollerStatus;

	};

	ScrollObject.prototype._checkPiperImagesV = function() {
		if ( this.isVerticalScroll && this.maxScrollY != 0 && this.scroller.h >= 13 )
			return true;
		return false;
	};
	ScrollObject.prototype._checkPiperImagesH = function() {
		if ( this.isHorizontalScroll && this.maxScrollX != 0 && this.scroller.w >= 13 )
			return true;
		return false;
	};

	ScrollObject.prototype._drawArrow = function ( type ) {
		if ( this.settings.showArrows ) {
			var w = this.canvasW;
			var h = this.canvasH;
			if ( this.isVerticalScroll ) {
				switch ( type ) {
					case ArrowStatus.upLeftArrowHover_downRightArrowNonActive://upArrow mouse hover, downArrow stable
						if ( ScrollOverType.OVER != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_TOP, ScrollOverType.OVER, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.OVER;
						}
						if ( ScrollOverType.STABLE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow( ScrollArrowType.ARROW_BOTTOM, ScrollOverType.STABLE, this.context, w, h );
							this.ScrollOverType2 = ScrollOverType.STABLE;
						}
						break;
					case ArrowStatus.upLeftArrowActive_downRightArrowNonActive://upArrow mouse down, downArrow stable
						if ( ScrollOverType.ACTIVE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_TOP, ScrollOverType.ACTIVE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.ACTIVE;
						}
						if ( ScrollOverType.STABLE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_BOTTOM, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.STABLE;
						}
						break;
					case ArrowStatus.upLeftArrowNonActive_downRightArrowHover://upArrow stable, downArrow mouse hover
						if ( ScrollOverType.STABLE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_TOP, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.STABLE;
						}
						if ( ScrollOverType.OVER != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_BOTTOM, ScrollOverType.OVER, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.OVER;
						}
						break;
					case ArrowStatus.upLeftArrowNonActive_downRightArrowActive://upArrow stable, downArrow mouse down
						if ( ScrollOverType.STABLE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_TOP, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.STABLE;
						}
						if ( ScrollOverType.ACTIVE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_BOTTOM, ScrollOverType.ACTIVE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.ACTIVE;
						}
						break;
					case ArrowStatus.arrowHover://upArrow stable, downArrow mouse down
						if ( ScrollOverType.STABLE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_TOP, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.STABLE;
						}
						if ( ScrollOverType.STABLE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_BOTTOM, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.STABLE;
						}
						break;
					default ://upArrow stable, downArrow stable
						if ( ScrollOverType.NONE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_TOP, ScrollOverType.NONE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.NONE;
						}
						if ( ScrollOverType.NONE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_BOTTOM, ScrollOverType.NONE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.NONE;
						}
						break;
				}
			}
			if ( this.isHorizontalScroll ) {
				switch ( type ) {
					case ArrowStatus.upLeftArrowHover_downRightArrowNonActive://leftArrow mouse hover, rightArrow stable
						if ( ScrollOverType.OVER != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_LEFT, ScrollOverType.OVER, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.OVER;
						}
						if ( ScrollOverType.STABLE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_RIGHT, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.STABLE;
						}
						break;
					case ArrowStatus.upLeftArrowActive_downRightArrowNonActive://leftArrow mouse down, rightArrow stable
						if ( ScrollOverType.ACTIVE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_LEFT, ScrollOverType.ACTIVE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.ACTIVE;
						}
						if ( ScrollOverType.STABLE != this.ScrollOverType2 ) {
//                            this.ArrowDrawer.drawArrow( ScrollArrowType.ARROW_RIGHT, ScrollOverType.STABLE, this.context, w, h );
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_RIGHT, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.STABLE;
						}
						break;
					case ArrowStatus.upLeftArrowNonActive_downRightArrowHover://leftArrow stable, rightArrow mouse hover
						if ( ScrollOverType.STABLE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_LEFT, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.STABLE;
						}
						if ( ScrollOverType.OVER != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_RIGHT, ScrollOverType.OVER, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.OVER;
						}
						break;
					case ArrowStatus.upLeftArrowNonActive_downRightArrowActive://leftArrow stable, rightArrow mouse down
						if ( ScrollOverType.STABLE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_LEFT, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.STABLE;
						}
						if ( ScrollOverType.ACTIVE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_RIGHT, ScrollOverType.ACTIVE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.ACTIVE;
						}
						break;
					case ArrowStatus.arrowHover://upArrow stable, downArrow mouse down
						if ( ScrollOverType.STABLE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_LEFT, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.STABLE;
						}
						if ( ScrollOverType.STABLE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_RIGHT, ScrollOverType.STABLE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.STABLE;
						}
						break;
					default ://leftArrow stable, rightArrow stable
						if ( ScrollOverType.NONE != this.ScrollOverType1 ) {
							this.ArrowDrawer.drawTopLeftArrow(ScrollArrowType.ARROW_LEFT, ScrollOverType.NONE, this.context, w, h);
							this.ScrollOverType1 = ScrollOverType.NONE;
						}
						if ( ScrollOverType.NONE != this.ScrollOverType2 ) {
							this.ArrowDrawer.drawBottomRightArrow(ScrollArrowType.ARROW_RIGHT, ScrollOverType.NONE, this.context, w, h);
							this.ScrollOverType2 = ScrollOverType.NONE;
						}
						break;
				}
			}
		}
	};

	ScrollObject.prototype._setDimension = function ( h, w ) {

		if ( w == this.canvasW && h == this.canvasH )
			return;

		this.ScrollOverType1 = -1;
		this.ScrollOverType2 = -1;

		this.canvasW = w;
		this.canvasH = h;

		if ( !this.IsRetina ) {
			this.canvas.height = h;
			this.canvas.width = w;

			this.context.setTransform( 1, 0, 0, 1, 0, 0 );
		}
		else {
			this.canvas.height = h << 1;
			this.canvas.width = w << 1;

			this.context.setTransform( 2, 0, 0, 2, 0, 0 );
		}
	};
	ScrollObject.prototype._setScrollerHW = function () {
		if ( this.isVerticalScroll ) {
			this.scroller.x = 1;//0;
			this.scroller.w = this.canvasW - 1;
			if ( this.settings.showArrows )
				this.ArrowDrawer.InitSize( this.settings.arrowSizeW, this.settings.arrowSizeH, this.IsRetina );
		}
		else if ( this.isHorizontalScroll ) {
			this.scroller.y = 1;//0;
			this.scroller.h = this.canvasH - 1;
			if ( this.settings.showArrows )
				this.ArrowDrawer.InitSize( this.settings.arrowSizeH, this.settings.arrowSizeW, this.IsRetina );
		}
	};
	ScrollObject.prototype._MouseHoverOnScroller = function ( mp ) {
		if ( mp.x >= this.scroller.x && mp.x <= this.scroller.x + this.scroller.w &&
			mp.y >= this.scroller.y && mp.y <= this.scroller.y + this.scroller.h ) {
			return true;
		}
		else {
			return false;
		}
	};
	ScrollObject.prototype._MouseHoverOnArrowUp = function ( mp ) {
		if ( this.isVerticalScroll ) {
			if (
				mp.x >= 0 &&
				mp.x <= this.canvasW &&
				mp.y >= 0 &&
				mp.y <= this.settings.arrowDim
			) {
				return true;
			}
			else return false;
		}
		if ( this.isHorizontalScroll ) {
			if (
				mp.x >= 0 &&
				mp.x <= this.settings.arrowDim &&
				mp.y >= 0 &&
				mp.y <= this.canvasH
			) {
				return true;
			}
			else return false;
		}
	};
	ScrollObject.prototype._MouseHoverOnArrowDown = function ( mp ) {
		if ( this.isVerticalScroll ) {
			if (
				mp.x >= 0 &&
				mp.x <= this.canvasW &&
				mp.y >= this.canvasH - this.settings.arrowDim &&
				mp.y <= this.canvasH
			) {
				return true;
			}
			else return false;
		}
		if ( this.isHorizontalScroll ) {
			if (
				mp.x >= this.canvasW - this.settings.arrowDim &&
				mp.x <= this.canvasW &&
				mp.y >= 0 &&
				mp.y <= this.canvasH
			) {
				return true;
			}
			else return false;
		}
	};

	ScrollObject.prototype._arrowDownMouseDown = function () {
		var that = this, scrollTimeout, isFirst = true,
			doScroll = function () {
				if ( that.isVerticalScroll )
					that.scrollByY( that.settings.vscrollStep );
				else if ( that.isHorizontalScroll )
					that.scrollByX( that.settings.hscrollStep );
				that._drawArrow( ArrowStatus.upLeftArrowNonActive_downRightArrowActive );
				scrollTimeout = setTimeout( doScroll, isFirst ? that.settings.initialDelay : that.settings.arrowRepeatFreq );
				isFirst = false;
			};
		doScroll();
		this.bind( "mouseup.main mouseout", function () {
			scrollTimeout && clearTimeout( scrollTimeout );
			scrollTimeout = null;
		} );
	};
	ScrollObject.prototype._arrowUpMouseDown = function () {
		var that = this, scrollTimeout, isFirst = true,
			doScroll = function () {
				if ( that.isVerticalScroll )
					that.scrollByY( -that.settings.vscrollStep );
				else if ( that.isHorizontalScroll )
					that.scrollByX( -that.settings.hscrollStep );
				that._drawArrow( ArrowStatus.upLeftArrowActive_downRightArrowNonActive );
				scrollTimeout = setTimeout( doScroll, isFirst ? that.settings.initialDelay : that.settings.arrowRepeatFreq );
				isFirst = false;
			};
		doScroll();
		this.bind( "mouseup.main mouseout", function () {
			scrollTimeout && clearTimeout( scrollTimeout );
			scrollTimeout = null;
		} )
	};

	ScrollObject.prototype.getCurScrolledX = function () {
		return this.scrollHCurrentX;
	};
	ScrollObject.prototype.getCurScrolledY = function () {
		return this.scrollVCurrentY;
	};
	ScrollObject.prototype.getMaxScrolledY = function () {
		return this.maxScrollY;
	};
	ScrollObject.prototype.getMaxScrolledX = function () {
		return this.maxScrollX;
	};
	ScrollObject.prototype.getIsLockedMouse = function () {
		return (this.that.mouseDownArrow || this.that.mouseDown);
	};
	/************************************************************************/
	/*events*/
	ScrollObject.prototype.evt_mousemove = function ( e ) {

		if (this.style)
			this.style.cursor = "default";

		var arrowStat = ArrowStatus.arrowHover;
		var evt = e || window.event;

		if ( evt.preventDefault )
			evt.preventDefault();
		else
			evt.returnValue = false;

		var mousePos = this.that.getMousePosition( evt );
		this.that.EndMousePosition.x = mousePos.x;
		this.that.EndMousePosition.y = mousePos.y;
		var downHover = this.that._MouseHoverOnArrowDown( mousePos ),
			upHover = this.that._MouseHoverOnArrowUp( mousePos ),
			scrollerHover = this.that._MouseHoverOnScroller( mousePos );

		if ( scrollerHover ) {
			this.that.scrollerStatus = ScrollOverType.OVER;
			arrowStat = ArrowStatus.arrowHover;
		}
		else if ( this.that.settings.showArrows && (downHover || upHover) ) {
			this.that.scrollerStatus = ScrollOverType.OVER;
			if ( !this.that.mouseDownArrow ) {
				if ( upHover ) {
					arrowStat = ArrowStatus.upLeftArrowHover_downRightArrowNonActive;
				}
				else if ( downHover ) {
					arrowStat = ArrowStatus.upLeftArrowNonActive_downRightArrowHover
				}
			}
		}
		else {
			if ( this.that.mouseover ) {
				arrowStat = ArrowStatus.arrowHover;
			}
			this.that.scrollerStatus = ScrollOverType.OVER;
		}
		if ( this.that.mouseDown && this.that.scrollerMouseDown ) {
			this.that.moveble = true;
		}
		else {
			this.that.moveble = false;
		}

		if ( this.that.isVerticalScroll ) {
			if ( this.that.moveble && this.that.scrollerMouseDown ) {
				var isTop = false, isBottom = false;
				this.that.scrollerStatus = ScrollOverType.ACTIVE;
				var _dlt = this.that.EndMousePosition.y - this.that.StartMousePosition.y;
				if ( this.that.EndMousePosition.y == this.that.StartMousePosition.y ) {
					return;
				}
				else if ( this.that.EndMousePosition.y < this.that.arrowPosition ) {
					this.that.EndMousePosition.y = this.that.arrowPosition;
					_dlt = 0;
					this.that.scroller.y = this.that.arrowPosition;
				}
				else if ( this.that.EndMousePosition.y > this.that.canvasH - this.that.arrowPosition ) {
					this.that.EndMousePosition.y = this.that.canvasH - this.that.arrowPosition;
					_dlt = 0;
					this.that.scroller.y = this.that.canvasH - this.that.arrowPosition - this.that.scroller.h;
				}
				else {
					if ( (_dlt > 0 && this.that.scroller.y + _dlt + this.that.scroller.h <= this.that.canvasH - this.that.arrowPosition ) ||
						(_dlt < 0 && this.that.scroller.y + _dlt >= this.that.arrowPosition) ) {
						this.that.scroller.y += _dlt;
					}
				}

				var destY = (this.that.scroller.y - this.that.arrowPosition) * this.that.scrollCoeff;
				//var result = editor.WordControl.CorrectSpeedVerticalScroll(destY);
				var result = this.that._correctScrollV( this.that, destY );
				if ( result != null && result.isChange === true ) {
					destY = result.Pos;
				}

				this.that._scrollV( this.that, evt, destY, isTop, isBottom );
				this.that.moveble = false;
				this.that.StartMousePosition.x = this.that.EndMousePosition.x;
				this.that.StartMousePosition.y = this.that.EndMousePosition.y;
			}
		}
		else if ( this.that.isHorizontalScroll ) {
			if ( this.that.moveble && this.that.scrollerMouseDown ) {

				var isTop = false, isBottom = false;
				this.that.scrollerStatus = ScrollOverType.ACTIVE;
				var _dlt = this.that.EndMousePosition.x - this.that.StartMousePosition.x;
				if ( this.that.EndMousePosition.x == this.that.StartMousePosition.x )
					return;
				else if ( this.that.EndMousePosition.x < this.that.arrowPosition ) {
					this.that.EndMousePosition.x = this.that.arrowPosition;
					_dlt = 0;
					this.that.scroller.x = this.that.arrowPosition;
				}
				else if ( this.that.EndMousePosition.x > this.that.canvasW - this.that.arrowPosition ) {
					this.that.EndMousePosition.x = this.that.canvasW - this.that.arrowPosition;
					_dlt = 0;
					this.that.scroller.x = this.that.canvasW - this.that.arrowPosition - this.that.scroller.w;
				}
				else {
					if ( (_dlt > 0 && this.that.scroller.x + _dlt + this.that.scroller.w <= this.that.canvasW - this.that.arrowPosition ) ||
						(_dlt < 0 && this.that.scroller.x + _dlt >= this.that.arrowPosition) )
						this.that.scroller.x += _dlt;
				}
				var destX = (this.that.scroller.x - this.that.arrowPosition) * this.that.scrollCoeff

				this.that._scrollH( this.that, evt, destX, isTop, isBottom );
				this.that.moveble = false;

				this.that.StartMousePosition.x = this.that.EndMousePosition.x;
				this.that.StartMousePosition.y = this.that.EndMousePosition.y;
			}
		}

		if ( !this.that.mouseDownArrow ) {
			this.that._drawArrow( arrowStat );
		}
		if ( this.that.lastScrollerStatus != this.that.scrollerStatus ) {
			this.that._draw();
		}

	};
	ScrollObject.prototype.evt_mouseout = function ( e ) {

		var evt = e || window.event;

		if ( this.that.settings.showArrows ) {
			this.that.mouseDownArrow = false;
			this.that.handleEvents( "onmouseout", evt );
		}

		if ( !this.that.moveble ) {
			this.that.scrollerStatus = ScrollOverType.NONE;
			this.that._drawArrow();
		}

		if ( this.that.lastScrollerStatus != this.that.scrollerStatus ) {
			this.that._draw();
		}

	};
	ScrollObject.prototype.evt_mouseover = function ( e ) {

		this.that.mouseover = true;

	};
	ScrollObject.prototype.evt_mouseup = function ( e ) {
		var evt = e || window.event;

		this.that.handleEvents( "onmouseup", evt );

		// prevent pointer events on all iframes (while only plugin!)
		if (window.g_asc_plugins)
			window.g_asc_plugins.enablePointerEvents();

		if ( evt.preventDefault )
			evt.preventDefault();
		else
			evt.returnValue = false;

		var mousePos = this.that.getMousePosition( evt );
		this.that.scrollTimeout && clearTimeout( this.that.scrollTimeout );
		this.that.scrollTimeout = null;
		if ( this.that.scrollerMouseDown ) {
			this.that.mouseDown = false;
			this.that.mouseUp = true;
			this.that.scrollerMouseDown = false;
			this.that.mouseDownArrow = false;
			if ( this.that._MouseHoverOnScroller( mousePos ) ) {
				this.that.scrollerStatus = ScrollOverType.OVER;
			}
			else {
				this.that.scrollerStatus = ScrollOverType.NONE;
			}
			this.that._drawArrow();
			this.that._draw();
		} else {
			if ( this.that.settings.showArrows && this.that._MouseHoverOnArrowDown( mousePos ) ) {
				this.that._drawArrow( ArrowStatus.upLeftArrowNonActive_downRightArrowHover );
			}
			else if ( this.that.settings.showArrows && this.that._MouseHoverOnArrowUp( mousePos ) ) {
				this.that._drawArrow( ArrowStatus.upLeftArrowHover_downRightArrowNonActive );
			}
			this.that.mouseDownArrow = false;
		}

		//for unlock global mouse event
		if ( this.that.onLockMouse && this.that.offLockMouse ) {
			this.that.offLockMouse( evt );
		}
	};
	ScrollObject.prototype.evt_mousedown = function ( e ) {
		var evt = e || window.event;

		// prevent pointer events on all iframes (while only plugin!)
		if (window.g_asc_plugins)
			window.g_asc_plugins.disablePointerEvents();

		// если сделать превент дефолт - перестанет приходить mousemove от window
		/*
		 if (evt.preventDefault)
		 evt.preventDefault();
		 else
		 evt.returnValue = false;
		 */

		var mousePos = this.that.getMousePosition( evt ),
			downHover = this.that._MouseHoverOnArrowDown( mousePos ),
			upHover = this.that._MouseHoverOnArrowUp( mousePos );

		if ( this.that.settings.showArrows && downHover ) {
			this.that.mouseDownArrow = true;
			this.that._arrowDownMouseDown();
		}
		else if ( this.that.settings.showArrows && upHover ) {
			this.that.mouseDownArrow = true;
			this.that._arrowUpMouseDown();
		}
		else {
			this.that.mouseDown = true;
			this.that.mouseUp = false;

			if ( this.that._MouseHoverOnScroller( mousePos ) ) {
				this.that.scrollerMouseUp = false;
				this.that.scrollerMouseDown = true;

				if ( this.that.onLockMouse ) {
					this.that.onLockMouse( evt );
				}
				this.that.StartMousePosition.x = mousePos.x;
				this.that.StartMousePosition.y = mousePos.y;
				this.that.scrollerStatus = ScrollOverType.ACTIVE;
				this.that._draw();
			}
			else {
				if ( this.that.isVerticalScroll ) {
					var _tmp = this,
						direction = mousePos.y - this.that.scroller.y - this.that.scroller.h / 2,
						step = this.that.paneHeight * this.that.settings.scrollPagePercent,
//                        verticalDragPosition = this.that.scroller.y,
						isFirst = true,
						doScroll = function () {
							_tmp.that.lock = true;
							if ( direction > 0 ) {
								if ( _tmp.that.scroller.y + _tmp.that.scroller.h / 2 + step < mousePos.y ) {
									_tmp.that.scrollByY( step * _tmp.that.scrollCoeff );
								}
								else {
									var _step = Math.abs( _tmp.that.scroller.y + _tmp.that.scroller.h / 2 - mousePos.y );
									_tmp.that.scrollByY( _step * _tmp.that.scrollCoeff );
									cancelClick();
									return;
								}
							}
							else if ( direction < 0 ) {
								if ( _tmp.that.scroller.y + _tmp.that.scroller.h / 2 - step > mousePos.y ) {
									_tmp.that.scrollByY( -step * _tmp.that.scrollCoeff );
								}
								else {
									var _step = Math.abs( _tmp.that.scroller.y + _tmp.that.scroller.h / 2 - mousePos.y );
									_tmp.that.scrollByY( -_step * _tmp.that.scrollCoeff );
									cancelClick();
									return;
								}
							}
							_tmp.that.scrollTimeout = setTimeout( doScroll, isFirst ? _tmp.that.settings.initialDelay : _tmp.that.settings.trackClickRepeatFreq );
							isFirst = false;
							_tmp.that._drawArrow( ArrowStatus.arrowHover );
						},
						cancelClick = function () {
							_tmp.that.scrollTimeout && clearTimeout( _tmp.that.scrollTimeout );
							_tmp.that.scrollTimeout = null;
							_tmp.that.unbind( "mouseup.main", cancelClick );
							_tmp.that.lock = false;
						};

					if ( this.that.onLockMouse ) {
						this.that.onLockMouse( evt );
					}

					doScroll();
					this.that.bind( "mouseup.main", cancelClick );
				}
				if ( this.that.isHorizontalScroll ) {
					var _tmp = this,
						direction = mousePos.x - this.that.scroller.x - this.that.scroller.w / 2,
						step = this.that.paneWidth * this.that.settings.scrollPagePercent,
//                        horizontalDragPosition = this.that.scroller.x,
						isFirst = true,
						doScroll = function () {
							_tmp.that.lock = true;
							if ( direction > 0 ) {
								if ( _tmp.that.scroller.x + _tmp.that.scroller.w / 2 + step < mousePos.x ) {
									_tmp.that.scrollByX( step * _tmp.that.scrollCoeff );
								}
								else {
									var _step = Math.abs( _tmp.that.scroller.x + _tmp.that.scroller.w / 2 - mousePos.x );
									_tmp.that.scrollByX( _step * _tmp.that.scrollCoeff );
									cancelClick();
									return;
								}
							}
							else if ( direction < 0 ) {
								if ( _tmp.that.scroller.x + _tmp.that.scroller.w / 2 - step > mousePos.x ) {
									_tmp.that.scrollByX( -step * _tmp.that.scrollCoeff );
								}
								else {
									var _step = Math.abs( _tmp.that.scroller.x + _tmp.that.scroller.w / 2 - mousePos.x );
									_tmp.that.scrollByX( -_step * _tmp.that.scrollCoeff );
									cancelClick();
									return;
								}
							}
							_tmp.that.scrollTimeout = setTimeout( doScroll, isFirst ? _tmp.that.settings.initialDelay : _tmp.that.settings.trackClickRepeatFreq );
							isFirst = false;
							_tmp.that._drawArrow( ArrowStatus.arrowHover );
						},
						cancelClick = function () {
							_tmp.that.scrollTimeout && clearTimeout( _tmp.that.scrollTimeout );
							_tmp.that.scrollTimeout = null;
							_tmp.that.unbind( "mouseup.main", cancelClick );
							_tmp.that.lock = false;
						};

					if ( this.that.onLockMouse ) {
						this.that.onLockMouse( evt );
					}

					doScroll();
					this.that.bind( "mouseup.main", cancelClick );
				}
			}
		}
	};
	ScrollObject.prototype.evt_mousewheel = function ( e ) {
		var evt = e || window.event;
		/* if ( evt.preventDefault )
		 evt.preventDefault();
		 else
		 evt.returnValue = false;*/

		var delta = 1;
		if ( this.that.isHorizontalScroll ) return;
		if ( undefined != evt.wheelDelta )
			delta = (evt.wheelDelta > 0) ? -this.that.settings.vscrollStep : this.that.settings.vscrollStep;
		else
			delta = (evt.detail > 0) ? this.that.settings.vscrollStep : -this.that.settings.vscrollStep;
		delta *= this.that.settings.wheelScrollLines;
		this.that.scroller.y += delta;
		if ( this.that.scroller.y < 0 ) {
			this.that.scroller.y = 0;
		}
		else if ( this.that.scroller.y + this.that.scroller.h > this.that.canvasH ) {
			this.that.scroller.y = this.that.canvasH - this.that.arrowPosition - this.that.scroller.h;
		}
		this.that.scrollByY( delta )
	};
	ScrollObject.prototype.evt_click = function ( e ) {
		var evt = e || window.event;
		var mousePos = this.that.getMousePosition( evt );
		if ( this.that.isHorizontalScroll ) {
			if ( mousePos.x > this.arrowPosition && mousePos.x < this.that.canvasW - this.that.arrowPosition ) {
				if ( this.that.scroller.x > mousePos.x ) {
					this.that.scrollByX( -this.that.settings.vscrollStep );
				}
				if ( this.that.scroller.x < mousePos.x && this.that.scroller.x + this.that.scroller.w > mousePos.x ) {
					return false;
				}
				if ( this.that.scroller.x + this.that.scroller.w < mousePos.x ) {
					this.that.scrollByX( this.that.settings.hscrollStep );
				}
			}
		}
		if ( this.that.isVerticalScroll ) {
			if ( mousePos.y > this.that.arrowPosition && mousePos.y < this.that.canvasH - this.that.arrowPosition ) {
				if ( this.that.scroller.y > mousePos.y ) {
					this.that.scrollByY( -this.that.settings.vscrollStep );
				}
				if ( this.that.scroller.y < mousePos.y && this.that.scroller.y + this.that.scroller.h > mousePos.y ) {
					return false;
				}
				if ( this.that.scroller.y + this.that.scroller.h < mousePos.y ) {
					this.that.scrollByY( this.that.settings.hscrollStep );
				}
			}
		}
	};

	/************************************************************************/
	ScrollObject.prototype.bind = function(types_string, handler)
	{
		var types = types_string.split(" ");
		/*
		 * loop through types and attach event listeners to
		 * each one.  eg. "click mouseover.namespace mouseout"
		 * will create three event bindings
		 */
		for (var i = 0; i < types.length; i++)
		{
			var type = types[i];
			var event = (type.indexOf("touch") === -1) ? 'on' + type : type;
			var parts = event.split(".");
			var baseEvent = parts[0];
			var name = parts.length > 1 ? parts[1] : "";

			if (!this.eventListeners[baseEvent])
				this.eventListeners[baseEvent] = [];

			this.eventListeners[baseEvent].push({ name: name, handler: handler });
		}
	};
	ScrollObject.prototype.unbind = function(types_string)
	{
		var types = types_string.split(" ");
		for (var i = 0; i < types.length; i++)
		{
			var type = types[i];
			var event = (type.indexOf("touch") === -1) ? 'on' + type : type;
			var parts = event.split(".");
			var baseEvent = parts[0];

			if ( this.eventListeners[baseEvent] && parts.length > 1 )
			{
				var name = parts[1];
				for (var j = 0; j < this.eventListeners[baseEvent].length; j++ )
				{
					if (this.eventListeners[baseEvent][j].name === name)
					{
						this.eventListeners[baseEvent].splice(j, 1);
						if (this.eventListeners[baseEvent].length === 0)
						{
							this.eventListeners[baseEvent] = undefined;
						}
						break;
					}
				}
			}
			else
			{
				this.eventListeners[baseEvent] = undefined;
			}
		}
	};
	ScrollObject.prototype.handleEvents = function(eventType, params) {
		var events = this.eventListeners;
		if (events[eventType])
		{
			for (var i = 0, length = events[eventType].length; i < length; i++)
			{
				events[eventType][i].handler.apply(this, [params]);
			}
		}
	};

	window["AscCommon"].ScrollSettings = ScrollSettings;
	window["AscCommon"].ScrollObject = ScrollObject;
})(window);
