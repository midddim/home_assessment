import { Reporter, TestCase, TestResult, FullConfig, Suite } from '@playwright/test/reporter';
import { createTestRun, addResult, closeTestRun } from './testrail-reporter';

function extractCaseIds(test: TestCase): number[] {
    const idsFromAnnotations = test.annotations
        .filter(a => a.type === 'tag' && /^@C\d+$/i.test(a.description || ''))
        .map(a => Number((a.description || '').replace('@C', '')));

    const idsFromTitle = (test.title.match(/@C(\d+)/gi) || [])
        .map(m => Number(m.replace('@C', '')));

    return [...new Set([...idsFromAnnotations, ...idsFromTitle])];
}

class TestRailReporter implements Reporter {
    private runId: number | null = null;
    private caseIds: Set<number> = new Set();

    async onBegin(config: FullConfig, suite: Suite) {
        suite.allTests().forEach(test => {
            extractCaseIds(test).forEach(id => this.caseIds.add(id));
        });

        if (this.caseIds.size) {
            console.log(`🧪 Creating TestRail run with case IDs: ${Array.from(this.caseIds).join(', ')}`);
            this.runId = await createTestRun(
                `Playwright Run ${new Date().toISOString()}`,
                Array.from(this.caseIds)
            );
            console.log(`✅ TestRail run created: ID ${this.runId}`);
        } else {
            console.log('⚠️ No TestRail case IDs found in tests.');
        }
    }

    async onTestEnd(test: TestCase, result: TestResult) {
        if (!this.runId) return;

        const statusMap: Record<string, number> = {
            passed: 1,
            failed: 5,
            skipped: 2,
        };

        const statusId = statusMap[result.status] ?? 4;
        const comment = result.error?.message || '✅ Test passed';
        const ids = extractCaseIds(test);

        for (const id of ids) {
            console.log(`↪️ Reporting result for case @C${id}: status=${statusId}`);
            await addResult(this.runId, id, statusId, comment);
        }
    }

    async onEnd() {
        if (this.runId) {
            console.log(`🔚 Closing TestRail run ID ${this.runId}`);
            await closeTestRun(this.runId);
        }
    }
}

export default TestRailReporter;
