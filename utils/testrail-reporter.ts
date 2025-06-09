import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const testrail = axios.create({
  baseURL: `${process.env.TESTRAIL_URL}/index.php?/api/v2/`,
  auth: {
    username: process.env.TESTRAIL_USERNAME!,
    password: process.env.TESTRAIL_PASSWORD!,
  },
  headers: { 'Content-Type': 'application/json' },
});

export async function createTestRun(name: string, caseIds: number[]) {
  const res = await testrail.post(`add_run/${process.env.TESTRAIL_PROJECT_ID}`, {
    name,
    include_all: false,
    case_ids: caseIds,
  });
  return res.data.id;
}

export async function addResult(runId: number, caseId: number, statusId: number, comment: string) {
  await testrail.post(`add_result_for_case/${runId}/${caseId}`, {
    status_id: statusId,
    comment,
  });
}

export async function closeTestRun(runId: number) {
  await testrail.post(`close_run/${runId}`);
}
