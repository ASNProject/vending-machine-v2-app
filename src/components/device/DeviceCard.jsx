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

import {
  HiChip,
  HiCollection,
  HiCube,
  HiClock,
} from "react-icons/hi";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

export default function DeviceCard({ device, onClick }) {
    const groups = Array.isArray(device.groups) ? device.groups : [];

    const getStatus = (groups = []) => {
    if (groups.length === 0) return { label: "Kosong", color: "gray" };
    const totalProducts = groups.reduce(
        (sum, g) => sum + (g.products?.length || 0),
        0
    );
    const totalLimit = groups.reduce(
        (sum, g) => sum + Number(g.limits || 0),
        0
    );
    if (totalProducts >= totalLimit) {
        return { label: "Penuh", color: "red" };
    }
    return { label: "Aktif", color: "green" };
    };

    const totalProducts = groups.reduce(
        (sum, g) => sum + (g.products?.length || 0),
        0
    );
    const totalLimit = groups.reduce(
        (sum, g) => sum + Number(g.limits || 0),
        0
    );

  const progress =
    totalLimit > 0
      ? Math.min((totalProducts / totalLimit) * 100, 100)
      : 0;

  const status = getStatus(groups);

  return (
    <div
      onClick={() => onClick?.(device)}
      className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl transition p-6 min-w-[380px]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {device.device_name}
        </h3>
        <HiChip className="w-8 h-8 text-purple-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <HiCollection className="w-4 h-4 text-blue-500" />
          <span>
            Group: <strong>{groups.length}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <HiCube className="w-4 h-4 text-green-500" />
          <span>
            Total Produk:{" "}
            <strong>
              {groups.reduce(
                (acc, g) => acc + (g.products?.length || 0),
                0
              )}
            </strong>
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {groups.length > 0 ? (
          groups.slice(0, 1).map((group) => (
            <div
              key={group.id}
              className="border rounded-lg p-3 text-sm bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {group.group_name}
                </span>
                <span className="text-xs text-gray-500">
                  {group.products?.length || 0}/{group.limits}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {Array.isArray(group.products) &&
                group.products.length > 0 ? (
                  <>
                    {group.products.slice(0, 4).map((p) => (
                      <span
                        key={p.product_id}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                      >
                        {p.product_name}
                      </span>
                    ))}
                    {group.products.length > 4 && (
                      <span className="px-2 py-1 text-xs text-gray-400 italic">
                        ...
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-gray-400 italic">
                    Tidak ada produk
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">
            Belum ada group terhubung
          </p>
        )}

        {groups.length > 1 && (
          <p className="text-xs text-gray-400 italic">
            +{groups.length - 1} group lainnya
          </p>
        )}
      </div>

      {/* <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Kapasitas</span>
          <span>
            {totalProducts}/{totalLimit}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div> */}

      <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
        <HiClock className="w-4 h-4" />
        <span>Update: {formatDate(device.updated_at)}</span>
      </div>
    </div>
  );
}
