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
import {Link} from "react-router-dom";


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
            width: '100%',
        },

        itemBrands: {
            width: '95%',
            margin: '30px auto 0px',
            display: 'flex',
            justifyContent: 'flex-start',
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
            cursor: 'pointer',

}


    })
)


export const menu = new MenuStore()


const UnderHeaderMenu = observer(({handleLock}) => {
    const classes = useStylesPopupCategory()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOutCursor, setIsOutCursor] = useState(false)
    const menuNode = React.createRef();
    function handleClickItemList(ind){
        setSelectedIndex(ind)
    }


    useEffect(()=>{
        menu.setBrandInType()
    },[])

    useEffect(()=>{



        function clickHolst(){

            if(isOutCursor){
                handleLock(true)
            }
        }


        document.addEventListener('pointerdown', clickHolst)


        return ()=>{
            document.removeEventListener('pointerdown', clickHolst)
        }
    }, [isOutCursor])

    useEffect(()=>{
        console.log(isOutCursor)
    }, [isOutCursor])

    function toggleCheckedStatus(id) {

        return undefined;
    }

    return (
        <Paper onMouseEnter={()=>{console.log(isOutCursor); setIsOutCursor(false)}} onMouseLeave={()=>{console.log(isOutCursor); setIsOutCursor(true)}}ref={menuNode} className={classes.ContainerCategory}>
            <div className={classes.content}>
               {/* <div className={classes.content_left}>

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


                </div>*/}


                <div className={classes.content_right}>
                    <Typography variant="h4">
                        Выбрать Категорию
                    </Typography>
                    <Divider />

                    <div className={classes.itemBrands}>

                        {menu.BrandInType.map((el,i)=>
                                    <Link onClick={()=>{handleLock(true)}} key={el.name} to={'/home/' + el.name} className={classes.checkboxWrap}>
                                        <Typography variant={'h6'}>
                                            {el.name}
                                        </Typography>
                                        <Divider />
                                    </Link>


                            )}

                    </div>



                </div>
            </div>
        </Paper>
    );
});

export default UnderHeaderMenu;