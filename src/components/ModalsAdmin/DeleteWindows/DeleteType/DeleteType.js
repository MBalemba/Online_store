import React, {useContext, useEffect, useState} from 'react';
import {store} from './../storeDeleteBrand'
import {observer} from "mobx-react-lite";
import { Modal} from "react-bootstrap";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import './DeleteType.css'
import {Context} from "../../../../index";



export const DeleteType = observer(({show, onHide}) => {

    const {taskInstance} = useContext(Context)

    const [isEdit, setIsEdit] = useState(false)
    const [typeEdit, setTypeEdit] = useState('')

    useEffect(()=>{
        doRequest()

        return ()=>{
            store.returnToInitial()
        }
    }, [])


    useEffect(()=>{
        setTypeEdit(store.GiveNameSelectedType)
    }, [store.selectedTypeId])

    function doRequest(){
        store.getBrandsInTypes()
    }



    function deleteBrandHandler(){
        store.deleteType().then(()=>{

            doRequest()
        })
    }

    function selectChange(e){
        store.setSelectedType(e.target.value)
    }

    function editTypeHandle() {
        store.editType(typeEdit).then(()=>{
            taskInstance.createTask('Тип успешно изменен', 'Success' )
        }).catch(()=>{
            taskInstance.createTask('Возникла какая-то ошибка, повторите попытку', 'Warning' )
        }).finally(()=>{
            doRequest()
        })

    }

    return (
        <div>
                <Modal
                    show={show}
                    size="lg"
                    onHide={onHide}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {isEdit ? 'Редактировать': 'Удалить'} Тип
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        {isEdit &&  <div className={'editBrand'}>
                            <TextField onChange={(e)=>setTypeEdit(e.target.value)} className={'textFieldBrandEdit'} autoFocus value={typeEdit} fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
                            <div className={'buttonsGroupEditBrand'}>
                                <Button onClick={()=>setIsEdit(false)}>Отмена</Button>
                                <Button onClick={()=>{editTypeHandle(); setIsEdit(false)}}> Применить</Button>
                            </div>
                        </div>}

                        {!isEdit && <div className={'wrapperSelect'}>

                            <div className={'itemSelect'}>
                                <FormControl >
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

                                        {store.ListBrands.map(el=>
                                            <MenuItem value={el.id}>
                                                {el.name}
                                            </MenuItem>
                                        )}

                                    </Select>
                                    <FormHelperText>Выберите какого типа удалить бренд</FormHelperText>
                                </FormControl>
                            </div>
                        </div> }


                    </Modal.Body>
                    <Modal.Footer>
                        {!isEdit && <Button disabled={store.GetSelectedType === null } color={''} onClick={()=>{ setIsEdit(true)}} variant={'outlined'}>Редактировать</Button>
                        }
                        <Button disabled={store.GetSelectedType === null || isEdit} color={'error'} onClick={deleteBrandHandler} variant={'outlined'}> Удалить
                            бренд</Button>

                    </Modal.Footer>
                </Modal>
        </div>
    );
});

export default DeleteType;