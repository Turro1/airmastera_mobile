import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// TODO: Сделать редактирование пациентов и приемов
// TODO: Сделать popup для приема в карте пациента (удаление, редактирование)
// TODO: Поправить стили для кнопок
// TODO: Сделать формулу зубов
// TODO: Сделать активный приём, чтобы он подсвечивался синим в списке приёмов.
// TODO: Сделать экран "формулу зубов".
// TODO: Если приём завершён, то подсвечивать конкретный зуб.
// TODO: После добавления пациента, перекидывать его на экран карты пациента.
// TOOD: Сделать опасити с затемнением при таче

import {
  HomeScreen,
  ClientScreen,
  AddClientScreen,
  AddCarScreen,
  AddAppointmentScreen,
  UpdateCarScreen,
  ClientsScreen,
  UpdateClientScreen,
  UpdateAppointmentScreen,
} from './screens';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Client: {
      screen: ClientScreen
    },
    AddClient: {
      screen: AddClientScreen
    },
    UpdateClient: {
      screen: UpdateClientScreen
    },
    AddCar: {
      screen: AddCarScreen
    },
    UpdateCar: {
      screen: UpdateCarScreen
    },
    AddAppointment: {
      screen: AddAppointmentScreen
    },
    UpdateAppointment: {
      screen: UpdateAppointmentScreen
    },
    Patients: {
      screen: ClientsScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
