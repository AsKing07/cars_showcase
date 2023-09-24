import { CarProps, FilterProps } from "@/types";

// Fonction pour calculer le tarif de location d'une voiture en fonction de la consommation en ville et de l'année
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Tarif de location de base par jour en dollars
  const mileageFactor = 0.1; // Tarif supplémentaire par mile parcouru
  const ageFactor = 0.05; // Tarif supplémentaire par année d'âge du véhicule

  // Calculer le tarif supplémentaire en fonction de la consommation en ville et de l'âge
  const tauxMileage = city_mpg * mileageFactor;
  const tauxAge = (new Date().getFullYear() - year) * ageFactor;

  // Calculer le tarif total de location par jour
  const tarifLocationParJour = basePricePerDay + tauxMileage + tauxAge;

  return tarifLocationParJour.toFixed(0);
};





// Fonction asynchrone pour récupérer des informations sur les voitures en fonction des filtres spécifiés
export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Définir les en-têtes requis pour la requête API
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Effectuer la requête API pour obtenir des informations sur les voitures
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Analyser la réponse en tant que JSON
  const resultat = await response.json();

  return resultat;
}



// Fonction pour générer l'URL de l'image d'une voiture en fonction de ses détails
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}
