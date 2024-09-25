const container = document.getElementById('container')
const addBtn = document.getElementById('addBtn')

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
// const render = (products) =>{
//     products.map(product=>{
//         const productDiv=document.createElement('div')
//         productDiv.classList.add('product-div')
//         //productDiv.innerText = product.id + "|" + product.price + "|" + product.title

//         const titleDiv = document.createElement('div')
//         titleDiv.classList.add('title-div')
//         titleDiv.innerText =  product.title

//         const priceDiv = document.createElement('div')
//         priceDiv.classList.add('price-div')
//         priceDiv.innerText =  product.price

//         const img= document.createElement('img')
//         img.classList.add('card-img')
//         img.src = product.image

//         const deleteBtn = document.createElement('button')
//         deleteBtn.classList.add('delete-btn')
//         deleteBtn.innerText = "Удалить"
//         deleteBtn.onclick= function(){
//             fetch('https://fakestoreapi.com/products/' + product.id,{
//                 method:"DELETE"
//             })
//                 .then(res=>res.json())
//                 .then(json=>console.log(json))
//         }
//         productDiv.appendChild(img)
//         productDiv.appendChild(titleDiv)
//         productDiv.appendChild(priceDiv)
//         productDiv.appendChild(deleteBtn)

//         container.appendChild(productDiv)
        
//     })
// }

async function getData(){
    const response =  await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    return data
}

async function main(){
 const postsData = await getData();
 let currentPage=1;
 let rows=6;

    function displayList(arrData,rowPerPage, page){
        const postsEl= document.querySelector('.posts');
        postsEl.innerHTML= "";
        page--;

        const start= rowPerPage*page;
        const end=start+ rowPerPage;
        const paginationData= arrData.slice(start,end);
        
        paginationData.forEach((el) =>{

        const postEl=document.createElement('div')
        postEl.classList.add('post-div')
        //postEl.innerText = el.id + "|" + el.price + "|" + el.title

        const titleDiv = document.createElement('div')
        titleDiv.classList.add('title-div')
        titleDiv.innerText =  el.title

        const priceDiv = document.createElement('div')
        priceDiv.classList.add('price-div')
        priceDiv.innerText =  el.price

        const img= document.createElement('img')
        img.classList.add('card-img')
        img.src = el.image

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerText = "Удалить"
        deleteBtn.onclick= function(){
            fetch('https://fakestoreapi.com/products/' + el.id,{
                method:"DELETE"
            })
                .then(res=>res.json())
                .then(json=>console.log(json))
        }
            // const postEl= document.createElement("div");    
        postEl.classList.add("post");
        postEl.appendChild(img)
        postEl.appendChild(titleDiv)
        postEl.appendChild(priceDiv)
        postEl.appendChild(deleteBtn)
        
        postsEl.appendChild(postEl);
        })

    }
    function displayPagination(arrData,rowPerPage){
        const paginationEl=document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl=document.createElement("ul");
        ulEl.classList.add('pagination__list');

        for( let i=0; i<pagesCount; i++){
            const liEl = displayPaginationBtn(i +1);
            ulEl.appendChild(liEl)
        }
        paginationEl.appendChild(ulEl)
    }
    function displayPaginationBtn(page){
        const liEl=document.createElement("li");
        liEl.classList.add('pagination__item')
        liEl.innerText = page

        if (currentPage==page) liEl.classList.add('pagination__item--active')

        liEl.addEventListener('click',()=>{
            currentPage =  page
            displayList(postsData,rows,currentPage)

            let currentItemLi = document.querySelector('li.pagination__item--active')
            currentItemLi.classList.remove('pagination__item--active')

            liEl.classList.add('pagination__item--active');
        })
        return liEl;
    }
    displayList(postsData,rows,currentPage);
    displayPagination(postsData,rows);
}
main();
