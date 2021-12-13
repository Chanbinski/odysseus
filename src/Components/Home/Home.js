import React, { useState } from 'react';
import Grid from './Grid'
import SearchBar from './SearchBar'
import './Home.css';
import { Add, Edit } from '@material-ui/icons';

const Home = (props) => {
    const [words, setWords] = useState(JSON.parse(localStorage.getItem('words')) || []);
    const [explanations, setExplanations] = useState(JSON.parse(localStorage.getItem('explanations')) || []);
    const [isEditing, setEditing] = useState(false);

    const toggleEdit = () => {
        setEditing(!isEditing)
    }
    const updateWords = (updatedWords) => {
        setWords(updatedWords);
        localStorage.setItem('words', JSON.stringify(updatedWords));
    }

    const updateWords2 = (data) => {
        const newWord = data[0], explanation = data[1];

        var wordsCopy = [...words];
        wordsCopy.push(newWord);
        localStorage.setItem('words', JSON.stringify(wordsCopy));


        var explanationsCopy = { ...explanations }
        explanationsCopy[newWord] = explanation;
        localStorage.setItem('explanations', JSON.stringify(explanationsCopy));

        setWords(wordsCopy);
        setExplanations(explanationsCopy);
    }


    return (
        <>
            <div className="header">Your Words</div>
            <AddEdit
                update={updateWords2}
                toggleEdit={toggleEdit}
            />
            <Grid
                update={updateWords}
                words={words}
                isEditing={isEditing}
            />
        </>
    )
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
                {/*<SearchBar />*/}
                <button onClick={handleAddClick}>
                    <Add />
                </button>
                <button onClick={handleEditClick}>
                    <Edit />
                </button>
            </div>
            {(addToggle) ? <AddForm update={props.update} /> : <></>};
        </>
    );
}

const AddForm = (props) => {
    const initialValues = {
        value: '',
        explanation: ''
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
        props.update([values.value, values.explanation]);
        setValues({
            value: '',
            explanation: ''
        });
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <input type="input" name="value" placeholder="Word" value={values.value} onChange={handleInputChange} />
            <input type="input" name="explanation" placeholder="Explanation" value={values.explanation} onChange={handleInputChange} />
            <input type="submit" value="Add" />
        </form>
    );
}

export default Home