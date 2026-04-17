import { getAuthHeaders } from "./tenantApi";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

export const fetchAuditLogs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/audit-logs`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });
        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message || 'Failed to fetch audit logs');
        }
        return json.data || json;
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        throw error;
    }
}