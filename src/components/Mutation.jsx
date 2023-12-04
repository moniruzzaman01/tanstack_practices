import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";

function Mutation({ posts }) {
  const insertPost = async (data) => {
    fetch("http://localhost:5001/dummy", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => data);
  };

  const mutation = useMutation({
    mutationFn: (data) => insertPost(data),
  });

  mutation.isSuccess ? console.log(`success`) : "";

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>slug</td>
            <td>action</td>
          </tr>
        </thead>
        {posts?.map((post, key) => (
          <tbody key={key}>
            <tr>
              <td>{post._id}</td>
              <td>{post.slug}</td>
              <td>
                <button onClick={() => mutation.mutate(post)}>click</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
Mutation.propTypes = {
  posts: PropTypes.object,
};

export default Mutation;
