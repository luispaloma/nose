function uploadPhoto() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        alert('Foto subida correctamente.');
        // Aquí iría la lógica para procesar la imagen con IA
    }
}

function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }
}

function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    w = img.parentElement.offsetWidth;
    h = img.parentElement.offsetHeight;
    img.style.clip = `rect(0, ${w}px, ${h}px, 0)`; // Ajusta el ancho inicial de la transparencia
    slider = img.parentElement.querySelector(".img-comp-slider");
    slider.style.top = 0;
    slider.style.left = w + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
        e.preventDefault();
        clicked = 1;
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
        clicked = 0;
        window.removeEventListener("mousemove", slideMove);
        window.removeEventListener("touchmove", slideMove);
    }

    function slideMove(e) {
        var pos;
        if (clicked == 0) return false;
        pos = getCursorPos(e);
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        slide(pos);
    }

    function getCursorPos(e) {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
    }

    function slide(x) {
        img.style.transition = 'clip 1.5s ease'; // Ajusta la duración aquí
        slider.style.transition = 'left 1.5s ease'; // Ajusta la duración aquí
        img.style.clip = `rect(0, ${x}px, ${h}px, 0)`; // Ajusta la transparencia según la posición del slider
        slider.style.left = x + "px";
        
    }

    // Automatic slide every 2 seconds
    let isBefore = true;
    setInterval(() => {
        if (isBefore) {
            slide(w); // Show full "after" image
        } else {
            slide(0); // Show full "before" image
        }
        isBefore = !isBefore;
    }, 2000); // Change every 2 seconds
}

window.onload = function() {
    initComparisons();
}
