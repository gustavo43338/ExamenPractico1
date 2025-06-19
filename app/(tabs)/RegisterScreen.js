import Checkbox from 'expo-checkbox';
import { useFormik } from 'formik';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

const RegistroForm = () => {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      correo: '',
      contrasena: '',
      confirmarContrasena: '',
      terminos: false,
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'Mínimo 3 caracteres')
        .required('Campo obligatorio'),
      correo: Yup.string()
        .email('Correo inválido')
        .required('Campo obligatorio'),
      contrasena: Yup.string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Campo obligatorio'),
      confirmarContrasena: Yup.string()
        .oneOf([Yup.ref('contrasena')], 'Las contraseñas no coinciden')
        .required('Campo obligatorio'),
      terminos: Yup.boolean()
        .oneOf([true], 'Debe aceptar los términos y condiciones'),
    }),
    onSubmit: values => {
      Alert.alert('Registro exitoso', `Bienvenido, ${values.nombre}`);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={formik.values.nombre}
        onChangeText={formik.handleChange('nombre')}
        onBlur={formik.handleBlur('nombre')}
      />
      {formik.touched.nombre && formik.errors.nombre && (
        <Text style={styles.error}>{formik.errors.nombre}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formik.values.correo}
        onChangeText={formik.handleChange('correo')}
        onBlur={formik.handleBlur('correo')}
      />
      {formik.touched.correo && formik.errors.correo && (
        <Text style={styles.error}>{formik.errors.correo}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={formik.values.contrasena}
        onChangeText={formik.handleChange('contrasena')}
        onBlur={formik.handleBlur('contrasena')}
      />
      {formik.touched.contrasena && formik.errors.contrasena && (
        <Text style={styles.error}>{formik.errors.contrasena}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={formik.values.confirmarContrasena}
        onChangeText={formik.handleChange('confirmarContrasena')}
        onBlur={formik.handleBlur('confirmarContrasena')}
      />
      {formik.touched.confirmarContrasena && formik.errors.confirmarContrasena && (
        <Text style={styles.error}>{formik.errors.confirmarContrasena}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={formik.values.terminos}
          onValueChange={value => formik.setFieldValue('terminos', value)}
        />
        <Text style={styles.checkboxLabel}>Aceptar términos y condiciones</Text>
      </View>
      {formik.touched.terminos && formik.errors.terminos && (
        <Text style={styles.error}>{formik.errors.terminos}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistroForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
