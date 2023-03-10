// userin kartı
const userCard = [];
// içerik
let content = []

window.onload = async function() {

const data = await fetch("product.json")
content = await data.json()

console.log("gelen veri:", content)

const parentDiv = document.querySelector('.flex-container')

content.map((data) => {

const div = document.createElement('div')
// dive class ekle
div.classList.add('product-box')
const h1 = document.createElement('h1')
h1.innerText = data.name
h1.style.textAlign = "center";
// ürünün img oluştur
const img = document.createElement('img') // <img >
img.setAttribute('src', data.icon)
img.setAttribute('alt', data.name)
img.style.width = "100%"


const buttonParent = document.createElement('div')
buttonParent.classList.add('btn')
// buton oluştur
const button = document.createElement('button')
button.innerText = "Sepete Ekle"
button.style.padding = "8px"
button.style.cursor = "pointer"
// tıklandığında çalışacağı fonksiyonu belirle
button.setAttribute('onclick', `addToCard(${data.id})`)
buttonParent.appendChild(button)
// div içerisine at
div.appendChild(h1)
div.appendChild(img)
div.appendChild(buttonParent)
// parent elemente bu divi gönder
parentDiv.appendChild(div)
})

}




function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

    // sepeti yükle
    loadCard()

  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// karta ekle
function addToCard(id, payload) {

    
 const karttaMi = userCard.find(product => product.id === id)

 if(karttaMi) {

    if(payload) {
    
        karttaMi.count -= 1;

    } else {

        karttaMi.count += 1;
    }


 } else {

    const product = content.find(product => product.id === id)

    if(product) {

        product.count = 1;
        // user carda pushla
        userCard.push(product)
    }

    // sepet iconunu güncelle
    updateIcon("add")
 }
    // sepeti güncelle
    return loadCard()
}

// + butonuna tıklandığında
function increaseProductCount(id) {

    return addToCard(id)
}

function decreaseProductCount(id) {

    return addToCard(id, "decrease")
}

// ikonu güncelle
function updateIcon(payload) {

if(payload == "add") {

Number(document.getElementById('spt').innerText++)

} else {

Number(document.getElementById('spt').innerText -= 1)

}




}

// sepeti yükle
function loadCard() {

const parentDiv = document.querySelector('.products')
parentDiv.innerHTML = "";

userCard.forEach(product => {

const div = document.createElement('div')
div.style.width = "70%"
div.style.margin = "auto"


const h1 = document.createElement("h1")
h1.innerText = product.name

const imageContainer = document.createElement('div')

const img = document.createElement('img')
img.setAttribute('src', product.icon)
img.setAttribute('alt', product.name)
img.style.width = "100%";


imageContainer.appendChild(img)

// ekle/çıkar alanı
const options = document.createElement('div')
options.classList.add('options')

const add = document.createElement('span')
add.innerText = "+"
// add öğesine tıklandığında çalıaşcak fonksiyonu belirle
add.setAttribute('onclick', `increaseProductCount(${product.id})`)

const remove = document.createElement('span')
remove.innerText = "-"
remove.setAttribute('onclick', `decreaseProductCount(${product.id})`)

const count = document.createElement('span')
count.classList.add("box-start")
count.innerText = product.count

// options containerine sayaç, ekle, sil butonlarını ekle
options.appendChild(count)
options.appendChild(remove)
options.appendChild(add)

// dive pushla
div.appendChild(h1)
div.appendChild(imageContainer)
div.appendChild(options)
// parente at
parentDiv.appendChild(div)
})

}