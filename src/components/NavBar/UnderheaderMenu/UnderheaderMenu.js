import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";


import MenuStore from "../../../store/menuStore";
import {observer} from "mobx-react-lite";


export const useStylesPopupCategory = makeStyles((theme) => ({

        ContainerCategory: {
            color: theme.palette.text.primary,
            padding: '32px 16px',
            position: 'absolute',
            width: '100%',
            top: '54px',
            right: '0px',
            backgroundColor: theme.palette.background.paper,
        },

        content: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },

        content__listItem: {
            maxHight: '48px',
            cursor: 'pointer',
        },

        content__listItem_active: {
            backgroundColor: 'rgba(0,0,0,.3)',
        },

        content__list: {

        },


        content_left: {
            maxHight: '288px',
            width: '254px'
        },

        content_right: {
            width: '854px',
        },

        itemBrands: {
            width: '750px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'fleex-start',
            flexWrap : 'wrap',

        },
        label: {
            marginRight: '15px',
            marginBottom: '20px',
            cursor: 'pointer',
        },
        checkboxWrap: {
            width: '171px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',

}


    })
)


export const menu = new MenuStore()


const UnderHeaderMenu = observer(() => {
    const classes = useStylesPopupCategory()
    const [selectedIndex, setSelectedIndex] = useState(0)
    function handleClickItemList(ind){
        setSelectedIndex(ind)
    }


    useEffect(()=>{
        menu.setBrandInType()
    },[])


    function toggleCheckedStatus(id) {

        return undefined;
    }

    return (
        <Paper className={classes.ContainerCategory}>
            <div className={classes.content}>
                <div className={classes.content_left}>

                    <List component="nav" aria-label="secondary mailbox folders">

                        {menu.BrandInType.map((el,index, arr)=>
                            <React.Fragment key={el.id}>



                                    <ListItem
                                        onClick={()=>handleClickItemList(index)}
                                        className={selectedIndex===index ? classes.content__listItem_active + ' ' + classes.content__listItem: classes.content__listItem}>
                                        <ListItemText primary={el.name}/>
                                    </ListItem>


                                {index !== arr.length-1 && <Divider />}
                            </React.Fragment>

                        )}
                    </List>

                    <div>
                        <Button variant="outlined">Применить</Button>
                        <Button variant="outlined">Сбросить фильтры</Button>
                    </div>


                </div>


                <div className={classes.content_right}>
                    <Typography variant="h3">
                        Выбрать бренды
                    </Typography>

                    <div className={classes.itemBrands}>

                        {menu.BrandInType.find((el,index)=> index === selectedIndex)?.brands
                            .map((el,i)=>
                                <label className={classes.label} key={el.name} htmlFor={el.name}>
                                    <div className={classes.checkboxWrap}>
                                        <Typography variant={'body1'}>
                                            {el.name}
                                        </Typography>
                                        <Checkbox onChange={()=>toggleCheckedStatus(el.id)} id={el.name} defaultChecked />
                                    </div>
                                    <Divider />
                                </label>
                            )}

                    </div>


                    <Typography variant="h3">
                        Установить цену
                    </Typography>


                </div>
            </div>
        </Paper>
    );
});

export default UnderHeaderMenu;