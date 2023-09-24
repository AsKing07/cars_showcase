"use client";
// Importation des bibliothèques et des types nécessaires
import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { manufacturers } from "@/constants";
import { SearchManuFacturerProps } from "@/types";

// Composant SearchManufacturer pour la sélection du fabricant
const SearchManufacturer = ({ selected, setSelected }: SearchManuFacturerProps) => {
  // État pour gérer la recherche dans la liste des fabricants
  const [query, setQuery] = useState("");

  // Filtrer la liste des fabricants en fonction de la recherche
  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className='search-selected'>
      {/* Combobox pour la sélection du fabricant */}
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative w-full'>
          {/* Bouton pour ouvrir le combobox */}
          <Combobox.Button className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='logo de voiture'
            />
          </Combobox.Button>

          {/* Champ de saisie pour la recherche */}
          <Combobox.Input
            className='search-manufacturer__input'
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Mettre à jour la requête de recherche lorsque le champ change
            placeholder='Volkswagen...'
          />

          {/* Transition pour afficher les options */}
          <Transition
            as={Fragment} // Groupe plusieurs éléments sans introduire de nœud DOM supplémentaire, c'est-à-dire <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")} // Réinitialise la requête de recherche après la transition
          >
            <Combobox.Options
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              static
            >
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className='search-manufacturer__option'
                >
                  Créer "{query}"
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Affiche une couleur de fond bleue active si l'option est sélectionnée */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
