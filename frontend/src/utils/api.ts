interface Task {
  title: string;
  userId: string;
  content: string;
  _id: string;
  date: string;
}

export const getResultApi = async () => {
  const response = await fetch("http://localhost:3333/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    }
  });

  const data = await response.json();

  const tasks = data?.filter((item: Task) => {
    // console.log(item.userId);
    // console.log(localStorage.getItem("userId"));
    return item.userId === localStorage.getItem("userId");
  });
  console.log('apifunction', tasks);
  return tasks;
  // setTasks(tasks);
};
