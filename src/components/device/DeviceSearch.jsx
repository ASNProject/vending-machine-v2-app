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

import { HiSearch } from "react-icons/hi";

export default function DeviceSearch({ value, onChange }) {
  return (
    <div className="relative max-w-md mb-3">
      <HiSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari perangkat..."
        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring"
      />
    </div>
  );
}
