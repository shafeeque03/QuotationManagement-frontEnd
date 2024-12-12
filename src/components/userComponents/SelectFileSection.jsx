import React from 'react'

const SelectFileSection = ({CheckIcon,handleFileChange,file,setStep,removeFile}) => {
  return (
    <div>
        <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckIcon className="w-6 h-6 mr-2 text-green-500" />
                  Add File (Optional)
                </h2>
  
                {/* File Upload Section */}
                <div className="flex flex-col space-y-4">
                  <label
                    htmlFor="file"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Upload File:
                  </label>
                  <div className="relative flex items-center justify-center w-full h-36 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="file"
                      id="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      disabled={file.length >= 5}
                    />
                    <div className="flex flex-col items-center space-y-2">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3v18h18V3H3zm14 6l-5 5-5-5"></path>
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Drag & drop your file here, or{" "}
                        <span className="text-blue-500 underline cursor-pointer">
                          browse
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Supported formats: PNG, JPG, PDF, etc. Maximum 5 files.
                  </p>
                </div>
  
                {/* Selected Files List */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Selected Files:
                  </h3>
                  {file.length > 0 ? (
                    <ul className="space-y-2">
                      {file.map((val, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-300"
                        >
                          <span className="text-sm text-gray-700 truncate">
                            {val.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No files selected.</p>
                  )}
                </div>
              </div>
  
              {/* Navigation Buttons */}
              <div className="flex mt-3 justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  // disabled={file.length === 0}
                  className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                            disabled:opacity-50 hover:bg-indigo-600 transition"
                >
                  Next: Review
                </button>
              </div>
    </div>
  )
}

export default SelectFileSection