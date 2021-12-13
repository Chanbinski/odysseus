import React, { useState } from 'react';
import './Keyword.css'

import { useParams, useLocation } from 'react-router-dom'
import { Add, Edit } from '@material-ui/icons';
import Word from '../Home/Word'

const Keyword = (props) => {
    let { keyword } = useParams();
    const location = useLocation();
    const [relatedWords, setRelatedWords] = useState(JSON.parse(localStorage.getItem('relatedWords')) || {})
    const [relationships, setRelationships] = useState(JSON.parse(localStorage.getItem('relationships')) || {})
    const [explanations, setExplanations] = useState(JSON.parse(localStorage.getItem('explanations')) || {})
    const [isEditing, setEditing] = useState(false);

    const order = (a, b) => {
        return (a.localeCompare(b) < 0) ? [a, b] : [b, a]
    }

    const addWord = (word) => {
        var words = JSON.parse(localStorage.getItem('words'));
        if (!words.includes(word)) {
            words.push(word);
            localStorage.setItem('words', JSON.stringify(words));
        }
    }

    const deleteWord = (word) => {
        var words = JSON.parse(localStorage.getItem('words'));
        words.splice(words.indexOf(word), 1);
        localStorage.setItem('words', JSON.stringify(words));
    }

    const updateRelatedWords = (data) => {

        const relatedWord = data[0], relationship = data[1];
        var relatedWordsCopy = { ...relatedWords };
        var relationshipsCopy = { ...relationships };

        (keyword in relatedWordsCopy) ? relatedWordsCopy[keyword].push(relatedWord) : relatedWordsCopy[keyword] = [relatedWord];
        (relatedWord in relatedWordsCopy) ? relatedWordsCopy[relatedWord].push(keyword) : relatedWordsCopy[relatedWord] = [keyword];

        relationshipsCopy[order(relatedWord, keyword)] = relationship;

        setRelatedWords(relatedWordsCopy)
        setRelationships(relationshipsCopy)

        addWord(relatedWord)
        localStorage.setItem('relatedWords', JSON.stringify(relatedWordsCopy));
        localStorage.setItem('relationships', JSON.stringify(relationshipsCopy));
    }

    const updateWords = (relatedWords, deletedWord) => {
        relatedWords[keyword] = relatedWords
        delete relationships[order(keyword, deletedWord)]

        setRelatedWords(relatedWords)
        setRelationships(relationships)

        deleteWord(deletedWord)
        localStorage.setItem('relatedWords', JSON.stringify(relatedWords));
        localStorage.setItem('relationships', JSON.stringify(relationships));
    }


    const toggleEdit = () => {
        setEditing(!isEditing)
    }

    return (
        <div className="keyword-wrapper">
            <div className="header">
                {keyword}
            </div>
            <div className="explanation">
                {explanations[keyword]}
            </div>
            <AddEdit
                update={updateRelatedWords}
                toggleEdit={toggleEdit}
            />
            <RelatedWords
                keyword={keyword}
                words={relatedWords[keyword] || []}
                isEditing={isEditing}
                update={updateWords}
                relationships={relationships}
                order={order}
            />
        </div>
    );
}

const AddEdit = (props) => {
    const [addToggle, setAddToggle] = useState(false);
    const [editToggle, setEditToggle] = useState(false);

    const handleAddClick = () => {
        setAddToggle(!addToggle)
    }
    const handleEditClick = () => {
        setEditToggle(!editToggle)
        props.toggleEdit();
    }
    return (
        <>
            <div className="options">
                <button onClick={handleAddClick}>
                    <Add />
                </button>
                <button onClick={handleEditClick}>
                    <Edit />
                </button>
            </div>
            {(addToggle) ? <AddForm update={props.update} /> : <></>}
        </>
    )
}

const AddForm = (props) => {
    const initialValues = {
        value: '',
        relationship: ''
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.update([values.value, values.relationship]);
        setValues({
            value: '',
            relationship: ''
        });
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <input type="input" name="value" placeholder="Word" value={values.value} onChange={handleInputChange} />
            <input type="input" name="relationship" placeholder="Relationship" value={values.relationship} onChange={handleInputChange} />
            <input type="submit" value="Add" />
        </form>
    );
}

const RelatedWords = (props) => {

    const handleDeleteClick = (i, deletedWord) => {
        const modWords = [...props.words]
        modWords.splice(i, 1);
        props.update(modWords, deletedWord);
    }

    return (
        <div className="relatedWords">
            {
                props.words.map(function (word, i) {
                    return (
                        <div className="relatedWords-container">
                            <div className="connection-tree">

                                <div className="wordd">
                                    <Word
                                        key={i}
                                        id={i}
                                        value={word}
                                        show={props.isEditing}
                                        handle={handleDeleteClick}
                                    />
                                </div>
                                <div className="relationship">
                                    {props.relationships[props.order(word, props.keyword)]}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default Keyword