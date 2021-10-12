import React from 'react';
import {stylesFooterSvg} from "./styles";

const Facebook = () => {
    const classes = stylesFooterSvg()
    return (
        <div>
            <svg className={classes.class} xmlns="http://www.w3.org/2000/svg" width="21.875" height="23.354" viewBox="0 0 21.875 23.354">
                <path id="Icon_ionic-logo-facebook" data-name="Icon ionic-logo-facebook" d="M25.168,4.5H5.708A1.251,1.251,0,0,0,4.5,5.789V26.564a1.251,1.251,0,0,0,1.208,1.289h9.73V18.609H12.823V15.2h2.615V12.686a4.291,4.291,0,0,1,4.483-4.659c1.208,0,2.507.1,2.808.14v3.15H20.718c-1.373,0-1.635.693-1.635,1.715V15.2h3.27l-.427,3.406H19.083v9.244h6.084a1.251,1.251,0,0,0,1.208-1.289V5.789A1.251,1.251,0,0,0,25.168,4.5Z" transform="translate(-4.5 -4.5)"/>
            </svg>
        </div>
    );
};

export default Facebook;