import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

function InfiniteScrollOnButtonClick() {
  const loadTodos = async ({ pageParam }) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`
    );
    return data;
  };

  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: loadTodos,
    initialPageParam: 1,
    getNextPageParam: (
      lastPageData,
      allData,
      pageNumber
      // arrayOfPageNumber
    ) => {
      return lastPageData.length ? pageNumber + 1 : null;
    },
  });
  console.log(hasNextPage);
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
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        {hasNextPage ? "load more" : "end of the page"}
      </button>
    </div>
  );
}

export default InfiniteScrollOnButtonClick;
