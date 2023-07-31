import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData } from "./util.js";
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [TableData, setTableData] = useState([]);
  const [casesType, setCasesTypes] = useState("cases");
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCountries, setMapCountries] = useState([]);

  // "https://disease.sh/v3/covid-19/countries"

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

useEffect(() => {
  let isApiSubscribed = true;
  try {
    const testCountries = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json()

      const countries = data.map((country) => {
        return {
          name: country.country,
          value: country.countryInfo.iso2
        }
      })

      if (isApiSubscribed) { 
        setMapCountries(data)
      }
      setCountries(countries)
      setTableData(data)
    }
    testCountries()
    } catch (error) {
      console.log(error)
    }
    return () => {
      isApiSubscribed = false;
      // setMapCountries([])
    }
}, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url = countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

try {
  const response = await fetch(url)
  const data = await response.json();
  setCountry(countryCode);
  if (countryCode !== 'WorldWide') { 
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
  }
  setMapZoom(5);
  setCountryInfo(data);
  console.log(data);
} catch (error) {
  console.log(error.message)
}  
    
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> react covid tracker </h1>
          <FormControl className="app__dropdown">
            <Select
              value={country}
              variant="outlined"
              onChange={onCountryChange}
            >
              <MenuItem value="WorldWide"> World Wide </MenuItem>{" "}
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.name}> {country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="infoBox__container">
          <InfoBox
            title="Corono Virus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Total Corona Cases By countries </h3>
          <Table countries={TableData}></Table>
          <h3>World Wide cases graph</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

