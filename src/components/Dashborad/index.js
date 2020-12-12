import React, { useEffect, useState, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI
} from "../../features/Auth/action";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const notesData = useSelector((state) => state.auth);
  console.log(notesData.notes);

  const [input, setInput] = useState({
    title: "",
    content: "",
    date: "",
    button: "Simpan",
    noteId: ""
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    dispatch(getDataFromAPI(userData.uid));
  }, [dispatch]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSaveNote = () => {
    const { title, content, button, noteId } = input;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
      noteId: noteId
    };

    if (button === "Simpan") {
      // console.log("data", data);
      dispatch(addDataToAPI(data));
    } else {
      // console.log(data);
      dispatch(updateDataFromAPI(data));
    }
  };

  const handleUpdate = (note) => {
    setInput({
      title: note.data.title,
      content: note.data.content,
      button: "Update",
      noteId: note.id
    });
  };

  const cancleUpdate = () => {
    setInput({
      title: "",
      content: "",
      button: "Simpan"
    });
  };

  const deleteNote = (e, note) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    e.stopPropagation();
    const data = {
      userId: userData.uid,
      noteId: note.id
    };
    dispatch(deleteDataFromAPI(data));
  };

  return (
    <div className="container">
      <div className="input-form">
        <input
          placeholder="title"
          className="input-title"
          onChange={(e) => handleChange(e, "title")}
          value={input.title}
        />
        <textarea
          placeholder="content"
          className="input-content"
          onChange={(e) => handleChange(e, "content")}
          value={input.content}
        />
        <div className="action-btn">
          {input.button === "Update" ? (
            <button className="save-btn cancle-btn" onClick={cancleUpdate}>
              Cancel
            </button>
          ) : null}
          <button className="save-btn" onClick={handleSaveNote}>
            {input.button}
          </button>
        </div>
      </div>
      {notesData.notes.length > 0 ? (
        <Fragment>
          {notesData.notes.map((note) => {
            return (
              <div
                className="card-content"
                key={note.id}
                onClick={() => handleUpdate(note)}
              >
                <p className="title">{note.data.title}</p>
                <p className="date">{note.data.date}</p>
                <p className="content">{note.data.content}</p>
                <div className="delete" onClick={(e) => deleteNote(e, note)}>
                  X
                </div>
              </div>
            );
          })}
        </Fragment>
      ) : null}
    </div>
  );
};

export default Dashboard;
