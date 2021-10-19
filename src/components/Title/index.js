import React, { useContext, useState } from "react";
import { MoreVert } from "@material-ui/icons";
import ClickOutHandler from "react-onclickout";

import storeApi from "../../utils/storeApi";

import "./styles.scss";

export default function Title({ title, listId }) {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle, deleteList } = useContext(storeApi);

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen(!open);
  };

  return (
    <>
      {open ? (
        <div>
          <input
            type="text"
            className="input-title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onBlur={handleOnBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOnBlur();
              }
              return;
            }}
            autoFocus
          />
        </div>
      ) : (
        <div className="editable-title-container">
          <h2 onClick={() => setOpen(!open)} className="editable-title">
            {title}
          </h2>
          <button
            className="list-button"
            onClick={() => setOpenOptions(!openOptions)}
          >
            <MoreVert />
          </button>
          {openOptions && (
            <ClickOutHandler
              onClickOut={(e) => {
                setOpenOptions(!openOptions);
              }}
            >
              <ul className="menu-card">
                <li
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    deleteList(listId);
                  }}
                >
                  Delete list
                </li>
                <li
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpen(!open);
                  }}
                >
                  Edit card title
                </li>
              </ul>
            </ClickOutHandler>
          )}
        </div>
      )}
    </>
  );
}
