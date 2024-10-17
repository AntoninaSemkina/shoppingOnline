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


fetch('https://fakestoreapi.com/products')
.then( res=> {
return res.json();
})
.then(data => {
    let set = new Set();
    data.forEach(product=>{
        let category =[product.category].toString();
        console.log(category);
        set.add(category);
    })
    console.log(set)
    const categoryContainer = document.getElementById('categoryContainer')

    set.forEach(item => {
        const catItem = document.createElement('button')
        catItem.innerText = item
        categoryContainer.appendChild(catItem)
        catItem.className="filterCatalog";
        const attribute =document.createAttribute("data-filter");
        attribute.value="all";
        catItem.setAttributeNode(attribute);
    })
    
})
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const currentCategory = button.dataset.filter
// Здесь сработает функция
filter(currentCategory, cards)
})
})
console.log(currentCategory)
function filter (category, items) {
    items.forEach((item) => {
      // проверка на соответствие категории
      const isItemFiltered = !item.classList.contains(category)
      // Заведем переменную для показа всех карточек в категории All
      const isShowAll = category.toLowerCase() === 'all'
      // Если карточка не содержит данную категорию
      if (isItemFiltered && !isShowAll) {
      // Добавлять класс hide
          item.classList.add('hide')
  // В противном случае, удалять класс hide
      } else {
          item.classList.remove('hide')
      }
    })
  }
  


