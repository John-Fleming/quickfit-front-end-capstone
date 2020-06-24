import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getSingleWorkout = (workoutId) => axios.get(`${baseUrl}/workouts/${workoutId}.json`);

const createWorkout = (newWorkout) => axios.post(`${baseUrl}/workouts.json`, newWorkout);

export default { createWorkout, getSingleWorkout };
