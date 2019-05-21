import React, { Component } from 'react';
import ReactGantt from 'gantt-for-react';
import { API } from "aws-amplify";
import { isArray } from 'util';

export default class GanttChart extends Component {
  constructor(props) {
    super(props);
    this.tasks = null;
    this.state = {
      viewMode: "Day"
    };
  }

  async componentDidMount() {
    var tasks = await API.get("todos", `/list-contents/${this.props.listid}`);
    if (isArray(tasks)) {
      this.tasks = []

      tasks.forEach(task => {
        var deps = [];
        if (task.LI_DependsJSON > 0) {
          task.LI_DependsJSON.split(",").forEach((dep) => {
            deps.push("__task" + dep);
          })
        }
        this.tasks.push({
          id: "__task" + task.LI_ID,
          name: task.LI_Name,
          start: new Date(task.LI_Start == null ? Date.now() : task.LI_Start),
          end: new Date(task.LI_End == null ? Date.now() + 100000000 : task.LI_End),
          progress: task.LI_Complete,
          dependencies: deps
        });
      });
    } else {
      this.tasks = null;
    }

  }
  on_click(task) {
    console.log(task);
  }
  on_date_change(task, start, end) {
    console.log(task, start, end);
  }
  on_progress_change(task, progress) {
    console.log(task, progress);
  }
  on_view_change(mode) {
  }
  render() {
    console.log(this.tasks)
    return (
      <div>
        {isArray(this.tasks) && this.tasks.length > 0
          ?
          <ReactGantt
            tasks={this.tasks}
            viewMode={this.state.viewMode}
            onClick={this.on_click}
            onDateChange={this.on_date_change}
            onProgressChange={this.on_progress_change}
            onViewChange={this.on_view_change}
            customPopupHtml={function (task) {
              // the task object will contain the updated
              // dates and progress value
              console.log(task)
              const end_date = task.end;
              return `
      <div class="details-container">
        <h5>${task.name}</h5>
        <p>Expected to finish by ${end_date}</p>
        <p>${task.progress}% completed!</p>
      </div>
    `;
            }}
          />
          :
          <div>No items</div>
        }

      </div>
    );
  }
}