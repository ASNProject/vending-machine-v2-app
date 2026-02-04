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

import CustomerRow from "./CustomerRow";

export default function CustomerTable({ customers, page, perPage, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">No</th>
                        <th className="px-4 py-2 border">UID</th>
                        <th className="px-4 py-2 border">Nama</th>
                        <th className="px-4 py-2 border">Nomor Telepon</th>
                        <th className="px-4 py-2 border">Jabatan</th>
                        <th className="px-4 py-2 border">Limit</th>
                        <th className="pc-4 py-2 border">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-8 text-center text-gray-500 italic"
                            >
                                Belum ada data pengguna
                            </td>
                        </tr>
                    ) : (
                        customers.map((customer, index) => (
                            <CustomerRow
                                key={customer.uid}
                                customer={customer}
                                index={index}
                                page={page}
                                perPage={perPage}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            ></CustomerRow>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}