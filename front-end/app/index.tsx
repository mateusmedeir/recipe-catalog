import { View, StyleSheet, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text style={style.text}>Home</Text>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
  },
});
