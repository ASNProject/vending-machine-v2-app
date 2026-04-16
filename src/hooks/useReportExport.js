import { useState } from "react";
import toast from "react-hot-toast";
import {
  exportTransactions,
  exportProducts,
  exportDevices,
  exportRoles,
  deleteAllTransactions,
} from "../services/services";

export default function useReportExport() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loadingType, setLoadingType] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [roleId, setRoleId] = useState("");

  const exportReport = async (type) => {
    if (!start || !end) {
      toast.error("Silakan pilih rentang tanggal terlebih dahulu");
      return;
    }

    try {
      setLoadingType(type);

      let response;

      const params = {
        start,
        end,
        ...(roleId && { role_id: roleId }), 
      };

      if (type === "transactions")
        response = await exportTransactions(params);

      if (type === "products")
        response = await exportProducts(params);

      if (type === "devices")
        response = await exportDevices(params);

      if (type === "roles")
        response = await exportRoles(params);

      // 🔥 DOWNLOAD FILE
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}_report.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Report berhasil di-export");
    } catch (error) {
      console.error(error);
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
    roleId,
    setStart,
    setEnd,
    setRoleId,
    loadingType,
    loadingDelete,
    exportReport,
    truncateTransactions,
  };
}