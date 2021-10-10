import {makeStyles} from "@material-ui/core";

export const MainShopStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    sliderContainer: {
        height: '70vh',
        marginBottom: '20px',
    },
    secondPage: {
        marginBottom: '20px',
    },
    titlePage_2: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    cardList: {
        display: 'grid',
        gridColumnGap: '40px',
        gridRowGap: '40px',
        gridTemplateColumns: ' 1fr 1fr 1fr',
        width: 'min-content',
        margin: '0 auto',
        paddingBottom: '70px',

    },
    'cardList__item': {
        width: '294px',
        height: '226px',
        background: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


    }

}));
