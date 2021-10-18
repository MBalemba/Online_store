import React from 'react';
import {store} from './../storeDeleteBrand'
import {observer} from "mobx-react-lite";
import {Button, Modal} from "react-bootstrap";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";
import {CSSTransition} from "react-transition-group";



const DeleteType = observer(({show, onHide}) => {
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
                            Удалить бренд
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={'wrapperSelect'}>
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



                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={store.IsDisabled} onClick={deleteBrandHandler} variant={'outline-danger'}>Удалить бренд</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
});

export default DeleteType;