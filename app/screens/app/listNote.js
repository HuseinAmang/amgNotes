import React from 'react'
import {
    View,
    Alert,
    ScrollView,
    SafeAreaView,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import Note from '../../components/Note';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../components/http';
import { theme, listStyle } from '../../components/styles';
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function listNote({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [notes, setNotes] = React.useState([]);

    React.useEffect(() => {
        Notes()
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const Notes = async () => {
        http.get(`post`, {
            headers: {
                Accept: 'application/json',
                'x-access-token': await AsyncStorage.getItem('token')
            }
        })
            .then(function (response) {
                setNotes([...response.data])
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setNotes([])
                setIsLoading(false)
            });
    }

    const confirmDelete = (key) => {
        Alert.alert(
            'Peringatan !',
            'Anda akan menghapus catatan ini ?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => deleteNote(key) },
            ]
        );
    }

    const deleteNote = (key) => {
        http.delete(`post/${key}`)
            .then(function (response) {
                console.log(response.data)
                Notes();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let notesList = notes.map((val, key) => {
        return (
            <Note key={key} keyval={key} val={val} viewMethod={() => navigation.push('viewNote', { id: val.id })} deleteMethod={() => confirmDelete(val.id)} />
        )
    })

    if (isLoading) {
        return (
            <SafeAreaView style={theme.blankContainer}>
                <View style={theme.centerBar}>
                    <View style={theme.centerCircle}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={theme.container}>
            <View style={theme.headerSection}>
                <TouchableOpacity style={theme.iconBox} onPress={() => navigation.push('profile')}>
                    <MaterialIcon
                        size={24}
                        name='person'
                        color='Black'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={theme.iconBox} onPress={() => navigation.push('addNote')}>
                    <MaterialIcon
                        size={24}
                        name='add'
                        color='Black'
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={listStyle.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {notesList}
            </ScrollView>
        </SafeAreaView>
    )
}
