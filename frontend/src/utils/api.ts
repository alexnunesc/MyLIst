interface Task {
  title: string;
  userId: string;
  content: string;
  _id: string;
  date: string;
}

export const getResultApi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    }
  });

  const data = await response.json();

  const tasks = data?.filter((item: Task) => {
    return item.userId === localStorage.getItem("userId");
  });
  return tasks;
};
