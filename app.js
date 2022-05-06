const word_size = 5
const chance_limit = 6
let current_row = 1
let last_word_pointer = 0

const grid_display = document.querySelector('#grid')
let tiles = null

function initialize(){
    for (let i = 0; i < chance_limit; i++) {
        const row = document.createElement('game-row')
        row.setAttribute('data-id', i)
        grid_display.appendChild(row)
        for (let j = 0; j < word_size; j++) {
            const blank = document.createElement('tiles')
            blank.setAttribute('class', 'tiles')
            row.appendChild(blank)
            const tile_content = document.createElement('div')
            blank.appendChild(tile_content)
        }
    }
    tiles = document.querySelectorAll('tiles')
}

function add_word(word){
    if (last_word_pointer === word_size){
        console.log('Exceed word limit.')
        return
    }
    last_word_pointer++
    const target = (last_word_pointer - 1) + (current_row - 1)* word_size
    // console.log(target)
    const tile_content = tiles[target].firstChild
    tile_content.innerHTML = word
    tiles[target].setAttribute('letter', word)
}

function delete_word(){
    const target = (last_word_pointer - 1) + (current_row - 1)* word_size
    if (last_word_pointer === 0){
        console.log('No more words to delete.')
        return
    }
    const tile_content = tiles[target].firstChild
    tile_content.innerHTML = ''
    tiles[target].removeAttribute('letter')
    last_word_pointer--
}

function check_word(){
    if (last_word_pointer < word_size){
        console.log('Not enough words.')
        return
    }
    var input_word = ''
    for (let i = 0; i < word_size; i++){
        const target = i + (current_row - 1) * word_size
        input_word += tiles[target].getAttribute('letter').toLowerCase()
    }
    if (input_word === answer){
        console.log('Correct! ')
        display_result(input_word)
        return
    }
    if (! (Oa.includes(input_word) || Ma.includes(input_word))){
        console.log('Not in word list.')
        return
    }
    display_result(input_word)
    if (current_row === chance_limit){
        console.log('Gameover.')
        return
    }
    current_row++
    last_word_pointer = 0
}

function display_result(input_word){
    let remain = []
    let input_color = []
    for (let i = 0; i < word_size; i++){
        remain[i] = answer[i]
        input_color[i] = 0
    }
    for (let i = 0; i < word_size; i++){
        const target = i + (current_row - 1) * word_size
        let character = input_word[i]
        if (character === answer[i]){
            tiles[target].setAttribute('result', 'exact')
            remain[i] = "."
            input_color[i] = 1
            console.log("True remain: "+ remain)
        }
    }
    for (let i = 0; i < word_size; i++){
        const target = i + (current_row - 1) * word_size
        let character = input_word[i]
        if (remain.includes(character)){
            tiles[target].setAttribute('result', 'include')
            console.log("index: " + remain.indexOf(character))
            remain[remain.indexOf(character)] = "."
            console.log("remain: " + remain)
            input_color[i] = 2
        }
        else if(input_color[i] === 0){
            tiles[target].setAttribute('result', 'wrong')
        }
    }
}

document.addEventListener('keydown', function(e){
    let keyPressed = e.key
    if (keyPressed.length === 1){
        if (keyPressed.toUpperCase().charCodeAt(0) >= 65 && e.key.toUpperCase().charCodeAt(0) <= 90){
            add_word(keyPressed.toUpperCase())
        }
    }
    switch (keyPressed){
        case 'Backspace':
            delete_word()
            break
        case 'Enter':
            check_word()
            break
    }
    
  }, false);


console.log("target is: ", answer)