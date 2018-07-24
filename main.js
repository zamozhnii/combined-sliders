/* Initialize the three blocks */

const horizontalSlider = document.querySelector('.slider-horiz');
const verticalSlider = document.querySelector('.slider-vert');
const content = document.querySelector('.content');

/* Dynamically make the same elements active */

const startDataActive = horizontalSlider.querySelector('.active').getAttribute('data-target');
const spansVerticalSlider = verticalSlider.querySelectorAll('span');

spansVerticalSlider.forEach(el => {
    if(el.className === 'active')
        el.classList.remove('active');
    if(el.getAttribute('data-target') === startDataActive)
        el.classList.add('active');
});

/* Dynamically fill the content */

content.querySelector('div').innerHTML =  document.querySelector('.active').querySelector('p').textContent;

/* Аdd a click event */

horizontalSlider.addEventListener('click', (e) => {
    changeActiveElement(e);
});

verticalSlider.addEventListener('click', (e) => {
    changeActiveElement(e);
});

/* function in which slider needs switching */

function checkOnSlider(element, slider) {
    let dataNumber = element.getAttribute('data-target'); 
    if(slider.className === 'slider-horiz') {
        let spans = verticalSlider.querySelectorAll('span');
        spans.forEach(el => {
            if(el.getAttribute('data-target') === dataNumber) {
                verticalSlider.querySelector('.active').classList.remove('active');
                el.classList.add('active');
            }
        })
    } else {
        let spans = horizontalSlider.querySelectorAll('span');
        spans.forEach(el => {
            if(el.getAttribute('data-target') === dataNumber) {
                horizontalSlider.querySelector('.active').classList.remove('active');
                el.classList.add('active');
            }
        })
    }
}

/* Processing function */

function changeActiveElement(e) {
    let target = e.target;
    let _self = e.currentTarget;

    if(target.tagName === 'SPAN') {
        let activeElement = _self.querySelector('.active');
        activeElement.classList.remove('active');
        target.classList.add('active');
        checkOnSlider(target, _self);
        content.querySelector('div').innerHTML = target.querySelector('p').textContent;
    }

    if(target.tagName === 'BUTTON') {
        const allSpans = _self.querySelectorAll('span');
        if(target.id === 'right' || target.id === 'down') {
            for(let i = 0; i < allSpans.length; i++) {

                if(allSpans[i].classList.contains('active')) {
                    let activeElement = allSpans[i];
                    activeElement.classList.remove('active');
                    let nextActive = activeElement.nextElementSibling;
                    if(nextActive.tagName !== 'BUTTON') {
                        nextActive.classList.add('active');
                        checkOnSlider(nextActive, _self);
                        content.querySelector('div').innerHTML = nextActive.querySelector('p').textContent;
                    }

                    if(nextActive.tagName !== 'SPAN') {
                        allSpans[allSpans.length-1].classList.remove('active');
                        allSpans[0].classList.add('active');
                        checkOnSlider(allSpans[0], _self);
                        content.querySelector('div').innerHTML = allSpans[0].querySelector('p').textContent;
                    }
                    break;
                }
            }
        } else {
            for(let i = 0; i < allSpans.length; i++) {

                if(allSpans[i].classList.contains('active')) {
                    let activeElement = allSpans[i];
                    activeElement.classList.remove('active');
                    let prevElement = activeElement.previousElementSibling;
                    if(prevElement.tagName !== 'BUTTON') {
                        prevElement.classList.add('active');
                        checkOnSlider(prevElement, _self);
                        content.querySelector('div').innerHTML = prevElement.querySelector('p').textContent;
                    }
                    if(prevElement.tagName !== 'SPAN') {
                        allSpans[0].classList.remove('active');
                        allSpans[allSpans.length-1].classList.add('active');
                        checkOnSlider(allSpans[allSpans.length-1], _self);
                        content.querySelector('div').innerHTML = allSpans[allSpans.length-1].querySelector('p').textContent;
                    }
                    break;
                }
            }
        }
    }
}