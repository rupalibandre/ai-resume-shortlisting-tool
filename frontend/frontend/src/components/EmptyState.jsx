function EmptyState({
  title = "No Data Found",
  description = "Nothing to display.",
}) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-16 text-center">

      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="text-gray-400 mt-4">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;