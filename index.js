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
    })
}
  