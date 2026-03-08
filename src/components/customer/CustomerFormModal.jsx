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
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";

const defaultGroups = [
  { group_id: 1, limit: "" },
  { group_id: 2, limit: "" },
  { group_id: 3, limit: "" },
  { group_id: 4, limit: "" },
  { group_id: 5, limit: "" },
];

export default function CustomerFormModal({ onClose, onSubmit, initialData }) {
    const { roles, loading: roleLoading } = useRole();

    const [form, setForm] = useState({
        uid: "",
        name: "",
        phone_number: "",
        role_id: "",
        limits: "",
        limit_group_device: defaultGroups
    });

    const [loading, setLoading] = useState(false);

    const mergeGroups = (data = []) =>
        defaultGroups.map((g) => {
        const found = data.find((x) => x.group_id === g.group_id);
        return found ? { ...found } : g;
        });

    useEffect(() => {
        setForm({
            uid: initialData?.uid || "",
            name: initialData?.name || "",
            phone_number: initialData?.phone_number || "",
            role_id: String(
                initialData?.role_id ??
                initialData?.role?.id ??
                ""
            ),
            limits: initialData?.limits || "",
            limit_group_device: mergeGroups(initialData?.limit_group_device),
        });
    }, [initialData]);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleGroupLimitChange = (index, value) => {
        setForm(prev => ({
            ...prev,
            limit_group_device: prev.limit_group_device.map((item, i) =>
                i === index
                    ? { ...item, limit: Number(value) }
                    : item
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit(
            {
                ...form,
                role_id: form.role_id ? Number(form.role_id) : null,
                limits: form.limits ? Number(form.limits) : null,
                limit_group_device: form.limit_group_device.map((g) => ({
                    group_id: g.group_id,
                    limit: g.limit === "" ? 0 : Number(g.limit),
                })),                
            });
            toast.success(
                initialData
                    ? "Pengguna berhasil diperbarui"
                    : "Pengguna berhasil ditambahkan"
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
            <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">{initialData ? "Edit Pengguna" : "Tambah Pengguna"}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="uid"
                        placeholder="Masukkan UID"
                        value={form.uid}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="name"
                        placeholder="Masukkan Nama"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="phone_number"
                        placeholder="Masukkan Nomor Telepon"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        type="tel"
                        required
                    />
                    <select
                        name="role_id"
                        value={form.role_id}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        disabled={roleLoading}
                    >
                        <option value="">
                            {roleLoading ? "Memuat Jabatan..." : "Pilih Jabatan"}
                        </option>

                        {roles?.map((role) => (
                            <option value={String(role.id)} key={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <input
                        name="limits"
                        placeholder="Masukkan Limit"
                        type="number"
                        min="0"
                        value={form.limits}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <div className="space-y-2 pt-2">
                        <p className="text-sm font-semibold">Limit Per Group</p>

                        {form.limit_group_device.map((group, index) => (
                        <div key={group.group_id} className="space-y-1">
                            <label className="text-xs text-gray-600">
                            Limit Grup {group.group_id}
                            </label>

                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={group.limit}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*$/.test(value)) {
                                handleGroupLimitChange(index, value);
                                }
                            }}
                            placeholder={`Masukkan limit group ${group.group_id}`}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        </div>
                        ))}
                    </div>

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