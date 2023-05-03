import { useState } from "react";
import styles from "./weatherForm.module.css";

//onChangeCity es un props
export default function WeatherForm({ onChangeCity }) {
    //Estado para el input
    const [city, setCity] = useState('');

    //input-actualizamos el estado
    function onChange(e) {
        //Sacamos el valor
        const value = e.target.value;

        if (value != '') {
            //Actualizamos el valor
            setCity(value);
        }
    }

    //form
    function handleSubmit(e) {
        e.preventDefault();

        //Al presionar enter en nuestro input 
        //vamos a manadar a llamar a un props como si fuera una función
        onChangeCity(city);
    }

    return <form onSubmit={handleSubmit} className={styles.container}>
        <input type="text" onChange={onChange} className={styles.input} />
    </form>



}