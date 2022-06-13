import { useEffect, useState } from "react"
import { request } from './../helpers'

const useData = url => {

  const [currentData, setCurrentData] = useState()

  useEffect(() => {
    const getData = async () => setCurrentData(await request(url))
    getData()
  }, [url])
  
  return currentData
}

export default useData