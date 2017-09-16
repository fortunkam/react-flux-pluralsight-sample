"use strict";

var React = require('react');
var Input = require('../common/textInput');
var SelectInput = require('../common/SelectInput');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        authors: React.PropTypes.array.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        error: React.PropTypes.object
    },
    getAuthorValue: (author) => author.id,
    getAuthorText: (author) => author.firstName + ' ' + author.lastName,
    render: function(){
        
        return (
            <form>
                 <h1>Edit Course</h1>
                 <Input 
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title} />

                <Input 
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category} />

                <SelectInput name="author"
                    label="Author"
                    selectedValue={this.props.course.author.id}
                    items={this.props.authors}
                    textProperty={this.getAuthorText}
                    valueProperty={this.getAuthorValue}
                    onChange={this.props.onChange}
                    error={this.props.errors.author} />
                <Input 
                    name="length"
                    label="Length"
                    value={this.props.course.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.length} />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = CourseForm;