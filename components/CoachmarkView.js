import React, { Component } from 'react';
import CoachmarkContent from './CoachmarkContent';
import CoachmarkArrow, { K_POSITION_TOP } from './CoachmarkArrow';

export default class CoachmarkView extends Component {
  static defaultProps = {
    position: K_POSITION_TOP,
  };

  renderCoachmarkContent() {
    return <CoachmarkContent message={this.props.message} />;
  }

  renderCoachmarArrow() {
    return <CoachmarkArrow x={this.props.x} position={this.props.position} />;
  }

  render() {
    return this.props.position === K_POSITION_TOP ? (
      <React.Fragment>
        {this.renderCoachmarArrow()}
        {this.renderCoachmarkContent()}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {this.renderCoachmarkContent()}
        {this.renderCoachmarArrow()}
      </React.Fragment>
    );
  }
}
