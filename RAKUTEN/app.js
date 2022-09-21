let div = document.querySelector('.slide-list');
let clone = div.firstElementChild.cloneNode(true);
div.appendChild(clone);

function move(){
  let current = 0;
  setInterval(function(){
    div.style.transition = '0.2s';
    div.style.transform = 'translate3d(-'+200*(curIndex+1)+'px, 0px, 0px)';
    current++;

    if(current === 5){
      setTimeout(function(){
        div.style.transition = '0s';
        div.style.transform = 'translate3d(0px, 0px, 0px)';
        current = 0;
      },1000);
    }
  }, 1000);
}
// var ul = document.querySelector('.slide_wrap');
// var firstItemClone = ul.firstElementChild.cloneNode(true);
// ul.appendChild(firstItemClone);
// function move(){

//     var curIndex = 0;

//     setInterval(function(){
//         ul.style.transition = '0.2s';
//         ul.style.transform = "translate3d(-"+200*(curIndex+1)+"px, 0px, 0px)";

//         curIndex++;

//         if(curIndex === 4){
//             curIndex = -1;
//         }

//     },1000);
// }

// document.addEventListener("DOMContentLoaded",function(){
//     move();
// });

// function move(){
 
//   var curIndex = 0;

//   setInterval(function(){
//       ul.style.transition = '0.2s';
//       ul.style.transform = "translate3d(-"+200*(curIndex+1)+"px, 0px, 0px)";

//       curIndex++;

//       if(curIndex === 5){
//           setTimeout(function(){
//               ul.style.transition = '0s';
//               ul.style.transform = "translate3d(0px, 0px, 0px)";
//           },201)
//           curIndex = 0;
//       }

//   },1000);
// }