const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn-left');
const nextBtn = document.querySelector('.carousel-btn-right');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    const amountToMove = targetSlide.style.left;
    track.style.transform = 'translateX(-' + amountToMove + ')'; 
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.add('is-hidden');
    } else {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
};

// when i click left, move slides to the left
prevBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === targetSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const previousDot = currentDot.previousElementSibling;

    // move to the next slide
    updateDots(currentDot, previousDot);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
    moveToSlide(track, currentSlide, targetSlide);
})

// when i click right, move slides to the right
nextBtn.addEventListener('click', (event) => {
    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === targetSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    
    // move to the next slide
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
    moveToSlide(track, currentSlide, targetSlide);
})


// when i click the nav indicator, move to that slide 
dotsNav.addEventListener('click', event => {
    // what indicator was clicked on
    const targetDot = event.target.closest('.carousel-indicator');
    
    if (!targetDot) return;
    
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    const currentDot = dotsNav.querySelector('.current-slide');
    const currentSlide = track.querySelector('.current-slide');

    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});