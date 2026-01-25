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
import useProduct from "../../hooks/useProduct";

export default function ProductFormModal({ onClose, onSubmit, initialData }) {
    const { products, loading: productLoading } = useProduct();

    const [form, setForm] = useState({
        product_name: initialData?.product_name || "",
        keypad: initialData?.keypad || "",
        description: initialData?.description || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit(form);
            onClose();
            window.location.reload();
        } catch (err) {
            alert("Gagal menambahkan jabatan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">Tambah Produk</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="product_name"
                        placeholder="Masukkan Produk"
                        value={form.product_name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="keypad"
                        placeholder="Masukkan Keypad (Opsional)"
                        value={form.keypad}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Masukkan Deskripsi"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
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