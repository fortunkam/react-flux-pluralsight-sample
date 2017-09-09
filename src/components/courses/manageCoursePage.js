"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var AuthorStore = require('../../stores/authorStore');
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');
var _ = require('lodash');

var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        willTransitionFrom: function(transition, component){
            if(component.state.dirty && !confirm('Leave without saving?')){
                transition.abort();
            }
        }
    },
    getInitialState: function(){
        return {
            course: {id: '', title: '', watchHref: '', category: '', length: '', author: { id: '', name: ''}},
            authors: [],
            errors: {},
            dirty: false
        };
    },
    componentWillMount: function(){
        var authors = AuthorStore.getAllAuthors();
        this.setState({authors: authors});
        var courseId = this.props.params.id;
        if(courseId){
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },
    setCourseState: function(){
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        if(field === 'author'){
            this.state.course[field] = this.updateAuthor(value);
        } else {
            this.state.course[field] = value;
        }
        
        return this.setState({ course: this.state.course});
    },
    updateAuthor: function(authorId){
        var author = _.find(this.state.authors, {id: authorId});
        author.name = author.firstName + ' ' + author.lastName;
        return author;
    },
    courseFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};
        if(this.state.course.title.length < 3) {
            this.state.errors.title = 'Title must be at least 3 characters';
            formIsValid = false;
        }

        if(this.state.course.category.length < 3) {
            this.state.errors.category = 'Category must be at least 3 characters';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    saveCourse: function(){
        event.preventDefault();
        if(!this.courseFormIsValid()){
            return;
        }
        if(this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        } else{
            CourseActions.createCourse(this.state.course);
        }
        this.setState({dirty: false});
        toastr.success('Course saved.');
        this.transitionTo('courses');
    },
    render: function(){
        return (           
            <CourseForm 
                course={this.state.course}
                authors={this.state.authors}
                onChange={this.setCourseState}
                onSave={this.saveCourse}
                errors={this.state.errors}
                />
        );
    }
});

module.exports = ManageCoursePage;