export const getGeoLocations = async (city) => {
  const geoCodingApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  // console.log("Input Value", city);

  const result = await fetch(geoCodingApiUrl); // console.log(await result.json());

  if (!result) {
    throw new Error("Geocoding Request Failed!");
  }
  const getApiData = await result.json(); //getApiData in json format
  const dataPosition = getApiData?.results[0]; //dataPosition array object
  // console.log(dataPosition);

  return {
    name: dataPosition.name,
    lat: dataPosition.latitude,
    lon: dataPosition.longitude,
  };
};
