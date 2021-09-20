import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

export const LocalTasksContext = createContext()

const LocalTasksContextProvider = ({ children }) => {
  const [localTasks, setLocalTasks] = useState([])

  console.log('LocalTasksContext localTasks', localTasks)

  const value = {
    localTasks,
    setLocalTasks,
  }

  return (
    <LocalTasksContext.Provider value={value}>
      {children}
    </LocalTasksContext.Provider>
  )
}

LocalTasksContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LocalTasksContextProvider
