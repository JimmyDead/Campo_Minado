const createBoard = (rows, columns) => { //cria o tabuleiro, uma matriz de elementos e cada campo da matriz contem um objeto com as informações do field
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return { //criando objeto
                //row: row,
                //column: column //como o atributo é o mesmo da chave podemos simplificar
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => { //adiciona minas no campo
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowRandom = parseInt(Math.random() * rows, 10)
        const columnRandom = parseInt(Math.random() * columns, 10)

        if (!board[rowRandom][columnRandom].mined) {
            board[rowRandom][columnRandom].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]

    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validColumn && validRow) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighbors = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighbors(board, row, column)) {
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)

const hasExplosion = board => fields(board).filter(field => field.exploded).length > 0

const pedding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pedding).length === 0

const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = board => fields(board).filter(field => field.flagged).length

export { createMinedBoard, cloneBoard, openField, hasExplosion, wonGame, showMines, invertFlag, flagsUsed }