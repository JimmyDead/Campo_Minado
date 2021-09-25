import { Dimensions } from "react-native";

const params = {//DIMENSIONS TRABALHA COM AS PROPORÇÕES DO CELULAR ENTÃO VARIA DE CADA APARELHO
    blockSize: 30, //tamanho da mina
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, //proporção do painel superior na tela
    difficultLevel: 0.1,
    getColumnsAmount() {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize) //divido largura pelo tamanho de blocos
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)//1 = 100%, ou seja estamos removendo os 15% do cabeçalho
        return Math.floor(boardHeight / this.blockSize) //divido altura pelo tamanho dos blocos
    }
}

export default params // a ordem do export influencia, melhor sempre exportar ao final

