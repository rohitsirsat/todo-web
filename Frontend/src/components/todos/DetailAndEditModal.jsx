import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ModalContainer from "../ModalContainer";
import Input from "../Input";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useTodo } from "../../context/TodoContext.jsx";
import toast from "react-hot-toast";
import { requestHandler } from "../../utils/requestHandler.js";
// import { TodoInterface } from "../../utils/constants.js";
import { editTodo } from "../../api/index.js";

const DetailAndEditModal = ({ onClose, todo }) => {
  const { todos, changeTodo } = useTodo();

  const [isEditing, setIsEditing] = useState(false);

  const [editLoading, setEditLoading] = useState(false);

  const inputRef = useRef(null);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (title.length < 1) {
      toast.error("Please Enter Valid Title !");
      return;
    }

    if (description.length < 1) {
      toast.error("Please Enter Valid Description !");
      return;
    }

    await requestHandler(
      async () => await editTodo(todo._id, { title, description }),
      setEditLoading,
      (res) => {
        const { data } = res;

        const result = todos?.map((todo) =>
          todo._id === data._id ? { ...data } : todo
        );
        changeTodo(result);
        toast.success(res.message);
        onClose();
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  useEffect(() => {
    setTitle(todo.title), setDescription(todo.setDescription);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <ModalContainer>
      <div className="relative border-[1px] bg-zinc-950 bg-opacity-95  border-white/75 flex flex-col items-center p-5 rounded-lg w-[95%] max-w-xl">
        <div
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-2xl p-2 transition-all rounded-md hover:bg-white hover:text-black"
        >
          <RxCross2 />
        </div>
        <h1 className="text-xl pb-2 border-b-2 sm:text-3xl md:text-4xl my-4 mb-8">
          {isEditing ? "Edit the task" : "Task Details"}
        </h1>

        {isEditing ? (
          <form onSubmit={onsubmit} className="flex flex-col gap-4 w-full">
            <Input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a Todo..."
            />
            <textarea
              className="bg-transparent rounded-xl focus:border-purple-500 outline-none border-[1px] px-5 py-3 text-base md:text-lg border-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter its Description..."
              rows={6}
            />

            <div className="mt-10 flex justify-around gap-4">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                severity="primary"
                className="bg-red-600 w-[40%] text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-[40%]"
                severity="primary"
                loading={editLoading}
              >
                <MdEdit />
                Edit
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4 w-full max-h-[75vh]">
            <h1 className="rounded-xl outline-none border-[1px] px-5 py-3 text-base md:text-lg border-white">
              {todo.title}
            </h1>

            <p className="rounded-xl overflow-auto outline-none border-[1px] px-5 py-3 text-base md:text-lg border-white">
              {todo.description}
            </p>

            <Button
              onClick={() => {
                setIsEditing(true);
              }}
              className="mt-10 mx-auto max-w-[400px]"
              fullWidth={true}
              severity="primary"
              loading={editLoading}
            >
              <MdEdit />
              Edit
            </Button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default DetailAndEditModal;
