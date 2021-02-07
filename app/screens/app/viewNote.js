import React from 'react'
import axios from 'react-native-axios';
import {
    Text,
    View,
    Alert,
    Platform,
    TextInput,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function addNote({ route, navigation }) {
    const { id } = route.params;
    const [isLoading, setIsloading] = React.useState(true);
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [token, setToken] = React.useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyNjY4NTAzLCJleHAiOjE2MTI3NTQ5MDN9.PEIU-SF9yfxi4DfY0w6UHgdBD8L0FncIHxnC6hzgCoo');
    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    React.useEffect(() => {
        getDataUser()
        readNote()
    }, [])

    const getDataUser = async () => {
        let data = await AsyncStorage.getItem('token');
        setToken(data);
    }

    const http = axios.create({
        baseURL: 'https://amg-app-v1.herokuapp.com/api',
        timeout: 2000,
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    });

    const readNote = () => {
        http.get(`post/${id}`, {
            title: title,
            description: description,
            published: true
        })
            .then(async (response) => {
                console.log(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setIsloading(false);
            })
            .catch(function (response, error) {
                console.log(response);
                setIsloading(false);
            });
    }

    const addNote = () => {
        setIsSubmiting(true)
        http.put(`post/${id}`, {
            title: title,
            description: description,
            published: true
        })
            .then(async (response) => {
                console.log(response);
                setIsSubmiting(false)
                setIsError(true)
                setErrorMessage(response.data.message)
                setTimeout(() => { setIsError(false), navigation.push('listNote') }, 1000);
            })
            .catch(function (response, error) {
                setIsSubmiting(false)
                setIsError(true)
                setErrorMessage('Terjadi Kesalahan')
                console.log(response);
            });
    }

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
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.push('listNote')}>
                    <MaterialIcon
                        size={24}
                        name='arrow-back'
                        color='black'
                    />
                </TouchableOpacity>

                {isError ? <Text style={{ color: '#b7a996' }}>{errorMessage}</Text> : <Text />}

                {
                    isSubmiting ?
                        <View style={styles.iconBox}>
                            <ActivityIndicator size="small" color="Black" />
                        </View>
                        :
                        <TouchableOpacity style={styles.iconBox} onPress={() => addNote()}>
                            <MaterialIcon
                                size={24}
                                name='save'
                                color='Black'
                            />
                        </TouchableOpacity>
                }
            </View>
            <View style={styles.titleContainer}>
                <Text>Title</Text>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={title => { setTitle(title), setIsError(false) }}
                    defaultValue={title}
                />
            </View>
            <View style={styles.noteContainer}>
                <Text>Note</Text>
                <TextInput
                    style={styles.noteInput}
                    onChangeText={description => { setDescription(description), setIsError(false) }}
                    defaultValue={description}
                    multiline={true}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text>AMG Notes v.01</Text>
            </View>

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
    titleContainer: {
        alignSelf: 'stretch',
        padding: 5,
    },
    titleInput: {
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'stretch',
        padding: 5
    },
    noteContainer: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 5,
    },
    noteInput: {
        borderWidth: 1,
        borderColor: 'black',
        flex: 1,
        alignSelf: 'stretch',
        textAlignVertical: "top",
        padding: 5
    }
})