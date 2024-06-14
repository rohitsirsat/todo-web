import React from "react";
import { useTodo } from "../../context/TodoContext.jsx";
import Options from "../Options.jsx";
import Button from "../Button.jsx";
import { FaCirclePlus } from "react-icons/fa6";

const TabsHeader = ({
  openCreateTodoModal,
  selectedOption,
  setSelectedOption,
  query,
}) => {
  const { getFilteredTodos, todos } = useTodo();

  const optionsList = [
    {
      title: "All Todos",
      slug: "all",
    },
    {
      title: "Pending",
      slug: "pending",
    },
    {
      title: "Completed",
      slug: "completed",
    },
  ];

  return (
    <>
      <div className="w-full px-3 mt-10">
        <Button
          onClick={openCreateTodoModal}
          severity="primary"
          className="mx-auto w-full max-w-[500px]"
        >
          <FaCirclePlus />
          Create a new task
        </Button>
      </div>

      <div className="w-full flex justify-around max-w-[600px] gap-4 my-6">
        {optionsList.map((option) => (
          <Options
            isActive={selectedOption === option.slug}
            key={option.slug}
            title={option.title}
            count={option.slug === selectedOption ? todos.length : null}
            onClick={async () => {
              setSelectedOption(option.slug);
              let complete =
                option.slug === "pending"
                  ? false
                  : option.slug === "completed"
                  ? true
                  : null;
              await getFilteredTodos(query, complete);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TabsHeader;
