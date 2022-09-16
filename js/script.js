// MAIN SWIPER
var swiper = new Swiper(".main__swiper", {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 400,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// MAIN SELECT

const params = {
    btnClassName: "main__item-btn",
    dropClassName: "main__dropdown",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
}

function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
        evt.target.classList.remove(params.disabledClassName, params.activeClassName);
        evt.target.removeEventListener("animationend", onDisable);
    }
}

function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
        const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

        if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
            activeElements.forEach((current) => {
                if (current.classList.contains(params.btnClassName)) {
                    current.classList.remove(params.activeClassName);
                } else {
                    current.classList.add(params.disabledClassName);
                }
            });
        }

        if (evt.target.closest(`.${params.btnClassName}`)) {
            const btn = evt.target.closest(`.${params.btnClassName}`);
            const path = btn.dataset.path;
            const drop = document.querySelector(`[data-target="${path}"]`);

            btn.classList.toggle(params.activeClassName);

            if (!drop.classList.contains(params.activeClassName)) {
                drop.classList.add(params.activeClassName);
                drop.addEventListener("animationend", onDisable);
            } else {
                drop.classList.add(params.disabledClassName);
            }
        }
    });
}
setMenuListener();

// GALERY SELECT

const select = document.querySelector("#select-galery");
const choices = new Choices(select, {
    placeholder: true,
    searchEnabled: false,
    itemSelectText: "",
    shouldSort: false,
});

// GALERY SWIPER

var galery = new Swiper('.galery__swiper', {
    // Optional parameters
    loop: true,
    allowSlidePrev: true,
    slidesPerView: 1,
    breakpoints: {
        // when window width is >= 320px
        768: {
            slidesPerView: 2,
            spaceBetween: 36,
            slidesPerGroup: 2
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 34,
            slidesPerGroup: 2
        },
        1920: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesPerGroup: 3
        }
    },
    navigation: {
        nextEl: '.galery__next',
        prevEl: '.galery__prev'
    },
    pagination: {
        el: ".galery__pagination",
        type: "fraction"
    },
});

// CATALOG ACCORDION

$("#accordionGroup").accordion({
    heightStyle: "content",
    collapsible: true,
});

$('.catalog__item').click(function() {
    jQuery(this).find(".catalog__more").toggleClass('active');
    $(".catalog__more").not(jQuery(this).find(".catalog__more")).removeClass('active');
});

// CATALOG TABS 

document.querySelectorAll('.catalog__push').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(e) {

        const path = e.currentTarget.dataset.path;

        document.querySelectorAll('.catalog__push').forEach(function(btn) {
            btn.classList.remove('catalog__push--active')
        });

        e.currentTarget.classList.add('catalog__push--active');

        document.querySelectorAll('.catalog__left').forEach(function(tabsBtn) {
            tabsBtn.classList.remove('catalog__left--active')
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('catalog__left--active');
    });
});

// EVENTS SWIPER

var swiper = new Swiper('.events__swiper', {
    // Optional parameters
    loop: true,
    // allowSlidePrev: false,
    slidesPerView: 1,
    breakpoints: {
        // when window width is >= 320px
        768: {
            slidesPerView: 2,
            spaceBetween: 34,
            slidesPerGroup: 2
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 27,
            slidesPerGroup: 3
        },
        1920: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesPerGroup: 3
        }
    },
    navigation: {
        nextEl: '.swiper-navigation-big',
    },
    pagination: {
        el: '.events__pagination',
        clickable: true,
    },
});

// PROJECTS SWIPER

var slider = new Swiper('.projects__swiper', {
    // Optional parameters
    loop: true,
    allowSlidePrev: true,
    slidesPerView: 1,
    breakpoints: {
        // when window width is >= 320px
        768: {
            slidesPerView: 2,
            spaceBetween: 33,
            slidesPerGroup: 3
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 50,
            slidesPerGroup: 2
        },
        1920: {
            slidesPerView: 3,
            spaceBetween: 50,
            slidesPerGroup: 3
        }
    },
    navigation: {
        nextEl: '.swiper-navigation-right',
        prevEl: '.swiper-navigation-left'
    },
});


// CONTACTS FORM

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);

const validate = new window.JustValidate('#form');
const validation = new JustValidate('#form', {
    errorFieldCssClass: "is-invalid",
    errorLabelCssClass: "is-label-invalid",
    errorLabelStyle: {
        color: '#D11616',
        fontSize: "12px",
    },
})

validation
    .addField('#name', [{
            rule: 'required',
            errorMessage: 'Вы&nbsp;не&nbsp;ввели&nbsp;имя',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Не&nbsp;менее&nbsp;3&nbsp;символов',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Не&nbsp;более&nbsp;30&nbsp;символов',
        },
    ])
    .addField('#phone', [{
            rule: 'required',
            errorMessage: 'Вы&nbsp;не&nbsp;ввели&nbsp;телефон',
        },
        {
            validator: function(name, value) {
                const phone = selector.inputmask.unmaskedvalue()
                return Number(phone) && phone.length === 10
            },
            errorMessage: 'Требуется&nbsp;10&nbsp;цифр',
        },
    ])
    .onSuccess((event) => {

        let formData = new FormData(event.target);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let doneMessage = document.querySelector('.form__message');
                    doneMessage.classList.add('visible-message');

                    (function() {
                        // Создаём таймер
                        setTimeout(function() {
                            doneMessage.classList.remove('visible-message'); // Меняем прозрачность
                        }, 5000); // 10000 мсек = 10 сек
                    })();
                }
            }
        }

        xhr.open('POST', 'send.php', true);
        xhr.send(formData);

        event.target.reset();
    });



// CONTACTS MAP

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.758468, 37.601088],
        zoom: 14,
        controls: []
    });

    var myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.758468, 37.601088]
        }
    });

    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
        iconLayout: 'default#image',
        iconImageHref: './img/point.svg',
        iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
}

// SMOOTH SCROLL 

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// EVENTS TOOLTIP

tippy('.projects__tooltip-one', {
    content: 'Пример современных тенденций - современная методология разработки',
    maxWidth: 256,
});

tippy('.projects__tooltip-two', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    maxWidth: 256,
});

tippy('.projects__tooltip-three', {
    content: 'В стремлении повысить качество',
    maxWidth: 256,
});


// BURGER 

const burger = document.querySelector('.header__burger')
const nav = document.querySelector('.header__nav-wrapper')
const navItems = nav.querySelectorAll('.header__link')
const body = document.body
const searchOpen = document.querySelector('.header__search-button-two')
const search = document.querySelector('.header__search-two')
const searchClose = document.querySelector('.header__search-close ')

burger.addEventListener('click', () => {
    body.classList.toggle('stop-scroll')
    burger.classList.toggle('header__burger--active')
    nav.classList.toggle('header__nav-wrapper--visible')
})

navItems.forEach(el => {
    el.addEventListener('click', () => {
        body.classList.remove('stop-scroll')
        burger.classList.remove('header__burger--active')
        nav.classList.remove('section-nav__wrapper--visible')
    })
})

searchOpen.addEventListener('click', () => {
    searchOpen.classList.add('btn--hidden');
    search.classList.add('search--open');
})

searchClose.addEventListener('click', () => {
    searchOpen.classList.remove('btn--hidden');
    search.classList.remove('search--open');
})