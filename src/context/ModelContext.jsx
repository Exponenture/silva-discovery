import React, { createContext, useContext, useState } from 'react'

export const defaults = {
  items: 160000, premium: 100, itemval: 20000, gap: 50,
  rate: 2, platform: 45000, dig: 30, silva: 3,
  monthly: 10000, vas: 7.5, dsplit: 60,
  premAdopt: 30, vasAdopt: 25
}

const ModelContext = createContext(null)

export function ModelProvider({ children }) {
  const [values, setValues] = useState(defaults)
  const set = (key, value) => setValues(v => ({ ...v, [key]: value }))
  const reset = () => setValues(defaults)
  return (
    <ModelContext.Provider value={{ values, set, reset }}>
      {children}
    </ModelContext.Provider>
  )
}

export function useModel() {
  return useContext(ModelContext)
}
