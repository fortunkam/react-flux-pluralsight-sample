/*eslint-disable strict */ //Disable check because we can't run strict mode, Need global vars.

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
var $ = require('jquery');
var JQuery = require('jquery');

window.$ = $;
window.jQuery = JQuery;

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;