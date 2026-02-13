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
  exportTransactions,
  exportProducts,
  exportDevices,
  deleteAllTransactions,
} from "../services/services";

export default function useReportExport() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loadingType, setLoadingType] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const exportReport = async (type) => {
    if (!start || !end) {
      toast.error("Silakan pilih rentang tanggal terlebih dahulu");
      return;
    }

    try {
      setLoadingType(type);

      let response;

      const params = { start, end };

      if (type === "transactions")
        response = await exportTransactions(params);
      if (type === "products")
        response = await exportProducts(params);
      if (type === "devices")
        response = await exportDevices(params);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${type}_report.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Report berhasil di-export");
    } catch (error) {
      toast.error("Gagal export report");
    } finally {
      setLoadingType(null);
    }
  };

  const truncateTransactions = async () => {
    const confirmation = prompt(
      "Ketik DELETE untuk menghapus seluruh transaksi"
    );

    if (confirmation !== "DELETE") {
      toast.error("Konfirmasi tidak valid");
      return;
    }

    try {
      setLoadingDelete(true);

      await deleteAllTransactions();

      toast.success(
        "Semua data transaksi berhasil dihapus"
      );
    } catch (error) {
      toast.error("Gagal menghapus transaksi");
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    start,
    end,
    setStart,
    setEnd,
    loadingType,
    loadingDelete,
    exportReport,
    truncateTransactions,
  };
}