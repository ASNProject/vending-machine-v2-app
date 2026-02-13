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

import { useEffect, useState } from "react";
import useDevice from "../../hooks/useDevice";
import toast from "react-hot-toast";

export default function GroupFormModal({ onClose, onSubmit, initialData }) {
    const { devices, loading: deviceLoading } = useDevice();

    const [form, setForm] = useState({
        group_name: "",
        limits: "",
        device_id: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm({
            group_name: initialData?.group_name || "",
            limits: initialData?.limits || "",
            device_id: String(
                initialData?.device_id ??
                initialData?.device?.id ??
                ""
            ),
        });
    }, [initialData]);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit(form);
            toast.success(
                initialData
                    ? "Grup berhasil diperbarui"
                    : "Grup berhasil ditambahkan"
            );
            onClose();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">{initialData ? "Edit Grup" : "Tambah Grup"}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="group_name"
                        placeholder="Masukkan Nama Grup"
                        value={form.group_name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="limits"
                        placeholder="Masukkan Limit"
                        value={form.limits}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <select
                        name="device_id"
                        value={form.device_id}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        disabled={deviceLoading}
                    >
                        <option value="">
                            {deviceLoading ? "Memuat Perangkat..." : "Pilih Perangkat"}
                        </option>

                        {Array.isArray(devices) && devices.map((device) => (
                        <option value={String(device.id)} key={device.id}>
                            {device.device_name}
                        </option>
                        ))}

                    </select>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}