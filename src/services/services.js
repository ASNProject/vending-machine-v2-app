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

import api from '../api/axios';
import * as endpoint from "../const/api_endpoint";

export const login = (data) => api.post(endpoint.login, data);
export const register = (data) => api.post(endpoint.register, data);
export const logout = () => api.post(endpoint.logout);
export const getProfile = () => api.get(endpoint.profile);
export const getCustomer = (page = 1, perPage = 20) => api.get(endpoint.customer, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postCustomer = (data) => api.post(endpoint.customer, data);
// TODO Soon
export const updateCustomer = (uid, data) =>
  api.put(`${endpoint.customer}/${uid}`, data);

export const deleteCustomer = (id) =>
  api.delete(`${endpoint.customer}/${id}`);

export const getRole = (page = 1, perPage = 20) => api.get(endpoint.role, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postRole = (data) => api.post(endpoint.role, data);
export const updateRole= (id, data) =>
  api.put(`${endpoint.role}/${id}`, data);
export const deleteRole = (id) =>
  api.delete(`${endpoint.role}/${id}`);

export const getGroup = (page = 1, perPage = 20) => api.get(endpoint.group, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postGroup = (data) => api.post(endpoint.group, data);
export const updateGroup = (id, data) =>
  api.put(`${endpoint.group}/${id}`, data);
export const deleteGroup = (id) =>
  api.delete(`${endpoint.group}/${id}`);
export const addGroup = (groupId, data) => api.post(endpoint.addGroup(groupId), data);
export const getProduct = (page = 1, perPage = 20) => api.get(endpoint.product, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postProduct = (data) => api.post(endpoint.product, data);
export const updateProduct = (id, data) =>
  api.put(`${endpoint.product}/${id}`, data);
export const deleteProduct = (id) =>
  api.delete(`${endpoint.product}/${id}`);
export const getDevice = (page = 1, perPage = 20) => api.get(endpoint.device, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postDevice = (data) => api.post(endpoint.device, data);
export const updateDevice = (id, data) =>
  api.put(`${endpoint.device}/${id}`, data);
export const deleteDevice = (id) =>
  api.delete(`${endpoint.device}/${id}`);
export const getTransaction = (page = 1, perPage = 20) => api.get(endpoint.transactionv2, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postTransaction = (data) => api.post(endpoint.transaction,data);
export const getConfiguration = (page = 1, perPage = 20) => api.get(endpoint.configuration, {
    params: {
        page,
        per_page: perPage,
    }
});
export const postConfiguration = (data) => api.get(endpoint.configuration, data);  

export const exportTransactions = (params) =>
  api.get(endpoint.reportTransactionsExport, {
    params,
    responseType: "blob",
  });

export const exportProducts = (params) =>
  api.get(endpoint.reportProductsExport, {
    params,
    responseType: "blob",
  });

export const exportDevices = (params) =>
  api.get(endpoint.reportDevicesExport, {
    params,
    responseType: "blob",
  });

export const deleteAllTransactions = () =>
  api.delete(endpoint.truncateTransactions);