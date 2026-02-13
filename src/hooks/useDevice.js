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
import {
  getDevice,
  postDevice,
  deleteDevice,
  updateDevice,
} from "../services/services";

export default function useDevice() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    last_page: 1,
    total: 0,
  });

  const PER_PAGE = 20;

  const loadDevices = async () => {
    setLoading(true);
    try {
      const res = await getDevice();
      const allData = res?.data?.data?.data || [];

      const total = allData.length;
      const lastPage = Math.ceil(total / PER_PAGE);

      const start = (page - 1) * PER_PAGE;
      const end = start + PER_PAGE;

      setDevices(allData.slice(start, end));
      setMeta({ last_page: lastPage, total });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, [page]);

  const addDevice = async (data) => {
    try {
      await postDevice(data);
      await loadDevices();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const editDevice = async (id, data) => {
    try {
      await updateDevice(id, data);
      await loadDevices();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeDevice = async (id) => {
    try {
      await deleteDevice(id);
      await loadDevices();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    devices,
    loading,
    addDevice,
    editDevice,
    removeDevice,
    reload: loadDevices,
    page,
    meta,
    goToPage: setPage,
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => p - 1),
  };
}
