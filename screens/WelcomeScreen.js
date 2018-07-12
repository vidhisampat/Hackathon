import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

class WelcomeScreen extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            email: 'vsam@gmail.com',
            password: ''
        })
    }


    static navigationOptions = {
        header: 'none'
    }

  render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />

                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </Item>

                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        // onPress={() => this.loginUser(this.state.email, this.state.password)}
                        onPress={() => this.props.navigation.navigate('DrawerNavigator')}
                    >
                        <Text style={{ color: 'white' }}> Login</Text>
                    </Button>
                    <Button style={{ marginTop: 10 }}
                        full
                        rounded
                        success
                        // onPress={() => this.signUpUser(this.state.email, this.state.password)}
                        // onPress={() => this.props.navigation.navigate('SignUpScreen')}
                    >
                        <Text style={{ color: 'white' }}> Sign Up</Text>
                    </Button>

                </Form>
            </Container>
        );
    }

}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
});