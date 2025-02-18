let home=document.querySelector(".home");
let sec1=document.querySelector(".sec1");
let sec2=document.querySelector(".sec2");
let sec3=document.querySelector(".sec3");
let sec4=document.querySelector(".sec4");
sec1.addEventListener("click",change);
sec2.addEventListener("click",change);
sec3.addEventListener("click",change);
sec4.addEventListener("click",change);
function change(){
    window.location.href = "booking.html";
}
home.addEventListener("click",function(){
    window.location.href="index.html";
})
