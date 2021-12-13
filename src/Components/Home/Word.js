import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Word = (props) => {

    //props - id, value, show

    const handleDelete = () => {
        props.handle(props.id, props.value);
    }

    const display = (props.show) ? "block" : "none"

    return (
        <div className="word-wrap">
            <span className="delete" onClick={handleDelete} style={{ display: display }}>&times;</span>
            <button className="word">
                <Link
                    to={`/${props.value}`}
                    style={{ textDecoration: 'inherit', color: 'inherit' }}
                >
                    {props.value}
                </Link>
            </button>
        </div>
    )
}

export default Word