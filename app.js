let employees = [];
const url = 'https://randomuser.me/api/?results=12';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal')
let modalClose = document.querySelector('button');


fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


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
        <div class="card" id="${i}">
            <img src="${img}" alt="" class="avatar">
            <div class="text-container">
                <h2 class="name">${firstName} ${lastName}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
    };
     /* employees.forEach((employee) => {
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let img = employee.picture.large;

        employeesHtml += `
        <div class="card">
            <img src="${img}" alt="" class="avatar">
            <div class="text-container">
                <h2 class="name">${firstName} ${lastName}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
        return employeesHtml;
    }); */

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
        <button class="modal-close">x</button>
        <img class="avatar" src="${img}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${location.city}</p>
        <hr />
        <p>${cell}</p>
        <p class="address">${location.street.name} ${location.street.number}, ${location.state} ${location.postcode}</p>
        <p>Birthdate:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>`;
    
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHtml;
}

/* function displayModal(index) {
    let { name, dob, phone, email, location: { city, street: {number, streetname}, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);

    const modalHtml = `
        <button class="modal-close">x</button>
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>`;
    
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHtml;
    modalClose = document.querySelector('.modal-close');
} */

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.id;

        displayModal(index);
    }
})

overlay.addEventListener('click', e => {
    if (e.target.className === 'modal-close') {
    overlay.classList.add('hidden');
    }
})













