import { StyleSheet, Text, TextInput, View,Button,Alert } from 'react-native'
import { Formik} from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import YupPassword from 'yup-password'
YupPassword(Yup)
const LoginScreen = ({navigation}) => {
    const [data,setData]=useState([])
        useEffect(()=>{
          fetch('https://635eaba3ed25a0b5fe4ae4de.mockapi.io/data', {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                })
                   .then((response) => response.json())
                   .then((data) => {
                      console.log(data);
                   })
                   .catch((err) => {
                      console.log(err.message);
                 });

        },[data])
    const loginValidationSchema = Yup.object().shape({
        name:Yup
          .string()
          .min(2,({min})=>`Name must be at least ${min} Character Long`)
          .max(12,({max})=>`Name must ont be longer then ${max} Character`)
          .required('Name is Required'),
          SurName:Yup
          .string()
          .min(2,({min})=>`SurName must be at least ${min} Character Long`)
          .required('SurName is Required'),
        email: Yup
          .string()
          .email("Please enter valid email")
          .required('Email Address is Required'),
        password: Yup
          .string()
          .min(8, ({ min }) => `Password must be at least ${min} characters Long`)
          .minUppercase(1, 'Must Contain at lease 1 Uppercase Latter')
          .minNumbers(1, 'Must Contain at least 1 number')
          .required('Password is required'),
      })
  return (
    <View style={styles.wraper}>
        <Formik
        validationSchema={loginValidationSchema}
        initialValues={{name:'',SurName:'', email: '', password: ''}}
        onSubmit={(values,actions) => {
            values.key=Math.random()
            setData((prevesData)=>{
                return [values]
            })
            actions.resetForm();
            navigation.navigate('Home')
          }}
      >
            {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            }) => (
            <>
                <Text style={styles.textStyle}>Enter Name:</Text>
                <TextInput
                name="name"
                placeholder="Name"
                style={styles.inputFiled}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                />
                {(errors.name && touched.name) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                }
                <Text style={styles.textStyle}>Enter Surname:</Text>
                <TextInput
                name="SurName"
                placeholder="SurName"
                style={styles.inputFiled}
                onChangeText={handleChange('SurName')}
                onBlur={handleBlur('SurName')}
                value={values.SurName}
                />
                {(errors.SurName&& touched.SurName) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.SurName}</Text>
                }
                <Text style={styles.textStyle}>Enter Email:</Text>
                <TextInput
                name="email"
                placeholder="Email Address"
                style={styles.inputFiled}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                />
                {(errors.email && touched.email) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                }
                <Text style={styles.textStyle}>Enter Password:</Text>
                <TextInput
                name="password"
                placeholder="Password"
                style={styles.inputFiled}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                />
                {(errors.password && touched.password) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                }
                <View style={{marginTop:10}}>
                <Button
                onPress={handleSubmit}
                title="Register"
                />
                </View>
            </>
            )}
        </Formik>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  wraper:{
    padding:20
  },
  textStyle:{
     fontSize:15,
     fontWeight:'bold'
    },
   inputFiled:{
    borderColor:'black',
    borderRadius:4,
    borderWidth:2,
    height:32,
    fontSize:20,
    marginTop:5,
    marginBottom:5
   },
})