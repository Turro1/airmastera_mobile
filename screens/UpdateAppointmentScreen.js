import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, TextInput, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import DatePicker from 'react-native-datepicker';

import { appointmentsApi } from '../utils/api';

import { Button, Container } from '../components';

const UpdateAppointmentScreen = ({ item ,navigation }) => {
  const [values, setValues] = useState({
    diagnosis: navigation.getParam('appointment').diagnosis,
    elNumber: navigation.getParam('appointment').elNumber,
    price: navigation.getParam('appointment').price,
    date: navigation.getParam('appointment').date,
    time: navigation.getParam('appointment').time,
    _id: navigation.getParam('appointment')._id
  });

  console.log(navigation.getParam('appointment').price)

  const fieldsName = {
    diagnosis: 'Диагноз',
    elNumber: 'Элемент',
    price: 'Цена',
    date: 'Дата',
    time: 'Время'
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const onSubmit = () => {
    appointmentsApi
      .update(values)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(e => {
        alert('BAD');
      });
  };

  return (
    <Container>
     <View style={{marginLeft: 0, borderBottomWidth: 1}}>
      <Text>Вид</Text>
      <Picker
          mode="dropdown"
          placeholder="Выберите вид"
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          style={{ width: '100%' }}
          onValueChange={setFieldValue.bind(this, 'diagnosis')}
          selectedValue={values.diagnosis}
        >
          <Picker.Item label="Задний левый" value="Задний левый" />
          <Picker.Item label="Задний правый" value="Задний правый" />
          <Picker.Item label="Передний левый" value="Передний левый" />
          <Picker.Item label="Передний правый" value="Передний правый" />
          <Picker.Item label="-" value="-" />
        </Picker>
      </View>
      <View style={{ marginTop: 20, marginLeft: 0, borderBottomWidth: 1}}>
      <Text>Элемент</Text>
      <Picker
          mode="dropdown"
          placeholder="Выберите элемент"
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          style={{ width: '100%' }}
          onValueChange={setFieldValue.bind(this, 'elNumber')}
          selectedValue={values.elNumber}
        >
          <Picker.Item label="Амортизатор" value="Амортизатор" />
          <Picker.Item label="Балон" value="Балон" />
          <Picker.Item label="Стойка" value="Стойка" />
          <Picker.Item label="Компрессор" value="Компрессор" />
          <Picker.Item label="Блок клапанов" value="Блок клапанов" />
        </Picker>
      </View>
      <View style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
        <Text>Цена</Text>
        <Input
          onChange={handleInputChange.bind(this, 'price')}
          value={values.price}
          keyboardType="numeric"
          style={{ marginTop: 12 }}
        />
      </View>
      
      <View style={{ marginTop: 20, marginLeft: 0 }}>
        <TimeRow>
          <View style={{marginRight: 20, flex: 1, borderBottomWidth: 1 }}>
            <DatePicker
              date={new Date()}
              mode="date"
              placeholder="Дата"
              format="YYYY.MM.DD"
              minDate={new Date()}
              confirmBtnText="Сохранить"
              cancelBtnText="Отмена"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderWidth: 0
                },
                dateText: {
                  fontSize: 18
                }
              }}
              date={values.date}
              onDateChange={setFieldValue.bind(this, 'date')}
            />
          </View>
          <View style={{ marginLeft: 20,flex: 1, borderBottomWidth: 1 }}>
            <DatePicker
              mode='time'
              placeholder="Время"
              format="HH:mm"
              minDate={new Date()}
              confirmBtnText="Сохранить"
              cancelBtnText="Отмена"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderWidth: 0
                },
                dateText: {
                  fontSize: 18
                }
              }}
              date={values.time}
              onDateChange={setFieldValue.bind(this, 'time')}
            />
          </View>
        </TimeRow>
      </View>
      <ButtonView>
        <Button onPress={onSubmit} color="#2a86ff">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Редактировать ремонт</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const Input = styled.TextInput`
border-bottom-color: black;
border-bottom-width: 1px;
`;

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const TimeRow = styled.View`
  flex-direction: row;
`;

UpdateAppointmentScreen.navigationOptions = {
  title: 'Редактировать ремонт',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

export default UpdateAppointmentScreen;
