// src/context/themeContext.js
import { createContext } from "react";

export const CurrentContext = createContext({
  setShowModelRegister: () => {},
  showModelRegister: false, // Inicializa como false
  setShowSpan: () => {},
  showSpan: null,
  setNumberHistory: () => {},
  numberHistory: null,
  setHistDados: () => {},
  histDados: null,
  setListaDouble: () =>{},
  listaDouble: null,
  setRefresh: () => {},
  refresh: null, 
  setGirarCarousel: () => {},
  girarCarousel: null,
   
  setAssociacoes: ()=>{},
  associacoes: null, 
  setTrava: () =>{},
  trava: null,

  setValue: () => {},
  value: null,
  setUpdateValueState: ()=>{},
  updateValueState: null,

  setApostouState: () =>{},
  apostouState: null,
  
  setColorState: () => {},
  colorState: null
});
