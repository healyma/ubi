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
        TK_Name:this.props.item.TK_Name,
        TK_Complete:this.props.item.TK_Complete,
        TK_Assign_UserID:this.props.item.TK_Assign_UserID,
        TK_ID:this.props.item.TK_ID,
        TK_Start:this.props.item.TK_Start,
        TK_End:this.props.item.TK_End,
        LI_DependsJSON: this.props.item.LI_DependsJSON,
        LI_ItemID: this.props.item.LI_ItemID,
        LI_ItemType: this.props.item.LI_ItemType,
        LI_LTID: this.props.item.LI_LTID,
        LI_Order: this.props.item.LI_Order,
        LI_dependantsJSON: this.props.item.LI_dependantsJSON
      
    }
    console.log(new Date(this.props.item.TK_End).toISOString().split('T')[0]);
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
              this.TK_Name = ref;
              
            }}
              onChange={this.handleChange}

              defaultValue={this.state.TK_Name}
            type="text"
          />
        </FormGroup>
        [happens after] [happens before] [time required] [start date] [end date] [convert to list]
        <DependencyMapper></DependencyMapper>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>Assigned to:</Col>
          <Col xs={6}>
          <FormGroup controlId="TK_Assign_UserID">
          <FormControl
            ref={ref => {
              this.TK_Assign_UserID= ref;
            }}
            defaultValue={this.state.TK_Assign_UserID}
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
          <FormGroup controlId="TK_Start">
          <FormControl
            ref={ref => {
              this.TK_Start= ref;
            }}
            type="date"
            defaultValue={new Date(this.props.item.TK_Start).toISOString().split('T')[0]}
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
          <FormGroup controlId="TK_End">
          <FormControl
            ref={ref => {
              this.TK_End= ref;
            }}
            type="date"
            defaultValue={new Date(this.props.item.TK_End).toISOString().split('T')[0]}
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
                        TK_Name:this.state.todoItemName,
                        TK_Complete:this.props.item.TK_Complete,
                        TK_Assign_UserID:this.state.TK_Assign_UserID,
                        TK_ID:this.props.item.TK_ID,
                        TK_Start:this.state.TK_Start,
                        TK_End:this.state.TK_End,
                        LI_DependsJSON: this.props.item.LI_DependsJSON,
                        LI_ItemID: this.props.item.LI_ItemID,
                        LI_ItemType: this.props.item.LI_ItemType,
                        LI_LTID: this.props.item.LI_LTID,
                        LI_Order: this.props.item.LI_Order,
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