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
  refresh: null, 
  setRefresh: () => {},
  girarCarousel: null,
  setGirarCarousel: () => {}
});
