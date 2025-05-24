import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Navbar() {
    const handleRegister = () => {
        alert('Register pressed!');
    };

    const handleLogin = () => {
        alert('Login pressed!');
    };

    const handleProfile = () => {
        alert('Profile pressed!');
    };

    return (
        <View style={styles.navbar}>
            <Pressable onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <Pressable onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable onPress={handleProfile} style={styles.button}>
                <Text style={styles.buttonText}>Profile</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        position: 'relative',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        color: '#ffffff',
        backgroundColor: '#007bff',
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});