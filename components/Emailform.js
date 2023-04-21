import ErrorHandler from "@/utils/ErrorHandler";

const Emailform = ({ formDatas, setFormDatas, isFormValid, handleSubmit }) => {
  const handleChange = (key, value) => {
    const error = ErrorHandler(key, value);
    const updatedFormDatas = [...formDatas];
    const inputToUpdate = updatedFormDatas.find(
      (item) => Object.keys(item)[0] === key
    );
    inputToUpdate[key].value = value;
    inputToUpdate[key].error = error;
    setFormDatas(updatedFormDatas);
  };
  return (
    <form
      className="flex flex-col items-center bg-gray-100 m-2 pt-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl py-4">Email Info</p>
      <div className="w-full px-4">
        {formDatas.map((formData, index) => {
          const key = Object.keys(formData)[0];
          const { type, placeholder, value, error } = formData[key];
          return (
            <div className="flex flex-col" key={index}>
              {type === "textarea" ? (
                <textarea
                  className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300 resize-none"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <input
                  className="bg-gray-200 px-3 py-1 outline-0 border-b-[1px] border-gray-300 hover:bg-gray-300 duration-300"
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
              {error && (
                <span className="text-red-400 text-sm pl-3">{error}</span>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="flex justify-center items-center gap-2 border-[0.5px] outline-0 w-48 mt-6 mb-3 p-1 rounded bg-zinc-800 text-gray-200 hover:bg-zinc-700 hover:text-white duration-300"
        type="submit"
        disabled={!isFormValid}
      >
        {/* {isGenerating ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating
          </>
        ) : (
          <span>Generate Email</span>
        )} */}
        Generate email
      </button>
    </form>
  );
};

export default Emailform;
