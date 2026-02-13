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
  getGroup,
  postGroup,
  deleteGroup,
  updateGroup,
} from "../services/services";

export default function useGroup() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    last_page: 1,
    total: 0,
  });

  const PER_PAGE = 20;

  const loadGroups = async () => {
    setLoading(true);
    try {
      const res = await getGroup();
      const allData = res?.data?.data?.data || [];

      const total = allData.length;
      const lastPage = Math.ceil(total / PER_PAGE);

      const start = (page - 1) * PER_PAGE;
      const end = start + PER_PAGE;

      setGroups(allData.slice(start, end));
      setMeta({
        last_page: lastPage,
        total,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, [page]);

  const addGroup = async (data) => {
    try {
      await postGroup(data);
      await loadGroups();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const editGroup = async (id, data) => {
    try {
      await updateGroup(id, data);
      await loadGroups();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeGroup = async (id) => {
    try {
      await deleteGroup(id);
      await loadGroups();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    groups,
    loading,
    addGroup,
    editGroup,
    removeGroup,
    reload: loadGroups,
    page,
    meta,
    goToPage: (p) => setPage(p),
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => p - 1),
  };
}
