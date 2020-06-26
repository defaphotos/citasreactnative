import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm,guardarCitasStorage}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const mostrarDatePicker = () => {
    setDatePickerVisible(true);
  };

  const ocultarDatePicker = () => {
    setDatePickerVisible(false);
  };

  const confimarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    ocultarDatePicker();
  };

  const mostrarTimePicker = () => {
    setTimePickerVisible(true);
  };

  const ocultarTimePicker = () => {
    setTimePickerVisible(false);
  };

  const confirmarHora = time => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    guardarHora(time.toLocaleString('en-US', opciones));
    ocultarTimePicker();
  };

  const crearCita = () => {
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      monstrarAlerta();
      return;
    }
    const cita = {
      id: shortid.generate(),
      paciente,
      propietario,
      telefono,
      fecha,
      hora,
      sintomas,
    };
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);
    guardarMostrarForm(false);
    guardarCitasStorage(JSON.stringify(citasNuevo));
  };

  const monstrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };
  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            onChangeText={texto => guardarPaciente(texto)}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            onChangeText={texto => guardarPropietario(texto)}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono Contacto:</Text>
          <TextInput
            onChangeText={texto => guardarTelefono(texto)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={mostrarDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confimarFecha}
            onCancel={ocultarDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={mostrarTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={ocultarTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput
            multiline
            onChangeText={texto => guardarSintomas(texto)}
            style={styles.input}
          />
        </View>
        <View>
          <TouchableHighlight onPress={() => crearCita()} style={styles.boton}>
            <Text style={styles.textoBoton}>Crear Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
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

export default Formulario;
