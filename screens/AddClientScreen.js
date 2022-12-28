import React, { useState } from 'react';
import { Text, View, TextInput, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

import { clientsApi } from '../utils/api';

import { Button, Container } from '../components';

  const AddClientScreen = ({navigation }) => {
    const [values, setValues] = useState({
    });
    const fieldsName = {
      fullname: 'Роман турчанинов',
      phone: '77750032'
    };
  
    const setFieldValue = (name, value) => {
      setValues({
        ...values,
        [name]: value
      });
    };

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    clientsApi
      .add(values)
      .then(() => {
        navigation.navigate('Patients');
      })
      .catch(e => {
        alert('BAD');
      });
  };

  console.log(values)

  return (
    <Container>
      <View style={{ marginLeft: 0,borderBottomWidth: 1 }} floatingLabel>
        <Text>Имя и Фамилия</Text>
        <TextInput
          autoCorrect = {true}
          onChange={handleChange.bind(this, 'fullname')}
          value={values.fullname}
          style={{ marginTop: 12 }}
          autoFocus
        />
      </View>
      <View style={{borderBottomWidth: 1  ,marginTop: 20, marginLeft: 0 }} floatingLabel>
        <Text>Номер телефона</Text>
        <TextInput
          onChange={handleChange.bind(this, 'phone')}
          value={values.phone}
          keyboardType="numeric"
          dataDetectorTypes="phoneNumber"
          style={{ marginTop: 12 }}
        />
      </View>
      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Добавить клиента</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

AddClientScreen.navigationOptions = {
  title: 'Добавить  клиента',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default AddClientScreen;
