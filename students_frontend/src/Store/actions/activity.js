import {
  GET_ALL_STUDENTS,
  GET_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
 } from "./types";
 import axios from 'axios';
 import url from '../config';

 export const createNewStudent = (newStudent) => async(dispatch) => {
  try{
    const response = await axios.post(`${url}/student`, newStudent)
    if(response.data.uuid !== ''){
      newStudent['uuid'] = response.data.uuid
      dispatch({
        type: CREATE_STUDENT,
        payload: newStudent
      })
    }
  }
  catch(err){
    console.log('err', err)
    return err
  }
 }

 export const getAllStudents = () => async(dispatch) => {
   try{
     const response = await axios.get(`${url}/students`)
     dispatch({
       type: GET_ALL_STUDENTS,
       payload: response.data
     })
   }
   catch(err){
     return err
   }
 }

 export const getStudent = (id) => async(dispatch) => {
   try{
     const response = await axios.get(`${url}/student/${id}`)
     dispatch({
       type: GET_STUDENT,
       payload: response.data
     })
   }
   catch(err){
     return err
   }
 }

 export const updateStudent = (newStudent) => async(dispatch) => {
   try{
     const response = await axios.put(`${url}/student/${newStudent.uuid}`, newStudent)
     if(response.data.success){
      dispatch({
        type: UPDATE_STUDENT,
        payload: newStudent
      })
     }
   }
   catch(err){
     return err
   }
 }

 export const deleteStudent = (student) => async(dispatch) => {
   try{
    const response = await axios.delete(`${url}/student/${student.uuid}`)
    if(response.data.success){
      dispatch({
        type: DELETE_STUDENT,
        payload: student
      })
    }
   }
   catch(err){
     console.log(err)
     return err
   }
 }