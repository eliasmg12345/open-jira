import { createContext } from 'react';

interface ContextProps {
     sidemenuOpen: boolean;
     isAddingEntry: boolean;
     isAddingSchedule: boolean;
     isDragging: boolean;

     //methods
     openSideMenu: () => void
     closeSideMenu: () => void

     setIsAddingEntry: (isAdding: boolean) => void
     setIsAddingSchedule: (isAdding: boolean) => void

     endDragging: () => void
     startDragging: () => void
}

export const UIContext = createContext({} as ContextProps)