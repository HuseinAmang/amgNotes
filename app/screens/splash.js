import React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Image,
    Text,
    View,
} from 'react-native'

export default function splash() {
    return (
        <View style={styles.container}>
            <View style={styles.emptyBox} />
            <View style={styles.logoBox}>
                <Image source={require('../assets/amgNotes.png')} />
                <ActivityIndicator size="small" color="#735438" />
                <Text style={[styles.title, { fontSize: 24 }]} >AMG Notes</Text>
            </View>
            <View style={styles.fromBox}>
                <Text style={[styles.title, { fontSize: 12 }]}>from</Text>
                <Text style={styles.from}>M Farid H</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFEB3B"
    },
    emptyBox: {
        flex: 1,
        height: 50
    },
    logoBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fromBox: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 20
    },
    title: {
        color: "#422c2c",
        fontWeight: "bold",
        fontFamily: "Roboto"
    },
    from: {
        color: "#573b30",
        fontWeight: "bold",
        fontFamily: "Roboto",
        fontSize: 16
    }
})
