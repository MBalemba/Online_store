import React, {useEffect} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {
    Box,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from "@material-ui/core";
import StoreDeleteBrand from "../storeDeleteBrand";
import {observer} from "mobx-react-lite";
import {CSSTransition} from "react-transition-group";
import {createDevice} from "../../../../pages/Admin";
import './DeleteBrand.css'
import {store} from './../storeDeleteBrand'



const DeleteBrand = observer(({show, onHide}) => {
    function doRequest(){
        store.getBrandsInTypes()
    }
    useEffect(()=>{
        doRequest()

        return ()=>{
            store.returnToInitial()
        }
    }, [])

    useEffect(()=>{
        if(!show){
            store.returnToInitial()
        }
    },[show])

    const selectChange = (e)=>{
        store.setSelectedType(e.target.value)
    }


    function deleteBrandHandler() {
        store.deleteBrand().then(()=>{
            debugger
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



                           <CSSTransition
                               in={Boolean(store.GetSelectedType)}
                               timeout={1000}
                               mountOnEnter={true}
                               unmountOnExit={true}
                           >
                               {state =>
                                   <div className={`multiSelect ${state} itemSelect`}>
                                       <MultipleSelectChip store={store} />
                                   </div>
                               }

                           </CSSTransition>



                       </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={store.IsDisabled} onClick={deleteBrandHandler} variant={'outline-danger'}>Удалить бренд</Button>
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
                <FormControl className={'formControl'} >
                    <InputLabel id="demo-simple-select-helper-label">Бренд</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        value={store.GetSelectedTypeBrand}
                        onChange={handleChange}
                    >
                        {store.Brands.map(({id,name}) => (
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
                        Нет брендов по типу "{store.GetSelectedType}"
                    </Typography>
                    }
                    </FormHelperText>
                </FormControl>


            </div>
    );
})

export default DeleteBrand;