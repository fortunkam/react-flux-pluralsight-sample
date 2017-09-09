"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var CoursesList = React.createClass({
    render: function(){
        var createCourseRow = function(course){
            return (
                <tr key={course.id}>
                    <td><a href={course.watchHref} target="_blank">Watch</a></td>
                    <td><a href="#">Delete</a></td>
                    <td><Link to="manageCourse" params={{id: course.id}} >{course.title}</Link></td>
                    <td>{course.author.name}</td>
                    <td>{course.category}</td>
                    <td>{course.length}</td>
                </tr>
            );
    };
    return (
        <div>
            <table className="table">
                <thead>
                    <th></th>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                </thead>
                <tbody>
                    {this.props.courses.map(createCourseRow, this)}
                </tbody>
            </table>
        </div>
    );
    }
});

module.exports = CoursesList;