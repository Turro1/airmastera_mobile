import React, { useState } from 'react';
import { Text, View, TextInput, Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

import { carsApi } from '../utils/api';

import { Button, Container } from '../components';

  const UpdateCarScreen = ({ navigation }) => {
    const [values, setValues] = useState({
      carname: navigation.getParam('car').carname,
      carmodel: navigation.getParam('car').carmodel,
      carnumber: navigation.getParam('car').carnumber,
      _id: navigation.getParam('car')._id
    });

    console.log(navigation.getParam('car').avatar)
  
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
      .update(values)
      .then(() => {
        navigation.navigate('Client');
      })
      .catch(e => {
        alert('BAD');
      });
  };

  return (
    <Container>
      <View style={{borderBottomWidth: 1 , marginLeft: 0 }} floatingLabel>
        <Text>Номер ТС</Text>
        <TextInput
          onChange={handleChange.bind(this, 'carnumber')}
          value={values.carnumber}
          dataDetectorTypes="carnumber"
          style={{ marginTop: 12 }}
        />
      </View>
      <ButtonView>
        <Button onPress={onSubmit} setIsLoading={true} color="#2a86ff">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Редактировать машину</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

UpdateCarScreen.navigationOptions = {
  title: 'Редактировать  машину',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default UpdateCarScreen;
