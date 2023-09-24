"use client";
// Importation des bibliothèques et des composants nécessaires
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";
import { SearchBarProps } from "@/types";

// Composant SearchButton pour le bouton de recherche
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"loupe"}
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
);

// Composant SearchBar pour la barre de recherche
const SearchBar = ({ setManufacturer, setModel }: SearchBarProps) => {
  // États pour gérer la saisie utilisateur
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");

  const router = useRouter();

  // Gestion de la soumission du formulaire de recherche
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification des champs vides
    if (searchManufacturer.trim() === "" && searchModel.trim() === "") {
      return alert("Veuillez remplir la barre de recherche");
    }

    // Mise à jour des filtres de recherche
    setModel(searchModel);
    setManufacturer(searchManufacturer);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      {/* Première section de la barre de recherche */}
      <div className='searchbar__item'>
        {/* Composant SearchManufacturer pour sélectionner le fabricant */}
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        {/* Bouton de recherche (visible en mode mobile) */}
        <SearchButton otherClasses='sm:hidden' />
      </div>
      {/* Deuxième section de la barre de recherche */}
      <div className='searchbar__item'>
        {/* Icône de recherche de modèle de voiture */}
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='recherche de modèle de voiture'
        />
        {/* Champ de saisie pour le modèle de voiture */}
        <input
          type='text'
          name='searchModel'
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        {/* Bouton de recherche (visible en mode mobile) */}
        <SearchButton otherClasses='sm:hidden' />
      </div>
      {/* Bouton de recherche (visible en mode grand écran) */}
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
