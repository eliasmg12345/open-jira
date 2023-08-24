import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './';

interface Props {
     children: React.ReactNode;
}

export interface UIState {
     sidemenuOpen: boolean;
     isAddingEntry: boolean;
     isAddingSchedule: boolean;
     isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
     sidemenuOpen: false,
     isAddingEntry: false,
     isAddingSchedule: false,
     isDragging: false,
}

export const UIProvider: FC<Props> = ({ children }) => {

     const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

     const openSideMenu = () => {
          dispatch({ type: 'UI - Open Sidebar' });
     }

     const closeSideMenu = () => {
          dispatch({ type: 'UI - Close Sidebar' });
     }

     const setIsAddingEntry = (isAdding: boolean) => {
          dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding })
     }
     const setIsAddingSchedule = (isAdding: boolean) => {
          dispatch({ type: 'UI - Set isAddingSchedule', payload: isAdding })
     }

     const startDragging = () => {
          dispatch({ type: 'UI - Start Dragging' });
     }

     const endDragging = () => {
          dispatch({ type: 'UI - End Dragging' });
     }

     return (
          <UIContext.Provider value={{
               ...state,

               //methods
               openSideMenu,
               closeSideMenu,
               setIsAddingEntry,
               setIsAddingSchedule,

               endDragging,
               startDragging,
          }}>
               {children}
          </UIContext.Provider>
     );
}