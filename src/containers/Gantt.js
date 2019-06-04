import React, { Component } from 'react';
import ReactGantt from 'gantt-for-react';
import { isArray } from 'util';

export default class GanttChart extends Component {
  constructor(props) {
    super(props);
    this.state={viewMode:"Day",tasks:[]};
  }
  componentWillReceiveProps(newProps){
    this.mapTasks(newProps.listItems)
  }

mapTasks(tasks){
  var _tasks = tasks.map((task)=>{
    return {
      id:"" + task.LI_ID,
      name: task.LI_Name,
      start: task.LI_StartScheduled,
      end:task.LI_EndScheduled,
      progress: (task.LI_PercentComplete?task.LI_PercentComplete * 100:0),
      dependencies:task.LI_DependsJSON
    }
  })
  this.setState({
    tasks:_tasks
  });
}
  
 componentDidMount() {
   this.mapTasks(this.props.listItems);
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
    return (
      <div>
        {isArray(this.state.tasks) && this.state.tasks.length > 0
          ?
          <ReactGantt
            tasks={this.state.tasks}
            viewMode={this.state.viewMode}
            onClick={this.on_click}
            onDateChange={this.on_date_change}
            onProgressChange={this.on_progress_change}
            onViewChange={this.on_view_change}
            customPopupHtml={function (task) {
              // the task object will contain the updated
              // dates and progress value
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