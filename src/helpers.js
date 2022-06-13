import { toast } from 'react-toastify'

const request = async (url, method = 'GET', data = null) => {

  const notify = () => toast.error('Произошла ошибка при загрузке данных! Обновите страницу или попробуйте позже')

  try {
    const headers = {}
    let body

    if (data) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    })

    return response.json()

  } catch (error) {
    notify()
    console.log('ERROR >>', error.message)
  }
}

export { request }