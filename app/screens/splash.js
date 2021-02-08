import React from 'react'
import {
    ActivityIndicator,
    Image,
    Text,
    View,
} from 'react-native'
import { splashStyles } from "../components/styles";

export default function splash() {
    return (
        <View style={splashStyles.container}>
            <View style={splashStyles.emptyBox} />
            <View style={splashStyles.logoBox}>
                <Image source={require('../assets/amgNotes.png')} />
                <ActivityIndicator size="small" color="#735438" />
                <Text style={[splashStyles.title, { fontSize: 24 }]} >AMG Notes</Text>
            </View>
            <View style={splashStyles.fromBox}>
                <Text style={[splashStyles.title, { fontSize: 12 }]}>from</Text>
                <Text style={splashStyles.from}>M Farid H</Text>
            </View>
        </View>
    )
}
