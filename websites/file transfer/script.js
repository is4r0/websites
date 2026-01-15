const fileInput = document.querySelector(".file-input");
const filewrapper = document.getElementById("filewrapper");
const uploadfile = document.querySelector(".upload-file");

uploadfile.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];
    if(file) {
        let fileName = file.name;
        let filetype = fileName.split(".").pop(); // More robust way to get filetype
        if(fileName.length >=12){
            let splitName = fileName.split(".");
            // Ensure splitName[1] exists before accessing it
            fileName = splitName[0].substring(0, 13) + "... ." + (splitName.length > 1 ? splitName.pop() : '');
        }
        addFileDisplay(fileName, filetype); // Renamed for clarity
    }
};

// Use event delegation on the filewrapper
filewrapper.addEventListener("click", (event) => {
    // Check if the clicked element is a "cross" (or inside it)
    const crossElem = event.target.closest(".right");
    if (crossElem) {
        // Find the parent showfilebox
        const showfilebox = crossElem.closest(".showfilebox");
        if (showfilebox) {
            showfilebox.classList.add("hide");
        }
    }
});

const addFileDisplay = (fileName, filetype) => {
    // Create new elements instead of using innerHTML +=
    const div = document.createElement("div");
    div.classList.add("showfilebox");
    div.innerHTML = `
        <div class="left">
            <span class="filetype">${filetype}</span>
            <h3>${fileName}</h3>
        </div>
        <div class="right">
            <span>&#215</span>
        </div>`;
    filewrapper.appendChild(div); // Append the new element
};
