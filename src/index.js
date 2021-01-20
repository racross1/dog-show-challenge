document.addEventListener('DOMContentLoaded', () => {
    fetchAllDogs()
    addSubmitListener()
    let table = document.getElementById('table-body')
    let currentDog = {}

//FETCHES
    function fetchAllDogs() {
        fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDogs(dog)))
    }

    function patchDog(dog){
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dog),
        })
        .then(resp => resp.json())
        .then((dog) => {
            document.getElementById(dog.id).querySelectorAll('td')[0].textContent = dog.name
            document.getElementById(dog.id).querySelectorAll('td')[1].textContent = dog.breed
            document.getElementById(dog.id).querySelectorAll('td')[2].textContent = dog.sex
        })

    }

//RENDERS AND LOADS
    function renderDogs(dog) {
        let tr = document.createElement('tr') 
        let tdName = document.createElement('td')
        let tdBreed = document.createElement('td')
        let tdSex = document.createElement('td')
        let tdBtn = document.createElement('td')
        let btn = document.createElement('button')

        tr.id = dog.id
        tdName.innerText = dog.name
        tdBreed.innerText = dog.breed
        tdSex.innerText = dog.sex
        btn.innerText = 'Edit'

        
        tr.append(tdName, tdBreed, tdSex, tdBtn)
        tdBtn.appendChild(btn)
        table.appendChild(tr)

        btn.addEventListener('click', () => loadEdit(dog))
    }

    function loadEdit(dog){
        currentDog = dog

        let form = document.getElementById('dog-form')
        let inputs = form.querySelectorAll('input')
        
        inputs[0].value = dog.name
        inputs[1].value = dog.breed 
        inputs[2].value = dog.sex
    }

    
    
//LISTENERS AND EVENT HANDLERS

    function addSubmitListener() {
        let form = document.getElementById('dog-form')
        form.addEventListener('submit', handleSubmit)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let inputs = e.target.querySelectorAll('input')
        let updatedDog = {
            'id': currentDog.id,
            'name': inputs[0].value,
            'breed':inputs[1].value, 
            'sex': inputs[2].value  
        }      
        patchDog(updatedDog)
    }



})

