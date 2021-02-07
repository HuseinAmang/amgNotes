import React from 'react'
import axios from 'react-native-axios';
import {
    Text,
    View,
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import Note from '../../components/Note';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function listNote({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [token, setToken] = React.useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyNjY4NTAzLCJleHAiOjE2MTI3NTQ5MDN9.PEIU-SF9yfxi4DfY0w6UHgdBD8L0FncIHxnC6hzgCoo');
    const [notes, setNotes] = React.useState([]);

    React.useEffect(() => {
        getDataUser()
        setTimeout(() => Notes(), 2000);
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getDataUser = async () => {
        let data = await AsyncStorage.getItem('token');
        setToken(data);
    }

    const http = axios.create({
        baseURL: 'https://amg-app-v1.herokuapp.com/api',
        timeout: 5000,
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    });

    const Notes = async () => {
        let id = await AsyncStorage.getItem('id');
        http.get(`post`)
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
            <SafeAreaView style={styles.blankContainer}>
                <View style={styles.centerBar}>
                    <View style={styles.centerCircle}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerSection}>
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.push('profile')}>
                    <MaterialIcon
                        size={24}
                        name='person'
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.push('addNote')}>
                    <MaterialIcon
                        size={24}
                        name='add'
                        color='Black'
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.scrollContainer}
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



const styles = StyleSheet.create({
    blankContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faf2d9'
    },
    centerBar: {
        backgroundColor: '#573b30',
        justifyContent: 'center',
        borderColor: '#b7a996',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderWidth: 10,
        height: 70,
    },
    centerCircle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        backgroundColor: '#573b30',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        backgroundColor: '#faf2d9'
    },
    iconBox: {
        width: 50,
        borderRadius: 50 / 2,
        padding: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b7a996'
    },
    headerSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#573b30',
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 50,
        textAlign: 'center'
    },
    scrollContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#faf2d9'
    },
})
