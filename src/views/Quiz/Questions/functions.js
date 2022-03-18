const required_radio_groups = document.getElementsByClassName('radio-group-required');

export let answers = []

export const validate_checked_radios = () => {
    // Create a validation loop for items
    const radio_group_check = new Array(required_radio_groups.length).fill(false);
    // Check every radio group if has one element checked 
    answers = []
    for (let k = 0; k < required_radio_groups.length; k++) {

        let que_id = document.getElementById(`question-${k+1}`).getAttribute('question_id');
        let radios = document.querySelectorAll(`#question-${k+1} .form-check-input`);
        // [...radios].some(radio=>radio.checked == true) ? radio_group_check[k] = true : radio_group_check[k] = false;
        [...radios].some((radio) => {
            if(radio.checked == true){
                radio_group_check[k] = true;
                answers.push([parseInt(que_id), parseInt(radio.parentNode.id)])
            } else if(!radio_group_check[k]) {
                radio_group_check[k] = false
            }
        })
    }

    radio_group_check.forEach((checked_radio, index)=> {
          checked_radio ? document.getElementById(`question-${index+1}`).classList.remove("error") :  document.getElementById(`question-${index+1}`).classList.add("error");
    })

    // For dynamic live validation after submit validation
    // document.querySelectorAll('.form-check-input').forEach((e, i) => { e.onclick = () => { validate_checked_radios() } });
    return checker(radio_group_check)
}

export const disable_radios = () => document.querySelectorAll('input').forEach(input => input.disabled = true);

export const checker = arr => arr.every(v => v === true);

export const end_survey = () => document.getElementById('success-screen').setAttribute('style', '-webkit-animation:fadeIn 1s both 0s; animation:fadeIn 1s both 0s; display:flex'); // Hide survey screen
