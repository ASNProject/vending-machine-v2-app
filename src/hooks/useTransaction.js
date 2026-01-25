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
import { getTransaction } from "../services/services";

const PER_PAGE = 10;

export default function useTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    last_page: 1,
    total: 0,
  });

  const loadTransactions = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await getTransaction(pageNumber, PER_PAGE);
      const payload = res?.data?.data;

      if (payload?.data && Array.isArray(payload.data)) {
        setTransactions(payload.data);
        setMeta({
          last_page: payload.last_page || 1,
          total: payload.total || payload.data.length,
        });
      }

      else if (Array.isArray(payload)) {
        const total = payload.length;
        const lastPage = Math.ceil(total / PER_PAGE);

        const start = (pageNumber - 1) * PER_PAGE;
        const end = start + PER_PAGE;

        setTransactions(payload.slice(start, end));
        setMeta({
          last_page: lastPage,
          total,
        });
      }

      else {
        setTransactions([]);
        setMeta({
          last_page: 1,
          total: 0,
        });
      }

      setPage(pageNumber);
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
        "Gagal memuat data transaksi"
      );
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions(1);
  }, []);

  return {
    transactions,
    loading,
    page,
    meta,
    reload: () => loadTransactions(page),
    goToPage: loadTransactions,
    nextPage: () =>
      page < meta.last_page && loadTransactions(page + 1),
    prevPage: () =>
      page > 1 && loadTransactions(page - 1),
  };
}

