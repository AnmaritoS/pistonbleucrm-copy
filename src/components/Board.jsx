import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "./Card";

const defaultCols = [
  {
    id: "recyler",
    title: "Recycler",
  },
  {
    id: "appeler",
    title: "Appeler",
  },
  {
    id: "qualifie",
    title: "Qualifié",
  },
  {
    id: "proposer",
    title: "Proposer",
  },
  {
    id: "negocier",
    title: "Negocier",
  },
  {
    id: "confirmer",
    title: "Confirmer",
  },
  {
    id: "close",
    title: "Closé",
  },
  {
    id: "perdu",
    title: "Perdu",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "appeler",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "appeler",
    content: "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "negocier",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "negocier",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "proposer",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "proposer",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "proposer",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "appeler",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "appeler",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "appeler",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "appeler",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "negocier",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "14",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "15",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "16",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "17",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "18",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "19",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "20",
    columnId: "negocier",
    content: "Design and implement responsive UI",
  },
  {
    id: "21",
    columnId: "appeler",
    content: "List admin APIs for dashboard",
  },
  {
    id: "22",
    columnId: "appeler",
    content: "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "23",
    columnId: "negocier",
    content: "Conduct security testing",
  },
  {
    id: "24",
    columnId: "negocier",
    content: "Analyze competitors",
  },
  {
    id: "25",
    columnId: "proposer",
    content: "Create UI kit documentation",
  },
  {
    id: "26",
    columnId: "proposer",
    content: "Dev meeting",
  },
  {
    id: "27",
    columnId: "proposer",
    content: "Deliver dashboard prototype",
  },
  {
    id: "28",
    columnId: "appeler",
    content: "Optimize application performance",
  },
  {
    id: "29",
    columnId: "appeler",
    content: "Implement data validation",
  },
];

function Board() {
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(defaultTasks);

  //   const [activeColumn, setActiveColumn] = (useState < Column) | (null > null);

  //   const [activeTask, setActiveTask] = (useState < Task) | (null > null);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="
        m-auto
        flex
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
    "
    >
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer key={col.id} column={col} cards={tasks.filter((task) => task.columnId === col.id)} />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} cards={tasks.filter((task) => task.columnId === activeColumn.id)} />}
            {activeTask && <Card task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(eventt) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default Board;
