const GalleryClassName = 'gallery'
const GalleryLineClassName = 'gallery-line'
const GallerySlideClassName = 'gallery-slide';




export class Gallery {
    constructor(element, options= {}){
        
        this.manageHtml = this.manageHtml.bind(this)
        this.setParameters = this.setParameters.bind(this)
        this.setEvents = this.setEvents.bind(this)
        this.resizeGallery = this.resizeGallery.bind(this)
        this.stopDrag = this.stopDrag.bind(this)
        this.startDrag = this.startDrag.bind(this)
        this.dragging = this.dragging.bind(this)
        this.setStylePosition = this.setStylePosition.bind(this)


        this.containerNode = element ;
        this.size = element.childElementCount;
        this.currentSlide = 0;
        this.currentSlideWasChanged = false;
       
        this.manageHtml();
        this.setParameters();
        this.setEvents();
        


    }

    manageHtml(){
        this.containerNode.classList.add(GalleryClassName);
        this.containerNode.innerHTML = `
            <div class="${GalleryLineClassName}"> 
                ${this.containerNode.innerHTML}
            </div>
        `;

        this.lineNode = this.containerNode.querySelector(`.${GalleryLineClassName}`)

        this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>
            wrapElementByDiv({
                element: childNode,
                className: GallerySlideClassName
            })
        );

        console.log('slideNodes: ', this.slideNodes)

    }

    setMainValues(){

    }


    setParameters(){
        const coordsContainer = this.containerNode.getBoundingClientRect()

        this.width = coordsContainer.width; 
        this.lineNode.style.width = this.size * this.width + 'px';
        this.x = -this.currentSlide* this.width
        
        this.slideNodes.forEach(slideNodes => {
            slideNodes.style.width =  this.width + 'px'
        });
    }

    setEvents() {
        this.debounceResizeGalary = debounce(this.resizeGallery)
        window.addEventListener('resize', this.debounceResizeGalary)
        this.lineNode.addEventListener('pointerdown', this.startDrag)
        window.addEventListener('pointerup', this.stopDrag)
    }

    destroyEvents() {
        window.removeEventListener('resize',  this.debounceResizeGalary )
    }

    resizeGallery(e) {
        this.setParameters();
    }

    startDrag(evt) {
        this.resetStyleTransition();
        this.currentSlideWasChanged = false;
        this.clickX = evt.pageX;
        this.startX =  this.x
        window.addEventListener('pointermove', this.dragging)
    }

    stopDrag() {        
        window.removeEventListener('pointermove', this.dragging)
        this.x = -this.currentSlide * this.width
        this.setStylePosition()
        this.setStyleTransition();
    }
    dragging(evt) {
        this.dragX = evt.pageX;
        const dragShift = this.dragX - this.clickX;
        this.x = this.startX + dragShift;
        this.setStylePosition();

        //Change active slide

        if(
            dragShift > 60 &&
            dragShift > 0 &&
            !this.currentSlideWasChanged &&
            this.currentSlide > 0 
        ) {
            this.currentSlideWasChanged = true;
            this.currentSlide = this.currentSlide - 1;
        }
        
        if(
            dragShift < -60 &&
            dragShift < 0 &&
            !this.currentSlideWasChanged &&
            this.currentSlide < this.size -1 
        ) {
            this.currentSlideWasChanged = true;
            this.currentSlide = this.currentSlide + 1;
        }
         
    }

    setStylePosition(){
        this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`
    }

    setStyleTransition(){
        this.lineNode.style.transition = `all 0.25s ease 0s`
    }

    resetStyleTransition() {
        this.lineNode.style.transition = `all 0s ease 0s`
    }

}



//Helpers 

function wrapElementByDiv({element, className}) {
    const wrapperNode = document.createElement('div');
    wrapperNode.classList.add(className);
    element.parentNode.insertBefore(wrapperNode, element);
    wrapperNode.appendChild(element);
    return wrapperNode
}

function debounce(func, time = 100){

    let timer;

    return function (event){
        clearTimeout(timer);
        timer = setTimeout(func, time, event)
    }
}