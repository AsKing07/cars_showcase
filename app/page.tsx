"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { fetchCars } from "@/utils";

import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";
import { CarState } from "@/types";

export default function Home() {
  // État pour stocker toutes les voitures
  const [allCars, setAllCars] = useState<CarState>([]);
  // État pour gérer le chargement
  const [loading, setLoading] = useState(true);

  // États de recherche
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState("");

  // États des filtres
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2023);

  // État de pagination côté client
  const [displayCount, setDisplayCount] = useState(10);

  // Fonction pour obtenir les voitures
  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2010,
        fuel: fuel || "",
        model: model || "",
      });

      setAllCars(result);
      setDisplayCount(10); // Reset display count when filters change
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour appeler getCars lorsque les états de filtre changent
  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, model]);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Catalogue de voitures</h1>
          <p>Explorez les voitures qui pourraient vous plaire</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className='home__filter-container'>
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section id="discover">
            <div className='home__cars-wrapper'>
              {allCars?.slice(0, displayCount).map((car, index) => (
                <CarCard key={`car-${index}`} car={car} />
              ))}
            </div>

            {/* Affichage d'un chargeur en cas de chargement */}
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain"/>
              </div>
            )}

            <ShowMore
              pageNumber={displayCount / 10}
              isNext={displayCount < allCars.length}
              setDisplayCount={setDisplayCount}
            />
          </section>
        ) : (
          // Affichage d'un message d'erreur en cas de résultats vides
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oups, pas de résultats...</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
