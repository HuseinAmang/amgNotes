import React from 'react'
import {
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import http from '../../components/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme, addStyle } from '../../components/styles';

export default function addNote({ navigation }) {
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [form, setForm] = React.useState({
        title: '',
        description: ''
    });

    const setInput = (key, val) => {
        setForm({ ...form, [key]: val })
    }

    let data = {
        title: form.title,
        description: form.description,
        published: true
    }
    const addNote = async () => {
        setIsSubmiting(true)
        http.post('post', data, {
            headers: {
                Accept: 'application/json',
                'x-access-token': await AsyncStorage.getItem('token')
            }
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

    return (
        <SafeAreaView style={theme.container}>
            <View style={theme.headerSection}>
                <TouchableOpacity style={theme.iconBox} onPress={() => navigation.push('listNote')}>
                    <MaterialIcon
                        size={24}
                        name='arrow-back'
                        color='black'
                    />
                </TouchableOpacity>

                {isError ? <Text style={{ color: '#b7a996' }}>{errorMessage}</Text> : <Text />}

                {
                    isSubmiting ?
                        <View style={theme.iconBox}>
                            <ActivityIndicator size="small" color="Black" />
                        </View>
                        :
                        <TouchableOpacity style={theme.iconBox} onPress={() => addNote()}>
                            <MaterialIcon
                                size={24}
                                name='save'
                                color='Black'
                            />
                        </TouchableOpacity>
                }
            </View>
            <View style={addStyle.titleContainer}>
                <Text>Title</Text>
                <TextInput
                    style={addStyle.titleInput}
                    onChangeText={title => { setInput('title', title), setIsError(false) }}
                    defaultValue={form.title}
                />
            </View>
            <View style={addStyle.noteContainer}>
                <Text>Note</Text>
                <TextInput
                    style={addStyle.noteInput}
                    onChangeText={description => { setInput('description', description), setIsError(false) }}
                    defaultValue={form.description}
                    multiline={true}
                />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text>AMG Notes v.01</Text>
            </View>

        </SafeAreaView>
    )
}
