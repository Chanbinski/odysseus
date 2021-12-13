import { ContactSupportOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Keyword from '../Keyword/Keyword'
import Word from './Word'

const Grid = (props) => {

    //props - words, isEditing 

    const order = (a, b) => {
        return (a.localeCompare(b) < 0) ? [a, b] : [b, a]
    }

    const handleDeleteClick = (i, deletedWord) => {
        const modWords = [...props.words]
        modWords.splice(i, 1);
        props.update(modWords);

        var relatedWords = JSON.parse(localStorage.getItem('relatedWords')) || [];
        var relationships = JSON.parse(localStorage.getItem('relationships')) || [];
        var explanations = JSON.parse(localStorage.getItem('explanations')) || [];

        var deletedConnections = relatedWords[deletedWord] || [];
        for (var relatedWord of deletedConnections) {

            // Delete from relatedWords
            relatedWords[relatedWord].splice(relatedWords[relatedWord].indexOf(deletedWord), 1);
            // Delete from relationships
            delete relationships[order(deletedWord, relatedWord)]
        }
        delete relatedWords[deletedWord]
        delete explanations[deletedWord]
        localStorage.setItem('relatedWords', JSON.stringify(relatedWords));
        localStorage.setItem('relationships', JSON.stringify(relationships));
        localStorage.setItem('explanations', JSON.stringify(explanations));
    }

    return (
        <div className="container">
            <div className="grid" >
                {
                    props.words.map(function (word, i) {
                        return (
                            <Word
                                key={i}
                                id={i}
                                value={word}
                                show={props.isEditing}
                                handle={handleDeleteClick}
                            />)
                    })
                }
            </div>
        </div>

    )
}


export default Grid