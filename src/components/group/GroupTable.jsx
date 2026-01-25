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

import GroupRow from "./GroupRow";

export default function GroupTable({ groups, page, perPage, onEdit, onDelete, onAddProduct }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">No</th>
                        <th className="px-4 py-2 border">Grup</th>
                        <th className="px-4 py-2 border">Produk</th>
                        <th className="px-4 py-2 border">Limit</th>
                        <th className="px-4 py-2 border">Device</th>
                        <th className="pc-4 py-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-8 text-center text-gray-500 italic"
                            >
                                Belum ada data group
                            </td>
                        </tr>
                    ) : (
                        groups.map((group, index) => (
                            <GroupRow
                                key={group.id}
                                group={group}
                                index={index}
                                page={page}
                                perPage={perPage}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onAddProduct={onAddProduct}
                            ></GroupRow>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}