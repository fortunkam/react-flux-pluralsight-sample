"use strict";

var React = require('react');

var SelectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        items: React.PropTypes.array.isRequired,
        textProperty: React.PropTypes.func.isRequired,
        valueProperty: React.PropTypes.func.isRequired,
        selectedValue: React.PropTypes.string,
        error: React.PropTypes.string
    },
    render: function() {
        var wrapperClass = "form-group";
        if(this.props.error && this.props.error.length > 0){
            wrapperClass += " " + 'has-error';
        }
        var createOptionRow = function(i){
            return (
                <option key={this.props.valueProperty(i)}
                    value={this.props.valueProperty(i)} >{this.props.textProperty(i)}</option>
            );
        };
        return (
           <div className={wrapperClass}>
               <label htmlFor={this.props.name}>{this.props.label}</label>
               <div className="field">
                    <select className="form-control" name={this.props.name} value={this.props.selectedValue} onChange={this.props.onChange}>
                        {this.props.items.map(createOptionRow, this)}
                    </select>
               </div>
           </div>
        );
    }
});

module.exports = SelectInput;