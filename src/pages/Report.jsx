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

import ExportCard from "../components/report/ExportCard";
import useReportExport from "../hooks/useReportExport";

export default function Reports() {
  const {
    start,
    end,
    setStart,
    setEnd,
    exportReport,
    loading,
    loadingDelete,
    truncateTransactions,
  } = useReportExport();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          📊 Laporan
        </h2>
        <p className="text-gray-500 mt-1">
          Export laporan dan kelola data transaksi
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-lg font-semibold mb-4">
          Pilih Rentang Tanggal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full mt-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full mt-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ExportCard
          title="🧾 Report Transaksi"
          description="Export semua transaksi"
          color="bg-blue-600 hover:bg-blue-700"
          onClick={() => exportReport("transactions")}
          loading={loading === "transactions"}
        />

        <ExportCard
          title="📦 Top Products"
          description="Export statistik produk"
          color="bg-green-600 hover:bg-green-700"
          onClick={() => exportReport("products")}
          loading={loading === "products"}
        />

        <ExportCard
          title="🖥 Device Usage"
          description="Export penggunaan device"
          color="bg-purple-600 hover:bg-purple-700"
          onClick={() => exportReport("devices")}
          loading={loading === "devices"}
        />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="text-red-700 font-semibold text-lg">
          ⚠ Hapus Semua Transaksi
        </h3>

        <p className="text-red-600 text-sm mt-1">
          Menghapus seluruh data transaksi secara permanen.
        </p>

        <button
          onClick={truncateTransactions}
          disabled={loadingDelete}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
        >
          {loadingDelete
            ? "Menghapus..."
            : "Reset Semua Transaksi"}
        </button>
      </div>
    </div>
  );
}