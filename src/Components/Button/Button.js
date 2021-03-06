import React from 'react';
import './Button.css';

const Button = (props) => {

    const styles = {
        backgroundColor : props.bgColor,
        fontSize : props.FS,
        color:props.color,
        borderWidth : props.borderWidth,
        borderColor : props.color,
        marginRight :props.right_margin,
        marginTop :props.top_margin
    }

    return (
        <button style = {styles} className = "button" onClick = {props.handler}>{props.children}</button>
    );
}
 
export default Button;