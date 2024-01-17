// Conferences.jsx:

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ConferenceForm(props) {
    const [titleOfThePaper, setTitleOfThePaper] = useState('');
    const [journalConferencesDetails, setJournalConferencesDetails] = useState('');
    const [year, setYear] = useState('');
    const [awards, setAwards] = useState('');

    const changeTitleOfThePaper = (event) => {
        setTitleOfThePaper(event.target.value);
    };

    const changeJournalConferencesDetails = (event) => {
        setJournalConferencesDetails(event.target.value);
    };

    const changeYear = (event) => {
        setYear(event.target.value);
    };

    const changeAwards = (event) => {
        setAwards(event.target.value);
    };

    const transferValue = async (event) => {
        event.preventDefault();

        // Validate input fields
        if (!titleOfThePaper || !journalConferencesDetails || !year) {
            alert('Please fill out all required fields.');
            return;
        }

        try {
            const idValue = uuidv4();
            const response = await fetch('/test', {
                method: 'POST',
                body: JSON.stringify({
                    email : localStorage.getItem('email'),
                    id: idValue,
                    title: titleOfThePaper,
                    details_of_conferences: journalConferencesDetails,
                    year,
                    Awards: awards,
                    // email : localStorage.getItem('email')
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response);
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log(err);
        }

        const newRow = {
            id: uuidv4(),
            title: titleOfThePaper,
            details_of_conferences: journalConferencesDetails,
            year,
            Awards: awards,
        };

        props.onAddRow(newRow);
        clearState();
    };

    const clearState = () => {
        setTitleOfThePaper('');
        setJournalConferencesDetails('');
        setYear('');
        setAwards('');
    };

    return (
        <div className='Conference-input'>
            <label>Title of the Paper:</label>
            <input type="text" value={titleOfThePaper} onChange={changeTitleOfThePaper} style={{ border: '1px solid black' }} placeholder="Enter title..." />

            <label>Journal/Conferences Details:</label>
            <input type="text" value={journalConferencesDetails} onChange={changeJournalConferencesDetails} style={{ border: '1px solid black' }} placeholder="Enter details..." />

            <label>Year:</label>
            <input type="text" value={year} onChange={changeYear} style={{ border: '1px solid black' }} placeholder="Enter year..." />

            <label>Awards:</label>
            <input type="text" value={awards} onChange={changeAwards} style={{ border: '1px solid black' }} placeholder="Enter awards..." />

            <button className="add-button" onClick={transferValue}>Add Row</button>
        </div>

    );
}

export default ConferenceForm;