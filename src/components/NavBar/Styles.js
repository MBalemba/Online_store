import {makeStyles} from "@material-ui/core";

export const useStylesHeader = makeStyles((theme) => ({

    navbar: {
        backgroundColor: theme.palette.background.paper,
    },

    toolbar: {
        height: '54px',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1170px',
            width: '1170px',
            margin: '0 auto'
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '1170px',
            width: '1170px',
            margin: '0 auto'
        },
    },

    toolbar__buyDeviceLink:{
        color: theme.palette.text.primary,
        textTransform:' uppercase',
    },

    toolbar__item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    toolbar__headerButton_leftMargin: {
        marginLeft: '38px',
    },

    toolbar__icon: {
        position: 'relative',
        bottom: '2px',
        left: '3px',
    },

    toolbar__headerButton: {
        height: '34px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));