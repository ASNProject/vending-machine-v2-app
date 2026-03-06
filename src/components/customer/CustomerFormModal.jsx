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

export default function CustomerFormModal({ onClose, onSubmit, initialData }) {
    const { roles, loading: roleLoading } = useRole();

    const [form, setForm] = useState({
        uid: "",
        name: "",
        phone_number: "",
        role_id: "",
        limits: "",
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
        });
    }, [initialData]);

    const [loading, setLoading] = useState(false);

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
            await onSubmit(
                {
                    ...form,
                    role_id: form.role_id ? Number(form.role_id) : null,
                    limits: form.limits ? Number(form.limits) : null,
                }
            );
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
            <div className="bg-white rounded-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
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