const menuOpen = document.getElementsByClassName('nav-toggler')[0]
const navMenu = document.querySelector('.blog-navbar ul')
const navbar = document.querySelector('.blog-navbar')

function makeBlack(classToAdd){
    navbar.className = `blog-navbar ${classToAdd}`
}

function openMenu(){
    navMenu.classList.toggle('open')
}

function sendMessage(){
    let calledName = document.getElementById('caller-name').value
    let message = document.getElementById('message').value

    console.log(calledName)
    console.log(message)
}

window.addEventListener('scroll', function(e) {
    if(window.scrollY >= 10){
        makeBlack('black')
    }
    else{
        makeBlack('')
    }
})