"use client"

import { useState } from "react"

type TherapistStatus = "pending" | "approved" | "rejected"

interface Therapist {
  id: number
  name: string
  email: string
  address: string
  appliedDate: string
  status: TherapistStatus
}

const AdminDashboard = () => {
  const [pendingTherapists, setPendingTherapists] = useState<Therapist[]>([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      address: "123 Wellness St, New York, NY 10001",
      appliedDate: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "michael.chen@email.com",
      address: "456 Healing Ave, Los Angeles, CA 90210",
      appliedDate: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      address: "789 Therapy Blvd, Chicago, IL 60601",
      appliedDate: "2024-01-13",
      status: "pending",
    },
  ])

  const handleVerification = (id: number, action: TherapistStatus) => {
    setPendingTherapists((prev) =>
      prev.map((therapist) =>
        therapist.id === id ? { ...therapist, status: action } : therapist
      )
    )

    const therapist = pendingTherapists.find((t) => t.id === id)
    if (therapist) {
      const message =
        action === "approved"
          ? `Verification email sent to ${therapist.email}`
          : `Rejection email sent to ${therapist.email}`
      alert(message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-4 py-4 border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] bg-clip-text text-transparent">
            Admin Dashboard - SoulYatri
          </h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-600 hover:text-[#FF7B00] transition-colors text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Therapist Verification Requests
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Review and approve therapist applications
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  {["Therapist", "Contact", "Address", "Applied Date", "Status", "Actions"].map(
                    (label) => (
                      <th
                        key={label}
                        className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {label}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingTherapists.map((therapist) => (
                  <tr key={therapist.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {therapist.name}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{therapist.email}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {therapist.address}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{therapist.appliedDate}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          therapist.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : therapist.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {therapist.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {therapist.status === "pending" && (
                        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                          <button
                            onClick={() =>
                              handleVerification(therapist.id, "approved")
                            }
                            className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleVerification(therapist.id, "rejected")
                            }
                            className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
