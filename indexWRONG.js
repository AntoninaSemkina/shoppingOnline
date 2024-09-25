const container = document.getElementById('container')
const addBtn = document.getElementById('addBtn')

// import {paginate} from './pagination.js';

fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>{
            render(json)
            console.log(json)
        })
addBtn.addEventListener('click',()=>{
    const titleInput = document.getElementById('title')
    const priceInput = document.getElementById('price')
    const descriptionInput = document.getElementById('description')
    const imageInput = document.getElementById('image')
    const categoryInput = document.getElementById('category')
    
    fetch('https://fakestoreapi.com/products',{
        method:"POST",
        body:JSON.stringify(
            {
                title: titleInput,
                price: priceInput,
                description: descriptionInput,
                image: imageInput,
                category: categoryInput
            }
        )
    })
        .then(res=>res.json())
        .then(json=>console.log(json))
    
}) 
const render = (products) =>{
    products.map(product=>{
        const productDiv=document.createElement('div')
        productDiv.classList.add('product-div')
        //productDiv.innerText = product.id + "|" + product.price + "|" + product.title

        const titleDiv = document.createElement('div')
        titleDiv.classList.add('title-div')
        titleDiv.innerText =  product.title

        const priceDiv = document.createElement('div')
        priceDiv.classList.add('price-div')
        priceDiv.innerText =  product.price

        const img= document.createElement('img')
        img.classList.add('card-img')
        img.src = product.image

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerText = "Удалить"
        deleteBtn.onclick= function(){
            fetch('https://fakestoreapi.com/products/' + product.id,{
                method:"DELETE"
            })
                .then(res=>res.json())
                .then(json=>console.log(json))

        }

        productDiv.appendChild(img)
        productDiv.appendChild(titleDiv)
        productDiv.appendChild(priceDiv)
        productDiv.appendChild(deleteBtn)

        container.appendChild(productDiv)

        paginate(products)
    })
}
  
const paginate =(products) => {
    console.log('products:', products);

    let productCount=6;
    let currentPage=1;

    const productContainer = document.querySelector('.js-products-list');
    const pagination = document.querySelector('.js-pagination');
    const btnPrevPagination = document.querySekector('.js-pagination-btn-prev');
    const btnNextPagination = document.querySekector('.js-pagination-btn-next');

    const renderProducts = (products, container, numberOfProducts, page)=> {
        productContainer.innerHTML="";

        const firstProductIndex = numberOfProducts * page -numberOfProducts;
        console.log('firstProductIndex:', firstProductIndex);

        const lastProductIndex = fisrtOfProducts + numberOfProducts;
        console.log('lastProductIndex:', lastProductIndex);

        const productsOnPage =  products.slice(firstProductIndex,lastProductIndex);
        console.log('productsOnPage:', productsOnPage);
    }
    productsOnPage.forEach(({img,titleDiv, priceDiv, deleteBtn}) => {
        const li=document.createElement(`li`);
        li.classList.add(`container`);
        li.innerHTML = ""

        container.append(li)

        })
    const renderPagination= (products,numberOfProducts) => {

        const pagesCount = Math.ceil(products.lenght/ numberOfProducts);
        console.log(`pagesCount:`, pagesCount);

        const ul = document.querySelector('.js-pagination-list');

        for ( let i=1;i<= pagesCount;i++){

        }

        pagination.classList.remove('hidden');
    }
    const renderBtn = (page)=> {
        const li = document.createElement('li');
        li.classList.add('pagination-item','row','jcc','aic');
        li.textContent= page;
        if (currentPage=== page){
            li.classList.add('active');
        }
        return li;
    }
    renderProducts(products, productContainer, productCount, currentPage)
    renderPagination(products,productCount);
}

// const products =[
// {
// },
// {

// },
// {

// },
// {

// }
// ,
// {

// },
// {

// }
// ]

// productsOnPage.forEach(({img,titleDive, priceDiv, deleteBtn}) => {
//     const li=document.createElement(`li`);
//     li.classList.add(`productDiv`);
//     li.innerHTML =`
//     <div class="container" id="container"></div>`
//     }
// container.append(li);
// )
