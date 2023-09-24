"use client";
// Importation des bibliothèques et des fonctions nécessaires
import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { generateCarImageUrl } from "@/utils";
import { CarProps } from "@/types";

// Définition des propriétés attendues par le composant
interface CarDetailsProps {
  isOpen: boolean; // Indique si la boîte de dialogue est ouverte
  closeModal: () => void; // Fonction pour fermer la boîte de dialogue
  car: CarProps; // Informations sur la voiture à afficher
}

// Définition du composant CarDetails
const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => (
  <>
    {/* Transition et boîte de dialogue */}
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        {/* Transition pour l'arrière-plan de la boîte de dialogue */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            {/* Transition pour le contenu de la boîte de dialogue */}
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-out duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                {/* Bouton de fermeture */}
                <button
                  type='button'
                  className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                  onClick={closeModal}
                >
                  <Image
                    src='/close.svg'
                    alt='fermer'
                    width={20}
                    height={20}
                    className='object-contain'
                  />
                </button>

                {/* Contenu de la boîte de dialogue */}
                <div className='flex-1 flex flex-col gap-3'>
                  {/* Image principale de la voiture */}
                  <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                    <Image src={generateCarImageUrl(car)} alt='modèle de voiture' fill priority className='object-contain' />
                  </div>

                  {/* Images supplémentaires de la voiture */}
                  <div className='flex gap-3'>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                      <Image src={generateCarImageUrl(car, "29")} alt='modèle de voiture' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                      <Image src={generateCarImageUrl(car, "33")} alt='modèle de voiture' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                      <Image  src={generateCarImageUrl(car, "13")} alt='modèle de voiture' fill priority className='object-contain' />
                    </div>
                  </div>
                </div>

                {/* Informations détaillées sur la voiture */}
                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='font-semibold text-xl capitalize'>
                    {car.make} {car.model}
                  </h2>

                  {/* Affichage des détails de la voiture sous forme de liste */}
                  <div className='mt-3 flex flex-wrap gap-4'>
                    {Object.entries(car).map(([key, value]) => (
                      <div className='flex justify-between gap-5 w-full text-right' key={key} >
                        <h4 className='text-grey capitalize'>
                          {key.split("_").join(" ")} {/* Formatage du nom en remplaçant les underscores par des espaces */}
                        </h4>
                        <p className='text-black-100 font-semibold'>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
);

export default CarDetails;
