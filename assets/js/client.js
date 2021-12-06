left__nav = document.querySelector('.left__nav');
menu = document.querySelector('.menu');
right__nav = document.querySelector('.right__nav');
right__nav__video = document.querySelector('.right__nav__video ');
iframe = document.querySelector('.iframe');
left__nav__item = document.querySelectorAll('.left__nav__item');
menu.addEventListener('click', () => {
    // alert("jdsjd")
    left__nav__item.forEach((elem) => {
        elem.classList.toggle("add__item__menu__btn")
    })
    setTimeout(() => {
        left__nav.classList.toggle("add__width__to__left__nav")
    }, 100);

    setTimeout(() => {
        right__nav.classList.toggle("add__width__to__right__nav")
    }, 100);
    setTimeout(() => {
        right__nav__video .classList.toggle("add__width__to__right__nav__video")
    }, 100);
    setTimeout(() => {
        iframe .classList.toggle("frame")
    }, 100);
})
