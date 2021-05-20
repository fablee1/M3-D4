let books = []
let cart = []
let cartCount = 0

const getData = (book = 0) => {
    fetch(book === 0 ? 'https://striveschool-api.herokuapp.com/books' : 'https://striveschool-api.herokuapp.com/books'+'/'+'book')
    .then(response => response.json())
    .then(data => {
        if(book === 0) {
            books = data
            generateCards(data)
        } else {
            pass
        }
    })
    .catch(e => console.log(e))
}

const cartNum = (add=true) => {
    let cartNum = document.querySelector('.cart-num')
    add ? cartCount += 1 : cartCount -= 1
    cartNum.innerText = cartCount 
}


const addToCartButtons = () => {
    const allButtons = document.querySelectorAll('.addCart')

    allButtons.forEach(btn => btn.addEventListener('click', (e) => {

        let asin = e.currentTarget.parentNode.parentNode.parentNode.childNodes[5].innerText.slice(6)
        books.forEach(x => {
            if(x.asin === asin) {
                cart.push(x)
            }
        })

        cartNum()
    }))
}

const skipButtons = () => {
    const allButtons = document.querySelectorAll('.skip')

    allButtons.forEach(btn => btn.addEventListener('click', (e) => {
        e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
    }))
}

const generateCards = (books=books) => {
    const cardSection = document.getElementById('card-section')

    books.forEach(x => {
        let card = document.createElement('div')
        card.classList.add('col-md-3')
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" src=${x.img}>
                <div class="card-body">
                    <p class="card-title">${x.title}</p>
                    <p class="card-text"><strong>Category:</strong> ${x.category}</p>
                    <p class="card-text"><strong>ASIN:</strong> ${x.asin}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-danger skip">Skip</button>
                            <button type="button" class="btn btn-success addCart">Add to cart</button>
                        </div>
                        <small class="text-muted">Price: ${x.price}$</small>
                    </div>
                </div>
            </div>
        `
        cardSection.appendChild(card)
    });

    addToCartButtons()
    skipButtons()
}


window.onload = () => {
    getData()
}