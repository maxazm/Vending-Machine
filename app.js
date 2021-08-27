class Items{
    constructor(number, name, price, imgUrl){
        this.number = number;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

const items = [
    new Items("1", "Turkey", "$4000", "https://github.com/maxazm/Vending-Machine/blob/main/photo1.jpeg?raw=true"),
    new Items("2", "France", "$2300", "https://github.com/maxazm/Vending-Machine/blob/main/photo2.jpeg?raw=true"),
    new Items("3", "India", "$1300", "https://github.com/maxazm/Vending-Machine/blob/main/photo3.jpeg?raw=true"),
    new Items("4", "Egypt", "$4800", "https://github.com/maxazm/Vending-Machine/blob/main/photo4.jpeg?raw=true"),
    new Items("5", "America", "$3200", "https://github.com/maxazm/Vending-Machine/blob/main/photo5.jpeg?raw=true"),
    new Items("6", "Thailand", "$750", "https://github.com/maxazm/Vending-Machine/blob/main/photo6_bkk.jpeg?raw=true"),
    new Items("7", "Denmark", "$3000", "https://github.com/maxazm/Vending-Machine/blob/main/photo7_denmark.jpeg?raw=true"),
    new Items("8", "Japan", "$960", "https://github.com/maxazm/Vending-Machine/blob/main/photo8.jpeg?raw=true"),
    new Items("9", "Hong Kong", "$900", "https://github.com/maxazm/Vending-Machine/blob/main/photo9.jpeg?raw=true")
];

//商品選択ボタンの作成
let buttonString = "";
let itemBtnBox = document.getElementById("item-btn")

for(let i = 0; i < 9; i++){
    buttonString +=`<button id="item${i}" class="btn-font" ><label for="btn">${i+1}</label></button>`;
}

itemBtnBox.innerHTML = buttonString;

//写真box  
//初期値設定: 最初に表示する写真
let imgString = `<img src="${items[0].imgUrl}" class="img-size" id="0">`; 
let images = document.getElementById("img-box");

for(let i = 0; i < 9; i++){
    imgString += `<img src="${items[i].imgUrl}" id="${i}" class="img-size slider-item ">`;
}

images.innerHTML += imgString;

//商品情報と写真の表示
let itemNo = document.getElementById("item-No");
let itemTitle = document.getElementById("item-title");
let itemPrice = document.getElementById("item-price");

//初期値設定
itemNo.innerHTML =  `<p class="btn-font">1</p>`;
itemTitle.innerHTML = `${items[0].name}`;
itemPrice.innerHTML = `${items[0].price}`;

for(let i = 0; i < 9; i++){
    var currbtn = document.getElementById(`item${i}`);
    currbtn.addEventListener("click", function(){
        showItemInfo(i);
        slidejump(9, i);
    });
}

function showItemInfo(i){
    itemNo.innerHTML =  `<p class="btn-font">${i+1}</p>`;
    itemTitle.innerHTML = `${items[i].name}`;
    itemPrice.innerHTML = `${items[i].price}`;
}

function purchaseClick(){
    alert("Thank you for your purchase! Have a wonderful trip!");
}

//slider実装
const sliderItems = document.querySelectorAll(`.slider-item`);
let target = document.getElementById("target")
let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("d-flex");
main.classList.add("main", "d-flex", "justify-content-center");
extra.classList.add("extra", "d-flex", "justify-content-center");

main.append(sliderItems[0]);
sliderShow.append(main);
sliderShow.append(extra);
target.append(sliderShow);

main.setAttribute("data-index",  "0");

function slidejump(len, steps){
    let index = parseInt(main.getAttribute("data-index"));
    let currentElement = sliderItems[index];

    console.log("index: " + index);
    console.log("steps: " + steps);

    let nextElement = sliderItems[steps];
    main.setAttribute("data-index", steps.toString());
    
    let directionChecker = steps - index;

    let animationType = "";

    animationType = directionChecker > 0? "right" : "left";
    if(directionChecker == 0) animationType = "none";

    animateMain(currentElement, nextElement, animationType);

};

function animateMain(currentElement, nextElement, animationType){

    main.innerHTML = "";
    main.append(nextElement);
    
    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    if(animationType === "none"){
        sliderShow.innerHTML = "";
        extra.classList.remove("deplete-animation");
        sliderShow.append(extra);
    }
    if (animationType === "right"){
        sliderShow.innerHTML = "";
        sliderShow.append(extra);
        sliderShow.append(main);
    } 
    else if (animationType === "left") {
        sliderShow.innerHTML = "";
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}