require('normalize.css');
require('styles/App.css');
require('cloudant');
require('../connect.js');
import React from 'react';

class ShoppingListComponent extends React.Component {

  getInitialState() {
    return {
      username: '',
      lastGistUrl: ''
    };
  }

  componentDidMount() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  // render: function() {
  //   return (
  //     <div>
  //       {this.state.username}'s last gist is
  //       <a href={this.state.lastGistUrl}>here</a>.
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="index">
        <ol>
          <li></li>
          <li></li>
        </ol>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

ShoppingListComponent.defaultProps = {
};

export default ShoppingListComponent;
