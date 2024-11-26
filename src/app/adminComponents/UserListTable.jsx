import React from 'react'

const UserListTable = ({allUsers,isLoading,currentPage,usersPerPage}) => {
  return (
    <div className="mt-4">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th className="px-4 py-2 md:px-6 md:py-3">No</th>
                  <th className="px-4 py-2 md:px-6 md:py-3">User Name</th>
                  <th className="px-4 py-2 md:px-6 md:py-3">Login ID</th>
                  <th className="px-4 py-2 md:px-6 md:py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center">
                      <p>Loading...</p>
                    </td>
                  </tr>
                ) : allUsers.length > 0 ? (
                  allUsers.map((user, index) => (
                    <tr
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
                      key={user._id || index}
                      onClick={() =>
                        (window.location.href = `/admin/userdetails?userId=${user._id}`)
                      }
                    >
                      <th className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-700">
                        {(currentPage - 1) * usersPerPage + index + 1}
                      </th>
                      <td className="px-4 py-2 md:px-6 md:py-4">{user.name}</td>
                      <td className="px-4 py-2 md:px-6 md:py-4">
                        {user.loginId}
                      </td>
                      <td className="px-4 py-2 md:px-6 md:py-4">
                        {user.email}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center px-4 py-2">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default UserListTable