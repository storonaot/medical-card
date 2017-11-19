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

const updateDoctorsList = medCard => (dispatch) => {
  dispatch({
    type: 'UPDATE_DOCTORS_LIST',
    payload: medCard
  })
}

const updatePatientsList = medCard => (dispatch) => {
  dispatch({
    type: 'UPDATE_PATIENTS_LIST',
    payload: medCard
  })
}

const deletePatientFromList = cardId => (dispatch) => {
  dispatch({
    type: 'DELETE_PATIENT_FROM_LIST',
    payload: cardId
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

const deleteMedicalCard = doctorId => (dispatch) => {
  axios.delete(`/api/v1/medical-card/${doctorId}`).then((response) => {
    dispatch({
      type: 'DELETE_DOCTOR',
      payload: doctorId
    })
    console.log('deleteMedicalCard', response)
  }, (error) => {
    console.error('deleteMedicalCard err', error.response)
  })
}

export {
  fetchPatients, fetchDoctors, addMedicalCard, fetchMedicalCard,
  deleteMedicalCard, updateDoctorsList, updatePatientsList,
  deletePatientFromList
}
