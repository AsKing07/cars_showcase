"use client"

// Importation des bibliothèques et des types nécessaires
import { Fragment, useState } from "react";
import Image from "next/image";

import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@/types";

// Définition du composant CustomFilter
export default function CustomFilter<T>({ options, setFilter }: CustomFilterProps<T>) {
  // État pour stocker l'option sélectionnée
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Mettre à jour l'option sélectionnée dans l'état
          setFilter(e.value as unknown as T); // Mettre à jour l'option sélectionnée dans l'état
        }}
      >
        <div className='relative w-fit z-10'>
          {/* Bouton pour ouvrir la liste déroulante */}
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </Listbox.Button>

          {/* Transition pour afficher les options */}
          <Transition
            as={Fragment} // Groupe plusieurs éléments sans introduire de nœud DOM supplémentaire, c'est-à-dire <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {/* Parcours des options et affichage en tant qu'options de la liste déroulante */}
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
