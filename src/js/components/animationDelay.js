const animateEl1 = document.querySelector('.prog__img-1')
const animateEl2 = document.querySelector('.prog__img-2')
const animateEl3 = document.querySelector('.prog__img-3')
const animateEl4 = document.querySelector('.prog__img-4')

function delayAnimation (animatedEl, classNum) {
    animatedEl.classList.add(`anim${classNum}`)

    setTimeout(function () {
        setTimeout(delayAnimation, 5000);
        animatedEl.className = `prog__img-${classNum + 1} prog__img`
    }, 5000)// wait 5s

}



