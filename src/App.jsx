import Mutation from "./components/Mutation";
import { useQuery } from "@tanstack/react-query";

function App() {
  const loadPosts = async () => {
    return fetch("http://localhost:5001/allPosts")
      .then((res) => res.json())
      .then((data) => data);
  };

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => loadPosts(),
  });
  console.log(data);

  return (
    <div>
      <Mutation posts={data} />
    </div>
  );
}

export default App;
