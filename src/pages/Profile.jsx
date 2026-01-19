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

import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Profile</h2>
      <p className="mt-2 text-gray-600">Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
