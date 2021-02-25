import React from "react";

class OpportunityHeader extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="ui segment">
        {this.props.opp ? (
          <>
            <h1 className="ui header">
              {this.props.opp.name}
              <div className="sub header">{this.props.opp.industry}</div>
            </h1>
          </>
        ) : null}
      </div>
    );
  }
}
export default OpportunityHeader;
