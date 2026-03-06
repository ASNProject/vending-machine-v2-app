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
import { createPortal } from "react-dom";
import useCustomer from "../../hooks/useCustomer";
import toast from "react-hot-toast";

export default function LimitGroupDeviceModal({
  customer,
  onClose,
  reload
}) {

  const { addLimitGroupDevice, updateLimitGroupDevice } = useCustomer();

  const [deviceId, setDeviceId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [limit, setLimit] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (!deviceId || !groupId || !limit) {
      alert("Semua field wajib diisi");
      return;
    }

    setLoading(true);

    try {

      const payload = {
        device_id: deviceId,
        group_id: groupId,
        limit: Number(limit)
      };

      const existing = customer.limit_group_device?.find(
        (item) =>
          String(item.device_id) === String(deviceId) &&
          String(item.group_id) === String(groupId)
      );

      if (existing) {

        await updateLimitGroupDevice(customer.uid, payload);
        toast.success("Limit grup berhasil diubah")

      } else {

        await addLimitGroupDevice(customer.uid, payload);
        toast.success("Limit grup berhasil ditambahkan")

      }
      await reload();
      onClose();

    } catch (err) {

      console.error(err);
      alert("Gagal menyimpan limit");

    } finally {

      setLoading(false);

    }

  };

  return createPortal(

    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >

      <div
        className="bg-white rounded-lg shadow-lg w-96 p-5"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-lg font-semibold mb-4">
          Limit Grup Pengguna
        </h2>

        <div className="space-y-3">

          <input
            type="text"
            placeholder="Masukkan ID Perangkat"
            className="w-full border px-3 py-2 rounded"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Masukkan ID Grup"
            className="w-full border px-3 py-2 rounded"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />

          <input
            type="number"
            placeholder="Masukkan Limit"
            className="w-full border px-3 py-2 rounded"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-2 mt-5">

          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            {loading ? "Saving..." : "Simpan"}
          </button>

        </div>

      </div>

    </div>,

    document.body
  );
}