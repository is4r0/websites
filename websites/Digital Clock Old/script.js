let hr = document.getElementById("hr");
let mn = document.getElementById("mn");
let sc = document.getElementById("sc");

setInterval(()=>{
    let currentTime = new Date();

    hr.innerHTML = (currentTime.getHours()<10?"0":"") + currentTime.getHours();
    mn.innerHTML = (currentTime.getMinutes()<10?"0":"") + currentTime.getMinutes();
    sc.innerHTML = (currentTime.getSeconds()<10?"0":"") + currentTime.getSeconds();
},1000)

