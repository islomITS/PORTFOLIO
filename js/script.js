// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
document.addEventListener('contextmenu', e => {
    e.preventDefault();
})
// window.addEventListener("click", function () {
//     document.getElementById("content-menu").classList.remove("mouseactive");
// })
class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({
                from,
                to,
                start,
                end
            })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

// function reloadHeader(){
//     setTimeout(function(){
//         location.reload();
//     },0);
// }

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
    'Freelancer',
    'Web Developer',
    'Web Designer',
    'Frontend Developer.',
    'CEO DevFolio.'
]
const el = document.querySelector('.text')
const fx = new TextScramble(el)
let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
}
next()
let menutoggle = document.querySelector('.header-menu-icon');
let header = document.querySelector('.header-info-block');
let headermenu = document.querySelector('.header-menu');
let sectionabout = document.querySelector('.section-about');
let skillsblock = document.querySelector('.skills-glavniy');
let works = document.querySelector('.works-block');
let footerblock = document.querySelector('.footer-block');
let footerbtn = document.querySelector('.footer-btn');
let input = document.querySelector('.input');
menutoggle.onclick = function () {
    menutoggle.classList.toggle('active');
    header.classList.toggle('header-active');
    sectionabout.classList.toggle('section-about-active');
    headermenu.classList.toggle('header-menu-active');
    headermenu.classList.toggle('activemenu');
    skillsblock.classList.toggle('skillsblock-active');
    works.classList.toggle('works-active');
    footerblock.classList.toggle('footer-block-active');
}
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 10;
        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('scrolltop');
        } else {
            reveals[i].classList.remove('scrolltop');
        }
    }
}
setTimeout(() => {
    footerbtn.onclick = function () {
        alert('Congratulations , your message went to Islombek');
    }
}, 6000);
$(function () {
    $(".works-box-img").click(function () {
        $(".hide-blocks").css({
            display: 'block',
        })
        $(".portfolio").dblclick(function () {
            $(".hide-blocks").css({
                display: 'none',
            })
        })
        $(".hide-blocks .fa-times").click(function () {
            $(".hide-blocks").css({
                display: 'none',
            })
        })
       
    })
    let headermenulinks = $('.header-menu ul .header-menu-links');
    
    headermenulinks.on('click', function (e) {
        e.preventDefault();
        $('.header-menu').removeClass('header-menu-active');
        menutoggle.classList.remove('active');
        // headermenulinks.removeClass('header-links-active');
        let selector = $(this).addClass('header-links-active').attr('href');
        let target = $(selector);
        $('html, body').animate({
            scrollTop: target.offset().top - 0
        }, 100);
    })
    
    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        let headertopbtn = document.querySelector('.header-top-btn');
        headertopbtn.addEventListener('click', () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })
        if ($(this).scrollTop() >= 500) {
            $('.header-top-btn').css({
                transform: 'translateX(0)',
                transition: '1s',
            })
        } else {
            $('.header-top-btn').css({
                transform: 'translateX(200%)',
                transition: '1s',
            })
        }
        headermenulinks.each(function () {
            let selector = $(this).attr('href');
            let target = $(selector);
            if (scroll >= target.offset().top - 200) {
                headermenulinks.removeClass('header-links-active');
                $(this).addClass('header-links-active');
            }
        })
    })

})