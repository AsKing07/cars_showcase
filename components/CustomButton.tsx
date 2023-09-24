"use client";
// Importation des bibliothèques et des types nécessaires
import { CustomButtonProps } from '@/types';
import Image from 'next/image'

// Définition du composant CustomButton
const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon }: CustomButtonProps) => {
  return (
    <button
        disabled={false}
        type={btnType || "button"} // Type du bouton (par défaut "button")
        className={`custom-btn ${containerStyles}`} // Styles personnalisés pour le conteneur du bouton
        onClick={handleClick} // Fonction à exécuter lors du clic sur le bouton
    >

      <span className={`flex-1 ${textStyles}`}>
        {title} {/* Le texte du bouton */}
      </span>
      {rightIcon && ( // Affichage d'une icône à droite du texte si elle est définie
        <div className='relative w-6 h-6'>
          <Image 
            src={rightIcon}
            alt='icône'
            fill
            className='object-contain'
          />
        </div>
      )}

    </button>
  )
}

export default CustomButton;
