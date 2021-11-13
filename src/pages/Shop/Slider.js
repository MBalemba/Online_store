import React, {Component} from "react";
import {Button, Paper} from "@material-ui/core";
import {BiLeftArrow, BiRightArrow, IoPause, IoPlay, IoPlayCircleSharp} from "react-icons/all";
import {styled} from "@material-ui/core/styles";


function debounce(func, time = 140) {

    let timer;

    return function (event) {
        clearTimeout(timer);
        timer = setTimeout(func, time, event)
    }
}


const ButtonSlider = styled(Button)({
    background: 'rgba(0,0,0,0.3)',
    minWidth: '1rem',
    minHeight: '3rem',
    borderRadius: '50%',
    color: 'white',
    transition: '0.25s',
    '&:hover': {
        transform:' scale(1.2)',
        background: 'rgba(0,0,0,0.4)',
    }
})

class Slider extends Component {

    constructor(props) {
        super(props);
        this.currentSlide = 0


        this.state = {
            arr: [1, 2],
            activeItem: 1,
            isPause: false,
        }


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
        this.mouseEnter = this.mouseEnter.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)

        this.switchTimeInterval= this.switchTimeInterval.bind(this)

    }



    componentDidMount() {
        this.setParameters()
        // this.setParametersTimeInterval()
        this.setEvents()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const prevDevices = prevProps?.devices
        const currentDevices = this.props?.devices


        if(prevDevices !== currentDevices){
            this.setParameters()
        }
    }

    componentWillUnmount() {

        clearInterval(this.updateSliderIntervalId)
        this.removeEvents()
    }

    setParametersTimeInterval() {
        this.updateSliderIntervalId = setInterval(this.setParameters,2000 )
    }

    switchTimeInterval() {
        if (this.currentSlide < this.numberItemsGallery - 1) {
            this.currentSlide = this.currentSlide + 1;
            this.x = this.getPosition()
            this.resetStylePosition()
        } else {
            this.currentSlide = 0;
            this.x = this.getPosition()
            this.resetStylePosition()
        }
    }

    setParameters() {
        this.containerNode = document.getElementById(`gallery_${this.props.id}`)
        this.btnSlider_prev = document.querySelector( `.btnSlider_prev_${this.props.id}>button`)
        this.btnSlider_next = document.querySelector(`.btnSlider_next_${this.props.id}>button`)
        this.lineNode = this.containerNode.querySelector(`.gallery-line_${this.props.id}`)
        this.numberItemsGallery = this.lineNode.childElementCount;


        const coordsContainer = this.containerNode.getBoundingClientRect()
        this.width = coordsContainer.width;
        this.lineNode.style.width = this.numberItemsGallery * this.width + 'px'
        this.arr = []
        for (let i = 0; i < this.numberItemsGallery; i++) {
            this.arr.push(i)
        }

        this.setState({
            arr: this.arr
        })

        this.lineNode.childNodes.forEach(slideNodes => {
            slideNodes.style.width = this.width + 'px'
        });
        this.x = this.getPosition()
        this.resetStylePosition()
    }

    getPosition() {
        return -this.currentSlide * this.width
    }

    resizeGallery() {
        console.log('galleryResizing')
        this.setParameters();
    }

    setEvents() {
        this.debounceResizeGalary = debounce(this.resizeGallery)
        window.addEventListener('resize', this.debounceResizeGalary)
        this.containerNode.addEventListener('mouseenter', this.mouseEnter)
        this.containerNode.addEventListener('mouseleave', this.mouseLeave)


        this.btnSlider_prev.addEventListener('click', (e) => {
            this.decrease()
        })

        this.btnSlider_next.addEventListener('click', (e) => {
            this.increase()
        })
        this.setStyleTransition()
        this.intervalId = setInterval(this.switchTimeInterval, 5000)
    }

    removeEvents() {
        window.removeEventListener('resize', this.debounceResizeGalary)
        this.containerNode.removeEventListener('mouseenter', this.mouseEnter)
        this.containerNode.removeEventListener('mouseleave', this.mouseLeave)
    }

    mouseEnter() {
        // console.log('mouseenter')
        this.setState({isPause: true})
        clearInterval(this.intervalId)
        this.isLeave = false
        window.addEventListener('pointerdown', this.startDrag)
        window.addEventListener('pointerup', this.stopDrag)
    }

    mouseLeave() {
        // console.log('mouseleave')

        this.isLeave = true
        if (!this.isStartDrag) {
            window.removeEventListener('pointerdown', this.startDrag)
            window.removeEventListener('pointerup', this.stopDrag)
            this.setState({isPause: false})
            this.intervalId = setInterval(this.switchTimeInterval, 5000)
        }
    }



    startDrag(e) {
        e.preventDefault()
        this.isStartDrag = true
        this.resetStyleTransition()
        this.dragShift = 0
        this.clickX = e.pageX
        window.addEventListener('pointermove', this.pointerMove)
    }

    pointerMove(e) {
        // console.log('pointer move worked')
        this.dragX = e.pageX;
        this.dragShift = this.dragX - this.clickX;
        this.setStylePosition()
    }

    stopDrag() {
        window.removeEventListener('pointermove', this.pointerMove)
        if (
            this.dragShift > this.width / 4 &&
            this.currentSlide > 0
        ) {
            console.log('width: ', this.width)
            this.currentSlide = this.currentSlide - 1;
            this.x = this.getPosition()

        }

        if (
            this.dragShift < -this.width / 4 &&
            this.currentSlide < this.numberItemsGallery - 1
        ) {
            console.log('width: ', this.width)
            this.currentSlide = this.currentSlide + 1;
            this.x = this.getPosition()
        }

        this.setStyleTransition()
        this.resetStylePosition()
        this.isStartDrag = false
        if (this.isLeave) {
            window.removeEventListener('pointerdown', this.startDrag)
            window.removeEventListener('pointerup', this.stopDrag)
            this.setState({isPause: false})
            this.intervalId = setInterval(this.switchTimeInterval, 5000)
        }
        window.removeEventListener('pointermove', this.pointerMove)
    }

    setStylePosition() {
        this.lineNode.style.transform = `translate3d(${this.x + this.dragShift}px, 0, 0)`
    }

    resetStylePosition() {
        this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`
        this.setState({activeItem: this.currentSlide})
    }

    setStyleTransition() {
        this.lineNode.style.transition = `all 1s ease 0s`
    }

    resetStyleTransition() {
        this.lineNode.style.transition = `all 0s ease 0s`
    }

    increase() {

        if (this.currentSlide < this.numberItemsGallery - 1) {
            this.currentSlide = this.currentSlide + 1;
            this.x = this.getPosition()
            this.resetStylePosition()
        } else {
            this.currentSlide = 0;
            this.x = this.getPosition()
            this.resetStylePosition()
        }

    }

    decrease() {

        if (this.currentSlide > 0) {
            this.currentSlide = this.currentSlide - 1;
            this.x = this.getPosition()
            this.resetStylePosition()
        } else {
            this.currentSlide = this.numberItemsGallery - 1;
            this.x = this.getPosition()
            this.resetStylePosition()
        }
    }

    dotTurn(id) {
        this.currentSlide = id
        this.x = this.getPosition()
        this.resetStylePosition()
    }


    render() {

        console.log('this.numberItemsGallery ', this.state.arr)
        return (
            <div ref={this.ref} id={`gallery_${this.props.id}`} className={'gallery'}>


                <div className={'slideInsides'}>
                    <div className={'btnSlider btnSlider_prev ' + `btnSlider_prev_${this.props.id}`}>
                        <ButtonSlider variant="outlined">
                            <BiLeftArrow/>
                        </ButtonSlider>
                    </div>

                    <div className={'gallery-line '+`gallery-line_${this.props.id}` }>
                        {this.props.render()}
                        {/*<div className="slide slide-3">*/}
                        {/*    <img src="https://images.wbstatic.net/bners1/big_holodilnik_25_08.jpg" alt=""*/}
                        {/*         className="slide_slideImage__29MbQ"/>*/}
                        {/*</div>*/}
                        {/*<div className="slide slide-1">*/}
                        {/*    <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""*/}
                        {/*         className="slide_slideImage__29MbQ"/>*/}
                        {/*</div>*/}
                        {/*<div className="slide slide-2">*/}
                        {/*    <img src="https://images.wbstatic.net/bners1/pull_666.jpg" alt=""*/}
                        {/*         className="slide_slideImage__29MbQ"/>*/}
                        {/*</div>*/}
                        {/*<div className="slide slide-4">*/}
                        {/*    <img src="https://images.wbstatic.net/bners1/big_school_25_08.jpg" alt=""*/}
                        {/*         className="slide_slideImage__29MbQ"/>*/}
                        {/*</div>*/}
                    </div>

                    <div className={'btnSlider btnSlider_next '+ `btnSlider_next_${this.props.id}`}>
                        <ButtonSlider variant="outlined">
                            <BiRightArrow/>
                        </ButtonSlider>
                    </div>

                    <div className={'dotsMenu'}>
                        {this.state.arr && this.state.arr.map((el) =>
                            <div onClick={() => {
                                this.dotTurn(el);
                                ;
                                this.setState({activeItem: el})
                            }} key={el} className={'wrapperDotItem'}>
                                <div style={this.state.activeItem === el ? {backgroundColor: '#007bff'} : {}}
                                     className={'dotItem'}>

                                </div>
                            </div>)}

                        <div className={'wrapperDotItem'}>
                            {this.state.isPause ? <IoPlay />:
                                <IoPause />}

                        </div>
                    </div>
                </div>



            </div>
        );
    }
}


export default Slider