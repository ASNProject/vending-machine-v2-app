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

import { HiX } from "react-icons/hi";

export default function GroupDetailModal({ group, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <HiX className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold mb-4">
          {group.group_name}
        </h3>

        <div className="space-y-2 text-sm">
          <p><strong>Limit:</strong> {group.limits}</p>
          <p><strong>Device:</strong> {group.device_id}</p>
          <p><strong>Deskripsi:</strong> {group.description || "-"}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Produk</h4>
          {Array.isArray(group.products) && group.products.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-sm">
              {group.products.map((p, index) => (
                <li key={`${p.product_id}-${index}`}>
                  {p.product_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Tidak ada produk</p>
          )}
        </div>
      </div>
    </div>
  );
}
