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
import ProductTable from "../../components/product/ProductTable";
import useProduct from "../../hooks/useProduct";
import ProductFormModal from "../../components/product/ProductFormModal";
import Pagination from "../../components/common/Pagination";

export default function Product() {
  const {
    products,
    addProduct,
    editProduct,
    removeProduct,
    page,
    meta,
    goToPage,
  } = useProduct();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Daftar Produk</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Tambah Produk
        </button>
      </div>
      <ProductTable 
        products={products}
        page={page}
        perPage={20}
        onEdit={(data) => {
          setEditing(data);
          setOpenModal(true);
        }} 
        onDelete={(id) => {
          if (confirm("Yakin hapus data?")) {
            removeProduct(id);
          }
        }} 
      ></ProductTable>
      <Pagination
        page={page}
        lastPage={meta.last_page}
        onPageChange={goToPage}
      ></Pagination>

      {openModal && (
        <ProductFormModal
          initialData={editing} 
          onClose={() => setOpenModal(false)}
          onSubmit={(data) => {
            editing
              ? editProduct(editing.id, data)
              : addProduct(data);
            setOpenModal(false);
          }}
        ></ProductFormModal>
      )}
    </div>
  );
}