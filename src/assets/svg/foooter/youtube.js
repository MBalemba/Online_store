import React from 'react';
import {stylesFooterSvg} from "./styles";

const Youtube = () => {
    const classes = stylesFooterSvg()
    return (
        <div>
            <svg className={classes.class} xmlns="http://www.w3.org/2000/svg" width="29.163" height="23.355" viewBox="0 0 29.163 23.355">
                <path id="Icon_ionic-logo-youtube" data-name="Icon ionic-logo-youtube" d="M28.973,9.657c0-2.737-1.886-4.938-4.216-4.938C21.6,4.561,18.383,4.5,15.1,4.5H14.071c-3.281,0-6.506.061-9.662.219C2.085,4.719.2,6.933.2,9.669.057,11.834-.006,14,0,16.165s.057,4.33.194,6.5c0,2.737,1.886,4.957,4.21,4.957,3.315.164,6.716.237,10.174.231q5.2.018,10.174-.231c2.33,0,4.216-2.22,4.216-4.957.137-2.171.2-4.336.194-6.507Q29.178,12.911,28.973,9.657ZM11.792,22.131V10.18l8.26,5.972Z" transform="translate(0 -4.5)"/>
            </svg>
        </div>
    )
}

export default Youtube;