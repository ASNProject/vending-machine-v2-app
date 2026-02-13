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
import {
  HiCollection,
  HiCube,
  HiChip,
  HiClock,
} from "react-icons/hi";

export default function GroupCard({ group, onClick }) {
    const getProgress = (products = [], limit = 0) => {
        if (!limit) return 0;
        return Math.min((products.length / Number(limit)) * 100, 100);
    }

    return (
        <div 
            onClick={() => onClick(group)}
        >
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 min-w-[250px] min-h-[250px]">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {group.group_name}
                    </h3>
                    <HiCollection className="w-6 h-6 text-blue-500"></HiCollection>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <HiCube className="w-4 h-4 text-green-500"></HiCube>
                        <span>
                            Produk: {" "}
                            <strong>
                            {Array.isArray(group.products)
                                ? group.products.length
                                : 0
                            }
                            </strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <HiChip className="w-4 h-4 text-purple-500"></HiChip>
                        <span>
                            Device ID: <strong>{group.device_id}</strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <HiCollection className="w-4 h-4 text-orange-500"></HiCollection>
                        <span>
                            Limit: <strong>{group.limits}</strong>
                        </span>
                    </div>
                </div>

                <div className="mt-3">
                    {Array.isArray(group.products) && group.products.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {group.products.slice(0, 5).map((product, index) => (
                        <span
                            key={`${product.product_id}-${index}`}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                        >
                            {product.product_name}
                        </span>
                        ))}
                        {group.products.length > 5 && (
                        <span className="text-xs text-gray-400">
                            +{group.products.length - 5} lainnya
                        </span>
                        )}
                    </div>
                    ) : (
                    <span className="text-xs text-gray-400 italic">
                        Tidak ada produk
                    </span>
                    )}
                </div>
{/* 
                <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Kapasitas</span>
                        <span>
                        {Array.isArray(group.products) ? group.products.length : 0}/{group.limits}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                        className="h-full bg-blue-500 transition-all"
                        style={{
                            width: `${getProgress(group.products || [], group.limits)}%`,
                        }}
                        />
                    </div>
                </div> */}

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <HiClock className="w-4 h-4"></HiClock>
                    <span>
                        Update: {" "}
                        {new Date(group.updated_at).toLocaleDateString()}   
                    </span>
                </div>
            </div>
        </div>
    )
}