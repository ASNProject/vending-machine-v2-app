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

export default function ExportCard({
  title,
  description,
  color,
  onClick,
  loading,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border p-6 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">
          {title}
        </h4>
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        disabled={loading}
        className={`mt-6 text-white px-4 py-2 rounded-lg transition ${color} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? "Processing..." : "Export Excel"}
      </button>
    </div>
  );
}