portfolioTabs.addEventListener('click', e => {
    const target = e.target
    galleryCard.innerHTML = ''
    changeClassName(target, portfolioCategory) // підсвічую категорію
    addCard(target)
})

// Масиви з id картинок які знаходяться в таких же теках
let imagesId = {
    graphicDesign: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,],
    webDesign: [1, 2, 3, 4, 5, 6, 7,],
    landingPages: [1, 2, 3, 4, 5, 6, 7,],
    wordpress: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
}
const categoriesArr = Object.keys(imagesId) // Масив з ключами об'єкту imagesId
let keyIndex = 0
let valueIndex = 0
let currentTitle = categoriesArr[keyIndex] // Назва поточної папки
let cardsLeft = 12
let iterationStartIndex = 1

createCard(imagesId[categoriesArr[keyIndex]].length, iterationStartIndex) // З

function createCard(length, i) {
    // Перевіряю чи довжина масиву з картинками не більша, ніж залишилось додати карточок
    // Якщо більша, то після циклу не буду міняти currentTitle, а проітерую його до кінця при наступному виклику
    valueIndex = imagesId[categoriesArr[keyIndex]].length - cardsLeft
    for (i; i <= length; i++) {
        cardsLeft--
        // Якщо додані всі картки на сторінку, то змінюю currentTitle на наступний
        if (cardsLeft < 0) {
            cardsLeftByDefault()
            nextTitle()
            return
        }
        const template = `<div class="gallery-card" data-name="${currentTitle}"><img alt="${currentTitle}" class="gallery-card-img"
                                                                          src="images/${currentTitle}/${currentTitle}${i}.jpg">
                    <div class="card-pop-up">
                        <img alt="decoration icons" class="card-pop-up-img" src="images/icon_pop_up.png">
                        <p class="card-pop-up-title">Creative design</p>
                        <p class="card-pop-up-subtitle">Web Design</p>
                    </div>
                </div>`
        galleryCard.insertAdjacentHTML('afterbegin', template)
    }
    // Якщо цикл завершився і всі картки були додані, то запускаю заново функцію і починаю додавати картинки з наступної теки
    if (cardsLeft !== 0) {
        nextTitle()
        return createCard(cardsLeft, 1)
    } else if (valueIndex !== 0) { // Якщо залишились невикористані картинки з поточної теки, то починаємо наступне додавання картинок з останньої невикористаної
        iterationStartIndex = imagesId[categoriesArr[keyIndex]].length - valueIndex
        cardsLeftByDefault()
    } else {
        cardsLeftByDefault()
        nextTitle()
    }

}

function nextTitle() {
    keyIndex++
    currentTitle = categoriesArr[keyIndex]
}

function cardsLeftByDefault() {
    cardsLeft = 12
}

function addCard(target) {
    if (target.dataset.name === 'All') {
        a()
    } else {
        a(target)
    }

}

function a(target) {
    for (const key in imagesId) {
        if (key === target.dataset.name) {
            //Для кожного значення[value] по ключу [key] створюю блок з зображенням і додаю його в HTML (portfolioGallery)
            imagesId[key].forEach(id => {
                const template = `<div class="gallery-card" data-name="${key}"><img alt="${key}" class="gallery-card-img"
                                                                              src="images/${key}/${key}${id}.jpg">
                        <div class="card-pop-up">
                            <img alt="decoration icons" class="card-pop-up-img" src="images/icon_pop_up.png">
                            <p class="card-pop-up-title">Creative design</p>
                            <p class="card-pop-up-subtitle">Web Design</p>
                        </div>
                    </div>`
                galleryCard.insertAdjacentHTML('afterbegin', template)
            })
        }
    }
}