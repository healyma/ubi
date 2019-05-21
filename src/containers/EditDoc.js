import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import BootstrapSwitchButton from "bootstrap-switch-button-react";

export default class EditDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autosave:false,
            doc:props.doc,
            docs: [
                {
                    id: 1,
                    name: "Mark Healy",
                    link: "#",
                    lastUpdate: "2019-05-19 12:57:00"
                }
            ]
        }
    }
    render() {
        return (
            
                
                <div >
                    document type - last edited
                    autosave (every 1 min)
                    document title 
                    document actions - delete, export, publish etc.
                    autosave? <BootstrapSwitchButton
                            checked={this.state.autosave}
                            size="xs"
                            offstyle="outline-danger" 
                            onstyle="outline-success"
                            onchange= {(checked)=>{
                                this.setState({
                                    autosave:!this.state.autosave
                                })
                            }}
                            />
                <CKEditor
                    onInit={ editor => {

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    } }
                    onChange={ ( event, editor,data ) => {
                    } }
                    editor={ DecoupledEditor }
                    data={this.state.doc.body}
                />
            </div>
        );
    }
}