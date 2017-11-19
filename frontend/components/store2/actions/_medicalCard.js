const fetchDoctors = () => (dispatch) => {
  dispatch({
    type: 'FETCH_DOCTORS_ONLOAD'
  })

  axios.get('/api/v1/medical-card/list/doctors').then((response) => {
    dispatch({
      type: 'FETCH_DOCTORS_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    dispatch({
      type: 'FETCH_DOCTORS_ERROR',
      payload: error.response
    })
  })
}

const fetchPatients = () => (dispatch) => {
  dispatch({
    type: 'FETCH_PATIENTS_ONLOAD'
  })

  axios.get('/api/v1/medical-card/list/patients').then((response) => {
    dispatch({
      type: 'FETCH_PATIENTS_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    dispatch({
      type: 'FETCH_PATIENTS_ERROR',
      payload: error.response
    })
  })
}

const fetchMedicalCard = patientId => (dispatch) => {
  dispatch({
    type: 'FETCH_MEDICAL_CARD_ONLOAD'
  })

  axios.get(`/api/v1/medical-card/${patientId}`).then((response) => {
    dispatch({
      type: 'FETCH_MEDICAL_CARD_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    dispatch({
      type: 'FETCH_MEDICAL_CARD_ERROR',
      payload: error.response
    })
  })
}

const addMedicalCard = data => (dispatch) => {
  dispatch({
    type: 'ADD_MEDICAL_CARD_ONLOAD'
  })

  axios.post('/api/v1/medical-card', data).then((response) => {
    dispatch({
      type: 'ADD_MEDICAL_CARD_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    dispatch({
      type: 'ADD_MEDICAL_CARD_ERROR',
      payload: error.response
    })
  })
}

export { fetchPatients, fetchDoctors, addMedicalCard, fetchMedicalCard }
