// function showNav() {
//     var x = document.getElementById("nav");
//     if (x.style.display === "none") {
//         x.style.display = "grid";
//         } else {
//             x.style.display = "none";
//         }
//     }

function hideNav() {
    var x = document.getElementById("nav");
    if (x.style.display === "grid") {
    x.style.display = "none";
    } else {
        x.style.display = "grid";
    }
    }

    
// Calendar lightbox / flip viewer
document.addEventListener('DOMContentLoaded', function () {
    const thumbs = Array.from(document.querySelectorAll('#calendar .calendar-thumb'));
    if (!thumbs.length) return;

    const modal = document.getElementById('calendar-modal');
    const modalImg = document.getElementById('calendar-modal-img');
    const prevBtn = document.getElementById('calendar-prev');
    const nextBtn = document.getElementById('calendar-next');
    const closeBtn = document.getElementById('calendar-close');
    const backdrop = document.getElementById('calendar-modal-backdrop');

    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        modalImg.src = thumbs[currentIndex].src;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('open'), 10);
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
            modalImg.src = '';
        }, 250);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % thumbs.length;
        modalImg.src = thumbs[currentIndex].src;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
        modalImg.src = thumbs[currentIndex].src;
    }

    thumbs.forEach((t, i) => {
        t.style.cursor = 'pointer';
        t.addEventListener('click', () => openModal(i));
    });

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (modal.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

    // touch swipe
    let startX = 0;
    modalImg.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    modalImg.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const dx = endX - startX;
        if (dx > 40) showPrev();
        if (dx < -40) showNext();
    });
});

