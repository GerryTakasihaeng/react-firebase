import firebase, { database } from "../../config/firebase";
import {
  CHANGE_ISLOADING,
  CHANGE_ISLOGIN,
  CHANGE_USER,
  SET_VALUES
} from "./constants";

export function changeIsLoading(value) {
  return {
    type: CHANGE_ISLOADING,
    value
  };
}

export function changeIsLogin(value) {
  return {
    type: CHANGE_ISLOGIN,
    value
  };
}

export function changeUser(value) {
  return {
    type: CHANGE_USER,
    value
  };
}

export function setValues(value) {
  return {
    type: SET_VALUES,
    value
  };
}

export const registerUserAPI = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(changeIsLoading(true));
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("success", res);
        dispatch(changeIsLoading(false));
        resolve(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch(changeIsLoading(false));
        reject(false);
      });
  });
};

export const loginUserAPI = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(changeIsLoading(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log("success", res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshTokon: res.user.refreshToken
        };
        dispatch(changeIsLoading(false));
        dispatch(changeIsLogin(true));
        dispatch(changeIsLogin(dataUser));
        resolve(dataUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch(changeIsLogin(false));
        dispatch(changeIsLoading(false));
        reject(false);
      });
  });
};

export const addDataToAPI = ({ userId, title, content, date }) => (
  dispatch
) => {
  database.ref("notes/" + userId).push({
    title: title,
    content: content,
    date: date
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", (snapshot) => {
      console.log("Get data: ", snapshot.val());
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key]
        });
      });
      dispatch(setValues(data));
      resolve(snapshot.val());
    });
  });
};

export const updateDataFromAPI = ({ userId, noteId, title, content, date }) => (
  dispatch
) => {
  const urlNotes = database.ref(`notes/${userId}/${noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: title,
        content: content,
        date: date
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataFromAPI = ({ userId, noteId }) => (dispatch) => {
  const urlNotes = database.ref(`notes/${userId}/${noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
  });
};
