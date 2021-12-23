let employees = [];
const url = 'https://randomuser.me/api/?results=12';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal')
const modalClose = document.querySelector('.modal-close');


fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


function displayEmployees(data) {
    console.log(data);
    employees = data;
    let employeesHtml = '';
    employees.forEach((employee) => {
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
    });

    gridContainer.innerHTML = employeesHtml;
}



function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);

    const modalHtml = `
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
}

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
})














