import { useState, useEffect } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css';
import Loading from './loading';


export default function WeatherApp() {

    //Creamos un estado..weather va ser el estado respuesta de la 
    //solicitud http
    const [weather, setWeather] = useState(null);


    //Hook useEffect-efectos colaterales: 1-ejecutar código cuando
    //carga nuestra app 2-cada vez que existe un render de todo
    //el estado de nuestra app 3-cuando el componente de destruye

    //Ejecutamos la función loadInfo()
    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = `Wheather | ${weather?.location.name ?? ""}`;
    }, [weather]);

    //Función de solicitud http para obtener la info de 
    //nuestra API clima
    //city = 'london parametro por defecto'
    async function loadInfo(city = 'london') {
        try {
            const request = await fetch(
                `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
            );

            const json = await request.json();

            setTimeout(() => {
                //Guardamos la info
                setWeather(json);
            }, 2000);



            console.log(json);

        } catch (error) { }

    }

    //Esta función tiene la ciudad nueva
    function handleChangeCity(city) {
        {/*Se regresa el valor a nulo para borrar la info */ }
        setWeather(null);
        loadInfo(city);

    }

    return (<div className={styles.weatherContainer}>
        {/*Estructura base */}
        <WeatherForm onChangeCity={handleChangeCity} />
        {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}

    </div>
    );
}