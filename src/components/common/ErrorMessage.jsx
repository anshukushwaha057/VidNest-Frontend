const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-3 text-red-400 text-sm bg-red-500/10 border border-red-500 p-2 rounded text-center">
      {message}
    </div>
  );
};

export default ErrorMessage;