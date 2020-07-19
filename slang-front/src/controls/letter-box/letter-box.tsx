import './letter-box.scss';

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

enum ItemTypes {
  CARD = 'card',
}

type Props = {
  index: number;
  letter: string;
  listIndex: number;
  readonly?: boolean;
  inputChanged?: (value: number) => void;
  correct?: boolean;
  moveCard: (
    dragIndex: number,
    dragList: number,
    dropIndex: number,
    dropList: number
  ) => void;
};

const LetterDrag = ({
  index,
  letter,
  moveCard,
  listIndex,
  readonly,
  inputChanged,
  correct,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const canDrop = !letter || !letter.length;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, index, listIndex, letter },
    canDrag: !!letter.length,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (!dropResult) {
        return;
      }

      const {
        index: dropIndex,
        listIndex: dropListIndex,
        letter: dropLetter,
      } = dropResult;

      const canDrop = !dropLetter || !dropLetter.length;

      if (item && dropIndex !== null && dropIndex !== undefined && canDrop) {
        moveCard(index, listIndex, dropIndex, dropListIndex);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ index, listIndex }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const draggingClass = isDragging ? 'dragging' : '';
  const canDrag = !!letter.length ? 'can_drag' : '';
  const divClass = `letterdrag mx-2 ${draggingClass} ${canDrag}`;

  const correctionClass =
    correct !== undefined ? (correct ? 'success' : 'fail') : '';

  return (
    <div
      ref={ref}
      className={divClass}
      style={{
        backgroundColor: isOver && canDrop ? 'azure' : 'white',
        border: isOver && canDrop ? '3px dashed #dee2e6' : '',
      }}
    >
      <input
        id={`fillbox_${listIndex}${index}`}
        type='text'
        value={letter}
        className={`letterdrag_input ${
          canDrop ? 'can_drop' : ''
        } ${correctionClass}`}
        readOnly={!canDrop || readonly}
        maxLength={1}
        onChange={() => {}}
        onKeyDown={(e) => {
          if (inputChanged) {
            inputChanged(e.keyCode);
          }
        }}
      />
    </div>
  );
};

export default LetterDrag;
