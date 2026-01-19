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

import { Routes, Route, Navigate} from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../auth/PrivateRoute";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import ReportsSales from "../pages/ReportSales";
import ReportsAnalytics from "../pages/ReportAnalytics";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
            <Route index element={<Home />} />      {/* default page */}
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} /> 

            {/* Reports submenu */}
            <Route path="reports/sales" element={<ReportsSales />} />
            <Route path="reports/analytics" element={<ReportsAnalytics />} />
                
            </Route>
        </Routes>
    )
}