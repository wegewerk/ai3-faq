import {lll} from "@typo3/core/lit-helper.js";
import {html, render} from 'lit-html';
import Ai3Api from './ai3api.js';
import Notification from "@typo3/backend/notification.js";
import FormEngine from "@typo3/backend/form-engine.js";
import "@wegewerk/ai3core/creditsElement.js";

class FaqApp {
    constructor(container) {
        this.container = container;
        this.pageId = container.dataset.pageId;
        this.recordUid = container.dataset.recordUid;
        this.api = new Ai3Api();
        this.loading = false;
        this.saving = false;
        this.creditCost = null;
        this.language = this.getLanguageOptions()[0].value;
        this.previewData = [];
        this.ai3Type = '';
        this.ai3Source = '';
        this.ai3FaqData = '';
    }

    init() {
        this.render();
        this.fetchCreditCost();
    }

    async fetchCreditCost() {
        try {
            const costs = await this.api.creditCosts();
            this.creditCost = costs?.faq ?? null;
        } catch {
            this.creditCost = null;
        }
        this.render();
    }

    async generateFaq() {
        this.loading = true;
        this.render();

        try {
            const response = await this.api.generateFaq(this.pageId, this.recordUid, this.language);
            const result = await response.resolve();
            const data = JSON.parse(result);

            if (data.success && data.faqData) {
                this.ai3Type = data.type;
                this.ai3Source = data.source;
                this.ai3FaqData = JSON.stringify(data.faqData);
                this.previewFaq(data.faqData);
            } else {
                Notification.error( lll('tx_ai3.faq.error'), data.error || 'Unknown error');
            }
        } catch (error) {
            let message= await error.response.json();
            Notification.error(lll('tx_ai3.faq.error'), message.error);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    /**
     * preview the generated FAQ Data
     *
     *
     */
    previewFaq(generatedFAQ) {
        this.previewData = generatedFAQ;
        this.render();
    }

    async useFaq() {
        this.saving=true;
        this.render();
        this.updateAi3Fields(this.ai3Type, this.ai3Source, this.ai3FaqData);
        FormEngine.saveDocument();
    }
    updateAi3Fields(type, source,faqData) {
        // Helper to set a field value and dispatch the change event.
        const setField = (fieldName, value) => {
            const selector = `[data-formengine-input-name="data[tt_content][${this.recordUid}][${fieldName}]"]`;
            const field = document.querySelector(selector);
            if (!field) {
                console.warn('AI3 field not found:', selector);
                return false;
            }
            field.value = value;
            // Trigger change event for TYPO3 to recognize the change
            field.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
        };

        setField('tx_ai3_type', type);
        setField('tx_ai3_source', source);
        setField('tx_ai3_raw', faqData);
    }

    render() {
        const languageOptions = this.getLanguageOptions();
        const template = html`
            <div class="form-inline">
                <button
                    type="button"
                    class="btn btn-default"
                    @click="${() => this.generateFaq()}"
                    ?disabled="${this.loading}"
                >
                    <typo3-backend-icon identifier="ai3-summary-icon" size="small"></typo3-backend-icon>
                    ${this.loading ? lll('tx_ai3.faq.generating') : lll('tx_ai3.faq.button_generate')}
                    ${this.creditCost !== null ? ` (${lll('tx_ai3.faq.cost', this.creditCost)})` : ''}
                </button><ai3-credits></ai3-credits>
                ${this.loading ? html`<typo3-backend-spinner size="small"></typo3-backend-spinner>` : ''}
                <select class="form-select" @change="${(e) => this.language = e.target.value}">
                    ${languageOptions.map(option => html`
                        <option value="${option.value}" ?selected="${this.language == option.value}">${option.label}</option>
                    `)}
                </select>
            </div>
            <div class="preview mt-3">
                ${this.previewData.length > 0 ? html`
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>${lll('tx_ai3.faq.question')}</th>
                                <th>${lll('tx_ai3.faq.answer')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.previewData.map(faq => html`
                                <tr>
                                    <td>${faq.question}</td>
                                    <td>${faq.answer}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                    <button
                            type="button"
                            class="btn btn-default btn-sm"
                            @click="${() => this.useFaq()}"
                            ?disabled="${this.saving}"
                    >
                        ${lll('tx_ai3.faq.use')}
                    </button>
                ` : ''}
            </div>
        `;
        render(template, this.container.querySelector('[data-ai3="ai3-faq-app"]'));
    }

    getLanguageOptions() {
        return [
            {
                value: 'de',
                label: 'Deutsch'
            },
            {
                value: 'en',
                label: 'English'
            }
        ]
    }

    getSelectedLanguage() {
        const selector = `[name="data[tt_content][${this.recordUid}][sys_language_uid]"]`;
        const field = document.querySelector(selector);
        if (!field) {
            return this.getLanguageOptions()[0].value;
        } else  {
            return field.value;
        }

    }
}

document.querySelectorAll('[data-ai3="ai3-faq-container"]').forEach(container => {
    const app = new FaqApp(container);
    app.init();
});
