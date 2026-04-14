// 🔒 NexRender Premium Features Module
class NexRenderPremium {
    constructor(licenseKey) {
        this.licenseKey = licenseKey;
        this.isValid = false;
        this.tier = 'free';
        this.limits = {
            free: {
                renderJobsPerDay: 10,
                maxResolution: '1920x1080',
                concurrentJobs: 1,
                cloudStorage: false,
                priorityQueue: false,
                advancedAnalytics: false,
                apiAccess: false
            },
            pro: {
                renderJobsPerDay: 500,
                maxResolution: '4096x2160',
                concurrentJobs: 5,
                cloudStorage: true,
                priorityQueue: true,
                advancedAnalytics: true,
                apiAccess: true,
                customPlugins: true,
                distributedRendering: false
            },
            enterprise: {
                renderJobsPerDay: Infinity,
                maxResolution: '8192x4320',
                concurrentJobs: 20,
                cloudStorage: true,
                priorityQueue: true,
                advancedAnalytics: true,
                apiAccess: true,
                customPlugins: true,
                distributedRendering: true,
                dedicatedSupport: true,
                customIntegrations: true
            }
        };
        this.validate();
    }

    async validate() {
        try {
            const response = await fetch('/api/validate-license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ licenseKey: this.licenseKey })
            });

            const result = await response.json();
            this.isValid = result.valid;
            this.tier = result.tier || 'free';
        } catch (error) {
            console.warn('License validation failed:', error);
            this.isValid = false;
        }
    }

    // 高级渲染功能
    advancedRendering() {
        if (!this.checkPermission(['pro', 'enterprise'])) {
            throw new Error('Advanced Rendering requires Pro or Enterprise license');
        }

        return {
            customOutputFormats: ['MOV', 'AVI', 'MP4', 'WebM', 'GIF'],
            qualityPresets: ['Ultra', 'High', 'Medium', 'Fast'],
            batchProcessing: true,
            templateLibrary: true,
            autoOptimization: true
        };
    }

    // 分布式渲染
    distributedRendering() {
        if (!this.checkPermission(['enterprise'])) {
            throw new Error('Distributed Rendering requires Enterprise license');
        }

        return {
            maxNodes: Infinity,
            loadBalancing: true,
            failureRecovery: true,
            nodeMonitoring: true,
            renderFarm: true
        };
    }

    // 云存储集成
    cloudStorage() {
        if (!this.checkPermission(['pro', 'enterprise'])) {
            throw new Error('Cloud Storage requires Pro or Enterprise license');
        }

        return {
            providers: ['AWS S3', 'Google Cloud', 'Azure', 'Dropbox'],
            autoSync: true,
            backupVersions: 30,
            encryption: true
        };
    }

    // 高级分析
    advancedAnalytics() {
        if (!this.checkPermission(['pro', 'enterprise'])) {
            throw new Error('Advanced Analytics requires Pro or Enterprise license');
        }

        return {
            renderTimeAnalysis: true,
            resourceUsageTracking: true,
            errorAnalytics: true,
            performanceReports: true,
            costAnalysis: true,
            exportReports: ['PDF', 'CSV', 'JSON']
        };
    }

    // API访问限制
    checkApiLimit(endpoint) {
        const limits = this.limits[this.tier];
        
        switch(endpoint) {
            case 'render':
                return this.dailyUsage.renders < limits.renderJobsPerDay;
            case 'concurrent':
                return this.activeJobs < limits.concurrentJobs;
            default:
                return true;
        }
    }

    // 许可证检查
    checkPermission(requiredTiers) {
        return this.isValid && requiredTiers.includes(this.tier);
    }

    // 功能锁定UI
    showUpgradePrompt(featureName) {
        const modal = document.createElement('div');
        modal.className = 'upgrade-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🚀 Premium Feature</h3>
                <p>${featureName} is available in Pro and Enterprise plans.</p>
                <div class="features-preview">
                    <h4>Unlock with Pro ($49/month):</h4>
                    <ul>
                        <li>✓ 500 renders per day</li>
                        <li>✓ 4K resolution support</li>
                        <li>✓ 5 concurrent jobs</li>
                        <li>✓ Cloud storage integration</li>
                        <li>✓ Advanced analytics</li>
                        <li>✓ Priority support</li>
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="window.open('/pricing', '_blank')">
                        Upgrade Now
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.upgrade-modal').remove()">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // 使用统计
    trackUsage(action, metadata = {}) {
        if (!this.isValid) return;

        fetch('/api/usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                licenseKey: this.licenseKey,
                action: action,
                metadata: metadata,
                timestamp: Date.now()
            })
        }).catch(err => console.warn('Usage tracking failed:', err));
    }

    // 获取定价信息
    static getPricingPlans() {
        return {
            free: {
                name: 'Free',
                price: 0,
                period: 'forever',
                features: [
                    '10 renders per day',
                    '1080p resolution',
                    '1 concurrent job',
                    'Community support',
                    'Basic templates'
                ]
            },
            pro: {
                name: 'Professional',
                price: 49,
                period: 'month',
                popular: true,
                features: [
                    '500 renders per day',
                    '4K resolution support',
                    '5 concurrent jobs',
                    'Cloud storage integration',
                    'Advanced analytics',
                    'Priority support',
                    'Custom plugins',
                    'Template library'
                ]
            },
            enterprise: {
                name: 'Enterprise',
                price: 199,
                period: 'month',
                features: [
                    'Unlimited renders',
                    '8K resolution support',
                    '20 concurrent jobs',
                    'Distributed rendering',
                    'Dedicated support',
                    'Custom integrations',
                    'SLA guarantee',
                    'On-premise deployment'
                ]
            }
        };
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexRenderPremium;
} else {
    window.NexRenderPremium = NexRenderPremium;
}