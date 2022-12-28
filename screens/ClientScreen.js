import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import { Foundation, Ionicons } from '@expo/vector-icons';

import {
  GrayText,
  Button,
  Badge,
  Container,
  Appointment,
  PlusButton,
  CarButton
} from '../components';
import { phoneFormat } from '../utils';
import {clientsApi, appointmentsApi, carsApi } from '../utils/api';
import { ScrollView } from 'react-native-gesture-handler';


const ClientScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCars = () => {
    const id = navigation.getParam('client')._id;
    clientsApi
      .show(id)
      .then(({ data }) => {
        setCars(data.data.cars);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const fetchCarss = () => {
    const id = navigation.getParam('client')._id;
    clientsApi
      .show(id)
      .then(({ data }) => {
        setCars(data.data.cars);
      })
      .catch(() => {
      });
  };

  useEffect(fetchCars, []);

  const removeAppointment = id => {
    Alert.alert(
      'Удаление авто',
      'Вы действительно хотите удалить авто?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Удалить',
          onPress: () => {
            setIsLoading(true);
            carsApi
              .remove(id)
              .then(() => {
                fetchCars();
              })
              .catch(() => {
                setIsLoading(false);
              });
          }
        }
      ],
      { cancelable: false }
    );
  };

  setTimeout(() => {
    fetchCarss();
}, 2000);

  return (
    <View style={{ flex: 1 }}>
      <ClientDetails>
        <ClientFullname>
          {navigation.getParam('client', {}).fullname}
        </ClientFullname>
        <GrayText>
          {phoneFormat(navigation.getParam('client', {}).phone)}
        </GrayText>

        <ClientButtons>
          <FormulaButtonView>
            <Button onPress={navigation.navigate.bind(this, 'AddCar', {
          clientId: navigation.getParam('client', {})._id
        })}>Добавить машину</Button>
          </FormulaButtonView>
          <PhoneButtonView>
            <Button
              onPress={() =>
                Linking.openURL(
                  'tel:' + navigation.getParam('client', {}).phone
                )
              }
              color="#84D269"
            >
              <Foundation name="telephone" size={22} color="white" />
            </Button>
          </PhoneButtonView>
        </ClientButtons>
      </ClientDetails>

      <ClientAppointments>
      <ScrollView>
        
          {isLoading ? (
            <ActivityIndicator size="large" color="#2A86FF" />
          ) : (
            cars.map(car => (
              
              <AppointmentCard key={car._id}>
                <Swipeable
              rightButtons={[
                <SwipeViewButton 
                onPress={navigation.navigate.bind(this, 'UpdateCar', {
                  car: car
                })}
                style={{ backgroundColor: '#B4C1CB' }}>
                  <Ionicons name="md-create" size={28} color="white" />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={removeAppointment.bind(this,car._id)}
                  style={{ backgroundColor: '#F85A5A' }}
                >
                  <Ionicons name="ios-close" size={48} color="white" />
                </SwipeViewButton>
              ]}
            >
              <CarButton navigate={navigation.navigate} item={car} ></CarButton>
            </Swipeable>
              </AppointmentCard>
              
            ))
            )}
            
        </ScrollView>
      </ClientAppointments>
    </View>
  );
};

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  width: 32px;
`;

const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

const AppointmentCard = styled.View`

`;

const ClientDetails = styled(Container)`
  flex: 0.3;
`;

const ClientAppointments = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const FormulaButtonView = styled.View`
  flex: 1;
`;

const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`;

const ClientButtons = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
`;

const ClientFullname = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

ClientScreen.navigationOptions = {
  title: 'Карта клиента',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

export default ClientScreen;
