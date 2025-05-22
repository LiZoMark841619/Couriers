import { View, Text } from 'react-native';

export default function Navbar() {
    return (
        <View style={{ padding: 10, backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderBottomColor: '#e7e7e7' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My App</Text>
        </View>
    );
    }