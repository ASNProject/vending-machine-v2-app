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
import toast from "react-hot-toast";
import {
  importCustomerExcel,
  downloadCustomerTemplate
} from "../../services/services";

export default function CustomerImportModal({ onClose, reload }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      toast.error("Silakan pilih file terlebih dahulu");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await importCustomerExcel(formData);

      toast.success("Import customer berhasil");

      setFile(null);
      await reload();
      onClose();

    } catch (err) {

      console.error(err);

      toast.error(
        err?.response?.data?.message || "Import gagal"
      );

    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {

    try {

      const response = await downloadCustomerTemplate();

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "customer_template.xlsx");

      document.body.appendChild(link);
      link.click();

      link.remove();

    } catch (err) {

      console.error(err);

      toast.error("Gagal download template");

    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">

        <h2 className="text-lg font-semibold mb-4">
          Import Customer Excel
        </h2>

        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 block w-full text-sm"
        />

        {file && (
          <p className="text-xs text-gray-500 mb-2">
            File: {file.name}
          </p>
        )}

        <div className="flex justify-between gap-2">

          <button
            onClick={handleDownloadTemplate}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Download Template
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            disabled={loading}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Tutup
          </button>
        </div>

      </div>

    </div>
  );
}