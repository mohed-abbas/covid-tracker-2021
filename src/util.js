import React from "react";
// import numeral from "numeral";
import { Circle, Popup } from "leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  // way one to do this
  // sortedData.sort((a,b)=> {
  //     if (a.cases > b.cases) {
  //         return -1;
  //     } else {
  //         return 1;
  //     }
  // });

  // short way of doing same
  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  return sortedData;
};

// export const showDataOnMap = (data, casesType = "cases") =>
//   data.map((country) => (
//     // <Circle
//     //   key={country.name}
//     //   center={[country.countryInfo.lat, country.countryInfo.long]}
//     //   color={casesTypeColors[casesType].hex}
//     //   fillColor={casesTypeColors[casesType].hex}
//     //   fillOpacity={0.4}
//     //   radius={
//     //     Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
//     //   }
//     // >
//       // <Popup>
//       //   <h1>im popup</h1>
//       // </Popup>
//     // // </Circle>
//     // <Circle
//     //   key={country.country}
//     //   center={[country.countryInfo.lat, country.countryInfo.long]}
//     // ></Circle>
//     //  console.log(country)
//   ));
