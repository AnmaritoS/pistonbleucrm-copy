import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import Card from "./Card";

function ColumnContainer({ column, cards }) {
  const tasksIds = useMemo(() => {
    return cards.map((task) => task.id);
  }, [cards]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-bunker-900
  w-[250px]
  rounded-md
  flex
  flex-col
  "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="
      bg-bunker-950
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-bunker-900
      border-4
      flex
      items-center
      justify-between
      "
      >
        <div className="flex gap-2">
          <div
            className="
        flex
        justify-center
        items-center
        bg-bunker-900
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            0
          </div>
          {column.title}
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {cards.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
