function fuzzyBackground(w, h) {
    var canvas = document.createElement("CANVAS");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    var img = ctx.createImageData(w, h);

    for (var p = 0; p < w * h * 4; p += 4) {
        img.data[p + 0] = 0;
        img.data[p + 1] = 0;
        img.data[p + 2] = 0;
        img.data[p + 3] = Math.random() * 48 | 0;
    }

    ctx.putImageData(img, 0, 0);
    var html = document.body.parentNode;
    var htmlCSS = getComputedStyle(html);
    html.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + "), " + htmlCSS.backgroundImage;
}

fuzzyBackground(256, 256);
