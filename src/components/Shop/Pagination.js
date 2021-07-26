import React, {useContext, useEffect} from 'react';
import {Pagination, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const MyPagination = observer(() => {
    const {device} = useContext(Context)
    const arrOfPages = device.arrOfPage

    useEffect(()=>{

    }, [device.CurrentPage])


    if (device.PageCount === 1) {
        return ' '
    }


    function clickPaginateItem(itemNumber){
        device.setCurrentPage(itemNumber)
    }

    return (

        <Row className={'d-flex justify-content-center mt-3'}>
            <Pagination>
                {device.PageCount < 9
                    ?
                    arrOfPages.map(el =>
                        <Pagination.Item
                            active={el === device.CurrentPage}
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