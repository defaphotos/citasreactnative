import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  const guardarCitasStorage = async citasJSON => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => guardarMostrarForm(!mostrarForm)}
            style={styles.boton}>
            <Text style={styles.textoBoton}>
              {mostrarForm ? 'Ver citas' : 'Crear citas'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear nueva cita</Text>
              <Formulario
                guardarMostrarForm={guardarMostrarForm}
                citas={citas}
                setCitas={setCitas}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => {
                  return (
                    <Cita eliminarPaciente={eliminarPaciente} item={item} />
                  );
                }}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  boton: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
