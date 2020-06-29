import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllExercises = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/exercises.json`)
    .then((resp) => {
      const allExercises = resp.data;
      const exercises = [];
      if (allExercises != null) {
        Object.keys(allExercises).forEach((exId) => {
          allExercises[exId].id = exId;
          exercises.push(allExercises[exId]);
        });
      }
      resolve(exercises);
    })
    .catch((err) => reject(err));
});

const getExerciseByTypeId = (typeId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/exercises.json?orderBy="typeId"&equalTo="${typeId}"`)
    .then((resp) => {
      const allExercises = resp.data;
      const exercises = [];
      if (allExercises != null) {
        Object.keys(allExercises).forEach((exId) => {
          allExercises[exId].id = exId;
          exercises.push(allExercises[exId]);
        });
      }
      resolve(exercises);
    })
    .catch((err) => reject(err));
});

const getSingleExercise = (exerciseId) => axios.get(`${baseUrl}/exercises/${exerciseId}.json`);

export default { getAllExercises, getExerciseByTypeId, getSingleExercise };
