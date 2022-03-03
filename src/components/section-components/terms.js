import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const Terms = ({ terms }) => {
    return (
        <div className='container'>
            <div dangerouslySetInnerHTML={{ __html: terms[0]?.terms }}></div>
        </div>
    )
}
export default Terms;