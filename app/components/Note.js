import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <TouchableOpacity onPress={this.props.viewMethod}>
          <Text style={styles.noteTitle}>{this.props.val.title}</Text>
          <Text style={styles.noteText}>{this.props.val.description.slice(0, 50)} . . .</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <FontAwesome
            size={18}
            name='trash'
            color='Black'
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#b7a996',
  },
  noteTitle: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#b7a996',
    color: '#573b30'
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#b7a996',
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#b7a996',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10
  },
  noteDeleteText: {
    color: 'white',
  }
});

