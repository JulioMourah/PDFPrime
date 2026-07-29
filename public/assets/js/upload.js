const button = document.getElementById("selectButton");

const input = document.getElementById("fileInput");

const preview = document.getElementById("preview");

button.addEventListener("click", () => {

    input.click();

});

input.addEventListener("change", () => {

    preview.innerHTML = "";

    const file = input.files[0];

    if(!file) return;

    const img = document.createElement("img");

    img.src = URL.createObjectURL(file);

    img.style.width = "250px";

    img.style.marginTop = "30px";

    img.style.borderRadius = "12px";

    preview.appendChild(img);

});