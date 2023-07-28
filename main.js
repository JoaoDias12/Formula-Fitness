var swiper = new Swiper('.mySwiper', {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

const btnShow = document.getElementById('btnShow')
const btnClose = document.getElementById('btnClose')
const boxSub = document.getElementById('boxSub')
const img1 = document.getElementById('img1')
const swiperimgs = document.getElementById('swiperimgs')

btnShow.addEventListener('click', function () {
  boxSub.classList.remove('hidden')
})

img1.addEventListener('click', function () {
  boxSub.classList.remove('hidden')
})

swiperimgs.addEventListener('click', function () {
  boxSub.classList.remove('hidden')
})

btnClose.addEventListener('click', function () {
  boxSub.classList.add('hidden')
})
