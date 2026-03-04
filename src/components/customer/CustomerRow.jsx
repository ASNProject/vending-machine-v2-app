// Copyright 2026 ariefsetyonugroho
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { useState } from "react";
import { HiPencilAlt, HiTrash, HiEye } from "react-icons/hi";

export default function CustomerRow({ customer, index, page, perPage, onEdit, onDelete }) {
    const rowNumber = (page - 1) * perPage + index + 1;
    const [showDetail, setShowDetail] = useState(false);

    const limitData = customer.limit_group_device || [];
    
    return (
    <>
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border text-center">{rowNumber}</td>
            <td className="px-4 py-2 border">{customer.uid || "-"}</td>
            <td className="px-4 py-2 border">{customer.name || "-"}</td>
            <td className="px-4 py-2 border">{customer.phone_number || "-"}</td>
            <td className="px-4 py-2 border">{customer.role?.name || "-"}</td>
            <td className="px-4 py-2 border">{customer.limits || "-"}</td>
            <td className="px-4 py-2 border text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-600">
                        {limitData.length} groups
                    </span>

                    {limitData.length > 0 && (
                        <button
                            onClick={() => setShowDetail(true)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                        >
                            <HiEye className="w-4 h-4" />
                            Detail
                        </button>
                    )}
                </div>
            </td>
            <td className="px-4 py-2 border">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => onEdit(customer)}
                        className="flex items-center gap-1 px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm"
                    >
                    <HiPencilAlt className="w-4 h-4" />
                    Edit
                    </button>
                    <button
                        onClick={() => onDelete(customer.uid)}
                        className="flex items-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                    <HiTrash className="w-4 h-4" />
                    Hapus
                    </button>
                </div>
            </td>
        </tr>

        {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-96 shadow-lg">
            <h2 className="text-md font-semibold mb-3">
                Limit Group Device
            </h2>

            {/* Scrollable Area */}
            <div className="max-h-96 overflow-y-auto space-y-2 text-sm pr-1">
                {limitData.map((item, i) => (
                <div
                    key={i}
                    className="px-3 py-2 bg-gray-100 rounded"
                >
                    Device: {item.device_id} | Group: {item.group_id} | Sisa Limit: {item.limit}
                </div>
                ))}
            </div>

            <div className="mt-3 text-right">
                <button
                onClick={() => setShowDetail(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                >
                Tutup
                </button>
            </div>
            </div>
        </div>
        )}
    </>
    )
}