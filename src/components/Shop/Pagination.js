import React, {useContext, useEffect} from 'react';
import {Pagination, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory, useParams} from "react-router-dom";

const MyPagination = observer(() => {
    const {device} = useContext(Context)
    let history = useHistory()
    const arrOfPages = device.arrOfPage
    const {type: typeUrl} = useParams();

    useEffect(()=>{

    }, [device.CurrentPage])


    if (device.PageCount === 1) {
        return ' '
    }


    function clickPaginateItem(itemNumber){
        device.setCurrentPage(itemNumber)
        history.push(`/home/${typeUrl}?${device.createStrParamsForRequest()}`)
    }

    return (

        <Row className={'d-flex justify-content-center mt-3 Pagination'}>
            <Pagination>
                {device.PageCount < 9
                    ?
                    arrOfPages.map(el =>
                        <Pagination.Item
                            active={el == device.CurrentPage}
                            key={el}
                            onClick={clickPaginateItem.bind(null, el)}
                        >
                            {el}
                        </Pagination.Item>
                    )
                    : ''
                }
            </Pagination>
        </Row>
    );
});

export default MyPagination;