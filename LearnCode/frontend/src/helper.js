export const toggleClass = (el,className) => {
    let elem = document.querySelector(el);
    elem.classList.toggle(className);
}