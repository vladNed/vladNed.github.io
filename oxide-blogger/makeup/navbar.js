/**
 * Add black background to navbar
 */
export function makeBlack(){
    const navbar = document.querySelector('.blog-navbar')
    if (window.scrollY >= 10) {
        navbar.className = `blog-navbar black`;
    } else {
        navbar.className = 'blog-navbar';
    }
}

/**
 * Open the menu when in phone/tablet mode
 */
export function openMenu(){
    const navMenu = document.querySelector('.blog-navbar ul')
    navMenu.classList.toggle('open')
}
