/*
In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
Note del docente
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"
*/

async function getDashboardData(query) {

    const [destination, airports, weather] = await Promise.all([
        axios.get(`http://localhost:3333/destinations?search=${query}`),
        axios.get(`http://localhost:3333/airports?search=${query}`),
        axios.get(`http://localhost:3333/weathers?search=${query}`),
    ])
    return {
        city: destination.data[0].name,
        country: destination.data[0].country,
        airport: airports.data[0].name,
        temperature: weather.data[0].temperature,
        weather: weather.data[0].weather.description
    }
}

(async () => {

    try {

        const dashboard = await getDashboardData("London")
        console.log(dashboard)
    }

    catch (err) {
        console.error("errore nel recupero delle capitali", err)
    }

    finally {
        console.log("operazione terminata")
    }
}

)();