/*Navbar*/
window.addEventListener('scroll', () => changePadding())

function changePadding() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('.nav-wrapper').style.padding = "11px 0 11px 0";
        changeTop(42)
    } else {
        document.querySelector('.nav-wrapper').style.padding = "38px 0 36px 0";
        changeTop(67)
    }
}

// Прокрутка при кліку
const menuLinks = document.querySelectorAll('.nav-menu-link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (
            menuLink.dataset.goto &&
            document.querySelector(menuLink.dataset.goto)
        ) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue =
                gotoBlock.getBoundingClientRect().top +
                scrollY -
                document.querySelector('.nav').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth",
            });
            e.preventDefault();
        }
    }
}

function changeTop(size) {
    const nav = document.querySelectorAll('.nav-menu-link')
    nav.forEach(el => el.style.setProperty('--menuLinkTop', `${size}px`))
}

/*Our service tabs*/
const serviceTabs = document.querySelector('.services-tabs')
const serviceTabsTitle = document.querySelectorAll('.services-tabs-title')
const serviceTabsContent = document.querySelectorAll('.services-tabs-content')

serviceTabs.addEventListener('click', e => {
    const target = e.target
    changeClassName(target, serviceTabsTitle, serviceTabsContent)
})

function changeClassName(target, tabsTitle, tabsContent) {
    if (!tabsTitle) return
    tabsTitle.forEach(element => element.classList.remove('active'))
    target.classList.add('active')

    if (tabsContent) {
        tabsContent.forEach(element => {
            element.classList.remove('active')
            if (element.dataset.name === target.dataset.name) {
                element.classList.add('active')
            }
        })
    }
}

/*Our amazing work*/
/*Tabs variables*/
const portfolioTabs = document.querySelector('.our-portfolio')
const portfolioCategory = document.querySelectorAll('.our-portfolio-category')
const galleryCard = document.querySelector('.our-portfolio-gallery')
/*Button variables*/
const loadMoreWorkBtn = document.querySelector('.btn-load-more-portfolio')
const clockLoaderPortfolio = document.querySelector('.clock-loader-portfolio')
const titles = ['graphic-design', 'web-design', 'landing-pages', 'wordpress']
let cardLimit = 36
let cardsLeft = 12
let reduceFlag = false
let timeoutLoadCards

loadMoreWorkBtn.addEventListener('click', () => {
    const galleryCards = document.querySelectorAll('.gallery-card')
    reduceCards()
    toggleHiddenClass(loadMoreWorkBtn)
    toggleHiddenClass(clockLoaderPortfolio)
    timeoutLoadCards = setTimeout(loadCards, 2000, galleryCards)

})

function toggleHiddenClass(target) {
    target.classList.toggle('hidden')
}

// Перевірка яку вкладку натиснули. Якщо All віднімаємо 12 завантажених карточок,
// інше віднімаємо від cardLimit 9 вже завантажених карточок
function reduceCards() {
    let activeCategory = null
    if (reduceFlag) return
    portfolioCategory.forEach(category => {
        if (category.classList.contains('active')) activeCategory = category.dataset.name
    })
    // Тут можна зробити обхід скільки карточок наразі мають клас active і відняти їх від кардліміту. назвати reduceCardLimit
    if (activeCategory === 'all') {
        cardLimit = cardLimit - 12
        reduceFlag = true
    } else {
        cardLimit = cardLimit - 9
        reduceFlag = true
    }
}

// Ця функція додає клас active до карточок при натисненні кнопки load more
function loadCards(galleryCards) {
    toggleHiddenClass(loadMoreWorkBtn)
    toggleHiddenClass(clockLoaderPortfolio)
    clearTimeout(timeoutLoadCards)
    if (galleryCards) {
        for (let i = 0; i < galleryCards.length; i++) {
            if (checkCardLimit()) return toggleHiddenClass(loadMoreWorkBtn)
            if (cardsLeft < 1) return cardsLeft = 12
            if (!galleryCards[i].classList.contains('active')) {
                galleryCards[i].classList.add('active')
                cardsLeft--
                cardLimit--
            }
        }
        if (checkCardLimit()) return toggleHiddenClass(loadMoreWorkBtn)
    }
}

function checkCardLimit() {
    if (cardLimit === 0) {
        cardLimit = 27
        cardsLeft = 12
        return true
    }
}

portfolioTabs.addEventListener('click', e => {
    const galleryCards = document.querySelectorAll('.gallery-card')
    galleryCards.innerHTML = ''
    const target = e.target
    if (target.classList.contains('active')) return // Якщо повторно натиснули на категорію
    changeClassName(target, portfolioCategory, galleryCards) // підсвічую категорію
    /*Обнуляю флаг, кардліміт і зменшую cardLimit згідно з вибраною категорією
    * Роблю це через те, якщо до цього була натиснута*/
    cardLimit = 36
    reduceFlag = false
    reduceCards()
    if (loadMoreWorkBtn.classList.contains('hidden')) toggleHiddenClass(loadMoreWorkBtn)
    if (target.dataset.name === 'all') {
        galleryCards.forEach(el => el.remove())
        return addCards()
    }

})
addCards()

// Додаю всі доступні карточки до DOM та задаю клас active кожній 3-й (для завантаження перших 3-х карточок)
function addCards() {
    titles.forEach(title => {
        for (let i = 1; i < 10; i++) {
            i % 3 === 0 ? appendCard(title, i, true) : appendCard(title, i)
        }
    })
}

function appendCard(imageTitle, imageIndex, active = false) {
    let template
    active ? template = createWorkSectionTemplate(imageTitle, imageIndex, 'active') : template = createWorkSectionTemplate(imageTitle, imageIndex)
    galleryCard.insertAdjacentHTML('beforeend', template)
}

function createWorkSectionTemplate(imageTitle, imageIndex, active = '') {
    const cardPopUpSubtitle = createSubTitleName(imageTitle)
    return `<div class="gallery-card ${active}" data-name="${imageTitle}"><img alt="${imageTitle}"
                                                                               class="gallery-card-img"
                                                                               src="images/${imageTitle}/${imageTitle}${imageIndex}.jpg">
                <div class="card-pop-up">
                    <div class="card-pop-up-decoration">
                        <div class="decoration-icon-chain circle">
                            <svg class="chain-svg" fill="none" height="15" viewBox="0 0 15 15" width="15"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M13.9131 2.72817L12.0948 0.891285C11.2902 0.0808612 9.98305 0.0759142 9.17681 0.882615L7.15921 2.89256C6.35161 3.69885 6.34818 5.01032 7.15051 5.82074L8.30352 4.68897C8.18678 4.32836 8.33041 3.9153 8.61593 3.62946L9.89949 2.35187C10.3061 1.94624 10.9584 1.94913 11.3595 2.35434L12.4513 3.45805C12.8528 3.86283 12.8511 4.51713 12.447 4.92318L11.1634 6.20241C10.8918 6.47296 10.4461 6.62168 10.1002 6.52626L8.97094 7.65887C9.77453 8.47177 11.0803 8.47466 11.8889 7.66837L13.9039 5.65924C14.7141 4.85254 14.7167 3.53983 13.9131 2.72817ZM6.52613 10.0918C6.62191 10.4441 6.46857 10.8997 6.19093 11.1777L4.99227 12.3752C4.58074 12.7845 3.91595 12.7833 3.50671 12.369L2.39297 11.2475C1.98465 10.8349 1.98729 10.1633 2.39824 9.75473L3.59804 8.55769C3.89032 8.26607 4.31044 8.12025 4.67711 8.24375L5.83354 7.0715C5.01493 6.2462 3.68249 6.24207 2.86059 7.06324L0.915197 9.0042C0.0922615 9.8266 0.0883684 11.1629 0.90651 11.9886L2.75817 13.8618C3.57595 14.6846 4.90724 14.6912 5.73111 13.8701L7.67649 11.9287C8.49852 11.1054 8.5024 9.77166 7.68553 8.9443L6.52613 10.0918ZM6.25786 9.56304C5.98011 9.84185 5.53426 9.84102 5.26178 9.55809C4.98791 9.27431 4.99009 8.82036 5.26612 8.53989L8.59074 5.16106C8.86678 4.88224 9.31172 4.88307 9.58512 5.16395C9.86047 5.44565 9.85875 5.90084 9.58168 6.18296L6.25786 9.56304Z"
                                      fill="#1FDAB5"
                                      fill-rule="evenodd"/>
                            </svg>
                        </div>
                        <div class="decoration-icon-square circle"></div>
                    </div>
                    <p class="card-pop-up-title">Creative design</p>
                    <p class="card-pop-up-subtitle">${cardPopUpSubtitle}</p>
                </div>
            </div>
            `
}

function createSubTitleName(oldTitle) {
    const capitalizeLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    let result = []
    let splitTitle = oldTitle.split('-')
    splitTitle.forEach(word => result.push(capitalizeLetter(word)))
    return result.join(' ')
}


/*Breaking news*/
const uploadDay = document.querySelectorAll('.news-card-upload-date-day')
const uploadMonth = document.querySelectorAll('.news-card-upload-date-month')
const commentNumber = document.querySelectorAll('.news-card-comment')
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let randomDay = null
let randomMonth = null
let randomMonthNumber = null

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomMonth() {
    randomMonthNumber = getRandomNumber(1, 11)
    randomMonth = months[randomMonthNumber]
}

function getRandomDay() {
    if (randomMonthNumber === 2) {
        return randomDay = getRandomNumber(1, 28)
    }
    randomMonthNumber % 2 === 0 ? randomDay = getRandomNumber(1, 30) : randomDay = getRandomNumber(1, 31)
}

uploadDay.forEach(day => {
    getRandomDay()
    day.textContent = randomDay
})
uploadMonth.forEach(month => {
    getRandomMonth()
    month.textContent = randomMonth
})
commentNumber.forEach(section => section.textContent = getRandomNumber(1, 100) + ' ' + 'comment')

/*Slider*/
const sliderButtons = document.querySelectorAll('.slider-carousel-btn')
const sliderImagesItem = document.querySelectorAll('.slider-carousel-item')
const feedbackInfoContainer = document.querySelectorAll('.feedback-info-container')
let currentId = 1

sliderButtons.forEach(btn => btn.addEventListener('click', e => {
    if (e.target.dataset.name === 'next') {
        currentId++
        if (currentId > 4) currentId = 1
        changeSlide('next')
    }
    if (e.target.dataset.name === 'prev') {
        currentId--
        if (currentId < 1) currentId = 4
        changeSlide('prev')
    }
}))
sliderImagesItem.forEach(image => image.addEventListener('click', e => {
    const target = e.target
    currentId = Number(target.dataset.id)
    changeSlide()
}))

function changeSlide(btnName) {
    sliderImagesItem.forEach(image => {
        image.classList.remove('active')
        if (image.dataset.id === currentId.toString()) image.classList.add('active')
    })
    if (feedbackInfoContainer) {
        feedbackInfoContainer.forEach(element => {
            element.classList.remove('active')
            if (element.dataset.id === currentId.toString()) {
                element.classList.add('active')
                btnName === 'next' ? element.style.animation = 'scale-display-left .7s ease-in-out' : element.style.animation = 'scale-display-right .7s ease-in-out'
            }
        })
    }
}

/*Images gallery*/
const gridContainer = document.querySelector('.images-gallery-grid')
const gridSizer = document.querySelector('.grid-sizer')
const msnryMain = new Masonry(gridContainer, {
    // options
    horizontalOrder: true,
    percentPosition: true,
    gutter: 20,
    itemSelector: '.images-gallery-grid-item',
    columnWidth: gridSizer,
    transitionDuration: '1s'
});
//50%
const gridSubContainer50 = document.querySelector('.subitem-container50')
const mnsrySub50 = new Masonry(gridSubContainer50, {
    horizontalOrder: true,
    percentPosition: true,
    gutter: 3,
    itemSelector: '.subitem-container50-item',
    columnWidth: document.querySelector('.subitem-sizer50'),
})
const gridSubContainer33 = document.querySelector('.subitem-container33')
const mnsrySub33 = new Masonry(gridSubContainer33, {
    horizontalOrder: true,
    percentPosition: true,
    gutter: 3,
    itemSelector: '.images-gallery-grid-subitem',
    columnWidth: document.querySelector('.images-gallery-grid-subitem-sizer'),
})

/*Image loader*/
const imagePlaceholder = document.querySelectorAll('.image-placeholder')

imagePlaceholder.forEach(placeholder => {
    getImageItem(placeholder)
})

function getImageItem(placeholder) {
    let width = placeholder.offsetWidth
    let height = placeholder.offsetHeight
    let rando = Math.ceil(Math.random() * 1000)
    return placeholder.style.backgroundImage = `url("https://picsum.photos/${width}/${height}/?${rando}")`
}

/*Btn load more gallery images*/
const galleryLoadBtn = document.querySelector('.btn-load-more-images-gallery')
const clockLoaderGallery = document.querySelector('.clock-loader-images-gallery')
let timeoutGallery

galleryLoadBtn.addEventListener('click', () => {
    toggleHiddenClass(galleryLoadBtn)
    toggleHiddenClass(clockLoaderGallery)

    timeoutGallery = setTimeout(appendImageGalleryDiv, 2000)
})

function appendImageGalleryDiv() {
    for (let i = 0; i < 6; i++) {
        createGalleryDiv()
    }
    const loadedCards = document.querySelectorAll('.loaded')
    if (loadedCards)
        loadedCards.forEach(card => {
            getImageItem(card)
            card.append(createImageGalleryDivPopUp())
            card.classList.remove('loaded')
        })
    toggleHiddenClass(galleryLoadBtn)
    toggleHiddenClass(clockLoaderGallery)
    clearTimeout(timeoutGallery)
}

function createGalleryDiv() {
    let div = document.createElement('div')
    div.style.height = getRandomNumber(150, 500).toString() + 'px'
    div.style.width = '374px'
    div.classList.add('images-gallery-grid-item')
    div.classList.add('loaded')
    div.classList.add('image-placeholder')
    gridContainer.append(div)
    // Додаю div в об'єкт msnryMain
    msnryMain.appended(div)
    msnryMain.layout()
}

function createImageGalleryDivPopUp() {
    let divPopUp = document.createElement('div')
    divPopUp.classList.add('images-gallery-item-pop-up')
    divPopUp.insertAdjacentHTML('afterbegin', `
            <div class="images-gallery-item-pop-up-magnifying-glass">
                <svg fill="none" height="10" viewBox="0 0 10 10" width="10"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.37262 5.66669L9 9" stroke="white"/>
                    <circle cx="3.5" cy="3.5" r="3" stroke="white"/>
                </svg>
            </div>
            <div class="images-gallery-item-pop-up-full-screen">
                <svg fill="none" height="11" viewBox="0 0 12 11" width="12"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.700061 10C0.700061 10.1657 0.834376 10.3 1.00006 10.3L3.70006 10.3C3.86575 10.3 4.00006 10.1657 4.00006 10C4.00006 9.83431 3.86575 9.7 3.70006 9.7H1.30006V7.3C1.30006 7.13431 1.16575 7 1.00006 7C0.834376 7 0.700061 7.13431 0.700061 7.3L0.700061 10ZM3.78793 6.78787L0.787929 9.78787L1.21219 10.2121L4.21219 7.21213L3.78793 6.78787Z"
                          fill="#F8FCFE"/>
                    <path d="M0.999864 0.700202C0.834179 0.700267 0.699917 0.834634 0.699982 1.00032L0.701042 3.70032C0.701107 3.866 0.835474 4.00027 1.00116 4.0002C1.16685 4.00014 1.30111 3.86577 1.30104 3.70008L1.3001 1.30008L3.7001 1.29914C3.86579 1.29908 4.00005 1.16471 3.99998 0.999024C3.99992 0.833338 3.86555 0.699077 3.69986 0.699141L0.999864 0.700202ZM4.21321 3.78681L1.21203 0.787986L0.787933 1.21242L3.78911 4.21124L4.21321 3.78681Z"
                          fill="#F8FCFE"/>
                    <path d="M11.3001 1C11.3001 0.834315 11.1657 0.7 11.0001 0.7L8.30006 0.7C8.13438 0.7 8.00006 0.834315 8.00006 1C8.00006 1.16569 8.13438 1.3 8.30006 1.3H10.7001V3.7C10.7001 3.86569 10.8344 4 11.0001 4C11.1657 4 11.3001 3.86569 11.3001 3.7L11.3001 1ZM8.21219 4.21213L11.2122 1.21213L10.7879 0.787868L7.78793 3.78787L8.21219 4.21213Z"
                          fill="#F8FCFE"/>
                    <path d="M11.0297 10.2727C11.1954 10.2712 11.3285 10.1357 11.327 9.97001L11.3026 7.27012C11.3011 7.10445 11.1656 6.97135 10.9999 6.97285C10.8342 6.97435 10.7011 7.10988 10.7026 7.27555L10.7243 9.67546L8.32442 9.69717C8.15874 9.69867 8.02565 9.8342 8.02715 9.99988C8.02865 10.1656 8.16417 10.2986 8.32985 10.2971L11.0297 10.2727ZM7.7898 7.21404L10.8168 10.1868L11.2372 9.75869L8.2102 6.78596L7.7898 7.21404Z"
                          fill="#F8FCFE"/>
                </svg>
            </div>
            `)
    return divPopUp
}
