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
import { getConfiguration, postConfiguration } from "../services/services";

export default function useConfiguration() {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadConfigs = async () => {
    setLoading(true);
    try {
      const res = await getConfiguration();
      setConfigs(res?.data?.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (config) => {
    const previousStatus = config.status;
    const newStatus = previousStatus === 1 ? 0 : 1;

    setConfigs((prev) =>
      prev.map((c) =>
        c.id === config.id ? { ...c, status: newStatus } : c
      )
    );

    try {
      await postConfiguration({
        id: config.id,
        status: newStatus,
      });
    } catch (err) {
      console.error(err);

      setConfigs((prev) =>
        prev.map((c) =>
          c.id === config.id ? { ...c, status: previousStatus } : c
        )
      );
    }
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  return {
    configs,
    loading,
    toggleStatus,
    reload: loadConfigs,
  };
}
