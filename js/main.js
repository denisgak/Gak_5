function formSend(form) {
    let step = form.closest('[data-step]').getAttribute('data-step');
    
    if (step == 1) {
        let data = getData(form);

        document.querySelector('[data-step="2"]').querySelectorAll('input').forEach( input => {
            input.value = data[input.name];
        });

        document.querySelector('[data-step="1"]').setAttribute('data-status', 'hidden');
        document.querySelector('[data-step="2"]').setAttribute('data-status', 'show');
    }else if (step == 2){
        let data = getData(document.querySelector('[data-step="1"]'));
        
        console.log(data);

        document.querySelector('[data-step="2"]').setAttribute('data-status', 'hidden');
        document.querySelector('[data-step="3"]').setAttribute('data-status', 'show');
    
    }
}

function getData(form) {
    let data = [];
    form.querySelectorAll('input').forEach( input => {
        if (input.type == 'file' && input.files.length) {
            data[input.name] = input.files[0].name;
        }else{
            data[input.name] = input.value;
        }
    });

    return data;
}

document.querySelectorAll('.form').forEach( form => {
    form.addEventListener('submit', (elem) => {
        elem.preventDefault();
        formSend(elem.target);
    });
})

document.querySelectorAll('.form__select-item').forEach( item => {
    item.addEventListener('click', () => {
        item.closest('.form__label').querySelector('input').value = item.textContent;
    });
})

document.querySelector('input[type=file]').addEventListener('change', (elem) => {
    let input = elem.target;

    if (input.files.length) {
        input.closest('.form__label').querySelector('p').innerHTML = input.files[0].name;
    }
})