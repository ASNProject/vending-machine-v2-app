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

export default function TransactionTable({ transactions, page, perPage }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">UID</th>
            <th className="px-4 py-2 border">Device</th>
            <th className="px-4 py-2 border">Group</th>
            <th className="px-4 py-2 border">Produk</th>
            <th className="px-4 py-2 border">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-gray-500"
              >
                Tidak ada data transaksi
              </td>
            </tr>
          ) : (
            transactions.map((trx, index) => (
              <tr key={trx.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">
                  {(page - 1) * perPage + index + 1}
                </td>
                <td className="px-4 py-2 border text-center">{trx.uid}</td>
                <td className="px-4 py-2 border text-center">{trx.device_name}</td>
                <td className="px-4 py-2 border text-center">
                  {trx.group?.group_name || "-"}
                </td>
                <td className="px-4 py-2 border text-center">
                  {trx.product?.product_name || "-"}
                </td>
                <td className="px-4 py-2 border text-center">
                  {new Date(trx.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
