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

import { useMemo, useState } from "react";
import GroupCardList from "../components/group/GroupCardList";
import useGroup from "../hooks/useGroup";
import useDevice from "../hooks/useDevice";
import GroupSearch from "../components/group/GroupSearch";
import GroupDetailModal from "../components/group/GroupDetailModal";
import DeviceCardList from "../components/device/DeviceCardList";
import DeviceSearch from "../components/device/DeviceSearch";
import DeviceDetailModal from "../components/device/DeviceDetailModal";
import useTransaction from "../hooks/useTransaction";
import TransactionTable from "../components/transaction/TransactionTable";
import Pagination from "../components/common/Pagination";

export default function Home() {
  const { groups, loading } = useGroup();
  const { devices, loading: deviceLoading } = useDevice();
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [deviceSearch, setDeviceSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);

  const {
    transactions,
    loadingTransaction,
    page,
    meta,
    goToPage,
  } = useTransaction();


  const filteredGroups = useMemo(() => {
    return groups.filter((g) =>
      g.group_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [groups, search]);

  const filteredDevices = useMemo(() => {
    return devices.filter((d) =>
      d.device_name.toLowerCase().includes(deviceSearch.toLowerCase())
    );
  }, [devices, deviceSearch]);


  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Selamat Datang di Vending App V2!</h2>
        <p className="mt-2 text-gray-600">Atur seluruh kebutuhan Vending Machine disini.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">
          🖥️ Daftar Perangkat
        </h3>

        <DeviceSearch value={deviceSearch} onChange={setDeviceSearch} />

        {deviceLoading ? (
          <p className="text-gray-500">Memuat device...</p>
        ) : (
          <>
            <DeviceCardList
              devices={filteredDevices}
              onCardClick={setSelectedDevice}
            />

            {selectedDevice && (
              <DeviceDetailModal
                device={selectedDevice}
                onClose={() => setSelectedDevice(null)}
              />
            )}
          </>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">
          📦 Daftar Group
        </h3>
        <GroupSearch value={search} onChange={setSearch} />
        {loading ? (
          <p className="text-gray-500">Memuat data ...</p>
        ) : (
          <GroupCardList 
            groups={filteredGroups}
            onCardClick={setSelectedGroup}
          ></GroupCardList>
        )}
        {selectedGroup && (
          <GroupDetailModal
            group={selectedGroup}
            onClose={() => setSelectedGroup(null)}
          />
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">
          🧾 Riwayat Transaksi
        </h3>

        {loadingTransaction ? (
          <p className="text-gray-500">Memuat transaksi...</p>
        ) : (
          <>
            <TransactionTable
              transactions={transactions}
              page={page}
              perPage={10}
            />

            <Pagination
              page={page}
              lastPage={meta.last_page}
              onPageChange={goToPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
