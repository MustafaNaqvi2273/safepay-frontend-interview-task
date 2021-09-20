import {
  GET_ALL_STUDENTS,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
 } from '../actions/types';

 const initialState = {
   students : []
 }

 const activityReducer = (state = initialState, action) => {
   if(action.type === GET_ALL_STUDENTS){
    return {
      ...state,
      students: action.payload
    }
   }
   if(action.type === CREATE_STUDENT){
     let temp = state.students.map(item => ({...item}));
     temp.push(action.payload)
     return {
       ...state,
       students: temp
     }
   }
   if(action.type === UPDATE_STUDENT){
      let temp = state.students.map(item => ({...item}));
      const objIndex = temp.findIndex(obj => obj.uuid === action.payload.uuid)
      temp[objIndex] = {...action.payload}
    return {
      ...state,
      students: temp
    }
   }
   if(action.type === DELETE_STUDENT){
     let temp = state.students.map(item => ({...item}));
     const objIndex = temp.findIndex(obj => obj.uuid === action.payload.uuid)
     temp.splice(objIndex, 1)
     return{
       ...state,
       students: temp
     }
   }
   return state;
 }

 export default activityReducer;