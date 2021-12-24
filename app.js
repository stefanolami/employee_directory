let employees = [];
const url = 'https://randomuser.me/api/?results=12';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal')
let search = document.querySelector(".search");
let cards = document.querySelectorAll('.card');


/* functions */


function displayEmployees(data) {
    console.log(data);
    employees = data;
    let employeesHtml = '';
    for (let i = 0; i < employees.length; i++) {
        let firstName = employees[i].name.first;
        let lastName = employees[i].name.last;
        let email = employees[i].email;
        let city = employees[i].location.city;
        let img = employees[i].picture.large;

        employeesHtml += `
        <div class="card ${firstName} ${lastName}" id="${i}">
            <img src="${img}" alt="" class="avatar">
            <div class="text-container">
                <h2 class="name">${firstName} ${lastName}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
    };

    gridContainer.innerHTML = employeesHtml;
}

function displayModal(index) {
    let img = employees[index].picture.large;
    let name = employees[index].name;
    let email = employees[index].email;
    let location = employees[index].location;
    let cell = employees[index].cell;
    let dob = employees[index].dob;
    
    let date = new Date(dob.date);

    const modalHtml = `
        <div class="modal  ${index}">
            <button class="close">x</button>
            <img class="avatar" src="${img}" />
            <button class="switch-left"><</button>
            <button class="switch-right">></button>
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${location.city}</p>
                <hr />
                <p>${cell}</p>
                <p class="address">${location.street.name} ${location.street.number}, ${location.state} ${location.postcode}</p>
                <p>Birthdate:
                ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </div>`;
    
    overlay.classList.remove('hidden');
    overlay.innerHTML = modalHtml;
}


/* fetch */


fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


/* event listeners */


gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.id;

        displayModal(index);
    }
})

overlay.addEventListener('click', e => {
    if (e.target.className === 'close') {
        overlay.classList.add('hidden');
    } else if (e.target.className === 'switch-left') {
        let modalDiv = document.querySelector('.modal');
        let index = modalDiv.className.replace('modal ', '');
        let newIndex;
        if (index === ' 0') {
            let newIndex = 11
            displayModal(newIndex);
        } else {
            let newIndex = index - 1;
            displayModal(newIndex);
        }
        
    } else if (e.target.className === 'switch-right') {
        let modalDiv = document.querySelector('.modal');
        let index = modalDiv.className.replace('modal ', '');
        let newIndex;
        if (index === ' 11') {
            let newIndex = 0;
            displayModal(newIndex);
        } else {
            index = parseInt(index);
            let newIndex = index + 1;
            displayModal(newIndex);
        }
        
    }
})


search.addEventListener("keydown", () => {
    let searchValue = search.value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        let className = cards[i].className.toLowerCase();
       if (!className.includes(searchValue)) {
           cards[i].style.display = "none";
       }
    }
});

search.addEventListener("keydown", () => {
    let searchValue = search.value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        let className = cards[i].className.toLowerCase();
       if (className.includes(searchValue)) {
           cards[i].style.display = "grid";
       }
    }
});













