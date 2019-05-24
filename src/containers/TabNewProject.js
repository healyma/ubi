import React, {Component} from "react";
import Form from "react-bootstrap/Form";
export default class TabNewProject extends Component{
constructor(props){
    super(props);

}
    render(){
        return (<div>
                        <h3>Let's start a new project</h3>
                        <p>If you like, you can just enter a name and complete everything else later</p>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="What are you calling the project" onChange={this.props.update}/>
                            <Form.Text className="text-muted">
                                It's better to keep it short and sweet, but meaningful.
</Form.Text>
                        </Form.Group>
                        [add upload/import/copy]
</Form>
</div>

        )
    }
}