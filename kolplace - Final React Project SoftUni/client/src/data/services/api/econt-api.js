const ECONT_URL = 'https://ee.econt.com/services/Nomenclatures/NomenclaturesService';

const econtEndpoints = {
    getCities: ".getCities.json",
    getOffices: ".getOffices.json",
};

export const getAllCities = async () => {
    const cities = await fetch(ECONT_URL + econtEndpoints.getCities, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ countryCode: "BGR" })
    });

    return await cities.json();
};

export const getAllOfficesInCity = async (id) => {
    const cities = await fetch(ECONT_URL + econtEndpoints.getOffices, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ countryCode: "BGR", cityID: id })
    });

    return await cities.json();
};

