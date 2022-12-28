import React, { useState } from 'react';
import { Text, View, TextInput, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

import { carsApi } from '../utils/api';

import { Button, Container } from '../components';

  const AddCarScreen = ({ navigation }) => {
    const [values, setValues] = useState({
      carname: 'Renault',
      carmodel: 'Scenic',
      carnumber: 'T876НО',
      client: navigation.getParam('clientId')
    });
  
    const fieldsName = {
        carname: 'Renault',
        carmodel: 'Scenic',
        carnumber: 'T876НО',
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
    carsApi
      .add(values)
      .then(() => {
        navigation.goBack()
      })
      .catch(e => {
        alert('BAD');
      });
  };

  return (
    <Container>
      <View style={{marginLeft: 0, borderBottomWidth: 1}}>
      <Text>Марка</Text>
      <Picker
          mode="dropdown"
          placeholder="Выберите вид"
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          style={{ width: '100%' }}
          onValueChange={setFieldValue.bind(this, 'carname')}
          selectedValue={values.carname}
        >
          <Picker.Item label="Acura" value="Acura" />
          <Picker.Item label="Alfa Romeo" value="Alfa Romeo" />
          <Picker.Item label="Audi" value="Audi" />
          <Picker.Item label="BMW" value="BMW" />
          <Picker.Item label="Cadillac" value="Cadillac" />
          <Picker.Item label="Chery" value="Chery" />
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Chrysler" value="Chrysler" />
          <Picker.Item label="Citroen" value="Citroen" />
          <Picker.Item label="Dacia" value="Dacia" />
          <Picker.Item label="Daewoo" value="Daewoo" />
          <Picker.Item label="Daihatsu" value="Daihatsu" />
          <Picker.Item label="Dodge" value="Dodge" />
          <Picker.Item label="Fiat" value="Fiat" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Honda" value="Honda" />
          <Picker.Item label="Hummer" value="Hummer" />
          <Picker.Item label="Hyundai" value="Hyundai" />
          <Picker.Item label="Infinity" value="Infinity" />
          <Picker.Item label="Isuzu" value="Isuzu" />
          <Picker.Item label="Jaguar" value="Jaguar" />
          <Picker.Item label="Jeep" value="Jeep" />
          <Picker.Item label="KIA" value="KIA" />
          <Picker.Item label="Lancia" value="Lancia" />
          <Picker.Item label="Land Rover" value="Land Rover" />
          <Picker.Item label="Lexus" value="Lexus" />
          <Picker.Item label="Mazda" value="Mazda" />
          <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
          <Picker.Item label="Mitsubishi" value="Mitsubishi" />
          <Picker.Item label="Nissan" value="Nissan" />
          <Picker.Item label="Opel" value="Opel" />
          <Picker.Item label="Peugeot" value="Peugeot" />
          <Picker.Item label="Porsche" value="Porsche" />
          <Picker.Item label="Renault" value="Renault" />
          <Picker.Item label="Rover" value="Rover" />
          <Picker.Item label="SEAT" value="SEAT" />
          <Picker.Item label="Skoda" value="Skoda" />
          <Picker.Item label="Subaru" value="Subaru" />
          <Picker.Item label="Suzuki" value="Suzuki" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Volkswagen" value="Volkswagen" />
          <Picker.Item label="Volvo" value="Volvo" />
          <Picker.Item label="Другое" value="Другое" />
        </Picker>
      </View>
      <View style={{ marginTop: 20,borderBottomWidth: 1 }} floatingLabel>
        <Text>Модель</Text>
        <TextInput
          onChange={handleChange.bind(this, 'carmodel')}
          value={values.carmodel}
          style={{ marginTop: 12 }}
          autoFocus
        />
      </View>
      <View style={{borderBottomWidth: 1 , marginTop: 20, marginLeft: 0 }} floatingLabel>
        <Text>Номер ТС</Text>
        <TextInput
          onChange={handleChange.bind(this, 'carnumber')}
          value={values.carnumber}
          dataDetectorTypes="carnumber"
          style={{ marginTop: 12 }}
        />
      </View>
      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Добавить машину</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

AddCarScreen.navigationOptions = {
  title: 'Добавить  машину',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default AddCarScreen;
