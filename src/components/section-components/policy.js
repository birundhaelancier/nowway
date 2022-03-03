import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const Policy = ({ policy }) => {
    return (
        <div className='container'>
            <div dangerouslySetInnerHTML={{ __html: policy[0]?.policy }}></div>
        </div>
    )
}
export default Policy;