import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, TextInput, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { appointmentsApi } from '../utils/api';
import { Button, Container } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddAppointmentScreen = ({ item ,navigation }) => {
  const [values, setValues] = useState({
    diagnosis: 'Задний правый',
    elNumber: 'Амортизатор',
    price: '400', 
    time: '09:30',
    date: "24.07.2022",
    car: navigation.getParam('carId')
  });

  console.log(navigation.getParam('carId'))

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFieldValue.bind(this, 'date')
    hideDatePicker();
  };

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
      .add(values)
      .then(() => {
        navigation.goBack()/*, { lastUpdate: new Date() })*/;
      })
      .catch(e => {
        if (e.response.data && e.response.data.message) {
          e.response.data.message.forEach(err => {
            const fieldName = err.param;
            alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
          });
        }
      });
  };

  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setTime(currentDate);
  
 
  let tempDate= new Date(currentDate);
  if(tempDate.getMinutes().toString().length == 1 && tempDate.getHours().toString().length == 1)
  {
  let fTime = '0'+tempDate.getHours() + ':0'+tempDate.getMinutes();
  values.time=fTime;
  }
  else if(tempDate.getHours().toString().length == 1){
    let fTime = '0'+tempDate.getHours() + ':'+tempDate.getMinutes();
  values.time=fTime;
  }
  else if(tempDate.getMinutes().toString().length == 1){
    let fTime = tempDate.getHours() + ':0'+tempDate.getMinutes();
  values.time=fTime;
  }
  else
  {
    let fTime = tempDate.getHours() + ':'+tempDate.getMinutes();
  values.time=fTime;
  }
};
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
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
      <View style={{ marginTop: 20, marginLeft: 0 }}>
        <Text>Цена</Text>
        <Input
          onChange={handleInputChange.bind(this, 'price')}
          placeholder='Цена'
          value={values.price}
          keyboardType="numeric"
          style={{ marginTop: 12 }}
        />
      </View>
      <View style={{ marginTop: 20, marginLeft: 0 }}>
      <Text>Дата</Text>
      <DateView onPress={showDatePicker}>
        <Text>{values.date.toString()}</Text>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        format="YYYY.MM.DD"
        onConfirm={setFieldValue.bind(this, 'date')}
        onCancel={hideDatePicker}
      />
      </DateView>
      </View>
     
      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Добавить ремонт</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const Input = styled.TextInput`

border-bottom-color: black;
border-bottom-width: 1px;
`;

const DateView = styled.TouchableOpacity`

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

AddAppointmentScreen.navigationOptions = {
  title: 'Добавить ремонт',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

export default AddAppointmentScreen;

/*<View style={{ marginTop: 20, marginLeft: 0 }}>
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
  <View style={{ marginLeft: 20,flex: 1}}>
  <View>
      <Text>{values.time}</Text>
    </View>
    <TouchableOpacity style={{borderBottomWidth: 1 }} onPress ={showTimepicker}>
    <View>
      <Text>clieck</Text>
    </View>
  {show && (
<DateTimePicker
  testID="dateTimePicker"
  value={time}
  mode={mode}
  is24Hour={true}
  display='clock'
  onChange={onChange}
/>
)}
</TouchableOpacity>
  </View>
</TimeRow>
</View>*/