import React, { Component } from "react";
import { FormGroup, FormControl, Row, Col} from "react-bootstrap";
import DependencyMapper from "./DependencyMapper";


export default class TodoItemEdit extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state ={
      locale: {
        'format': 'DD/MM/YYYY'
    },
    item:{
        LI_Name:this.props.item.LI_Name,
        LI_PercentComplete:this.props.item.LI_PercentComplete,
        LI_Assign_UserID:this.props.item.LI_Assign_UserID,
        LI_ID:this.props.item.LI_ID,
        LI_StartScheduled:this.props.item.LI_StartScheduled,
        LI_EndScheduled:this.props.item.LI_EndScheduled,
        LI_DependsJSON: this.props.item.LI_DependsJSON,
        LI_ItemID: this.props.item.LI_ItemID,
        LI_ItemType: this.props.item.LI_ItemType,
        LI_LTID: this.props.item.LI_LTID,
        LI_Order: this.props.item.LI_Order,
        LI_dependantsJSON: this.props.item.LI_dependantsJSON,
        LI_AssignedToEmail:this.props.item.LI_AssignedToEmail
    }
      
    }
    console.log(new Date(this.props.item.LI_EndScheduled).toISOString().split('T')[0]);
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  componentDidMount(){
    this.setState({item:this.props.item});
  } 
  handleNamechange(){

  }
  changeToList=()=>{
    var item= this.state.item;
    item.LI_ItemType='L';
    this.setState({item},()=>{
      this.props.update(this.state.item)
    });
  }

  handleDelete(){
    this.props.delete(this.props.item.LI_LTID,this.props.item.LI_ItemID);
  }
  render(){
      return (
        <div className="Container">
        <Row>
          <Col xs={9}>
          <FormGroup controlId="todoItemName">
          <FormControl
            ref={ref => {
              this.LI_Name = ref;
              
            }}
              onChange={this.handleChange}

              defaultValue={this.state.item.LI_Name}
            type="text"
          />
        </FormGroup>
        [happens after] [happens before] [time required] [start date] [end date] 
        {(this.state.item.LI_ItemType==='T'? <div onClick={this.changeToList}>Convert to a list<span className="oi oi-list"></span></div>:<span></span>)}
        <DependencyMapper></DependencyMapper>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>Assigned to:</Col>
          <Col xs={6}>
          <FormGroup controlId="LI_Assign_UserID">
          <FormControl
            ref={ref => {
              this.LI_Assign_UserID= ref;
            }}
            defaultValue={this.state.item.LI_Assign_UserID}
              onChange={this.handleChange}
          />
          </FormGroup>
          </Col>
          <Col xs={3}>
          <div className="btn btn-default" onClick={event => {
                    event.preventDefault();
                  }}>
<span
                  className="glyphicon glyphicon-send"
                  />
                
                  </div>
               
          
          </Col>
        </Row>
        <Row>
          <Col xs={3}>Start:</Col>
          <Col xs={6}>
          <FormGroup controlId="LI_StartScheduled">
          <FormControl
            ref={ref => {
              this.LI_StartScheduled= ref;
            }}
            type="date"
            defaultValue={new Date(this.props.item.LI_StartScheduled).toISOString().split('T')[0]}
              onChange={this.handleChange}
          />
          </FormGroup>
          </Col>
          <Col xs={3}>
          <div className="btn btn-default" onClick={event => {
                    event.preventDefault();
                  }}>
<span
                  className="glyphicon glyphicon-send"
                  />
                
                  </div>
               
          
          </Col>
        </Row>
        <Row>
          <Col xs={3}>End:</Col>
          <Col xs={6}>
          <FormGroup controlId="LI_EndScheduled">
          <FormControl
            ref={ref => {
              this.LI_EndScheduled= ref;
            }}
            type="date"
            defaultValue={new Date(this.props.item.LI_EndScheduled).toISOString().split('T')[0]}
              onChange={this.handleChange}
          />
          </FormGroup>
          </Col>
          <Col xs={3}>
          <div className="btn btn-default" onClick={event => {
                    event.preventDefault();
                  }}>
<span
                  className="glyphicon glyphicon-send"
                  />
                
                  </div>
               
          
          </Col>
        </Row>
        <Row>
            <Col md={4}>
                <div className="btn btn-danger" onClick={event => {
                    event.preventDefault();
                    this.handleDelete();
                  }}> Delete &nbsp;
                <span
                  className="glyphicon glyphicon-trash"
                  
                /></div>
                </Col>
    <Col md={8} style={{textAlign: "right"}}>
    <div>
                     
                </div>
                <div className="btn btn-warning"  onClick={event => {
                    event.preventDefault();
                  }}> Cancel &nbsp;
                 <span
                  className="glyphicon glyphicon-remove-sign"
                 
                />
                </div>
                <div className="btn btn-success" onClick={event => {
                    event.preventDefault();
                    console.log(this.state);
                    this.props.update({
                        LI_Name:this.state.todoItemName,
                        LI_PercentComplete:this.state.item.LI_PercentComplete,
                        LI_Assign_UserID:this.state.item.LI_Assign_UserID,
                        LI_ID:this.state.item.LI_ID,
                        LI_StartScheduled:this.state.item.LI_StartScheduled,
                        LI_EndScheduled:this.state.item.LI_EndScheduled,
                        LI_DependsJSON: this.state.item.LI_DependsJSON,
                        LI_ItemID: this.state.item.LI_ItemID,
                        LI_ItemType: this.state.item.LI_ItemType,
                        LI_LTID: this.state.item.LI_LTID,
                        LI_Order: this.state.item.LI_Order,
                        LI_dependantsJSON: this.props.item.LI_dependantsJSON
                      
                    });
                  }}> Save &nbsp;
                 <span
                  className="glyphicon glyphicon-floppy-save"
                  
                />
              </div>
            </Col>

        </Row>
      </div>     
      
      );
  }
}