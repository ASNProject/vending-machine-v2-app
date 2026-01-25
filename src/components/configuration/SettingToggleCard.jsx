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

import { HiCog } from "react-icons/hi";

export default function SettingToggleCard({ config, onToggle }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <HiCog className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 capitalize">
            {config.name.replace("_", " ")}
          </p>
          <p className="text-sm text-gray-500">
            Status: {config.status === 1 ? "Aktif" : "Nonaktif"}
          </p>
        </div>
      </div>

      <button
        onClick={() => onToggle(config)}
        className={`relative w-12 h-6 rounded-full transition ${
          config.status === 1 ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition ${
            config.status === 1 ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
