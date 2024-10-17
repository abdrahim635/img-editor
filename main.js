let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let img = document.getElementById('img');  

let reset = document.getElementById('reset');
let imgBox = document.querySelector('.img-box');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resetValue() {
    ctx.filter = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Redraw the image
    
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}

// عند التحميل
window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

upload.onchange = function (event) {
    resetValue();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
        img.src = fileReader.result;
    }
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none'; // إخفاء الصورة بعد رسمها على القماش
    }
}

// الفلاتر
let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function () {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Redraw the image
    });
});

// زر التحميل
download.onclick = function() {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();
    link.click();
}
