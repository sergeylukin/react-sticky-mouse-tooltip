function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';

class MouseTooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "state", {
      xPosition: 0,
      yPosition: 0,
      mouseMoved: false,
      listenerActive: false,
      shouldFlipHorizontally: false,
      shouldFlipVertically: false
    });

    _defineProperty(this, "getTooltipPosition", ({
      clientX: xPosition,
      clientY: yPosition
    }) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const containerWidth = this.containerRef.current.clientWidth;
      const containerHeight = this.containerRef.current.clientHeight;
      const shouldFlipHorizontally = xPosition + containerWidth > w;
      const shouldFlipVertically = yPosition + containerHeight > h;
      this.setState({
        xPosition,
        yPosition,
        mouseMoved: true,
        shouldFlipHorizontally,
        shouldFlipVertically
      });
    });

    _defineProperty(this, "addListener", () => {
      window.addEventListener('mousemove', this.getTooltipPosition);
      this.setState({
        listenerActive: true
      });
    });

    _defineProperty(this, "removeListener", () => {
      window.removeEventListener('mousemove', this.getTooltipPosition);
      this.setState({
        listenerActive: false
      });
    });

    _defineProperty(this, "updateListener", () => {
      if (!this.state.listenerActive && this.props.visible) {
        this.addListener();
      }

      if (this.state.listenerActive && !this.props.visible) {
        this.removeListener();
      }
    });

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.addListener();
  }

  componentDidUpdate() {
    this.updateListener();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const left = this.state.shouldFlipHorizontally ? this.state.xPosition - this.containerRef.current.clientWidth - this.props.offsetX : this.state.xPosition + this.props.offsetX;
    const top = this.state.shouldFlipVertically ? this.state.yPosition - this.containerRef.current.clientHeight - this.props.offsetY : this.state.yPosition + this.props.offsetY;
    return React.createElement("div", {
      className: this.props.className,
      ref: this.containerRef,
      style: _objectSpread({
        display: this.props.visible && this.state.mouseMoved ? 'block' : 'none',
        position: 'fixed',
        top,
        left
      }, this.props.style)
    }, this.props.children);
  }

}

_defineProperty(MouseTooltip, "defaultProps", {
  visible: true,
  offsetX: 0,
  offsetY: 0
});

MouseTooltip.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
export default MouseTooltip;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb3VzZVRvb2x0aXAuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiTW91c2VUb29sdGlwIiwiUHVyZUNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJ4UG9zaXRpb24iLCJ5UG9zaXRpb24iLCJtb3VzZU1vdmVkIiwibGlzdGVuZXJBY3RpdmUiLCJzaG91bGRGbGlwSG9yaXpvbnRhbGx5Iiwic2hvdWxkRmxpcFZlcnRpY2FsbHkiLCJjbGllbnRYIiwiY2xpZW50WSIsInciLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaCIsImlubmVySGVpZ2h0IiwiY29udGFpbmVyV2lkdGgiLCJjb250YWluZXJSZWYiLCJjdXJyZW50IiwiY2xpZW50V2lkdGgiLCJjb250YWluZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJzZXRTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRUb29sdGlwUG9zaXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3RhdGUiLCJ2aXNpYmxlIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsImNyZWF0ZVJlZiIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50RGlkVXBkYXRlIiwidXBkYXRlTGlzdGVuZXIiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbmRlciIsImxlZnQiLCJvZmZzZXRYIiwidG9wIiwib2Zmc2V0WSIsImNsYXNzTmFtZSIsImRpc3BsYXkiLCJwb3NpdGlvbiIsInN0eWxlIiwiY2hpbGRyZW4iLCJwcm9wVHlwZXMiLCJib29sIiwibm9kZSIsImlzUmVxdWlyZWQiLCJudW1iZXIiLCJzdHJpbmciLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLE1BQU1DLFlBQU4sU0FBMkJGLEtBQUssQ0FBQ0csYUFBakMsQ0FBK0M7QUFPN0NDLEVBQUFBLFdB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b3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmNsYXNzIE1vdXNlVG9vbHRpcCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHZpc2libGU6IHRydWUsXG4gICAgb2Zmc2V0WDogMCxcbiAgICBvZmZzZXRZOiAwLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICB4UG9zaXRpb246IDAsXG4gICAgeVBvc2l0aW9uOiAwLFxuICAgIG1vdXNlTW92ZWQ6IGZhbHNlLFxuICAgIGxpc3RlbmVyQWN0aXZlOiBmYWxzZSxcbiAgICBzaG91bGRGbGlwSG9yaXpvbnRhbGx5OiBmYWxzZSxcbiAgICBzaG91bGRGbGlwVmVydGljYWxseTogZmFsc2UsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMudXBkYXRlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIGdldFRvb2x0aXBQb3NpdGlvbiA9ICh7IGNsaWVudFg6IHhQb3NpdGlvbiwgY2xpZW50WTogeVBvc2l0aW9uIH0pID0+IHtcbiAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gdGhpcy5jb250YWluZXJSZWYuY3VycmVudC5jbGllbnRIZWlnaHQ7XG4gICAgY29uc3Qgc2hvdWxkRmxpcEhvcml6b250YWxseSA9ICh4UG9zaXRpb24gKyBjb250YWluZXJXaWR0aCA+IHcpO1xuICAgIGNvbnN0IHNob3VsZEZsaXBWZXJ0aWNhbGx5ID0gKHlQb3NpdGlvbiArIGNvbnRhaW5lckhlaWdodCA+IGgpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgeFBvc2l0aW9uLFxuICAgICAgeVBvc2l0aW9uLFxuICAgICAgbW91c2VNb3ZlZDogdHJ1ZSxcbiAgICAgIHNob3VsZEZsaXBIb3Jpem9udGFsbHksXG4gICAgICBzaG91bGRGbGlwVmVydGljYWxseSxcbiAgICB9KTtcbiAgfTtcblxuICBhZGRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5nZXRUb29sdGlwUG9zaXRpb24pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBsaXN0ZW5lckFjdGl2ZTogdHJ1ZSB9KTtcbiAgfTtcblxuICByZW1vdmVMaXN0ZW5lciA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5nZXRUb29sdGlwUG9zaXRpb24pO1xuICAgIHRoaXMuc2V0U3RhdGUoeyBsaXN0ZW5lckFjdGl2ZTogZmFsc2UgfSk7XG4gIH07XG5cbiAgdXBkYXRlTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmxpc3RlbmVyQWN0aXZlICYmIHRoaXMucHJvcHMudmlzaWJsZSkge1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmxpc3RlbmVyQWN0aXZlICYmICF0aGlzLnByb3BzLnZpc2libGUpIHtcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGxlZnQgPSAodGhpcy5zdGF0ZS5zaG91bGRGbGlwSG9yaXpvbnRhbGx5XG4gICAgICA/IHRoaXMuc3RhdGUueFBvc2l0aW9uIC0gdGhpcy5jb250YWluZXJSZWYuY3VycmVudC5jbGllbnRXaWR0aCAtIHRoaXMucHJvcHMub2Zmc2V0WFxuICAgICAgOiB0aGlzLnN0YXRlLnhQb3NpdGlvbiArIHRoaXMucHJvcHMub2Zmc2V0WCk7XG4gICAgY29uc3QgdG9wID0gKHRoaXMuc3RhdGUuc2hvdWxkRmxpcFZlcnRpY2FsbHlcbiAgICAgID8gdGhpcy5zdGF0ZS55UG9zaXRpb24gLSB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50LmNsaWVudEhlaWdodCAtIHRoaXMucHJvcHMub2Zmc2V0WVxuICAgICAgOiB0aGlzLnN0YXRlLnlQb3NpdGlvbiArIHRoaXMucHJvcHMub2Zmc2V0WSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgcmVmPXt0aGlzLmNvbnRhaW5lclJlZn1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiB0aGlzLnByb3BzLnZpc2libGUgJiYgdGhpcy5zdGF0ZS5tb3VzZU1vdmVkID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICB0b3AsXG4gICAgICAgICAgbGVmdCxcbiAgICAgICAgICAuLi50aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTW91c2VUb29sdGlwLnByb3BUeXBlcyA9IHtcbiAgdmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBvZmZzZXRYOiBQcm9wVHlwZXMubnVtYmVyLFxuICBvZmZzZXRZOiBQcm9wVHlwZXMubnVtYmVyLFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L2ZvcmJpZC1wcm9wLXR5cGVzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3VzZVRvb2x0aXA7XG4iXX0=