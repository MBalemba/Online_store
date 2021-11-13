import React, {useContext, useEffect, useState} from 'react';
import { Dropdown, Form, Modal} from "react-bootstrap";
import {
    Box, Button,
    Chip,
    FormControl,
    FormHelperText, InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, TextField,
    Typography
} from "@material-ui/core";
import StoreDeleteBrand from "../storeDeleteBrand";
import {observer} from "mobx-react-lite";
import {CSSTransition} from "react-transition-group";
import {createDevice} from "../../../../pages/Admin";
import './DeleteBrand.css'
import {store} from './../storeDeleteBrand'
import {Context} from "../../../../index";


const DeleteBrand = observer(({show, onHide}) => {
    const {taskInstance} = useContext(Context)
    const [isEdit, setIsEdit] = useState(false)

    const [brandEdit, setBrandEdit] = useState('')


    useEffect(() => {
        doRequest()

        return () => {
            store.returnToInitial()
        }
    }, [])

    useEffect(() => {
        if (!show) {
            store.returnToInitial()
        }
    }, [show])

    useEffect(()=>{
        setBrandEdit(store.GiveNameSelectedBrand)
    }, [store.selectedBrandId])

    function doRequest() {
        store.getBrandsInTypes()
    }


    const selectChange = (e) => {
        store.setSelectedType(e.target.value)
    }


    function deleteBrandHandler() {
        store.deleteBrand().then(() => {

            doRequest()
        })
    }

    function editBrandHandle() {
        store.editBrand(brandEdit).then(()=>{
            taskInstance.createTask('Бренд успешно изменен', 'Success' )
        }).catch(()=>{
            taskInstance.createTask('Возникла какая-то ошибка, повторите попытку', 'Warning' )
        }).finally(()=>{
            doRequest()
        })

    }

    return (
        <div>
            <div>
                <Modal
                    show={show}
                    size="lg"
                    onHide={onHide}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {isEdit ?'Редактировать' :'Удалить'} бренд
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!isEdit &&  <div className={'wrapperSelect'}>

                            <div className={'itemSelect'}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-helper-label">Типы</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={store.GetSelectedType}
                                        label="Age"
                                        onChange={selectChange}
                                    >
                                        <MenuItem value={null}>
                                            none
                                        </MenuItem>

                                        {store.ListBrands.map(el =>
                                            <MenuItem value={el.id}>
                                                {el.name}
                                            </MenuItem>
                                        )}

                                    </Select>
                                    <FormHelperText>Выберите какого типа удалить бренд</FormHelperText>
                                </FormControl>
                            </div>


                            <CSSTransition
                                in={Boolean(store.GetSelectedType)}
                                timeout={1000}
                                mountOnEnter={true}
                                unmountOnExit={true}
                            >
                                {state =>
                                    <div className={`multiSelect ${state} itemSelect`}>
                                        <MultipleSelectChip store={store}/>
                                    </div>
                                }

                            </CSSTransition>


                        </div> }


                        {isEdit &&  <div className={'editBrand'}>
                            <TextField onChange={(e)=>setBrandEdit(e.target.value)} className={'textFieldBrandEdit'} autoFocus value={brandEdit} fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
                            <div className={'buttonsGroupEditBrand'}>
                                <Button onClick={()=>setIsEdit(false)}>Отмена</Button>
                                <Button onClick={()=>{editBrandHandle(); setIsEdit(false)}}> Применить</Button>
                            </div>
                        </div>}




                    </Modal.Body>
                    <Modal.Footer>
                        {!isEdit && <Button disabled={store.IsDisabled}  color={''} onClick={()=>{ setIsEdit(true)}} variant={'outlined'}>Редактировать</Button>
                        }
                        <Button disabled={store.IsDisabled || isEdit} color={'error'} onClick={deleteBrandHandler} variant={'outlined'}> Удалить
                            бренд</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
});


const MultipleSelectChip = observer(({store}) => {
    const [personName, setPersonName] = React.useState('');

    const handleChange = (event) => {
        store.setSelectedBrand(event.target.value)
    };

    return (

        <div>
            <FormControl className={'formControl'}>
                <InputLabel id="demo-simple-select-helper-label">Бренд</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    value={store.GetSelectedTypeBrand}
                    onChange={handleChange}
                >
                    {store.Brands.map(({id, name}) => (
                        <MenuItem
                            key={name}
                            value={id}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText>
                    {store.Brands.length === 0 &&
                    <Typography variant={'caption'}>
                        Нет брендов по типу
                    </Typography>
                    }
                </FormHelperText>
            </FormControl>


        </div>
    );
}
)

export default DeleteBrand;