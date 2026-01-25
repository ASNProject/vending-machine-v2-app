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

import SettingToggleCard from "../components/configuration/SettingToggleCard";
import useConfiguration from "../hooks/useConfiguration";

export default function Settings() {
  const { configs, loading, toggleStatus } = useConfiguration();

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">⚙️ Pengaturan</h2>
        <p className="mt-1 text-gray-600">
          Atur preferensi aplikasi di bawah ini
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Memuat pengaturan...</p>
      ) : configs.length === 0 ? (
        <div className="text-gray-500 italic">
          Tidak ada pengaturan tersedia
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {configs.map((config) => (
            <SettingToggleCard
              key={config.id}
              config={config}
              onToggle={toggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
