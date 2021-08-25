import React, {Component, useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../../components/Shop/TypeBar";
import SettingsBar from "../../components/Shop/SettingsBar/SettingsBar";
import DeviceList from "../../components/Shop/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import MyPagination from "../../components/Shop/Pagination";
import '../general.css'
import './Slider.css'
import {Button, makeStyles, Paper} from "@material-ui/core";
import {Gallery} from "../../utils/gallery";

const useStyles = makeStyles((theme) => ({
        container: {
            padding: '10px',
            boxSizing: 'border-box',
            position: 'related',
            overflowX: 'hidden',
        },
        galleryLine: {
            display: 'flex',
            height: 'inherit',
            minHeight: '500px',
            position: 'relative',
        },
        item: {
            boxSizing: 'border-box',
            width: '70%',
            padding: '1rem',
            minHeight: '100%',
            minWidth: ({numberVisibleItems}) => 100 / numberVisibleItems + '%',
        }
    })
)




function debounce(func, time = 100){

    let timer;

    return function (event){
        clearTimeout(timer);
        timer = setTimeout(func, time, event)
    }
}

class MainPage_v2 extends Component {

    constructor(props) {
        super(props);
        this.currentSlide = 0


        this.resizeGallery = this.resizeGallery.bind(this)
        this.setParameters = this.setParameters.bind(this)
        this.setEvents = this.setEvents.bind(this)
        this.startDrag = this.startDrag.bind(this)
        this.stopDrag = this.stopDrag.bind(this)
        this.pointerMove = this.pointerMove.bind(this)
        this.setStylePosition = this.setStylePosition.bind(this)
        this.resetStylePosition = this.resetStylePosition.bind(this)
        this.setStyleTransition = this.setStyleTransition.bind(this)
        this.resetStyleTransition = this.resetStyleTransition.bind(this)
        this.getPosition = this.getPosition.bind(this)


    }

    componentDidMount() {
        this.setParameters()
        this.setEvents()
    }
    componentWillUnmount() {
        debugger
        this.removeEvents()
    }

    setParameters() {
        debugger
        this.containerNode = document.getElementById('gallery')
        console.log(this.containerNode)
        console.log('this: ', this)
        this.lineNode = this.containerNode.firstChild
        this.numberItemsGallery = this.lineNode.childElementCount;


        const coordsContainer = this.containerNode.getBoundingClientRect()
        this.width = coordsContainer.width;
        this.lineNode.style.width = this.numberItemsGallery * this.width + 'px'
        this.x = this.getPosition()

        this.lineNode.childNodes.forEach(slideNodes => {
            slideNodes.style.width =  this.width + 'px'
        });
    }

    getPosition() {
        return -this.currentSlide* this.width
    }

    resizeGallery() {
        this.setParameters();
    }

    setEvents() {
        this.debounceResizeGalary = debounce(this.resizeGallery)
        window.addEventListener('resize', this.debounceResizeGalary)
        this.lineNode.addEventListener('pointerdown', this.startDrag)
        window.addEventListener('pointerup', this.stopDrag)
    }

    removeEvents() {
        window.removeEventListener('resize', this.debounceResizeGalary)
    }

    startDrag(e){
        e.preventDefault()
        this.resetStyleTransition()
        this.dragShift = 0
        console.log(e.pageX)
        this.clickX = e.pageX
        window.addEventListener('pointermove', this.pointerMove)
    }

    pointerMove(e){
        console.log('pointer move worked')
        this.dragX = e.pageX;
        this.dragShift = this.dragX - this.clickX;
        this.setStylePosition()
    }

    stopDrag() {
        window.removeEventListener('pointermove', this.pointerMove)
        if(
            this.dragShift > 60 &&
            this.currentSlide > 0
        ) {
            this.currentSlide = this.currentSlide - 1;
            this.x =  this.getPosition()
        }

        if(
            this.dragShift < -60 &&
            this.currentSlide < this.numberItemsGallery - 1
        ) {
            this.currentSlide = this.currentSlide + 1;
            this.x =  this.getPosition()
        }

        this.setStyleTransition()
        this.resetStylePosition()
    }

    setStylePosition(){
        this.lineNode.style.transform = `translate3d(${this.x + this.dragShift}px, 0, 0)`
    }

    resetStylePosition(){
        this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`
    }

    setStyleTransition(){
        this.lineNode.style.transition = `all 0.25s ease 0s`
    }

    resetStyleTransition(){
        this.lineNode.style.transition = `all 0s ease 0s`
    }



    render() {


        return (
            <Paper ref={this.ref} id="gallery" className={'gallery'}>
                <div className={'gallery-line'}>
                    <div className="slide slide-1">
                        <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""
                             className="slide_slideImage__29MbQ" />

                    </div>
                    <div className="slide slide-2">
                        <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""
                             className="slide_slideImage__29MbQ" />
                    </div>
                    <div className="slide slide-3">
                        <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""
                             className="slide_slideImage__29MbQ" />
                    </div>
                    <div className="slide slide-4">
                        <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""
                             className="slide_slideImage__29MbQ" />
                    </div>
                </div>
            </Paper>
        );
    }
}


function MainPage() {
    const propsToStyle = {
        numberVisibleItems: 2,
    }

    const ref = React.createRef();

    let oldScroll = 0

    const classes = useStyles(propsToStyle)

    useEffect(() => {
        const instGallery = new Gallery(ref.current)

    })

    return (<>
        <div
            className={classes.container}
        >
            <Paper ref={ref} id="gallery">
                <div className="slide slide-1">
                    <Paper className={classes.item}>

                    </Paper>
                </div>
                <div className="slide slide-2">
                    2
                </div>
                <div className="slide slide-3">
                    3
                </div>
                <div className="slide slide-4">
                    4
                </div>
            </Paper>

        </div>
    </>);
}

const Shop = observer(() => {
    const {device, user} = useContext(Context)

    useEffect(() => {
            device.setBrandInType()
            return () => {
                device.toggleStatusLoadDevices(true)
            }
        }
        , [])

    return (
        <Container>
            <Row className={'mt'}>

                <Col md={3}>
                    <TypeBar/>
                    <SettingsBar/>

                </Col>
                <Col md={9}>
                    <SettingsBar/>
                    <MyPagination/>
                    <DeviceList/>
                    <MainPage_v2/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;