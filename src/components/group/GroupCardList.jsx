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

import GroupCard from "./GroupCard";

export default function GroupCardList({ groups, onCardClick }) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
        {groups.map((group) => (
            <GroupCard
            key={group.id}
            group={group}
            onClick={onCardClick}
            />
        ))}
        </div>
    );
}