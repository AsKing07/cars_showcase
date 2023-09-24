"use client";
// Importation des bibliothèques et des fonctions nécessaires
import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

// Définition des propriétés attendues par le composant
interface CarCardProps {
  car: CarProps;
}

// Définition du composant CarCard
const CarCard = ({ car }: CarCardProps) => {
  // Extraction des informations pertinentes de l'objet "car"
  const { city_mpg, year, make, model, transmission, drive } = car;

  // État pour gérer l'ouverture/fermeture des détails de la voiture
  const [isOpen, setIsOpen] = useState(false);

  // Calcul du coût de location de la voiture
  const carRent = calculateCarRent(city_mpg, year);

  // Rendu du composant CarCard
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      {/* Affichage du coût de location par jour */}
      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/jour</span>
      </p>

      {/* Affichage de l'image de la voiture */}
      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={generateCarImageUrl(car)} alt='modèle de voiture' fill priority className='object-contain' />
      </div>

      {/* Affichage des icônes d'informations sur la voiture */}
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='transmission' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatique" : "Manuelle"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="siège" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="Réservoir" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        {/* Affichage du bouton "Voir Plus" */}
        <div className="car-card__btn-container">
          <CustomButton
            title='Voir Plus'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Affichage des détails de la voiture si isOpen est vrai */}
      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
