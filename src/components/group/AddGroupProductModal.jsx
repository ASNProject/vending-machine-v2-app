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
import { addGroup } from "../../services/services";

export default function AddGroupProductModal({ group, onClose, onSuccess }) {
  const { products, loading } = useProduct();
  const [productId, setProductId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        await addGroup(group.id, {
            product_id: Number(productId),
        });
        onSuccess();
        onClose();
    } catch (err) {
        alert("Gagal menambahkan produk ke grup");
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-sm p-6">
        <h3 className="text-lg font-semibold mb-4">
          Tambah Produk ke {group.group_name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            disabled={loading}
          >
            <option value="">
              {loading ? "Memuat Produk..." : "Pilih Produk"}
            </option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}