import { useState } from "react";

function App() {
  const [likes, setLikes] = useState<number>(0);
  return (
    <>
      <div className="flex center gap-3 w-screen h-screen items-center justify-evenly">
        <section>
          <a href="">Link One</a>
        </section>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setLikes(likes + 1)}
        >
          Likes <span>{likes}</span>
        </button>
        <section>
          <a href="">Link Two</a>
        </section>
      </div>
    </>
  );
}

export default App;
