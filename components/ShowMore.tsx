"use client";

// Importation des types et des utilitaires nécessaires
import { ShowMoreProps } from "@/types";
import { CustomButton } from ".";

// Composant ShowMore pour afficher plus d'éléments
const ShowMore = ({ pageNumber, isNext, setDisplayCount }: ShowMoreProps) => {

  // Gestion de la navigation pour afficher plus d'éléments
  const handleNavigation = () => {
    // Calcul du nouveau nombre d'éléments à afficher
    const newDisplayCount = (pageNumber + 1) * 10;
    setDisplayCount(newDisplayCount);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {/* Affiche le bouton "Show More" uniquement s'il y a plus d'éléments à afficher */}
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Afficher plus"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
