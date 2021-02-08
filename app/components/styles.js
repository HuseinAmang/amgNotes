import { StyleSheet } from 'react-native';

const theme = StyleSheet.create({
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
    }
})


const splashStyles = StyleSheet.create({
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

const authStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#faf2d9'
    },
    inputContainer: {
        alignSelf: 'stretch',
        margin: 10
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#573b30',
        borderColor: 'black',
        alignSelf: 'stretch',
        padding: 5
    },
    Message: {
        backgroundColor: '#886e50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        margin: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 150,
        borderRadius: 5,
    }
})


const listStyle = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#faf2d9'
    },
})

const addStyle = StyleSheet.create({
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


const profileStyle = StyleSheet.create({
    profile: {
        width: 200,
        height: 200,
        borderWidth: 10,
        borderRadius: 200 / 2,
        borderColor: '#573b30',
        backgroundColor: '#b7a996',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileText: {
        fontSize: 150,
        color: '#573b30'
    },
    profileSection: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerSection: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 10,
    }
})

export { theme, splashStyles, authStyle, listStyle, addStyle, profileStyle }