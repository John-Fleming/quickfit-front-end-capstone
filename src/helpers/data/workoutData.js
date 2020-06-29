import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getAllWorkoutsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/workouts.json?orderBy="UID"&equalTo="${uid}"`)
    .then((resp) => {
      const allWorkouts = resp.data;
      const workouts = [];
      if (allWorkouts != null) {
        Object.keys(allWorkouts).forEach((wId) => {
          allWorkouts[wId].id = wId;
          workouts.push(allWorkouts[wId]);
        });
      }
      resolve(workouts);
    })
    .catch((err) => reject(err));
});

const getFavoriteWorkoutsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/workouts.json?orderBy="UID"&equalTo="${uid}"`)
    .then((resp) => {
      const allWorkouts = resp.data;
      const favWorkouts = [];
      if (allWorkouts != null) {
        Object.keys(allWorkouts).forEach((wId) => {
          allWorkouts[wId].id = wId;
          if (allWorkouts[wId].isFavorited) {
            favWorkouts.push(allWorkouts[wId]);
          }
        });
      }
      resolve(favWorkouts);
    })
    .catch((err) => reject(err));
});

const getSingleWorkout = (workoutId) => axios.get(`${baseUrl}/workouts/${workoutId}.json`);

const createWorkout = (newWorkout) => axios.post(`${baseUrl}/workouts.json`, newWorkout);

const updateFavoritedStatus = (workoutId, isFavorited) => axios.patch(`${baseUrl}/workouts/${workoutId}.json`, { isFavorited });

const updateRepsAndSets = (workoutId, reps, sets) => axios.patch(`${baseUrl}/workouts/${workoutId}.json`, { reps, sets });

const deleteSingleWorkout = (workoutId) => axios.delete(`${baseUrl}/workouts/${workoutId}.json`);

export default {
  getAllWorkoutsByUid,
  getFavoriteWorkoutsByUid,
  getSingleWorkout,
  createWorkout,
  updateFavoritedStatus,
  updateRepsAndSets,
  deleteSingleWorkout,
};
