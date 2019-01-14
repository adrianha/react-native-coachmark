import React, { Component } from 'react';
import { View, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import CoachmarkView from './CoachmarkView';
import { K_POSITION_BOTTOM, K_POSITION_TOP } from './CoachmarkArrow';

export default class Coachmark extends Component {
  static propTypes = {
    autoShow: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    isAnchorReady: PropTypes.bool,
    renderArrow: PropTypes.func
  };

  static defaultProps = {
    autoShow: false,
    onHide: () => {}, // eslint-disable-line no-empty-function
    onShow: () => {}, // eslint-disable-line no-empty-function
    isAnchorReady: true,
    renderArrow: null
  };

  constructor(props) {
    super(props);
    this.view = React.createRef();
    this.state = {
      visible: false,
      childStyle: {},
    };
  }

  show = () => {
    return new Promise((resolve, reject) => {
      this.interval = setInterval(() => {
        this._isInViewPort().then(isInViewPort => {
          if (isInViewPort) {
            this._stopWatching();
            resolve(this._handleShow());
          }
        });
      }, 100);
    });
  };

  hide = () => {
    return this._handleHide();
  };

  _isInViewPort = () => {
    return new Promise(resolve => {
      if (!this.props.isAnchorReady || !this.view || !this.view.current) {
        return resolve(false);
      }
      this.view.current.measure((x, y, width, height, pageX, pageY) => {
        const windowHeight = Dimensions.get('window').height;
        const windowWidth = Dimensions.get('window').width;
        const rectBottom = pageY + height;
        const rectTop = pageY;
        const rectLeft = x;
        const rectRight = x + width;
        const isInViewPort = rectBottom <= windowHeight && rectTop >= 0 && rectLeft >= 0 && rectRight <= windowWidth;
        if (isInViewPort) {
          this.setState({
            childStyle: {
              top: pageY,
              left: pageX,
              width,
              height,
            },
            position: pageY > Dimensions.get('window').height - (pageY + height) ? 'bottom' : 'top',
          });
        }
        resolve(isInViewPort);
      });
    });
  };

  _handleShow = () => {
    this.props.onShow();
    this.setState({
      visible: true,
    });
    return new Promise(resolve => {
      this.interval = setInterval(() => {
        if (!this.state.visible) {
          this._stopWatching();
          resolve();
        }
      }, 16);
    });
  };

  _handleHide = () => {
    this.setState(
      {
        visible: false,
      },
      () => {
        this.props.onHide();
      }
    );
  };

  _stopWatching = () => {
    this.interval = clearInterval(this.interval);
  };

  _measureLayout = () => {
    if (this.props.autoShow) this.show();
  };

  _renderChildren = () => {
    return <View style={[styles.child, this.state.childStyle]}>{this.props.children}</View>;
  };

  _renderCoachmark = () => {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          ...(this.state.position === K_POSITION_TOP
            ? { top: this.state.childStyle.top + this.state.childStyle.height }
            : {
                bottom: Dimensions.get('window').height - this.state.childStyle.top,
              }),
        }}
      >
        <CoachmarkView
          x={this.state.childStyle.left + this.state.childStyle.width / 2}
          position={this.state.position}
          message={this.props.message}
          renderArrow={this.props.renderArrow}
        />
      </View>
    );
  };

  render() {
    const { contentContainerStyle } = this.props;
    return (
      <React.Fragment>
        <View ref={this.view} style={contentContainerStyle} onLayout={this._measureLayout}>
          {React.Children.only(this.props.children)}
        </View>
        <Modal animationType="fade" transparent visible={this.state.visible}>
          <View style={styles.backdrop} />
          {this.state.position === K_POSITION_BOTTOM ? (
            <React.Fragment>
              {this._renderCoachmark()}
              {this._renderChildren()}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this._renderChildren()}
              {this._renderCoachmark()}
            </React.Fragment>
          )}
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = {
  backdrop: [
    StyleSheet.absoluteFill,
    {
      backgroundColor: 'rgba(27,27,27,0.9)',
    },
  ],
  child: {
    position: 'absolute',
  },
};
