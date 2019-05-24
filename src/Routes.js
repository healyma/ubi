import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Todos from "./containers/Todos";
import Todo from "./containers/List";
import Note from "./containers/Note";
import NewTodo from "./containers/NewTodo";
import Project from "./containers/Project";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Settings from "./containers/Settings";
import ProjectsCard from "./containers/ProjectsCard";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/settings"
      exact
      component={Settings}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/notes/new"
      exact
      component={NewNote}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/notes/:id"
      exact
      component={Note}
      props={childProps}
    />
        <AuthenticatedRoute
      path="/todos/new"
      exact
      component={NewTodo}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/todos/:id"
      exact
      component={Todo}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/projects/new"
      exact
      component={Project}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/projects/"
      exact
      component={ProjectsCard}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/projects/:id"
      exact
      component={Project}
      props={childProps}
    />
          <AuthenticatedRoute
      path="/todos"
      exact
      component={Todos}
      props={childProps}
    />
          <AuthenticatedRoute
      path="/notes"
      exact
      component={Notes}
      props={childProps}
    />
           
  </Switch>
);
