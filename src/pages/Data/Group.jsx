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
import GroupTable from "../../components/group/GroupTable";
import useGroup from "../../hooks/useGroup";
import GroupFormModal from "../../components/group/GroupFormModal";
import Pagination from "../../components/common/Pagination";
import AddGroupProductModal from "../../components/group/AddGroupProductModal";

export default function Group() {
  const {
    groups,
    addGroup,
    editGroup,
    removeGroup,
    reload,
    page,
    meta,
    goToPage,
  } = useGroup();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openAddProduct, setOpenAddProduct] = useState(false);

  const handleAddProduct = (group) => {
    setSelectedGroup(group);
    setOpenAddProduct(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Daftar Grup</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Tambah Grup
        </button>
      </div>
      <GroupTable 
        groups={groups}
        page={page}
        perPage={20}
        onEdit={(data) => {
          setEditing(data);
          setOpenModal(true);
        }} 
        onDelete={(id) => {
          if (confirm("Yakin hapus data?")) {
            removeGroup(id);
          }
        }} 
        onAddProduct={handleAddProduct}
      ></GroupTable>
      <Pagination
        page={page}
        lastPage={meta.last_page}
        onPageChange={goToPage}
      ></Pagination>

      {openModal && (
        <GroupFormModal
          initialData={editing} 
          onClose={() => setOpenModal(false)}
          onSubmit={(data) => {
            editing
              ? editGroup(editing.id, data)
              : addGroup(data);
            setOpenModal(false);
          }}
        ></GroupFormModal>
      )}

      {openAddProduct && selectedGroup && (
        <AddGroupProductModal
          group={selectedGroup}
          onClose={() => setOpenAddProduct(false)}
          onSuccess={reload}
        />
      )}
    </div>
  );
}