import React from 'react';
import { Link } from 'react-router-dom';

const ButtonPublic = ({ too, size, text }) => {
    return (
        <Link to={`/${too}`} className={`py-4 px-4 md:px-9 rounded-md border-[3px] border-[#046380] hover:bg-[#046380] hover:text-white ${size}`}>
            {text}
        </Link>
    );
};

export default ButtonPublic;