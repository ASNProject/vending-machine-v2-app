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
import DeviceTable from "../../components/device/DeviceTable";
import useDevice from "../../hooks/useDevice";
import DeviceFormModal from "../../components/device/DeviceFormModal";
import Pagination from "../../components/common/Pagination";

export default function Device() {
  const {
    devices,
    addDevice,
    editDevice,
    removeDevice,
    page,
    meta,
    goToPage,
  } = useDevice();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Daftar Perangkat</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Tambah Perangkat
        </button>
      </div>
      <DeviceTable 
        devices={devices}
        page={page}
        perPage={20}
        onEdit={(data) => {
          setEditing(data);
          setOpenModal(true);
        }} 
        onDelete={(id) => {
          if (confirm("Yakin hapus data?")) {
            removeDevice(id);
          }
        }} 
      ></DeviceTable>
      <Pagination
        page={page}
        lastPage={meta.last_page}
        onPageChange={goToPage}
      ></Pagination>

      {openModal && (
        <DeviceFormModal
          initialData={editing} 
          onClose={() => setOpenModal(false)}
          onSubmit={(data) => {
            editing
              ? editDevice(editing.id, data)
              : addDevice(data);
            setOpenModal(false);
          }}
        ></DeviceFormModal>
      )}
    </div>
  );
}