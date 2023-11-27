import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Tanstack() {
  //   useEffect(() => {
  //     loadTodos();
  //   }, []);

  const loadTodos = async ({ pageParam }) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    );
    return data;
  };

  const { data, status, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: loadTodos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, a, b, c) => {
      console.log(lastPage, a, b, c);
      return b + 1;
    },
  });
  // console.log(data, status, error);

  if (status == "pending") {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const content = data.pages.map((todos) =>
    todos?.map((todo, i) => (
      <p style={{ backgroundColor: "tomato" }} key={i}>
        <span style={{ marginRight: "10px" }}>{todo.id}</span>
        {todo.title}
      </p>
    ))
  );

  return (
    <div>
      {content}
      <button onClick={fetchNextPage}>load more</button>
      {/* <InfiniteScroll
        dataLength={5} //This is important field to render the next data
        next={() => loadTodos({ pageParam: 2 })}
        hasMore={false}
        loader={<h4>Loading...</h4>}
      ></InfiniteScroll> */}
    </div>
  );
}

export default Tanstack;
