import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Title from "../Title";
import Card from "../Card";
import InputContainer from "../InputContainer";

import "./styles.scss";

export default function List({ list, index }) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="list-cards" {...provided.dragHandleProps}>
            <div className="title-list">
              <Title title={list.title} listId={list.id} />
            </div>
            <div className="container-cards">
              <Droppable droppableId={list.id} type="task">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="card-container"
                  >
                    {list.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        listId={list.id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <InputContainer listId={list.id} type="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
}
