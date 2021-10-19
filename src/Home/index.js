import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import InputContainer from "../components/InputContainer";
import List from "../components/List";

import store from "../utils/store";
import StoreApi from "../utils/storeApi";

import "./styles.scss";

const dataStorage = JSON.parse(window.localStorage.getItem("dataKanban"));

const initialState = () => {
  if (dataStorage) {
    return dataStorage;
  } else {
    window.localStorage.setItem("dataKanban", JSON.stringify(store));
    return store;
  }
};

export default function Home() {
  const [data, setData] = useState(initialState);

  const addMoreCard = (title, listId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  const addMoreList = (title) => {
    if (!title) {
      return;
    }

    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataKanban", JSON.stringify(newState));
  };
  return (
    <StoreApi.Provider
      value={{
        addMoreCard,
        addMoreList
      }}
    >
      <DragDropContext>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div
              className="wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.listIds.map((listId, index) => {
                const list = data.lists[listId];

                return <List list={list} key={listId} index={index} />;
              })}
              <div>
                <InputContainer type="list" />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StoreApi.Provider>
  );
}
