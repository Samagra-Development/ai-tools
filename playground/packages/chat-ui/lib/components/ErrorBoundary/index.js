"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorBoundary = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["FallbackComponent", "children"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ErrorBoundary, _React$Component);
  var _super = _createSuper(ErrorBoundary);
  function ErrorBoundary(props) {
    var _this;
    (0, _classCallCheck2.default)(this, ErrorBoundary);
    _this = _super.call(this, props);
    _this.state = {
      error: null,
      errorInfo: null
    };
    return _this;
  }
  (0, _createClass2.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      var onError = this.props.onError;
      if (onError) {
        onError(error, errorInfo);
      }
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        FallbackComponent = _this$props.FallbackComponent,
        children = _this$props.children,
        rest = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var _this$state = this.state,
        error = _this$state.error,
        errorInfo = _this$state.errorInfo;
      if (errorInfo) {
        if (FallbackComponent) {
          return /*#__PURE__*/_react.default.createElement(FallbackComponent, (0, _extends2.default)({
            error: error,
            errorInfo: errorInfo
          }, rest));
        }
        return null;
      }
      return children;
    }
  }]);
  return ErrorBoundary;
}(_react.default.Component);
exports.ErrorBoundary = ErrorBoundary;