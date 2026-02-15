'use strict'

function showMenu(btn, menu)
{
    let button = document.querySelector(`.${btn}`)
    let menuList = document.querySelector(`.${menu}`)
    let innBtn = menuList.querySelector('._innBtn')
    button.addEventListener('click', function()
    {
        menuList.classList.add('show')
    })
    innBtn.addEventListener('click', function()
    {
        menuList.classList.remove('show')
    })
}
showMenu('_menu', '_menuList')
showMenu('_soc', '_socList')
let a = '1'
let b = 1
console.log(a === b)


function slider(sliderName)
{
    let parent = document.querySelector(`.${sliderName}`)
    let parent_dots = document.querySelector('.main-content')
    let slides = parent.querySelectorAll('._sliderItem')
    let currentIndex = 0
    let slideWidth = slides[0].offsetWidth
    let step = 0
    let isAnimating = false
    let gap = 30

    let dotsContainer = document.createElement('div')
    dotsContainer.className = 'slider-dots';

    slides.forEach((slide, index) =>
    {
        let dot = document.createElement('span');
        dot.className = 'slider-dot';

        let fill = document.createElement('span');
        fill.className = 'slider-dot-fill';

        dot.appendChild(fill);

        dot.setAttribute('data-index', index);

        dotsContainer.appendChild(dot);
    })

    parent_dots.parentNode.appendChild(dotsContainer);

    slides.forEach(slide => {
        let clone = slide.cloneNode(true);
        parent.appendChild(clone);
    });

    let dotItems = document.querySelectorAll('.slider-dot');

    function updateActiveDot (index)
    {
        dotItems.forEach((dot, i) => {
            let fill = dot.querySelector('.slider-dot-fill');
            fill.style.width = '0%';
            dot.classList.remove('active');
        });

        let activeDot = dotItems[index % slides.length];
        activeDot.classList.add('active');

        let fill = activeDot.querySelector('.slider-dot-fill');
        fill.style.width = '0%'

        void fill.offsetWidth;
        fill.style.width = '100%';

    }

    let totalSlides = parent.querySelectorAll('._sliderItem')

    updateActiveDot(0);

    function moveSlider()
    {
        if(isAnimating) return;
        isAnimating = true
        currentIndex ++
        let step = -currentIndex * (slideWidth + gap);
        totalSlides.forEach(slide =>
        {
            slide.style.transform = `translateX(${step}px)`
        })

        if (currentIndex < slides.length) {
            updateActiveDot(currentIndex);
        }

        if (currentIndex >= slides.length)
        {
            setTimeout(()=>{
                currentIndex = 0
                totalSlides.forEach(slide =>{
                    slide.style.transition = 'none';
                    slide.style.transform = `translateX(0px)`;
                })

                setTimeout(() => {
                    totalSlides.forEach(slide => {
                        slide.style.transition = 'transform 0.8s';
                    });
                    isAnimating = false;
                }, 50)

                updateActiveDot(0);
            },500)
        }

        else
        {
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }


    }

    setInterval(moveSlider, 3000);
}

slider('slider-photos')

