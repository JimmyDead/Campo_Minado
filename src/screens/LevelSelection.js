import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native'

export default props => {
    const selectNivels = (nivel, textLabel, onLevelSelected, stylesBg) => {
        return (
            <TouchableOpacity style={[styles.button, stylesBg]}
                onPress={() => onLevelSelected(nivel)}>
                <Text style={styles.buttonLabel}>{textLabel}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal onRequestClose={props.onCancel}
            visible={props.isVisible} animationType='slide' transparent={true}>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o nivel</Text>
                    {selectNivels(0.1, 'Fácil', props.onLevelSelected, styles.bgEasy)}
                    {selectNivels(0.2, 'Médio', props.onLevelSelected, styles.bgNormal)}
                    {selectNivels(0.3, 'Difícil', props.onLevelSelected, styles.bgHard)}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        padding: 5
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold'
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgNormal: {
        backgroundColor: '#2765F7'
    },
    bgHard: {
        backgroundColor: '#F26337'
    }


})

/**
 *
 * <TouchableOpacity style={[styles.button, styles.bgEasy]}
                        onPress={() => props.onLevelSelected(0.1)}>
                        <Text style={styles.buttonLabel}>Facil</Text>
                    </TouchableOpacity>
 */