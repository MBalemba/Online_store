import React, {useContext, useEffect} from 'react';
import {Pagination, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory, useParams} from "react-router-dom";

const MyPagination = observer(() => {
    const {device} = useContext(Context)
    let history = useHistory()
    let arrOfPages = device.arrOfPage
    const {type: typeUrl} = useParams();

    useEffect(() => {
        arrOfPages = device.arrOfPage
    }, [device.CurrentPage])


    if (device.PageCount === 1) {
        return ' '
    }


    function clickPaginateItem(itemNumber) {
        device.setCurrentPage(Number(itemNumber))
        history.push(`/home/${typeUrl}?${device.createStrParamsForRequest()}`)
    }

    return (

        <Row className={'d-flex justify-content-center mt-4 mb-4 Pagination'}>
            <Pagination>
                {device.PageCount < device.PaginationTypeBorderValue
                    ?
                    device.arrOfPage.map(el =>
                        <Pagination.Item
                            active={el == device.CurrentPage}
                            key={el}
                            onClick={clickPaginateItem.bind(null, el)}
                        >
                            {el}
                        </Pagination.Item>
                    )

                    :
                    <>
                        <Pagination.First onClick={clickPaginateItem.bind(null, 1)}/>


                        {device.CurrentPage - device.LengthMiddlePagination > 1 &&
                        <Pagination.Item onClick={clickPaginateItem.bind(null, 1)}>{1}</Pagination.Item>
                        }
                        {device.CurrentPage - (device.LengthMiddlePagination+1) > 1 &&
                        <Pagination.Ellipsis
                            onClick={clickPaginateItem.bind(null, Math.ceil((device.CurrentPage  - 1) / 2))}
                        />
                        }





                        {
                            device.arrOfPage.map(el =>
                                <Pagination.Item
                                    active={el == device.CurrentPage}
                                    key={el}
                                    onClick={clickPaginateItem.bind(null, el)}
                                >
                                    {el}
                                </Pagination.Item>
                            )
                        }



                        {device.CurrentPage + (device.LengthMiddlePagination +1)  < device.PageCount &&
                        <Pagination.Ellipsis
                            onClick={clickPaginateItem.bind(null, device.CurrentPage + Math.ceil((device.PageCount - device.CurrentPage) / 2))}/>
                        }

                        {device.CurrentPage +  device.LengthMiddlePagination < device.PageCount &&
                        <Pagination.Item
                            onClick={clickPaginateItem.bind(null, device.PageCount)}>{device.PageCount}
                        </Pagination.Item>
                        }



                        <Pagination.Last onClick={clickPaginateItem.bind(null, device.PageCount)}/>

                    </>
                }
            </Pagination>
        </Row>
    );
});

export default MyPagination;