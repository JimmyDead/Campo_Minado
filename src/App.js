import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import Header from './components/Header'
import MineField from './components/MineField'
import {
    createMinedBoard, cloneBoard, openField, hasExplosion,
    wonGame, showMines, invertFlag, flagsUsed
} from './logic'
import params from './params'
import LevelSelection from './screens/LevelSelection'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = this.createState()
    }

    minesAmount = () => {
        const columns = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return Math.ceil(columns * rows * params.difficultLevel)
    }

    createState = () => {
        const columns = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return {
            board: createMinedBoard(rows, columns, this.minesAmount()),
            won: false,
            lost: false,
            showLevelSelection: false,
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board)
        openField(board, row, column)
        const lost = hasExplosion(board)
        const won = wonGame(board)

        if (lost) {
            showMines(board)
            Alert.alert("Burro!")
        } else if (won) {
            Alert.alert("Ganhou!")
        }

        this.setState({ board, lost, won })
    }

    onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board)
        invertFlag(board, row, column)
        const won = wonGame(board)

        if (won) {
            Alert.alert('Parabéns', 'Você Venceu!')
        }

        this.setState({ board, won })
    }

    onLevelSelected = level => {
        params.difficultLevel = level
        this.setState(this.createState())
    }

    render() {
        return (
            <View style={style.container}>
                {/*<Text >
                    Tamanho das grade: {params.getRowsAmount()} X {params.getColumnsAmount()}
                </Text>*/}
                <LevelSelection isVisible={this.state.showLevelSelection}
                    onLevelSelected={this.onLevelSelected}
                    onCancel={() => this.setState({ showLevelSelection: false })} />
                <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                    onFlagPress={() => this.setState({ showLevelSelection: true })} />
                <View style={style.board}>
                    <MineField board={this.state.board}
                        onOpenField={this.onOpenField}
                        onSelectField={this.onSelectField} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#AAA'
    }
})