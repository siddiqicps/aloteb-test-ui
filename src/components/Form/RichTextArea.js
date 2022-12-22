import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import SimpleMDEReact from 'react-simplemde-editor';

// styles
import 'easymde/dist/easymde.min.css';


const RichTextArea = ({Id, Label, onTextChange, Value}) => {
    const delay = 1000;
    const options = {
        autofocus: false,
        
        minHeight: "200px",
    };
    // const [value, setValue] = useState(
    //   "You can clean the input using button above."
    // );
    const updateText = (value) => onTextChange(value,Id);
// console.log(props)
    return (
            <>
              <label class="form-label">{Label}</label>
              <SimpleMDEReact id={Id} options={options}  onBlur={updateText} value={Value}/>
            </>
    );
};

export default RichTextArea;
