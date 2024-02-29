function Todo() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-3/4 sm:w-1/2 mt-8 flex flex-col flex-wrap items-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Create Todo</h1>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 w-full">
          <input
            type="text"
            placeholder="What you have planned to do?"
            className="input input-bordered w-full sm:w-3/4"
          />
          <button className="btn btn-neutral">Submit</button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Saved Todos</h2>
      </div>
    </div>
  );
}
export default Todo;
