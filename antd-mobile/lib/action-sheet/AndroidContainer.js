'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _Modal = require('rc-dialog/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ActionSheetAndroid = function (_React$Component) {
    (0, _inherits3['default'])(ActionSheetAndroid, _React$Component);

    function ActionSheetAndroid(props) {
        (0, _classCallCheck3['default'])(this, ActionSheetAndroid);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (ActionSheetAndroid.__proto__ || Object.getPrototypeOf(ActionSheetAndroid)).call(this, props));

        _this.state = {
            visible: _this.props.visible || false
        };
        return _this;
    }

    (0, _createClass3['default'])(ActionSheetAndroid, [{
        key: 'confirm',
        value: function confirm(index) {
            var callback = this.props.callback;

            if (callback) {
                callback(index);
            }
            this.setState({
                visible: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                share = _props.share,
                onAnimationEnd = _props.onAnimationEnd;
            var title = config.title,
                message = config.message,
                url = config.url,
                options = config.options,
                destructiveButtonIndex = config.destructiveButtonIndex,
                cancelButtonIndex = config.cancelButtonIndex,
                excludedActivityTypes = config.excludedActivityTypes;

            var titleMsg = share ? !!url && _react2['default'].createElement(
                _reactNative.View,
                { style: _style2['default'].title, key: '0' },
                _react2['default'].createElement(
                    _reactNative.Text,
                    null,
                    url
                )
            ) : !!title && _react2['default'].createElement(
                _reactNative.View,
                { style: _style2['default'].title, key: '0' },
                _react2['default'].createElement(
                    _reactNative.Text,
                    { style: _style2['default'].titleText },
                    title
                )
            );
            var content = share ? excludedActivityTypes.map(function (item, index) {
                return _react2['default'].createElement(
                    _reactNative.View,
                    { key: index },
                    item
                );
            }) : options.map(function (item, index) {
                return _react2['default'].createElement(
                    _reactNative.View,
                    { key: index, style: [cancelButtonIndex === index ? _style2['default'].cancelBtn : undefined] },
                    _react2['default'].createElement(
                        _reactNative.TouchableHighlight,
                        { style: [_style2['default'].btn], underlayColor: _style.vars.fill_tap, onPress: function onPress() {
                                return _this2.confirm(index);
                            } },
                        _react2['default'].createElement(
                            _reactNative.Text,
                            { style: [destructiveButtonIndex === index ? _style2['default'].destructiveBtn : undefined] },
                            item
                        )
                    ),
                    cancelButtonIndex === index ? _react2['default'].createElement(_reactNative.View, { style: _style2['default'].cancelBtnMask }) : null
                );
            });
            return _react2['default'].createElement(
                _reactNative.View,
                { style: _style2['default'].container },
                _react2['default'].createElement(
                    _Modal2['default'],
                    { animationDuration: 200, animateAppear: true, visible: this.state.visible, onAnimationEnd: onAnimationEnd, style: _style2['default'].content, animationType: 'slide-up', maskClosable: true, onClose: function onClose() {
                            return _this2.confirm(cancelButtonIndex || -1);
                        } },
                    _react2['default'].createElement(
                        _reactNative.View,
                        null,
                        titleMsg,
                        !!message && _react2['default'].createElement(
                            _reactNative.View,
                            { style: _style2['default'].message, key: '1' },
                            _react2['default'].createElement(
                                _reactNative.Text,
                                null,
                                message
                            )
                        ),
                        _react2['default'].createElement(
                            _reactNative.View,
                            null,
                            content
                        )
                    )
                )
            );
        }
    }]);
    return ActionSheetAndroid;
}(_react2['default'].Component);

ActionSheetAndroid.defaultProps = {
    share: false
};
exports['default'] = ActionSheetAndroid;
module.exports = exports['default'];