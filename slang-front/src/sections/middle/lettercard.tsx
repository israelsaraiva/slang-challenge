import React, { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

enum ItemTypes {
  CARD = 'card',
}

interface DragItem {
  index: number;
  listIndex: number;
  type: string;
}

type Props = {
  index: number;
  listIndex: number;
  text: string;
  moveCard: (
    dragListIndex: number,
    hoverListIndex: number,
    dragIndex: number,
    hoverIndex: number
  ) => void;
};

const LetterCard = ({ index, listIndex, text, moveCard }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragListIndex = item.listIndex;
      const hoverListIndex = listIndex;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && dragListIndex === hoverListIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragListIndex, hoverListIndex, dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
      item.listIndex = hoverListIndex;
    },
  });

  drag(drop(ref));

  const divClass = `border rounded py-2 px-3 mx-2 ${
    isDragging ? 'dragging' : ''
  }`;

  return (
    <div ref={ref} className={divClass}>
      {text}
    </div>
  );
};

export default LetterCard;
