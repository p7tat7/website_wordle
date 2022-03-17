const word_size = 5
const chance_limit = 6
const current_row = 1

const grid_display = document.querySelector('#grid')

function initialize(){
    for (let i = 0; i < chance_limit; i++) {
        const row = document.createElement('game-row')
        row.setAttribute('data-id', i)
        grid_display.appendChild(row)
        for (let j = 0; j < word_size; j++) {
            const blank = document.createElement('tiles')
            blank.setAttribute('class', 'tiles')
            row.appendChild(blank)
            console.log(blank)
        }
    }
}

initialize()

const tiles = document.querySelectorAll('tiles')

tiles.forEach(tile => {
    const tile_content = document.createElement('div')
    tile_content.innerHTML = 'A'
    tile.setAttribute('letter', 'A')
    tile.appendChild(tile_content)
})