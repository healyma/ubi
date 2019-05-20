import React, {Component} from "react";
import Form from "react-bootstrap/Form";
export default class TabNewProject extends Component{

    render(){
        return (
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="What are you calling the project" />
                            <Form.Text className="text-muted">
                                It's better to keep it short and sweet, but meaningful.
</Form.Text>
                        </Form.Group>
                        [add upload/import/copy]
</Form>
                
        )
    }
}