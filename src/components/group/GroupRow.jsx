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

import { HiPencilAlt, HiTrash } from "react-icons/hi";

export default function GroupRow({ group, index, page, perPage, onEdit, onDelete, onAddProduct }) {
    const rowNumber = (page - 1) * perPage + index + 1;
    
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-2 border text-center">{rowNumber}</td>
            <td className="px-4 py-2 border">{group.group_name}</td>
            <td className="px-4 py-2 border">
                {Array.isArray(group.products) && group.products.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                    {group.products.map((product) => (
                        <li key={product.product_id}>
                        {product.product_name}
                        </li>
                    ))}
                    </ul>
                ) : (
                    "-"
                )}
            </td>
            <td className="px-4 py-2 border">{group.limits}</td>
            <td className="px-4 py-2 border">{group.device.device_name}</td>
            <td className="px-4 py-2 border">{group.description}</td>
            <td className="px-4 py-2 border">
                <div className="flex justify-center gap-2">
                    <button
                    onClick={() => onAddProduct(group)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                    >
                    + Produk
                    </button>
                    <button
                        onClick={() => onEdit(group)}
                        className="flex items-center gap-1 px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm"
                    >
                    <HiPencilAlt className="w-4 h-4" />
                    Edit
                    </button>
                    <button
                        onClick={() => onDelete(group.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                    <HiTrash className="w-4 h-4" />
                    Hapus
                    </button>
                </div>
            </td>
        </tr>
    )
}